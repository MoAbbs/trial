<?php

namespace App\Common\Document;

use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** 
 * @ODM\MappedSuperclass
 * @Gedmo\SoftDeleteable(fieldName="deleted_at", timeAware=true)
 * */
// #[ApiResource]
class Common extends Identity
{
    /**
     * @Gedmo\Timestampable(on="create")
     * @ODM\Field(type="date")
     */
    public $created_at;

    /**
     * @var \DateTime $updated
     *
     * @Gedmo\Timestampable(on="update")
     * @ODM\Field(type="date")
     */
    public $updated_at;

    /**
    * @ODM\Field(name="deleted_at", type="date")
    */
    public $deleted_at;

    public function __get($field_name)
    {
      return $this->$field_name;
    }

    public function __set($key, $value)
    {
      $this->$key = $value;
    }
    // public function getDeleted(){
    //   if(property_exists($this, 'deleted_at')){
    //     return (bool) $this->deleted_at != null;
    //   }
    //   return false;
    // }
    public function setDeleted(bool $x){
      if($x == true){
        $this->deleted_at = new \DateTime();
      }else{
        $this->deleted_at = null;
      }
    }
    public function getDeleted(){
      if($this->deleted_at ?? false){
        return true;
      }
      return false;
    }
    public function __toString() {
      return $this->id;
    }
}
