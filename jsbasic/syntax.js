/**
 * ---------------------
 * Function
 */

// 立即调用函数表达式 (IIFE) (Immediately-Invoked Function Expression)
(function () {

})()

// 函数声明
function F1() {

}

// 匿名函数表达式
var f1 = function () {

}

// 命名函数表达式
var f2 = function f() {

}

// 箭头函数

var f3 = (x) => x * x

var f4 = (x, y) => {
    return x + y + 1
}

/**
 * --------------------------
 * Object/Class
 */

// 构造函数
function Person1(name){
    this.name = name
}

Person1.prototype.say = function(msg){
    return this.name + ': ' + msg
}

const p1 = new Person1('p1')
p1.say()


// 类
class Person2 {
    constructor (name){
        this.name = name
    }

}