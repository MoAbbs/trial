<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class Filter {
  /** @ODM\Field(type="string") */
  public $model;
  /** @ODM\Field(type="hash") */
  public $func;
}