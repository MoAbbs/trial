<?php

namespace App\Document\Apps;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ODM\Document(collection="apps__sheets")
 */
#[ApiResource(routePrefix: 'apps')]
class Sheets extends Common
{
    /**
     * @ODM\Field(type="string")
    */
    public $type;
    /**
     * @ODM\Field(type="string")
    */
    public $name;
    /**
     * @ODM\Field(type="string")
    */
    public $ident;
    /**
     * @ODM\Field(type="string")
    */
    public $model;
    /**
     * @ODM\Field(type="raw" )
    */
    public $links;
    /**
     * @ODM\ReferenceOne(targetDocument=Files::class, storeAs="id")
    */
    public $file;
    /**
     * @ODM\ReferenceOne(targetDocument=App::class, storeAs="id")
     * @assert\NotBlank
     */
    public $app;
}
