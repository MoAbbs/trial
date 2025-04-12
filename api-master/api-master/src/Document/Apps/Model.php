<?php

namespace App\Document\Apps;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ODM\Document(collection="apps__model")
 */
#[ApiResource(routePrefix: 'apps')]
class Model extends Common
{
    /**
     * @ODM\Field(type="raw")
    */
    public $fields;
    /**
     * @ODM\Field(type="raw")
    */
    public $path;
    /**
     * @ODM\Field(type="raw")
    */
    public $props;
    /**
     * @ODM\Field(type="string")
    */
    public $model;
    /**
     * @ODM\ReferenceOne(targetDocument=App::class, storeAs="id")
     * @assert\NotBlank
    */
    public $app;
}
