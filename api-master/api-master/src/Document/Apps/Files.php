<?php

namespace App\Document\Apps;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ODM\Document(collection="apps__files")
 */
#[ApiResource(routePrefix: 'apps')]
class Files extends Common
{
    /**
     * @ODM\Field(type="string")
     * @assert\NotBlank
    */
    public $type;

    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Auth\User", storeAs="id")
    */
    public $user;
    /**
     * @ODM\ReferenceOne(targetDocument=App::class, storeAs="id")
     * @assert\NotBlank
     */
    public $app;
}
