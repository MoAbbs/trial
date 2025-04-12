<?php
// api/src/DataProvider/BlogPostCollectionDataProvider.php

namespace App\DataProvider;
use App\Common\Functions\Filters\Helper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\Common\Functions\Helpers;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Document\Apps\Sheets;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

// use App\Common\Functions\CircularHandler;
class ReadFiles extends AbstractController
{
  /** string $rootPath */
  private $rootPath;
  private $dm;
  private $serializer;
  private $options = [ObjectNormalizer::DISABLE_TYPE_ENFORCEMENT=>true, ObjectNormalizer::SKIP_NULL_VALUES=>true, ObjectNormalizer::ENABLE_MAX_DEPTH=>true, AbstractNormalizer::IGNORED_ATTRIBUTES => ['authPassword', 'authIdentifierName', 'key', 'rememberTokenName', 'authIdentifier', 'password'], 'multi'=>true];
  private $options_de = [ObjectNormalizer::DISABLE_TYPE_ENFORCEMENT=>true, 'multi'=>true];
  
  public function __construct(string $rootPath, DocumentManager $dm, SerializerInterface $serializer)
  {
    $this->dm = $dm;
    $this->rootPath = $rootPath;
    $this->serializer = $serializer;
  }
  public function readExcel(Request $request)
  {
    # code...
    $dm = $this->dm;
    $file = $request->files->get('file');
    $val = (object) [];
    $path = Helpers::UploadFile($file, $val, $this->rootPath);
    $spreadsheet = IOFactory::load($path);
    $sheetCount = $spreadsheet->getSheetCount();
    $out = [];
    $id = $request->get('id');
    $sheets = $dm->getRepository(Sheets::class)->findBy(["file"=>$id]);
    foreach ($sheets as $key => $sh) {
      # code...
      $sheet = $spreadsheet->getSheetByName($sh->name);
      $values = $sheet->toArray(null, true, true, true);
      $l_data = [];
      foreach($sh->links as $key => $l){
        $link = (object) $l;
        // dd($link);
        $md = Helpers::getmoduels($link->model);
        $q = $dm->getRepository($md)->findAll();
        $query = [];
        $l_data[$link->model] = Helper::applyFilters([
          "key"=>"keys",
          "levels"=>array_keys($link->query),
        ], $q);
      }
      $headings = array_shift($values);
        array_walk(
            $values,
            function (&$row) use ($headings, $sh, $dm, $l_data) {
              $row = array_combine($headings, $row);
              foreach($sh->links as $key => $l){
                $link = (object) $l;
                // dd($link);
                $query = [];
                $temp = $l_data[$link->model];
                $skip = false;
                foreach ($link->query as $k => $q) {
                  # code...
                  // dd($q, $temp);
                  $val = $row[$q] ?? null;
                  if(!$val){
                    $skip = true;
                  }
                  $temp = $temp[$val] ?? [];
                }
                $val = $temp->id ?? null;
                // dd($row, $val, $l_data[$link->model]);
                if($val && !$skip){
                  $row[$key] = $val;
                }else{
                  if($row[$key] ?? false){
                    unset($row[$key]);
                  }
                }
              }
            }
        );
        // $out[$sh->model] = $temp;
        $model = Helpers::getmoduels($sh->model);
        $map_data = Helpers::getFun($model, 'MapData');
        $pre_save = Helpers::getFun($model, 'PreSave');
        if(count($values) < 500){
          $mainIds = array_filter(array_map(fn($x)=>$x[$sh->ident] ?? null, $values), fn($d)=>!is_null($d));
          $q = $dm->getRepository($model)->findBy([$sh->ident=>['$in'=>$mainIds]]);
        }else{
          $q = $dm->getRepository($model)->findAll();
          // dd($q);
        }
        $db_datas = Helper::applyFilters([
          "key"=>"keys",
          "levels"=>[$sh->ident]
        ], $q);
        $e_ids = [];
        $i=0;
        // dd($db_datas);
        foreach ($values as $v => $ev) {
            # code...
            $id = $ev[$sh->ident] ?? null;
            // dd((bool)($db_datas[$id] ?? false), $db_datas);
            if (($db_datas[$id] ?? false)) {
              // try{
                $saves = $this->serializer->deserialize(json_encode($ev), $model, 'json', ['object_to_populate' => $db_datas[$id], ObjectNormalizer::DEEP_OBJECT_TO_POPULATE=> true, ObjectNormalizer::DISABLE_TYPE_ENFORCEMENT=>true, 'multi'=>true]);

              // }catch(\Exception){
              //   dd($ev, $db_datas[$id]);
              // }
                // dd($saves);
                $dm->persist($saves);
                $dm->flush();
                if($pre_save){
                  $pre_save->invoke((object)[], $dm, $saves, $this->serializer);
                }
                array_push($e_ids, $saves->getId());
                continue;
            }
            $value = $this->serializer->deserialize(json_encode($ev), $model, 'json', $this->options_de);
            $dm->persist($value);
            $dm->flush();
            if($pre_save){
              $pre_save->invoke((object)[], $dm, $value, $this->serializer);
            }
            array_push($e_ids, $value->getId());
        }
        // dd($db_datas);
        $ids[$sh->model] = $e_ids;
      }
      $dm->flush();
    // dd($ids);

    // dd('here');
    foreach ($ids as $key => $value) {
      $model = Helpers::getmoduels($key);
      $post_save = Helpers::getFun($model, 'PostSave');
      $out[$key] = $dm->getRepository($model)->findBy(["id"=>['$in'=>$ids[$key] ?? []]]);
      if($post_save){
        call_user_func($post_save."::{$key}", $dm, $out[$key], $this->serializer);
      }
    }
    $res = $this->serializer->serialize($out, 'json', $this->options);
    return new Response($res, Response::HTTP_CREATED, ['Content-Type' => 'application/json']);
  }
  public function readMultiSheets(Request $request)
  {
    # code...
    $dm = $this->dm;
    $file = $request->files->get('file');
    $val = (object) [];
    $path = Helpers::UploadFile($file, $val, $this->rootPath);
    $spreadsheet = IOFactory::load($path);
    $names = $spreadsheet->getSheetNames();
    $out = [];
    $id = $request->get('id');
    $sh = $dm->getRepository(Sheets::class)->findOneBy(["file"=>$id]);
    foreach ($names as $key => $shName) {
      # code...
      $sheet = $spreadsheet->getSheetByName($shName);
      $values = $sheet->toArray(null, true, true, true);
      $l_data = [];
      foreach($sh->links as $key => $l){
        $link = (object) $l;
        // dd($link);
        $md = Helpers::getmoduels($link->model);
        $q = $dm->getRepository($md)->findAll();
        $query = [];
        $l_data[$link->model] = Helper::applyFilters([
          "key"=>"keys",
          "levels"=>array_keys($link->query),
        ], $q);
      }
      $headings = array_shift($values);
        array_walk(
            $values,
            function (&$row) use ($headings, $sh, $dm, $l_data) {
              $row = array_combine($headings, $row);
              foreach($sh->links as $key => $l){
                $link = (object) $l;
                // dd($link);
                $query = [];
                $temp = $l_data[$link->model];
                $skip = false;
                foreach ($link->query as $k => $q) {
                  # code...
                  // dd($q, $temp);
                  $val = $row[$q] ?? null;
                  if(!$val){
                    $skip = true;
                  }
                  $temp = $temp[$val] ?? [];
                }
                $val = $temp->id ?? null;
                // dd($row, $val, $l_data[$link->model]);
                if($val && !$skip){
                  $row[$key] = $val;
                }else{
                  if($row[$key] ?? false){
                    unset($row[$key]);
                  }
                }
              }
            }
        );
        // $out[$sh->model] = $temp;
        $model = Helpers::getmoduels($sh->model);
        // $map_data = Helpers::getFun($model, 'MapData');
        $pre_save = Helpers::getFun($model, 'PreSave');
        if(count($values) < 500){
          $mainIds = array_filter(array_map(fn($x)=>$x[$sh->ident] ?? null, $values), fn($d)=>!is_null($d));
          $q = $dm->getRepository($model)->findBy([$sh->ident=>['$in'=>$mainIds]]);
        }else{
          $q = $dm->getRepository($model)->findAll();
          // dd($q);
        }
        $db_datas = Helper::applyFilters([
          "key"=>"keys",
          "levels"=>[$sh->ident]
        ], $q);
        $e_ids = [];
        $i=0;
        // dd($db_datas);
        foreach ($values as $v => $ev) {
            # code...
            $id = $ev[$sh->ident] ?? null;
            // dd((bool)($db_datas[$id] ?? false), $db_datas);
            if (($db_datas[$id] ?? false)) {
              // try{
                $saves = $this->serializer->deserialize(json_encode($ev), $model, 'json', ['object_to_populate' => $db_datas[$id], ObjectNormalizer::DEEP_OBJECT_TO_POPULATE=> true, ObjectNormalizer::DISABLE_TYPE_ENFORCEMENT=>true, 'multi'=>true]);

              // }catch(\Exception){
              //   dd($ev, $db_datas[$id]);
              // }
                // dd($saves);
                $dm->persist($saves);
                $dm->flush();
                if($pre_save){
                  $pre_save->invoke((object)[], $dm, $saves, $this->serializer);
                }
                array_push($e_ids, $saves->getId());
                continue;
            }
            $value = $this->serializer->deserialize(json_encode($ev), $model, 'json', $this->options_de);
            $dm->persist($value);
            $dm->flush();
            if($pre_save){
              $pre_save->invoke((object)[], $dm, $value, $this->serializer);
            }
            array_push($e_ids, $value->getId());
        }
        // dd($db_datas);
        $ids[$sh->model] = $e_ids;
      }
      $dm->flush();
    // dd($ids);

    // dd('here');
    foreach ($ids as $key => $value) {
      $model = Helpers::getmoduels($key);
      $post_save = Helpers::getFun($model, 'PostSave');
      $out[$key] = $dm->getRepository($model)->findBy(["id"=>['$in'=>$ids[$key] ?? []]]);
      if($post_save){
        call_user_func($post_save."::{$key}", $dm, $out[$key], $this->serializer);
      }
    }
    $res = $this->serializer->serialize($out, 'json', $this->options);
    return new Response($res, Response::HTTP_CREATED, ['Content-Type' => 'application/json']);
  }
}