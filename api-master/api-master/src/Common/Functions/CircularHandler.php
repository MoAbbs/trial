<?php
namespace App\Common\Functions;

class CircularHandler{
  public function __invoke($object){
    // dd('here');
    return $object;
  }
  static public function handler($object){
    // dd('here');
    return $object;
  }
}
