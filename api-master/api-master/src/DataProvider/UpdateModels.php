<?php
// api/src/DataProvider/BlogPostCollectionDataProvider.php

namespace App\DataProvider;

use App\Common\Functions\Filters\Helper;
use App\Common\Functions\Helpers;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UpdateModels extends AbstractController
{
  public $serializer;
  public $validator;
  public $propertyAccessor;
  private $options = [ObjectNormalizer::DISABLE_TYPE_ENFORCEMENT=>true, ObjectNormalizer::SKIP_NULL_VALUES=>true, ObjectNormalizer::ENABLE_MAX_DEPTH=>true, AbstractNormalizer::IGNORED_ATTRIBUTES => ['authPassword', 'authIdentifierName', 'key', 'rememberTokenName', 'authIdentifier', 'password'], 'multi'=>true];
  private $options_de = [ObjectNormalizer::DISABLE_TYPE_ENFORCEMENT=>true, 'multi'=>true];
  public function __construct(DocumentManager $dm, SerializerInterface $serializer, ValidatorInterface $validator)
  {
      $this->propertyAccessor = PropertyAccess::createPropertyAccessor();

      $this->dm = $dm;
      $this->validator = $validator;
      $this->serializer = $serializer;
  }
  private function getmoduels($module)
  {
    return Helpers::getmoduels($module);
  }
  public function update_model($all, $request, $tx = true)
    {
      // dd('in');
        $dm = $this->dm;
        $dm->clear();
        // $dm->disable('soft-deleteable');
        // if($tx){
          // $dm->getConnection()->beginTransaction();
          // $session = $dm->getClient()->startSession();
          // $session->startTransaction();
          // $dm->getConnection()->setAutoCommit(false);
        // }
        try {
            $out = [];
            $ids = [];
            $errs = [];
            $inputs = $all["data"] ?? [];
            // dd($inputs);
            foreach ($inputs as $key => $values) {
                // $values = array_values($vs);
                $model = $this->getmoduels($key);
                $map_data = Helpers::getFun($model, 'MapData');
                $pre_save = Helpers::getFun($model, 'PreSave');
                // dd($pre_save);
                // if($pre_save){}
                $out[$key] = [];
                $e_ids = [];
                // print_r($value);
                if($map_data){
                  foreach ($values as $v => $value) {
                    $values[$v]  = $map_data->invoke((object)[], $request, $values[$v]);
                  }
                }
                // $saved_data = $this->serializer->deserialize(json_encode($values), $model.'[]', 'json');
                // if($key=='apps__module'){
                //   dd($saved_data, $values);
                // }
                // $errors = $this->validator->validate($saved_data);
                // if ($errors->count() > 0){
                //   // dd($errors);
                //   foreach ($errors as $err => $val) {
                //     # code...
                //     $field = explode('.', $val->getPropertyPath());
                //     $field = end($field);
                //     // dd(end($field));
                //     $this->propertyAccessor->setValue($errs, "[$key][$err][$field]", $val->getMessage());
                //   }
                //   // dd($errors);
                // }
                if($errs){
                  // $dm->getConnection()->rollBack();
                  return new JsonResponse($errs, 400);
                }
                $q = null;
                // dd(count($saved_data));
                // dd($saved_data, $values);
                if(count($values) < 500){
                  $mainIds = array_filter(array_map(fn($x)=>$x["id"] ?? null, $values), fn($d)=>!is_null($d));
                  $q = $dm->getRepository($model)->findBy(["id"=>['$in'=>$mainIds]]);
                }else{
                  $q = $dm->getRepository($model)->findAll();
                  // dd($q);
                }
                $db_datas = Helper::applyFilters([
                  "key"=>"keys",
                  "levels"=>["id"]
                ], $q);
                $i=0;
                foreach ($values as $v => $ev) {
                    # code...
                    $id = $ev['id'] ?? null;
                    if ($id && ($db_datas[$id] ?? false)) {
                        $saves = $this->serializer->deserialize(json_encode($ev), $model, 'json', ['object_to_populate' => $db_datas[$id], ObjectNormalizer::DEEP_OBJECT_TO_POPULATE=> true, ObjectNormalizer::DISABLE_TYPE_ENFORCEMENT=>true, 'multi'=>true]);
                        $errors = $this->validator->validate($saves);
                        if ($errors->count() > 0){
                            return new JsonResponse(Helpers::getErrors($errors), 400);
                        }
                        $errors = $this->validator->validate($saves);
                        if ($errors->count() > 0){
                          return new JsonResponse(Helpers::getErrors($errors), 400);
                        }
                        // dd($saves);
                        $dm->persist($saves);
                        $dm->flush();
                        if($pre_save){
                          $pre_save->invoke((object)[], $dm, $saves, $this->serializer);
                          $dm->flush();
                        }
                        array_push($e_ids, $id);
                        continue;
                    }
                    $value = $this->serializer->deserialize(json_encode($ev), $model, 'json', $this->options_de);
                    $errors = $this->validator->validate($value);
                    if ($errors->count() > 0){
                      return new JsonResponse(Helpers::getErrors($errors), 400);
                    }
                    $dm->persist($value);
                    $dm->flush();
                    if($pre_save){
                      $pre_save->invoke((object)[], $dm, $value, $this->serializer);
                      $dm->flush();
                    }
                    array_push($e_ids, $value->getId());
                }
                // $dm->flush();
                $ids[$key] = $e_ids;
                // dd($ids, $key);
                // dd('here');
            }
            foreach ($out as $key => $value) {
              $model = $this->getmoduels($key);
              $post_save = Helpers::getFun($model, 'PostSave');
              // if($tx){
                $out[$key] = $dm->getRepository($model)->findBy(["id"=>['$in'=>$ids[$key] ?? []]]);
                if($post_save){
                  call_user_func($post_save."::{$key}", $dm, $out[$key], $this->serializer);
                }
                // }
                # code...
              }
              // dd($out, $ids);
              // if($tx){
              // $session->commitTransaction();
              // $session->endSession();
              // }
                // dd($out, $res);
            $res = $this->serializer->serialize($out, 'json', $this->options);
            return new Response($res, Response::HTTP_CREATED, ['Content-Type' => 'application/json']);
        } catch (\Exception $e) {
          throw $e;
          if($tx){
            // $dm->getConnection()->rollBack();
          }
          return new JsonResponse(["msg"=>$e->getMessage()], 400);
        }
    }
    /**
     * @Route("/update_models", name="mluti_query")
     */
    public function list(Request $request)
    {
      $all = $request->request->all();
      // dd($all);
      return $this->update_model($all, $request);
    }
}
