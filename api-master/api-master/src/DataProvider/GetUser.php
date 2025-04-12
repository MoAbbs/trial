<?php
// api/src/DataProvider/BlogPostCollectionDataProvider.php

namespace App\DataProvider;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Document\Auth\User;
// use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTAuthenticatedEvent;
// use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;
// use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\PreAuthenticationJWTUserToken;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
// use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\PreAuthenticationJWTUserTokenInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Common\Functions\Helpers;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\DocumentManager as MongoDBDocumentManager;
use Doctrine\ORM\Query\Parameter;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTAuthenticatedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Symfony\Component\DependencyInjection\successHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class GetUser extends AbstractController
{
  protected $headers = array('Content-Type', 'application/json');
  public $validator;
  public $dispatcher;
  public $propertyAccessor;
  private $options = [ObjectNormalizer::SKIP_NULL_VALUES=>true, ObjectNormalizer::ENABLE_MAX_DEPTH=>true, AbstractNormalizer::IGNORED_ATTRIBUTES => ['authPassword', 'authIdentifierName', 'key', 'rememberTokenName', 'password', 'authIdentifier']]; 
  public function __construct(
    private MongoDBDocumentManager $dm, 
    private SerializerInterface $serializer, 
    private AuthenticationManagerInterface $authenticationManager,
    private TokenStorageInterface $tokenStorage,
    private JWTTokenManagerInterface $JWTManager
    )
  {
  }
  public function user(Request $request, Security $security){
    // dd($security->getUser());
    // dd('here');
    $user = $security->getUser();
    if($user){
      return new Response($this->serializer->serialize(['user'=>$user], 'json', $this->options), Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
    return new JsonResponse(['msg'=> 'Invalid Token'], Response::HTTP_UNAUTHORIZED);
  }
  public function login(Request $request){
    // dd($security->getUser());
    // $jsonWebToken = $extract->extract($request);
    // $preAuthToken = $this->preAuthenticationTokenStorage->getToken();

    $data = $request->request->all();
    $username = $data['username'];
    $password = $data['password'];

    $model = $this->dm->getRepository(User::class)->findBy(['$or'=> [['login_code'=>$username], ['email'=>$username], ['phone'=>$username]]]);
    if(Count($model)){
      $user = $model[0];
      // dd($user);
      $check = Helpers::CheckPassword($user->password, $password);
      if(!$check){
        return new JsonResponse(['msg'=> 'Invalid Password'], Response::HTTP_UNAUTHORIZED);
      }
      $token = new UsernamePasswordToken($user, ['username'=>$user->getUsername(), 'password'=> $password], 'main');
      $authenticatedToken = $this->authenticationManager->authenticate($token);
      $token = $this->JWTManager->create($user);
      $this->tokenStorage->setToken($authenticatedToken);
      // $this->session->set('_security_main', serialize($token));
      // dd($token);
      return new Response($this->serializer->serialize(['user'=>$user, 'token' => $token], 'json', $this->options), Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }else{
      return new JsonResponse(['msg'=> 'Invalid Username'], Response::HTTP_UNAUTHORIZED);
    }
    // $authenticationSuccessHandler = $this->successHandler->get('lexik_jwt_authentication.handler.authentication_success');
    // $authenticationSuccessHandler->handleAuthenticationSuccess($user, $jwt);
    // return new JsonResponse(['msg'=> 'Invalid Token'], Response::HTTP_UNAUTHORIZED);
  }

}