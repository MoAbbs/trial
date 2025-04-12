<?php

namespace App\Document\Apps;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\SerializedName;


/**
 * @ODM\Document(collection="apps__app")
 */
#[ApiResource(routePrefix: 'apps')]
class App extends Common
{
    /**
     * @ODM\Field(type="string")
     * @assert\NotBlank
    */
    public $name;
    /**
     * @ODM\Field(type="string" )
    */
    public $platform;
    /**
     * @ODM\Field(type="raw" )
    */
    public $logos;
    /**
     * @ODM\Field(type="raw" )
    */
    public $models;

    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Auth\User")
    */
    public $user;
}
