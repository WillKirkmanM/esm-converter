// GENERATED FROM https://github.com/WillKirkmanM/esm-converter

// SOURCE: https://lebab.github.io/

'use strict';
import _ from 'lodash';

// Let/const
let names = ['John', 'Doe'], time = 'yesterday';
time = 'today';

// Template string
console.log(`Hello ${name}, how are you ${time}?`);

let john = {
  // Object shorthand
  names,
  // Object method
  sayMyName() {
    // Arrow functions
    return this.names.map((n) => n.toUpperCase()).join(' ');
  }
};

// Classes
class Greeter {
  constructor(p) {
    this.person = p;
  }
// default parameters
  greet(punct = "!") {

  
  console.log(this.person.sayMyName() + punct);
  }
}

export {Greeter};