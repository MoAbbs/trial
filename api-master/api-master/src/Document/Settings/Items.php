<?php

namespace App\Document\Settings;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="settings__items")
 */
#[ApiResource(routePrefix: 'Items')]
class Items extends Common
{
    /** @ODM\Field(type="string")*/
    public $type;
    /** @ODM\Field(type="string")*/
    public $name;
    /** @ODM\Field(type="string")*/
    public $info;
    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Settings\ItemCategory", storeAs="id")
    */
    public $category;
        /**
     * @ODM\Field(type="integer")
     */
    public $order=0;
    /**
     * @ODM\Field(type="integer")
     */
    public $neg=0;
    /**
     * @ODM\Field(type="bool")
    */
    public $calculated = false;
    /**
     * @ODM\Field(type="bool")
    */
    public $check = false;
    /** @ODM\Field(type="string")*/
    public $exp;
    /** @ODM\Field(type="string")*/
    public $incs;
    /** @ODM\Field(type="string")*/
    public $cs;
    /** @ODM\Field(type="string")*/
    public $pob;
    /** @ODM\Field(type="string")*/
    public $poh;
    /** @ODM\Field(type="string")*/
    public $boh;
    /** @ODM\Field(type="string")*/
    public $grate;

}

