<?php

namespace App\Document\Product;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="Product__company")
 */
#[ApiResource(routePrefix: 'company')]
class Company extends Common
{
    /** @ODM\Field(type="string")*/
    public $name;

    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Files\File")
    */
    public $profile;


    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Auth\User", storeAs="id")
    */
    public $user;

    /** @ODM\Field(type="string")*/
    public $registry_number;
    /** @ODM\Field(type="string")*/
    public $industries;
    /** @ODM\Field(type="string")*/
    public $financial_end; 
    /** @ODM\Field(type="string")*/
    public $currency; 
    /** @ODM\Field(type="string")*/
    public $tax_rate; 

    /** @ODM\Field(type="string")*/
    public $start_date;

    /** @ODM\Field(type="string")*/
    public $country;

    /** @ODM\Field(type="string")*/
    public $city;
}
