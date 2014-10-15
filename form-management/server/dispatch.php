<?php

if (@include(__DIR__.'/./vendor/autoload.php')) { // use Tonic autoloader
    #new Tonic\Autoloader('myNamespace'); // add another namespace
} else { // use Composer autoloader
    die('Could not find autoloader');
}

$app = new Tonic\Application(array(
   'load' => array(
        __DIR__.'/resource/*.php'
    )
));
$request = new Tonic\Request();

$resource = $app->getResource($request);
$response = $resource->exec();
$response->output();