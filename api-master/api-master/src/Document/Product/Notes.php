<?php

namespace App\Document\Product;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ODM\Document(collection="product__notes")
 */
#[ApiResource(routePrefix: 'notes')]
class Notes extends Common
{
        /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Product\Company", storeAs="id")
    */
    public $company;
    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Auth\User", storeAs="id")
    */
    public $user;

    /** @ODM\Field(type="string")*/
    public $model;

    /** @ODM\Field(type="string")*/
    public $note;

}
