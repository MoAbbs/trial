<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class WData {
  /** @ODM\Field(type="string") */
  public $path;
  /** @ODM\Field(type="hash") */
  public $val;
}