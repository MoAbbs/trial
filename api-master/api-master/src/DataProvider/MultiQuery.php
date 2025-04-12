<?php
// api/src/DataProvider/BlogPostCollectionDataProvider.php

namespace App\DataProvider;
use App\Common\Functions\Filters\Helper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Common\Functions\Helpers;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\DocumentManager as MongoDBDocumentManager;
use Doctrine\ORM\Query\Parameter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
// use App\Common\Functions\CircularHandler;
class MultiQuery extends AbstractController
{
  protected $headers = array('Content-Type', 'application/json');
    public $serializer;
    public $validator;
    public $propertyAccessor;
    private $options = [ObjectNormalizer::SKIP_NULL_VALUES=>true, ObjectNormalizer::ENABLE_MAX_DEPTH=>true, AbstractNormalizer::IGNORED_ATTRIBUTES => ['authPassword', 'username', 'userIdentifier', 'r_code', 'authIdentifierName', 'rememberTokenName', 'authIdentifier', 'password'], 'multi'=>true]; 
    public function __construct(MongoDBDocumentManager $dm, SerializerInterface $serializer, ValidatorInterface $validator)
    {
        $this->propertyAccessor = PropertyAccess::createPropertyAccessor();
        // new CircularHandler();
        $this->options[AbstractNormalizer::CIRCULAR_REFERENCE_LIMIT] = 3;
        $this->options[AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER] = function($object){
          if(method_exists($object, 'getId')){
            return $object->getId();
          }
          return $object;
        };
        $this->dm = $dm;
        $this->validator = $validator;
        $this->serializer = $serializer;
    }

