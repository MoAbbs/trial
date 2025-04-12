<?php

namespace App\Common\Document;
use Common\Functions\helpers;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
// use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\SerializedName;


/** 
 * @ODM\MappedSuperclass()
 * @ODM\HasLifecycleCallbacks()
 * */
class Identity
{
    /**
     * @ODM\Id(strategy="UUID")
     * 
     */
    public $id;
    
    // /** @ODM\PrePersist */
    // public function doStuffOnPrePersist() { if(!$this->id) { $this->id = helpers::genId(); } }
    

    public function getId() { return $this->id ?? $this->id; }
 
    //  /**
    //   * returns name of the class inwhich it is called
    //   */
    //   public function getType() { 
    //     $fullClassName = get_called_class(); // or static::class; 
    //     $arr = explode("\\", $fullClassName);
    //     return end($arr);
    //   }
  
}
