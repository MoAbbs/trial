<?php
namespace App\Functions\PreSave;
use App\Document\Product\CompanyItems;
use App\Document\Settings as SettingsModels;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class Product{
  static function Company($dm, $value, $serializer){
    $count = count($dm->getRepository(CompanyItems::class)->findBy(["company"=>$value->id]));
    // dd($count);
    if(!$count){
      $items = $dm->getRepository(SettingsModels\Items::class)->findBy(["calculated"=>1]);
      $i_comp = [];
      foreach ($items as $key => $item) {
        $i_comp[$key] = ["item"=>$item->id, "company"=>$value->id, "order"=>$item->order];
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