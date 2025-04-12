<?php

namespace App\Document\Apps;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ODM\Document(collection="apps__module")
 */
#[ApiResource(routePrefix: 'apps')]
class Module extends Common
{
    /**
     * @ODM\Field(type="string" )
     * @assert\NotBlank
    */
    public $name;
    /**
     * @ODM\Field(type="string" )
    */
    public $_index;
    /**
     * @ODM\EmbedOne(targetDocument=Embed\Widgets::class)
    */
    public $widgets;
    /**
     * @ODM\EmbedOne(targetDocument=Embed\Body::class)
    */
    public $body;
    /**
     * @ODM\EmbedOne(targetDocument=Embed\Icon::class)
    */
    public $icon;
    /**
     * @ODM\ReferenceOne(targetDocument=Module::class, storeAs="id")
    */
    public $parent;
    /**
     * @ODM\Field(type="string")
    */
    public $url;
    /**
     * @ODM\Field(type="raw")
    */
    public $props;
    /**
     * @ODM\Field(type="bool")
    */
    public $init;
    /**
     * @ODM\Field(type="raw")
    */
    public $action;
    /**
     * @ODM\ReferenceOne(targetDocument=App::class, storeAs="id")
     * @assert\NotBlank
     */
    public $app;
  }
