<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Document\Apps\Master;
/**
 * @ODM\EmbeddedDocument
 */
Class Field extends Master\Field{
  /** 
   * @ODM\EmbedOne(targetDocument=Table::class) 
   * @Assert\Notblank
   * */
  public $table;
}