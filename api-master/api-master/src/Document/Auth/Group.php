<?php

namespace App\Document\Auth;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="auth__group")
 */
#[ApiResource(routePrefix: 'auth')]
class Group extends Common
{
    /** @ODM\Field(type="string")*/
    public $name;
}
