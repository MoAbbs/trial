<?php

namespace App\Document\Apps\Master;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
// use App\Document\Apps\Embed\Table;
use App\Document\Apps\Embed\Filter;
use App\Document\Apps\Embed\Validate;
/**
 * @ODM\MappedSuperclass
 */
Class Field {
  /** 
   * @ODM\Field(type="string") 
   * @Assert\Notblank
   * */
  public $name;
  /** 
   * @ODM\Field(type="string") 
   * @Assert\Notblank
   * */
  public $model;
  /** 
   * @ODM\Field(type="string") 
   * @Assert\Notblank
   * */
  public $type = 'text';
  /** 
   * @ODM\EmbedOne(targetDocument=Validate::class) 
   * @Assert\Notblank
   * */
  public $validates;
  /** 
   * @ODM\EmbedMany(targetDocument=Filter::class) 
   * */
  public $filters;
  /** 
   * @ODM\Field(type="string") 
   * */
  public $redux;
  /** 
   * @ODM\Field(type="string") 
   * */
  public $class;
  /** @ODM\EmbedMany(targetDocument=Filter::class) */
  public $data;
}