<?php
namespace App\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Guard\JWTTokenAuthenticator as BaseAuthenticator;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Psr\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class CustomAuthenticator extends BaseAuthenticator
{
    // Your own logic
    /**
     * Loads the user to authenticate.
     *
     * @param array                 $payload      The token payload
     * @param string                $identity     The key from which to retrieve the user "identifier"
     */
    protected function loadUser(UserProviderInterface $userProvider, array $payload, $identity)
    {
      // dd($payload);
        // if ($this->userProvider instanceof PayloadAwareUserProviderInterface) {
        //     if (method_exists($this->userProvider, 'loadUserByIdentifierAndPayload')) {
        //         return $this->userProvider->loadUserByIdentifierAndPayload($identity, $payload);
        //     } else {
        //         return $this->userProvider->loadUserByUsernameAndPayload($identity, $payload);
        //     }
        // }

        // if ($this->userProvider instanceof ChainUserProvider) {
        //     foreach ($this->userProvider->getProviders() as $provider) {
        //         try {
        //             if ($provider instanceof PayloadAwareUserProviderInterface) {
        //                 if (method_exists(PayloadAwareUserProviderInterface::class, 'loadUserByIdentifierAndPayload')) {
        //                     return $this->userProvider->loadUserByIdentifierAndPayload($identity, $payload);
        //                 } else {
        //                     return $this->userProvider->loadUserByUsernameAndPayload($identity, $payload);
        //                 }
        //             }

        //             return $provider->loadUserByIdentifier($identity);
        //         // More generic call to catch both UsernameNotFoundException for SF<5.3 and new UserNotFoundException
        //         } catch (AuthenticationException $e) {
        //             // try next one
        //         }
        //     }

        //     if(!class_exists(UserNotFoundException::class)) {
        //         $ex = new UsernameNotFoundException(sprintf('There is no user with username "%s".', $identity));
        //         $ex->setUsername($identity);
        //     } else {
        //         $ex = new UserNotFoundException(sprintf('There is no user with identifier "%s".', $identity));
        //         $ex->setUserIdentifier($identity);
        //     }

        //     throw $ex;
        // }

        // if (method_exists($this->userProvider, 'loadUserByIdentifier')) {
        //     return $this->userProvider->loadUserByIdentifier($identity);
        // } else {
        //     return $this->userProvider->loadUserByUsername($identity);
        // }
    }
}
