<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class Icon {
  /** @ODM\Field(type="string") */
  public $type;
  /** @ODM\Field(type="string") */
  public $name;
}