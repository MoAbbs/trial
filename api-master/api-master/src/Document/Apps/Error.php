<?php

namespace App\Document\Apps;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ODM\Document(collection="apps__error")
 */
#[ApiResource(routePrefix: 'apps')]
class Error extends Common
{
    /**
     * @ODM\Field(type="string")
     * @assert\NotBlank
     */
    public $type;
    /**
     * @ODM\Field(type="string" )
     * @assert\NotBlank
    */
    public $msg;
    /**
     * @ODM\ReferenceOne(targetDocument=App::class)
     * @assert\NotBlank
    */
    public $app;
}
