<?php

namespace App\Document\Auth\Embed;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\EmbeddedDocument
 */
Class Social {
  /**
     * @ODM\Field(type="int")
    */
    public $service = 0 ;
    /**
     * @ODM\Field(type="int")
    */
    public $friends = 0 ;
    /**
     * @ODM\Field(type="int")
    */
    public $photos = 0 ;
    /**
     * @ODM\Field(type="int")
    */
    public $n_chat = 0 ;
        /**
     * @ODM\Field(type="int")
    */
    public $n_notify = 0 ;
        /**
     * @ODM\Field(type="int")
    */
    public $n_friend = 0 ;
    /**
     * @ODM\Field(type="int")
    */
    public $videos = 0 ;

}