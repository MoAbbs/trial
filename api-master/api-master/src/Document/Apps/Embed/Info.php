<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\EmbeddedDocument
 */
Class Info {
  /** @ODM\Field(type="string") */
  public $bio;
  /** @ODM\Field(type="string") */
  public $desc;
  /** @ODM\Field(type="string") */
  public $education;
  /** @ODM\Field(type="string") */
  public $fast;
}