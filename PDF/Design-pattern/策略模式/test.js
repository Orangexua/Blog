// var performanceS = function () {}
// performanceS.prototype.calculate = function ( salary ) {
//   return salary * 4;
// }

// var performanceA = function () {}
// performanceA.prototype.calculate = function ( salary ) {
//   return salary * 3;
// }

// var performanceB = function () {}
// performanceB.prototype.calculate = function ( salary ) {
//   return salary * 2;
// }

// var Bonus = function () {
//   this.salary = null;
//   this.strategy = null;
// }

// Bonus.prototype.setSalary = function ( salary ) {
//   this.salary = salary;
// }

// Bonus.prototype.setStrategy = function ( strategy ) {
//   this.strategy = strategy;
// }
// Bonus.prototype.getBonus = function () {
//   return this.strategy.calculate.call( null ,this.salary);
// }

// var bonus = new Bonus()
// bonus.setSalary(1000);
// bonus.setStrategy( new performanceS());

// console.log(bonus.getBonus());

var startegies = {
  "S" : function (salary) {
    return salary * 4;
  },
  "A" : function (salary) {
    return salary * 3;
  },
  "B" : function (salary) {
    return salary * 2;
  }
}

var calculateBonus = function ( level , salary ) {
  return startegies[level](salary);
}

console.log( calculateBonus( "S" , 4000));