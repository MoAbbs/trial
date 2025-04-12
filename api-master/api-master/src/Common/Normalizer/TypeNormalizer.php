<?php
namespace App\Common\Normalizer;

use Exception;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

/**
 * Entity normalizer
 */
class TypeNormalizer extends AbstractNormalizer
{
    public function supportsDenormalization($data, string $type, ?string $format = null)
    {
      return false;
    }
    public function supportsNormalization($data, $format = null, array $context = [])
    {
      // return false;
      // if(!is_string($data['type'] ?? '')){
      //   dd($data);
      // }
      return is_array($data) && is_string($data['type'] ?? '') && strpos($data['type'] ?? '', 'one') > -1 && ($context['multi'] ?? false);
    }

    /**
     * @inheritDoc
     */
    public function normalize($data, string $format = null, array $context = []): array
    {
      // dd($this);
      $data['type'] = 'select';
      if($data['embedded']??false){
        $data['type'] = 'design.object';
      }
      return $this->serializer->normalize($data, $format, $context);
    }
    public function denormalize($data, string $type, ?string $format = null, array $context = [])
    {
      return false;
    }
}