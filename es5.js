// SOURCE: https://lebab.github.io/

'use strict';
var _ = require('lodash');

// Let/const
var names = ['John', 'Doe'], time = 'yesterday';
time = 'today';

// Template string
console.log('Hello ' + name + ', how are you ' + time + '?');

var john = {
  // Object shorthand
  names: names,
  // Object method
  sayMyName: function () {
    // Arrow functions
    return this.names.map(function(n) { return n.toUpperCase(); }).join(' ');
  }
};

// Classes
function Greeter(p) {
  this.person = p;
};
// default parameters
Greeter.prototype.greet = function(punct) {
  punct = punct || "!";
  console.log(this.person.sayMyName() + punct);
};

exports.Greeter = Greeter;