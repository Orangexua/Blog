/**************** 计算乘积 *****************/ 
var mult = function(){ 
  var a = 1; 
  for ( var i = 0, l = arguments.length; i < l; i++ ){ 
    a = a * arguments[i]; 
  } 
  return a; 
 }; 
 /**************** 计算加和 *****************/ 
var plus = function(){ 
  var a = 0; 
  for ( var i = 0, l = arguments.length; i < l; i++ ){ 
    a = a + arguments[i]; 
  } 
  return a; 
 };

var creatProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var arg = Array.prototype.join.call(arguments, ',');
    console.log(arguments)
    if ( arg in cache) {
      return cache[arg];
    }
    return cache[arg] = fn.apply(this, arguments);
  }
}

var a = creatProxyFactory(plus);
var b = creatProxyFactory(mult);

console.log( a(1,2,3,4));
console.log( b(1,2,3,4));


