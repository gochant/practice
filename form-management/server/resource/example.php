<?php

namespace Tyrell;

use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException;
/**
 * This class defines an example resource that is wired into the URI /example
 * @uri /example
 * @uri /example/:id
 */
class ExampleResource extends Resource {

    /**
     * @method GET
     */
    function exampleMethod($id = '') {
        if($id == ''){
            return new Response(Response::OK, 'Example response');
            }else{
            return new Response(Response::OK, $id);
            }
    }

}