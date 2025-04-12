<?php

namespace App\Document\Product;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="product__company_item_values")
 */
#[ApiResource(routePrefix: 'companyItemValues')]
class CompanyItemValues extends Common
{
        /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Product\Company", storeAs="id")
    */
    public $company;
    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Settings\Items", storeAs="id")
    */
    public $item;
    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Settings\Schedule", storeAs="id")
    */
    public $schedule;

    /** @ODM\Field(type="string")*/
    public $value;

}
