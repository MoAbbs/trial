<?php
namespace App\Common\Normalizer;

use Doctrine\ODM\MongoDB\DocumentManager;
use Exception;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactoryInterface;
use Symfony\Component\Serializer\NameConverter\NameConverterInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\PropertyInfo\PropertyTypeExtractorInterface;
use Symfony\Component\Serializer\Mapping\ClassDiscriminatorResolverInterface;

/**
 * Entity normalizer
 */
class EntityNormalizer extends ObjectNormalizer
{

    /**
     * Entity normalizer
     * @param DocumentManager $em
     * @param ClassMetadataFactoryInterface|null $classMetadataFactory
     * @param NameConverterInterface|null $nameConverter
     * @param PropertyAccessorInterface|null $propertyAccessor
     * @param PropertyTypeExtractorInterface|null $propertyTypeExtractor
     */
    public function __construct(protected DocumentManager $dm,
    ClassMetadataFactoryInterface $classMetadataFactory = null,
    NameConverterInterface $nameConverter = null,
    PropertyAccessorInterface $propertyAccessor = null,
    PropertyTypeExtractorInterface $propertyTypeExtractor = null,
    ClassDiscriminatorResolverInterface $classDiscriminatorResolver = null,
    callable $objectClassResolver = null,
    array $defaultContext = [])
    {
        parent::__construct($classMetadataFactory, $nameConverter, $propertyAccessor, $propertyTypeExtractor, $classDiscriminatorResolver, $objectClassResolver, $defaultContext);
        // Entity manager
    }

    /**
     * @inheritDoc
     */
    public function supportsDenormalization($data, $type, $format = null, array $context = [])
    {
      return false;
      return (strpos($type, '\\Document\\') > 0) && (is_string($data)) && ($context['multi'] ?? false);
    }
    public function supportsNormalization($data, $format = null, array $context = [])
    {
      // return false;
      // dd($context);
      return is_object($data) && ($context['multi'] ?? false);
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, $class, $format = null, array $context = [])
    {
      // dd($class, $data);
      // $this->dm->flush();
      // $this->dm->clear();
      // $doc = $this->dm->find($class, $data);
      // $class = get_class($doc);
      // dd($class);
      return $this->dm->find($class, $data);
    }
    public function normalize($data, string $format = null, array $context = [])
    {
      // print_r($class);
      // $d = parent::normalize($data, $format, $context);
      // dd($data);
      // $class = get_class($data);
      if(is_string($data) && strpos($data, '\\Document\\') > 0){
        $out =str_replace('App\\Document\\', '', $data);
        $out =str_replace('\\', '__', $out);
        return $out;
      }
      foreach ($data as $key => $value) {
        // print_r($value);
        try{
          if(is_object($value) && method_exists($value, 'getId')){
            // print_r($value->getId());
            $data->{$key} = $value->getId();
          }else{

          }
        }catch(Exception $e){
          // dd($value);
        }
      }
      return parent::normalize($data, $format, $context);
    }
}
