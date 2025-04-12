<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class Table {
  /** @ODM\EmbedMany(targetDocument=TColumn::class) */
  public $columns;
}