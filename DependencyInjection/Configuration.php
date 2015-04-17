<?php

namespace Clastic\GoogleAnalyticsBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('clastic_google_analytics');

        $rootNode
            ->children()
                ->scalarNode('client_id')
                    ->defaultNull()
                ->end()
                ->scalarNode('profile_id')
                    ->defaultNull()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
