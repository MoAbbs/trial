<?php

namespace App\Document\Files;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
/**
 * @ODM\Document(collection="files__file")
 */
#[ApiResource(routePrefix: 'files')]
class File extends Common
{
    /**
    * @ODM\Field(type="string")
    */
    public $path;
    /**
     * @ODM\Field(type="string")
     */
    public $type;
    
    /**
     * @ODM\Field(type="string")
     */
    public $key = "upload";

    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Auth\User")
     */
    public $user;
    /**
     * @ODM\ReferenceOne(targetDocument=Folder::class)
     */
    public $folder;
    /**
     * @ODM\Field(type="hash")
     */
    public $perms;
}
