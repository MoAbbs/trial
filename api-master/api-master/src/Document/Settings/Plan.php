<?php

namespace App\Document\Settings;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="settings__plan")
 */
#[ApiResource(routePrefix: 'plan')]
class Plan extends Common
{
    /** @ODM\Field(type="string")*/
    public $name;
    /** @ODM\Field(type="string")*/
    public $price;

}
