<?php
namespace App\Common\Normalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * Entity normalizer
 */
class ModelNormalizer extends ObjectNormalizer
{

    /**
     * @inheritDoc
     */
    public function supportsDenormalization($data, $type, $format = null)
    {
      // dd($type);
      return false;
    }
    public function supportsNormalization($data, $format = null, array $context = [])
    {
      // return false;
      // if(is_string($data) && strpos($data, '\\Document\\') > -2 && strpos($data, '\\Embed\\')==false){
      //   dd($data);
      // }
      return is_string($data) && strpos($data, '\\Document\\') > 0 && ($context['multi'] ?? false);;
    }

    /**
     * @inheritDoc
     */
    public function normalize($data, string $format = null, array $context = [])
    {
      $out = str_replace('App\\Document\\', '', $data);
      $out = preg_replace(
        '/(?<=[a-z])([A-Z]+)/',
        '_$1',
        str_replace('\\', '__', $out)
      );
      return strtolower(str_replace('___', '__', $out));
    }
}