<?php
// api/src/Document/Product.php

namespace App\Document\Settings;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ODM\Document(collection="settings__offer")
 */
#[ApiResource(routePrefix: 'offer')]
class Offer extends Common
{
    /**
     * @ODM\Field
     * @Assert\NotBlank
     */
    public $name;
    
}