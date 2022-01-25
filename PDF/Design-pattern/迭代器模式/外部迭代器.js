var Iterator = function( obj ){ 
  var current = 0; 
  var next = function(){ 
  current += 1; 
  }; 
  var isDone = function(){ 
  return current >= obj.length; 
  }; 
  var getCurrItem = function(){ 
  return obj[ current ]; 
  }; 
  return { 
  next: next, 
  isDone: isDone, 
  getCurrItem: getCurrItem 
  } 
 }; 

var compare = function( iterator1, iterator2 ){ 
  while( !iterator1.isDone() && !iterator2.isDone() ){ 
    if ( iterator1.getCurrItem() !== iterator2.getCurrItem() ){ 
      return ( 'iterator1 和 iterator2 不相等' ); 
    } 
    iterator1.next(); 
    iterator2.next(); 
  } 
  return ( 'iterator1 和 iterator2 相等' ); 
} 
var iterator1 = Iterator( [ 1, 2, 3 ] ); 
var iterator2 = Iterator( [ 1, 2, 3 ] ); 
console.log(compare( iterator1, iterator2 )); // 输出：iterator1 和 iterator2 相等 

// 外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。内部迭代
// 器和外部迭代器在实际生产中没有优劣之分，究竟使用哪个要根据需求场景而定。

// 在一些没有闭包的语言中，内部迭代器本身的实现也相当复杂。比如 C 语言中的内部迭代器
// 是用函数指针来实现的，循环处理所需要的数据都要以参数的形式明确地从外面传递进去