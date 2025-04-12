<?php
namespace App\EventSubscriber;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Book;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
// use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
ini_set('zlib.output_compression','on');

final class BookMailSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
      // dd('here');
      return [
        KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
      ];
    }

    public static function sendMail(ViewEvent $event): void
    {
      // dd('here');
      // $response = $event->getResponse();
      // $response->getContent();
      // $data = $response->getContent();
      // $res = gzencode($data, 1);
      // $response->setContent($res);
      // $response->headers->set('Content-Length', strlen($res));
      // $response->headers->set('Content-Encoding', 'gzip');
    }
}
