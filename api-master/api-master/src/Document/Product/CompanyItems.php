<?php

namespace App\Document\Product;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="Product__company_items")
 */
#[ApiResource(routePrefix: 'companyItems')]
class CompanyItems extends Common
{
    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Settings\Items", storeAs="id")
    */
    public $item;
    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Product\Company", storeAs="id")
    */
    public $company;
    /**
     * @ODM\Field(type="integer")
    */
    public $order=0;
    
    /** @ODM\Field(type="string")*/
    public $nickName;
}






