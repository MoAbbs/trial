<?php

namespace App\Document\Apps;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Common\Annotation\Show;

/**
 * @ODM\Document(collection="apps__widget")
 */
#[ApiResource(routePrefix: 'apps')]
class Widget extends Common
{
    /**
     * @ODM\Field(type="string" )
    */
    public $s_class;
    /**
     * @ODM\Field(type="raw" )
    */
    public $class_fun;
    /**
     * @ODM\Field(type="raw" )
    */
    public $comp;
    /**
     * @ODM\Field(type="raw" )
    */
    public $comps;
    /**
     * @ODM\Field(type="raw" )
    */
    public $wraps;
    /**
     * @ODM\Field(type="raw" )
    */
    public $props;
    /**
     * @ODM\ReferenceOne(targetDocument=App::class, storeAs="id")
     * @assert\NotBlank
    */
    public $app;
}
