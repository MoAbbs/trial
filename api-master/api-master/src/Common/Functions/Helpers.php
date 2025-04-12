<?php
namespace App\Common\Functions;

use App\Common\Functions\Filters\Helper;
use Webpatser\Uuid\Uuid;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;

class Helpers{
  static public $apps;
  // static public function getmoduels($moduel)
  // {
  //     $data = self::$apps;
  //     return $data[$moduel] ?? [];
  // }
  public static function UploadFile(uploadedFile $file, &$value, $project) {
    // dd('fix');
    // dd($value);
    $key = $value->key ?? null;
    $id = $value->id ?? null;
    $user = $value->user ?? null; 
    $filename = join('-', [md5(uniqid()), $file->getClientOriginalName()]);
    // $path = join(DIRECTORY_SEPARATOR, [$user, $key]);
    // dd($path);
    // $comp = Storage::disk('local')->put(
    //   join(DIRECTORY_SEPARATOR, ),
    //   $uploadedFile
    // );
    $f_path = join(DIRECTORY_SEPARATOR, array_filter([$project, 'storage', 'uploads', $user, $key, $id], fn($x)=>((bool)$x)));
    // dd($f_path, $filename);
    $out = $file->move($f_path, $filename);
    // $f_type = \GuzzleHttp\Psr7\mimetype_from_extension($o_path['extension']);
    // dd($f_type);
    // dd($uploadedFile->getMimeType());
    // dd($file);
    return $out->getPathname();
  }
  static public function CircularHandler($object){
    return $object->getId();
  }
  static public function getErrors($errors)
  {
    // dd($errors);
    $ms = [];
    foreach ($errors as $key => $error) {
      # code...
      $ms[$error->getPropertyPath()] = $error->getMessage();
    }
    return $ms;
  }
  static public function getmoduels($module)
  {
    $md = self::DashesToCamelCase($module);
    // dd($md);
    $class = str_replace("\\\\", "\\", "App\Document\\".$md);
    if(class_exists($class)){
      // dd($class);
      return $class;
    }
    return null;
  }
  static public function getFun($model, $name){
    $funs = str_replace("Document", "Functions\\{$name}", $model);
    $arr = explode('\\', $funs);
    $fun = array_pop($arr);
    $class = join("\\", $arr);
    // dd($funs, $arr, $fun, $class);
    // dd($class);
    if(class_exists($class)){
      if(method_exists($class, $fun)){
        $reflection = new \ReflectionClass($class);
        $function = $reflection->getMethod($fun);
        // dd($function->invoke((object)[]));
        return $function;
      }
    }
    return null;
  }
  static public function genId(){
    return Uuid::generate(4)->string;
  }
  static public function HashPassword($val){
    $factory = new PasswordHasherFactory([
      'common' => ['algorithm' => 'bcrypt'],
      'memory-hard' => ['algorithm' => 'sodium'],
    ]);
    $passwordHasher = $factory->getPasswordHasher('common');

    // Hash a plain password
    $hash = $passwordHasher->hash($val); // returns a bcrypt hash
    return $hash;
  }
  static public function CheckPassword($val, $password){
    $factory = new PasswordHasherFactory([
      'common' => ['algorithm' => 'bcrypt'],
      'memory-hard' => ['algorithm' => 'sodium'],
    ]);
    $passwordHasher = $factory->getPasswordHasher('common');

    // Hash a plain password
    return $passwordHasher->verify($val, $password); // returns a bcrypt hash
    // return $hash;
  }
  static public function sendToUser($users, $data){
    $url = env('SOKCET_SERVER', 'http://localhost:3333');
    $client = new \GuzzleHttp\Client(['headers' => [ 'Content-Type' => 'application/json' ], 'verify' => false]); 
    $results = $client->request("post", "$url/notify", ['json'=>["users"=>$users, "data"=>$data]]);
    // $results = \GuzzleHttp\Promise\unwrap($promises);
    // dd($results, "$url/notify");
  }
  static public function SendNotification($em, $serializer, $msg, $user, $from, $post= null, $type="News", $url='/timeline'){
    $model = 'Modules\Social\Entities\notification';
    $q = $em->createQuery('UPDATE Modules\Auth\Entities\user f SET f.n_notify = f.n_notify + 1 where f.id = :id')->setParameters(["id"=>$user]);
    $q->execute();
    $value = $serializer->deserialize(json_encode(["content"=>$msg,"_to"=>$url, 'user'=>$user->id, 'post'=>$post, 'type'=>$type, '_from'=>$from->id]), $model);
    // dd(json_encode(["content"=>$msg,"_to"=>$url, 'user'=>$user, 'type'=>$type]));
    $em->persist($value);
    $em->flush();
    $out = clone $value;
    helpers::sendToUser([$user->id], json_decode($serializer->serialize(["social__notification"=>[$out], "auth__user"=>[clone $out->user]])));
    // dd($value->user);
  }
  static public function AddArray($em, $serializer, $model, $arr){
    $values = $serializer->deserialize(json_encode($arr), $model.'[]');
    // dd(json_encode(["content"=>$msg,"_to"=>$url, 'user'=>$user, 'type'=>$type]));
    // dd($values);
    $ids = [];
    foreach ($values as $key => $value) {
      # code...
      $em->persist($value);
      $em->flush();
      $ids[$key] = $value->getId();
    }
    return $em->getRepository($model)->findById($ids);
    // dd($value->user);
  }
  static public function GetByIds($model, $em, $data, $col, $key='id'){
    // print_r($model);
    // print_r(self::getmoduels($model));
    $entity = self::getmoduels($model)['model'];
    $ids = $col ? array_column($data, $col):$data;
    // dd($ids);
    $qb = $em->createQueryBuilder();
    $qb->select('m');
    $qb->from($entity, 'm');
    $qb->where($qb->expr()->in("m.$key", '?1'));
    return $qb->setParameters(array('1'=> $ids))->getQuery()->getResult();
  }
  static public function translate($data){
    $url = env('TRANSLATING', 'http://localhost:3333');
    $client = new \GuzzleHttp\Client(['headers' => [ 'Content-Type' => 'application/json' ], 'verify' => false]); 
    $res = $client->request("post", "$url/translate", ['json'=>$data]);
    // echo($res->getBody());
    return Helper::applyFilters(
      ["key"=>"regexReplace", "regex"=>'/&\w+;/', "val"=>'&'],
      json_decode($res->getBody())->translatedText
    );
  }
  static public function bingTranslate($_to, $data){
    $url = env('BING_URL', 'https://www.bing.com/translator/');
    $arr = is_array($data) ? $data:[$data];
    $text = join(" .___. ", $arr);
    $client = new \GuzzleHttp\Client(['verify' => false]); 
    $n = http_build_query(['from'=> 'auto', 'to'=>$_to, "text"=>$text]);
    // dd($n);
    $page = file_get_contents($url.'?'.$n, 'r');
    // $d = $res->getBody(true)->getContents();
    echo $page;
    // dd('here');
    return Helper::applyFilters(
      ["key"=>"regexReplace", "regex"=>'/&\w+;/', "val"=>'&'],
      json_decode($res->getBody())->translatedText
    );
  }
  static public function arrayMerge(&$out, $data, $key){
    $out[$key] = $out[$key] ?? [];
    $out[$key] = array_merge($out[$key], $data);
  }
  static function DashesToCamelCase($string, $separator='__', $capitalizeFirstCharacter = true, $added_sp="\\") 
  {
    $str = str_replace($separator, $added_sp, ucwords($string, $separator));
    $str = str_replace('_', '', ucwords($str, '_'));
    // dd($str);
    if (!$capitalizeFirstCharacter) {
        $str[0] = strtolower($str[0]);
    }

    return $str;
  }
}
