<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use App\Document\Apps\Master;

/**
 * @ODM\EmbeddedDocument
 */
Class TColumn extends Master\Field {
  /** @ODM\Field(type="string") */
  public $head;
}