define([
    'jquery',
    './index.html!text',
    './sub'
],function($, tpl){
    $('#test').html(tpl);

    return {
        a: 1
    }
})