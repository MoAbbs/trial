<?php

namespace App\Document\Files;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\Document(collection="files__folder")
 */
#[ApiResource(routePrefix: 'files')]
class Folder extends Common
{
    /**
     * @ODM\Field(type="string")
     */
    public $name;

    /**
     * @ODM\ReferenceOne(targetDocument=Folder::class)
     */
    public $parent;
    /**
     * @ODM\ReferenceOne(targetDocument=App\Document\Auth\User::class)
     */
    public $user;
    /**
     * @ODM\Field(type="hash")
     */
    public $perms;
}
