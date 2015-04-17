GoogleAnalyticsBundle
=====================

Google Analytics Module for [Clastic](https://github.com/Clastic/Clastic).

About
-----

This bundle provides a quick view at your google analytics from the dashboard.

Installation
------------

Installation is a quick:

1. Download using composer
2. Enable the Bundle
3. Set configuration

### Step 1: Download using composer

Add NewsBundle by running the command:

``` bash
$ composer require clastic/google-analytics-bundle "dev-master"
```
### Step 2: Enable the bundle

Enable the bundle in the kernel:

``` php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new Clastic\GoogleAnalyticsBundle\ClasticGoogleAnalyticsBundle(),
    );
}
```

### Step 3: Set configuration

Config:

``` yaml
# app/config/config.yml
clastic_google_analytics:
    client_id: [clientId]
    profile_id: [profileId]
```



Contributing
------------

> All code contributions - including those of people having commit access - must
> go through a pull request and approved by a core developer before being
> merged. This is to ensure proper review of all the code.
>
> Fork the project, create a feature branch, and send us a pull request.
>
> To ensure a consistent code base, you should make sure the code follows
> the [Coding Standards](http://symfony.com/doc/2.0/contributing/code/standards.html)
> which we borrowed from Symfony.
> Make sure to check out [php-cs-fixer](https://github.com/fabpot/PHP-CS-Fixer) as this will help you a lot.

If you would like to help, take a look at the [list of issues](https://github.com/Clastic-Contrib/GoogleAnalyticsBundle/issues).

Author and contributors
-----------------------

Dries De Peuter - <dries@nousefreak.be> - <http://nousefreak.be>

See also the list of [contributors](https://github.com/Clastic-Contrib/GoogleAnalyticsBundle/contributors) who participated in this project.

License
-------

This project is licensed under the MIT license.
