var each = function ( arr , callback ) {
  for ( var i = 0 ; i < arr.length ; i ++) {
    callback.call(arr[i] , i, arr[i])
  }
}

// test
// each([1,2,3,4], function ( i , n) {
//   console.log( i , n)
// })

// 比较两个数

var compare = function ( arry1 , arry2) {
  if ( arry1.length !== arry2.length) {
    return 'ary1 和 ary2 不相等' ;
  }
  each( arry1 , function ( i , n) {
    if ( n !== arry2[i]) {
      return  'ary1 和 ary2 不相等' ;
    }
  })
  return 'ary1 和 ary2 相等'
}

console.log( compare([1,2,3,4] , [1,2,3,4]))