<!DOCTYPE html>
<html>
 <!--
 http://es6-features.org/#Constants

 -->
<body>
<p id="demo"></p>
<p id="demo1"></p>
<script>
 /*
Блочная область видимости (block scope)

В текущей версии JavaScript присутствует функциональная область видимости. Это означает, что все переменные, объявленные c помощью ключевого слова var, будут видны в любом месте функции (даже если они объявлены внутри блока):

function f(a) {
   if (a < 0) {
      var i = 3;
   }

  console.log(i); // 3
}

f(-1)


В новой версии появится ключевое слово let, которое позволит объявлять переменные с блочной областью видимости:

function f(a) {
   if (a < 0) {
      let i = 3;
   }

   console.log(i); // ReferenceError: i is not defined
}

f(-1)

 
//Блочная область видимости (block scope)
//
//В текущей версии JavaScript присутствует функциональная область видимости. Это означает, что все переменные, объявленные c помощью ключевого слова var, будут видны в любом месте функции (даже если они объявлены внутри блока):

function f(a) {
   if (a < 0) {
      var i = 3;
   }

  console.log(i); // 3
}

f(-1)


//В новой версии появится ключевое слово let, которое позволит объявлять переменные с блочной областью видимости:

function f(a) {
   if (a < 0) {
      let i = 3;
   }

   console.log(i); // ReferenceError: i is not defined
}

f(-1)

document.getElementById("demo").innerHTML = f(-1);
 */
/* 
//Значения параметров по умолчанию
//
//В функциях добавилась возможность объявлять у параметров значения по умолчанию:

function setLevel(newLevel = 0) {
   ...
}

setLevel(); // newLevel = 0
setLevel(5); // newLevel = 5
setLevel(undefined); // newLevel = 0
*/ 
 
