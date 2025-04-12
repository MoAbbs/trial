<?php
namespace App\Common\Functions;

class Globals{
  static function ListDirs($path){
      return array_filter(glob($path . DIRECTORY_SEPARATOR . '*'), 'is_dir');
  }
}