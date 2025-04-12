<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class Body {
  /** @ODM\Field(type="raw") */
  public $comp;
  /** @ODM\Field(type="raw") */
  public $comps;
  /** @ODM\Field(type="raw") */
  public $wraps;
}