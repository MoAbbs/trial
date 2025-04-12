<?php
namespace App\Common\Functions\Filters;

use HaydenPierce\ClassFinder\ClassFinder;
// use _;
Class Main{
  static function get($data, $string, $default = null){
      $arrStr = explode('.', $string);
      if( !is_array($arrStr) ) $arrStr = [$arrStr];
      $result = $data;
      foreach($arrStr as $lvl){
        $temp = $result->{$lvl} ?? $result[$lvl];
        // if($temp == 'mr1china is the biggest b2b and b2c social network where you can buy and sell products in all quantities , list your products videos , request products by videos , share your thoughts and connect new friends , spread your brand and keep in touch with your current customers and reach more potential customers , find the best price for your next flight and hotel booking, be always updated with fairs news. and many more'){
        //   dd([$temp=>$data]);
        // }
        if(!empty($lvl) && isset($temp)) $result = $temp;
        else $result = $default; 
      }
      return $result;
  }
  static function set(array &$arr, $path, $val)
  {
     $loc = &$arr;
     foreach(preg_split("/(?!^|.$)(?<! .)(?!. )\./", $path) as $step)
     {
       $loc = &$loc[$step];
     }
     return $loc = $val;
  }
  // print_r('hi_here');
  static function ListDirs($params){
    return array_filter(glob(@$params['path'] . DIRECTORY_SEPARATOR . '*'), 'is_dir');
  }
  static function FindClasses($params, $data){
    $stra = str_replace('/', '\\',strtr($params['str'], $data));
    // print_r($stra);
    return ClassFinder::getClassesInNamespace($stra);
  }
  static function flatten($params, $data) {
    // print_r($data);
    // print_r(_::flattenDeep($data));
    $return = [];
    array_walk_recursive($data, function($a) use (&$return) { $return[] = $a; });
    return $return;
  }
  static function mapping($params, $data, $props){
    // print_r($data);
    return array_map(fn($x)=>$props["applyFilters"]($params['fun'], $x, $props), $data);
  }
  static function map($params, $data, $props){
    // print_r($data);
    return array_filter(array_map(function($x) use ($props, $params){
      try{
        return $props["obj"]->getValue($x, $params['col']);
      }catch(\Throwable $e){
        // dd($x);
      }
    }, $data));
  }
  static function addKey($params, $data, $props){
      return [$params["def"]=>$data];
  }
  static function contains($params, $data, $props){
      // print_r($data);
      return (bool) strpos($data, $params["compare"]);
  }
  static function icontains($params, $data){
      $str = strtolower($data);
      $comp = strtolower($params["compare"]);
      return (bool)(strpos($str, $comp));
  }
  static function exclude($params, $data){
      return array_diff($data, @$params['params']);
  }
  static function getAllClasses($params, $data){
      return get_declared_classes();
  }
  static function ListFind($params, $data, $props){
      // print_r($data);
      return array_filter($data, function($x) use ($params, $props){
          // print_r($x);
          // print_r($props["applyFilters"]($params["fun"], $x, $props));
          return $props["applyFilters"]($params["fun"], $x, $props);
      });
  }
  static function Not($params, $data, $props){
      return !$props["applyFilters"]($params["fun"], $data, $props);
  }
  static function multiApply($params, $data, $props){
      $out = [];
      foreach ($params['apps'] as $key => $value) {
          # code...
          // print_r($data);
          $out[$key] = $props["applyFilters"]($value, $data, $props);
      }
      return $out;
  }
  static function arrayMultiApply($params, $data, $props){
      return array_map(fn($x)=>Main::multiApply($params, $x, $props), $data);
  }
  static function replace($params, $data, $props){
      // print_r($data);
      // print_r(str_replace($params['str'], $params['by'], $data));
      return str_replace($params['str'], $params['by'], $data);
  }
  static function lower($params, $data, $props){
      return is_string($data) ? strtolower($data) : "Error at ApplyFilter lower method";
  }
  static function diff($params, $data, $props){
      $keys = array_diff(array_map(fn($x)=>$x[$params['select']], $data), array_map(fn($x)=>$x[$params['select']], $params["data"]));
      return array_values(array_intersect_key($data,$keys));
  }
  static function noob($params, $data, $props){
      return $data;
  }
  static function keys($params, $data, $props){
      $out = [];
      foreach ($data as $key => $val) {
          # code...
          $str = join('.', array_map(fn($x)=>Main::get($val, $x, $x), $params['levels']));
          Main::set($out, $str, $val);
      }
      return $out;
  }
  static function keysWithFun($params, $data, $props){
    $out = [];
    foreach ($data as $key => $val) {
        # code...
        $str = join('.', array_map(fn($x)=>$props["applyFilters"]($x, $val, $props), $params['levels']));
        Main::set($out, $str, $val);
    }
    return $out;
  }
  /**
   * Returns true if the given predicate is true for all elements.
   */
  static function array_every(callable $callback, array $arr) {
    foreach ($arr as $element) {
      if (!$callback($element)) {
        return FALSE;
      }
    }
    return TRUE;
  }
  
  /**
   * Returns true if the given predicate is true for at least one element.
   */
  static function array_some(callable $callback, array $arr) {
    foreach ($arr as $element) {
      if ($callback($element)) {
        return TRUE;
      }
    }
    return FALSE;
  }
  
  static function Filter($params, $data, $props){
    return array_filter($data, fn($d)=>Main::array_every(fn($n)=>$props['obj']->getValue($d, $n), $params['params']));
  }
  function omit($params, $data, $props){
      foreach ($params['keys'] as $key => $value) {
          # code...
          unset($data[$value]);
      }
      return $data;
  }
  function getModels($params, $data, $props){
      $dbs = (object)[];
      $saved = $dbs->db->select( '*' )->from( 'modules.json' )->get();
      $saved = json_decode(json_encode($saved), true);
      return $saved;
  }
  
  function regexReplace($params, $data, $props){
    return is_array($data) ? array_map(fn($x)=>preg_replace($params['regex'], $params['val'], $x), $data):preg_replace($params['regex'], $params['val'], $data);
  }
}