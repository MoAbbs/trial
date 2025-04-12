<?php

namespace App\Document\Auth\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class Name {
  /** @ODM\Field(type="string") */
  public $first_name;
  /** @ODM\Field(type="string") */
  public $last_name;
}