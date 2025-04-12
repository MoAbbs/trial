<?php

namespace App\Document\Settings;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="settings__city")
 */
#[ApiResource(routePrefix: 'city')]
class City extends Common
{
    /** @ODM\Field(type="string")*/
    public $name;
}
