<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class Widgets {
  /** @ODM\ReferenceOne(targetDocument=App\Document\Apps\Widget::class, storeAs="id") */
  public $w_type;
  /** @ODM\Field(type="raw") */
  public $data;
}