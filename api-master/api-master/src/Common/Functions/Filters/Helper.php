<?php
namespace App\Common\Functions\Filters;
// require __DIR__ . "/main.php";
// use Jajo\JSONDB;
use Symfony\Component\PropertyAccess\PropertyAccess;
// require_once(dirname(__FILE__).'/main.php');
Class Helper{
  Static function applyFilters($params, $data = Null, $props=[]) {
    if(!@$props['applyFilters']){
        $propertyAccessor = PropertyAccess::createPropertyAccessor();
        $props["applyFilters"] = 'App\Common\Functions\Filters\Helper::applyFilters';
        $props["obj"] = $propertyAccessor;
      }
      // print_r($props["applyFilters"]);
      $n_data = call_user_func_array("App\Common\Functions\Filters\Main::{$params['key']}", array($params, $data, $props));
      if(@$params['then']){
          return $props["applyFilters"]($params['then'], $n_data, $props);
      }
      return $n_data;
  }
}
// class DB {
//     public $db;
//     function __construct(){
//         $this->db = new JSONDB( base_path() . DIRECTORY_SEPARATOR. 'db' );
//     }
// }