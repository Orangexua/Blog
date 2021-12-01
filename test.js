var test = ['chen','zi','xu','ai','xuan','nan'];

var a = ()=> {
    return test.map( v => ({...v}));
}
console.log(a());