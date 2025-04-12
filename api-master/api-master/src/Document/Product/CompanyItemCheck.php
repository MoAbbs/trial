<?php

namespace App\Document\Product;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="product__company_item_check")
 */
#[ApiResource(routePrefix: 'companyItemCheck')]
class CompanyItemCheck extends Common
{
        /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Product\Company", storeAs="id")
    */
    public $company;
    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Settings\Schedule", storeAs="id")
    */
    public $schedule;
}