// Именованные параметры функций
//
//В функциях также появилась возможность указывать именованные параметры:
/*
function foo({ from, to = 10 }) {
 
   return [from, to] ;
}

document.getElementById("demo").innerHTML = foo({ from: 1, to: 5 });
foo({ to: 5, from: 1 });
foo({ from: 1 });


//Именованные параметры можно комбинировать с обычным (позиционными параметрами):

function foou(positional, { named1, named2 }) {
   return [positional,named1, named2];
}

document.getElementById("demo1").innerHTML = foou(123, { named1: 'abc', named2: 'def'});
foou(123, { named2: 'def', named1: 'abc' })
*/
 /*
//Destructuring assignment
//
//ECMAScript 6 позволит деструктуризировать при присваивании (шаблон присваивания):

let { first: f, last: l } = { first: 'Jane', last: 'Doe' };
//let { first, last:l} = { first: 'Jane', last: 'Doe' }; 
console.log('a1',f); // 'Jane'
console.log('a2',l); // 'Doe'


//Кстати, в примере из предыдущего пункта (Именованные параметры) вы видели пример деструктуризации параметров функции.
//
//Деструктуризация по умолчанию является refutable (не имею понятия, как это переводить). Т.е. если в объекте-источнике присваивания соответствующего поля нету, то выбрасывается ошибка:

//let { first: f, last: l } = { first: 'Jane' };  // ошибка


//Если же вы не хотите, чтобы ошибка генерировалась, то переменную можно объявить как irrefutable с помощью суффикса ?:

//let { first: f2, last?: l2 } = { first: 'Jane' };  // ok ? don't work
//console.log('a4', l2);  // undefined


//Либо можно дать переменной значение по умолчанию:

let { first: f1, last: l1 = 'Unknown' } = { first: 'Jane' };  // ok
console.log('a3', l1);  // 'Unknown'


//Значение по умолчанию также срабатывает, если соответствующее поле в объекте-источнике является undefined:

let { a: x = 1 } = { a: undefined }
console.log('a5', x);  // 1


//Наконец, если вы хотите, чтобы все переменные были irrefutable, то можно поставить суффикс ? в конце всего шаблона присваивания:

//let { foo: f3 }? = { a: undefined };  // всегда ok, no dasn't work!
//console.log('a6', f3);
//В последнем примере переменная f будет инициализирована значением undefined, если anything будет равно undefined, null или не иметь поля foo.

//С помощью деструктуризации можно одной строчкой кода поменять значение двух переменных (без всяких tmp):
let { foo: foo, bar: bar } = { foo: 'fo', bar: 'ba'};
//{ foo: foo, bar: bar } = { foo: bar, bar: foo};
document.getElementById("demo").innerHTML = [foo,bar];

//Или ище короче:

[ foo, bar ] = [ bar, foo ];
document.getElementById("demo1").innerHTML = [foo,bar];
*/
 /*
// Классы

//В ECMAScript 6 появятся классы:

// Supertype
class Person {
   constructor(name) {
      this.name = name;
   }

   describe() {
      return "Person called " + this.name;
   }
}
let jane1 = new Person("Jane");
let a1 = jane1 instanceof Person; // true
//let b = jane.instanceof Employee; // true
let c1 = jane1.describe(); // 'Person called Jane (CTO)'
document.getElementById("demo").innerHTML = [a1,c1];
// Subtype
class Employee extends Person {
   constructor(name, title) {
      super(name);
      this.title = title;
   }

   describe() {
      return super.describe() + " (" + this.title + ")";
   }
}


////Теперь можно использовать эти классы:
//
let jane = new Employee("Jane", "CTO");
let a = jane instanceof Person; // true
let b = jane instanceof Employee; // true
let c = jane.describe(); // 'Person called Jane (CTO)'
document.getElementById("demo1").innerHTML = [a, b, c];

////Всего того же можно было добиться с помощью прототипов:
//
//// Supertype
//function Person(name) {
//   this.name = name;
//}
//
//Person.prototype.describe = function () {
//   return "Person called " + this.name;
//};
//
//// Subtype
//function Employee(name, title) {
//   Person.call(this, name);
//   this.title = title;
//}
//
//Employee.prototype = Object.create(Person.prototype);
//Employee.prototype.constructor = Employee;
//Employee.prototype.describe = function () {
//   return Person.prototype.describe.call(this) + " (" + this.title + ")";
//};
//
//
////Как видите, классы в ECMAScript 6 — это просто синтаксический сахар над конструкторами и функциями.
////
////Классы могут иметь статические методы(may be usind on class itself, not on instans :
//
class Point {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   
   static zero() {
      return new Point(0, 0);
   }
}
 let d = Point.zero().x
document.getElementById("demo").innerHTML = [d]; 
//

//Приватных полей и методов не будет (по крайней мере, в ECMAScript 6). Однако некоторое сокрытие данных все же появится. Через модули.
 */
 
// Модули
//
//В JavaScript наконец-то появятся модули:
//System = require(System); 
//System.import("lib/math").then(function(m) {
//  alert("2π = " + m.sum(m.pi, m.pi));
//});
// Math  ={
//    export function sum(x, y) {
//      return x + y;
//   }
//
//   export var pi = 3.141593;

   // Не видна снаружи
//   function internal() {
//      ...
//   }
//}
 /*
 //to see app_1.js
 const { sum, pi } = require('./Math')
//import { sum, pi } from "Math" 
//import * as math from "Math";
console.log("2π = " + sum(pi, pi));
let Math1 = require('./Math_1');
console.log('a7', Math1(3,7));
*/
//Импортирование модуля:
import * as math from "Math_2"
console.log("2π = " + math.sum(math.pi, math.pi))
//import Math.{sum, pi}; 
//alert("2π = " + sum(pi, pi));
//
//
////Можно использовать *, чтобы импортировать всё:
//
//import Math.*; 
//alert("2π = " + sum(pi, pi));


//Модули можно вкладывать друг в друга:

//module Widgets {
//   module Button { ... }
//   module Alert { ... }
//   module TextArea { ... }
//   ...
//}
//
//import Widgets.Alert.{messageBox, confirmDialog};
//...
//
//
////Модули можно подгружать из веба или через файловую систему:
//
//module JSON = require('http://json.org/modules/json2.js'); // web
//import JSON.*;
//
//module File = require('io/File'); // file system
//
//import require("bar.js").y; // file system
//

//Все глобальные переменные в модули являются глобальными только в этом модуле.

//Возможны циклические зависимости между модулями.

 
 //console.log('w1',inst);
</script>

</body>
</html>