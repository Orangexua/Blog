// function Person () {
//   this.name = 'apple';
// }

// Person.prototype.friend = 'xiaoqi';

// function From () {
//   this.from = 'china';
// }

// From.prototype = new Person();

// const person_1 = new Person();
// person_1.friend = 'yaya';
// const person_2 = new From ();
// console.log(person_1.friend);
// console.log(person_2.name);

// const name = 'Vivienne';
// console.log('My name is' + (name === 'Vivienne') ? 'Vivienne' : 'Unknow');

// function Book () {
//   this.type = 'English';
// }

// Book.prototype.getType = function () {
//   console.log (this.type);
// }

// const book = new Book ();
// book.getType();
// book.type = 'Math';
// book.valueOf();

// const obj = {};
// const s1 = Symbol('s');
// const s2 = Symbol('s');
// const key1 = { single : 1};
// const key2 = { single : 2};
// obj[s1] = 's1';
// obj[s2] = 's2';
// obj[key1] = 'key1';
// obj[key2] = 'key2';
// console.log(obj[s1]);
// console.log(obj[key1]);
// s1
// key2

const check = (firstName ,lastName) => {
  console.log(firstName);
  console.log(lastName);
  var firstName = 'Chen';
  function firstName() {
    console.log('this is firstName function');
  }
  lastName = () => {console.log('this is lastName function ')};
  console.log(firstName);
  console.log(lastName);
}
check('Zhao','Vivienne');