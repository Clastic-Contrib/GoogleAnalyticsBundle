<?php

/**
 * This file is part of the Clastic package.
 *
 * (c) Dries De Peuter <dries@nousefreak.be>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Clastic\GoogleAnalyticsBundle\EventListener;

use Clastic\BackofficeBundle\BackofficeEvents;
use Clastic\BackofficeBundle\Event\DashboardEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * DashboardListener.
 *
 * @author Dries De Peuter <dries@nousefreak.be>
 */
class DashboardListener implements EventSubscriberInterface
{
    /**
     * @var \Twig_Environment
     */
    private $twig;

    /**
     * @var string
     */
    private $clientId;

    /**
     * @var string
     */
    private $profileId;

    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return array(
            BackofficeEvents::DASHBOARD => 'addDashboardTab',
        );
    }

    public function __construct($twig, $clientId, $profileId)
    {
        $this->twig = $twig;
        $this->clientId = $clientId;
        $this->profileId = $profileId;
    }

    public function addDashboardTab(DashboardEvent $event)
    {
        if (is_null($this->clientId) || is_null($this->profileId)) {
            return;
        }

        $mainTab = $event->getMainTab();

        $mainTab['google_analytics'] = array(
            'title' => 'Analytics',
            'content' => $this->twig->render('ClasticGoogleAnalyticsBundle:Dashboard:tab.html.twig', array(
//                'clientId' => '285966790326-frjhqf2cft4nf9ao24letbbqiun84498.apps.googleusercontent.com',
//                'propertyId' => '98595806',
                'clientId' => $this->clientId,
                'profileId' => $this->profileId,
            )),
        );

        $event->setMainTab($mainTab);
    }
}
