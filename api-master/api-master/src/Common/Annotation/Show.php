<?php
namespace App\Common\Annotation;
use Doctrine\Common\Annotations\Annotation;
use Doctrine\Common\Annotations\Annotation\NamedArgumentConstructor;

/**
 * @Annotation
 * @NamedArgumentConstructor()
 * @Target({"PROPERTY","ANNOTATION"})
 */
class Show
{
    public $show;
    public function __construct(string $values){
      // dd($values);
      $this->show = $values;
    }
}