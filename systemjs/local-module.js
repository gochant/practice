define([
    'jquery'
], function($){
    console.log($);
    System.import('./m1build/main.js').then(function(s){
        System.import('module1/main.js').then(function(l){
            console.log(s);
        })
    })
})