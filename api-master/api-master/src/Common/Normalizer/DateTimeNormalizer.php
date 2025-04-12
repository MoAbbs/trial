<?php
namespace App\Common\Normalizer;

use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer as APIPlatformDateTimeNormalizer;

class DateTimeNormalizer extends APIPlatformDateTimeNormalizer
{
    public function denormalize($data, $type, $format = null, array $context = [])
    {
        if (null === $data) {
            return null;
        }
        return parent::denormalize($data, $type, $format, $context);
    }
    public function supportsNormalization($data, $format = null, array $context = [])
    {
      // return false;
      if(is_object($data) && method_exists($data, 'toDateTime')){
        return true;
      }
      return parent::supportsNormalization($data, $format, $context);
    }
    public function normalize($object, ?string $format = null, array $context = [])
    {
     if(method_exists($object, 'toDateTime')){
      $object = $object->toDateTime();
     }
     return parent::normalize($object, $format, $context);
    }
}