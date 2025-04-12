<?php

namespace App\Document\Settings;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="settings__schedule")
 */
#[ApiResource(routePrefix: 'schedule')]
class Schedule extends Common
{
    /** @ODM\Field(type="string")*/
    public $type;
    /** @ODM\Field(type="string")*/
    public $value;
    /** @ODM\Field(type="string")*/
    public $parent;
}
