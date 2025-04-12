<?php

namespace App\Document\Auth;
use App\Common\Document\Common;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ODM\Document(collection="auth__admin")
 */
#[ApiResource(routePrefix: 'auth')]
class Admin extends Common
{
    public function getUserIdentifier()
    {
      return $this->id;
    }
    /**
     * @var string
     * @ODM\Field(type="string")
     * @ODM\Index(unique=true, order="asc")
     * @Assert\Email
     * @Assert\NotBlank
     */
    public $email;
    /**
     * @var string
     * @ODM\Field(type="string")
     * @Assert\NotBlank
     */
    public $password;
    /**
     * @var string
     * @ODM\Field(type="string")
     * @ODM\Index(unique=true, order="asc")
     */
    public $r_code;
    /**
     * @var object
     * @ODM\Field(type="string")
     */
    public $name;
    /**
     * @ODM\Field(type="date")
     */
    public $last_login;
}