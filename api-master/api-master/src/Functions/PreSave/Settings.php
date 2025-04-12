<?php
namespace App\Functions\PreSave;
use App\Document\Product\CompanyItems;
use App\Document\Product\Company;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class Settings{
  static function Items($dm, $value, $serializer){
    if($value->calculated){
      $count = count($dm->getRepository(CompanyItems::class)->findBy(["item"=>$value->id]));
      // dd($value->calculated, $count);
      // dd($count);
      if(!$count){
        $company = $dm->getRepository(Company::class)->findBy([]);
        $i_comp = [];
        foreach ($company as $key => $comp) {
          $i_comp[$key] = ["item"=>$value->id, "company"=>$comp->id, "order"=>$value->order];
        }
        $values = $serializer->deserialize(json_encode($i_comp), CompanyItems::class . '[]', 'json', [ObjectNormalizer::DISABLE_TYPE_ENFORCEMENT=>true, 'multi'=>true]);
        // dd($values);
        foreach ($values as $key => $value) {
          # code...
          $dm->persist($value);
          // $dm->flush();
        }
      }
    }
  }
}