<?php

namespace App\Document\Auth;
// use App\Document\Auth\Embed;
use App\Common\Document\Common;
use App\Common\Functions\Helpers;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Annotation\Ignore;

/**
 * @ODM\Document(collection="auth__user")
 */
#[ApiResource(routePrefix: 'auth')]
class User extends Common implements UserInterface
{
    public function getUserIdentifier()
    {
      return $this->id;
    }
    /**
     * @var string
     * @ODM\Field(type="string")
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
     */
    public $r_code;
    /**
     * @ODM\Field(type="string")
     */
    public $phone;
    /**
     * @var object
     * @ODM\Field(type="string")
     */
    public $first_name;
        /**
     * @var object
     * @ODM\Field(type="string")
     */
    public $last_name;

    /**
     * @ODM\Field(type="bool")
     */
    public $gender = 0;
    /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Files\File")
    */
    public $profile;
        /**
     * @ODM\ReferenceOne(targetDocument="App\Document\Settings\Plan")
    */
    public $plan;
        /**
     * @ODM\ReferenceOne(targetDocument=Group::class)
    */
    public $group;
    /**
     * @ODM\Field(type="date")
     */
    public $last_login;
    /**
     * @ODM\Field(type="string")
     */
    public $status=1;
    /**
     * @var array
     *
     * @ODM\Field(type="raw")
     */
    public $perms;
    protected $roles = [];
    public function getSalt()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return null;
    }
    public function getUsername()
    {
      return $this->id;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getRoles()
    {
        return $this->perms ?? [];
    }

    public function eraseCredentials()
    {
    }
    public function setPassword($value)
    {
      // if($value)
      if(!$value){
        return;
      }
      if(strpos($value, '$2y$')===false){
        $this->password = Helpers::HashPassword($value);
      }else{
        $this->password = $value;
      }
    }

}