    private function getmoduels($module)
    {
      return Helpers::getmoduels($module);
    }
    private function pushToFilters(&$query, $filters, $qb, $dm, $model, &$i, &$params, $op="", $main=true, $ref='a')
    {
        // $query_array = $added_query;
        // dd($dm->getMetadataFactory()->getMetadataFor($model));
        $cem = $dm->getMetadataFactory()->getMetadataFor($model);
        $fields = $cem->fieldMappings;
        $ass = $cem->associationMappings;
        // $fields = 
        // $params = [];
        // $i = 1;
        foreach ($filters as $filter => $value) {
            if($filter == 'or'){
              $this->pushToFilters($query, $value, $qb, $dm, $model, $i, $params, 'orWhere', false);
              continue;
            }
            $f = '';
            $exp = 'equals';
            $qs = explode('__', $filter);
            foreach ($qs as $key => $q) {
              if($fields[$q]??false){
                $f = $q;
                continue;
              }
              if ($ass[$q] ?? false){
                $f = $q;
                continue;
              }
              // dd($qb->expr()->field('id'));
              if(method_exists($qb->expr(), $q)){
                $exp = $q;
              }
            }
            if($f){
              $field_name = $f;
              array_push($params, new Parameter($i, $value));
              // dd($op, $field_name, $i, $value);
              if($op){
                $qq = $qb->expr()->field($field_name)->{$exp}($value);
                $i++;
                $query->{$op}($qq);
              }
              else{
                $query->expr()->field($field_name)->{$exp}($value);
              }
            }
        }
        // dd($params);
        return $query;
        if($main){
          // dd();
          return $query->setParameters(new ArrayCollection($params));
        }
    }
    private function applyFilter($model, $filters, $dm, $data, $ads)
    {
        // $qb = $dm->createQueryBuilder($model);
        $limit = $ads['limit'] ?? $data['limit'] ?? 500;
        $page = $ads['page'] ?? $data['page'] ?? 0;
        $order = $ads['order_by'] ?? $data['order_by'] ?? ['updated_at', 'DESC'];
        $rand = $ads['rand'] ?? $data['rand'] ?? null;
        $query = $dm->createQueryBuilder($model)->hydrate(false);
        // dd(empty($filters));
        // if (!empty($filters)) {
        //     $i = 1;
        //     $params = [];
        //     $this->pushToFilters($query, $filters, $query, $dm, $model, $i, $params);
        // }
        if($rand){
          // $rand = true;
          $c_query = $dm->createQueryBuilder($model);
          if (!empty($filters)) {
            $i = 1;
            $params = [];
            $this->pushToFilters($c_query, $filters, $query, $dm, $model, $i, $params);
          }
          $count = $c_query->getQuery()->count();
          $max_page = floor($count / $limit);
          $page = rand(0, $max_page);
        }
        // if($order){
        //   $query->sort($order[0], $order[1]);
        // }
        // $data = $query->skip($limit*$page)->limit($limit)->getQuery()->execute();
        // // dd($data);
        // return iterator_to_array($data);
        // // dd(empty($filters));
        // // $this->dm->clear();
        // if($rand){
        //   // $rand = true;
        //   $c_query = $dm->createQueryBuilder($model);
        //   if (!empty($filters)) {
        //     $i = 1;
        //     $params = [];
        //   }
        //   $count = $c_query->getQuery()->count();
        //   $max_page = floor($count / $limit);
        //   $page = rand(0, $max_page);
        // }
        
        $query = $dm->getRepository($model);
        return $query->findBy($filters);
    }
    private function applyCount($model, $filters, $dm, $data, $ads)
    {
        $qb = $dm->createQueryBuilder();
        $query = $dm->createQueryBuilder($model)->select('id');
        // dd(empty($filters));
        if (!empty($filters)) {
            $i = 1;
            $params = [];
            $this->pushToFilters($query, $filters, $qb, $dm, $model, $i, $params);
        }
        $data = $query->getQuery()->count();
        return iterator_to_array($data);
    }
    public function multiQuries(Request $request)
    {   
        $data = $request->request->all();
        $out = [];
        $ads = [];
        // $this->dm->clear();
        foreach ($data as $d => $value) {
            if (is_array($value) && count($value) !== 0) {
                $filter = $value["filter"] ?? array();
                $ads = $value;
            } else {
                $filter = array();
            }
            $d = strtolower($d);
            $model = $this->getmoduels($d);
            // dd($model,  $d);
            if($model){
              $out[$d] = $this->applyFilter($model, $filter, $this->dm, $data, $ads);
              // dd('here', $out);
              // $this->dm->clear();
              $post_query = Helpers::getFun($model, $d, 'PostQuery');
              if($post_query){
                $func = $post_query."::{$d}";
                $func($out, $this->dm, $out[$d]);
              }
            }
        }
        // dd($out);
        // $this->dm->clear();
        $res = gzencode($this->serializer->serialize($out, 'json', $this->options), 1);
        return new Response($res, Response::HTTP_OK, ['Content-Type' => 'application/json', 'Content-Encoding' => 'gzip']);
    }
    public function multiCount(Request $request)
    {
        $data = $request->request->all();
        $out = [];
        $ads = [];
        foreach ($data as $d => $value) {
            if (is_array($value) && count($value) !== 0) {
                $filter = $value["filter"] ?? array();
                $ads = $value;
            } else {
                $filter = array();
            }
            $d = strtolower($d);
            $model = $this->getmoduels($d);
            if($model){
              $out[$d] = $this->applyCount($model, $filter, $this->dm, $data, $ads);
            }
        }
        return new JsonResponse($out);
    }
    public function getModelsFields(Request $request)
    {   
        $data = $request->request->all();
        $out = [];
        $model = $this->getmoduels('apps__model');
        $models = Helper::applyFilters(["key"=>"keys", "levels"=>["path"]], $this->dm->getRepository($model)->findBy(["app"=>$data["app"]]));

        foreach ($data['models'] as $d => $value) {
            $d = strtolower($d);
            $model = $this->getmoduels($d);
            if($model){
              $db_model = $models[$d] ?? [];
              $cem = $this->dm->getMetadataFactory()->getMetadataFor($model);
              $fields = $cem->fieldMappings;
              // dd($fields);
              $ass = $cem->associationMappings;
              $out[$d] = array_merge(['fields'=> array_replace_recursive([], $fields, $db_model->fields ?? []), 'rel'=>$ass], $db_model->props ?? []);
            }
        }
        // dd($out);
        $res = gzencode($this->serializer->serialize($out, 'json', $this->options), 1);
        return new Response($res, Response::HTTP_OK, ['Content-Type' => 'application/json', 'Content-Encoding' => 'gzip']);

    }
    /**
     * @Route("/multi_query", name="mluti_query")
     */
    public function list(Request $request): JsonResponse
    {
      // dd($request->attributes->all());
      
      return new JsonResponse(['hi'=>'hi']);
    }
}