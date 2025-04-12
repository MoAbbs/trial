<?php

namespace App\Document\Apps\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class Validate {
  /** @ODM\Field(type="bool") */
  public $required;
  /** @ODM\Field(type="int") */
  public $max_length;
  /** @ODM\Field(type="int") */
  public $min_length;
  /** @ODM\Field(type="int") */
  public $max_number;
  /** @ODM\Field(type="int") */
  public $min_number;
  /** @ODM\Field(type="string") */
  public $regex;
  /** @ODM\Field(type="string") */
  public $email;
  /** @ODM\Field(type="hash") */
  public $func;
}