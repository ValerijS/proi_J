/*

Promise
Promise (обычно их так и называют «промисы») – предоставляют удобный способ организации асинхронного кода.

В современном JavaScript промисы часто используются в том числе и неявно, при помощи генераторов, но об этом чуть позже.

Что такое Promise?

Promise – это специальный объект, который содержит своё состояние. Вначале pending («ожидание»), затем – одно из: fulfilled («выполнено успешно») или rejected («выполнено с ошибкой»).


На promise можно навешивать коллбэки двух типов:

onFulfilled – срабатывают, когда promise в состоянии «выполнен успешно».
onRejected – срабатывают, когда promise в состоянии «выполнен с ошибкой».
Способ использования, в общих чертах, такой:

Код, которому надо сделать что-то асинхронно, создаёт объект promise и возвращает его.
Внешний код, получив promise, навешивает на него обработчики.
По завершении процесса асинхронный код переводит promise в состояние fulfilled (с результатом) или rejected (с ошибкой). При этом автоматически вызываются соответствующие обработчики во внешнем коде.
Синтаксис создания Promise:

var promise = new Promise(function(resolve, reject) {
  // Эта функция будет вызвана автоматически

  // В ней можно делать любые асинхронные операции,
  // А когда они завершатся — нужно вызвать одно из:
  // resolve(результат) при успешном выполнении
  // reject(ошибка) при ошибке
})
Универсальный метод для навешивания обработчиков:

promise.then(onFulfilled, onRejected)
onFulfilled – функция, которая будет вызвана с результатом при resolve.
onRejected – функция, которая будет вызвана с ошибкой при reject.
С его помощью можно назначить как оба обработчика сразу, так и только один:

// onFulfilled сработает при успешном выполнении
promise.then(onFulfilled)
// onRejected сработает при ошибке
promise.then(null, onRejected)
.catch
Для того, чтобы поставить обработчик только на ошибку, вместо .then(null, onRejected) можно написать .catch(onRejected) – это то же самое.

Синхронный throw – то же самое, что reject
Если в функции промиса происходит синхронный throw (или иная ошибка), то вызывается reject:

 'use strict';

let p = new Promise((resolve, reject) => {
  // то же что reject(new Error("o_O"))
  throw new Error("o_O");
})

p.catch(alert); // Error: o_O
Посмотрим, как это выглядит вместе, на простом примере.

Пример с setTimeout

Возьмём setTimeout в качестве асинхронной операции, которая должна через некоторое время успешно завершиться с результатом «result»:

 'use strict';

// Создаётся объект promise
let promise = new Promise((resolve, reject) => {

  setTimeout(() => {
    // переведёт промис в состояние fulfilled с результатом "result"
    resolve("result");
  }, 1000);

});

// promise.then навешивает обработчики на успешный результат или ошибку
promise
  .then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve
      alert("Fulfilled: " + result); // result - аргумент resolve
    },
    error => {
      // вторая функция - запустится при вызове reject
      alert("Rejected: " + error); // error - аргумент reject
    }
  );
В результате запуска кода выше – через 1 секунду выведется «Fulfilled: result».

А если бы вместо resolve("result") был вызов reject("error"), то вывелось бы «Rejected: error». Впрочем, как правило, если при выполнении возникла проблема, то reject вызывают не со строкой, а с объектом ошибки типа new Error:

// Этот promise завершится с ошибкой через 1 секунду
var promise = new Promise((resolve, reject) => {

  setTimeout(() => {
    reject(new Error("время вышло!"));
  }, 1000);

});

promise
  .then(
    result => alert("Fulfilled: " + result),
    error => alert("Rejected: " + error.message) // Rejected: время вышло!
  );
Конечно, вместо setTimeout внутри функции промиса может быть и запрос к серверу и ожидание ввода пользователя, или другой асинхронный процесс. Главное, чтобы по своему завершению он вызвал resolve или reject, которые передадут результат обработчикам.

Только один аргумент
Функции resolve/reject принимают ровно один аргумент – результат/ошибку.

Именно он передаётся обработчикам в .then, как можно видеть в примерах выше.

Promise после reject/resolve – неизменны

Заметим, что после вызова resolve/reject промис уже не может «передумать».

Когда промис переходит в состояние «выполнен» – с результатом (resolve) или ошибкой (reject) – это навсегда.

Например:


'use strict';

let promise = new Promise((resolve, reject) => {

  // через 1 секунду готов результат: result
  setTimeout(() => resolve("result"), 1000);

  // через 2 секунды — reject с ошибкой, он будет проигнорирован
  setTimeout(() => reject(new Error("ignored")), 2000);

});

promise
  .then(
    result => alert("Fulfilled: " + result), // сработает
    error => alert("Rejected: " + error) // не сработает
  );
В результате вызова этого кода сработает только первый обработчик then, так как после вызова resolve промис уже получил состояние (с результатом), и в дальнейшем его уже ничто не изменит.

Последующие вызовы resolve/reject будут просто проигнорированы.

А так – наоборот, ошибка будет раньше:

 'use strict';

let promise = new Promise((resolve, reject) => {

  // reject вызван раньше, resolve будет проигнорирован
  setTimeout(() => reject(new Error("error")), 1000);

  setTimeout(() => resolve("ignored"), 2000);

});

promise
  .then(
    result => alert("Fulfilled: " + result), // не сработает
    error => alert("Rejected: " + error) // сработает
  );

*/
// Создаётся объект promise
let promise = new Promise((resolve1) => {

  setTimeout(() => {
    // переведёт промис в состояние fulfilled с результатом "result"
    resolve1(promise.par + "result");//return - no
  }, 1000);

});
//add poperty

promise.par = 'my super';
console.log(promise);
// promise.then навешивает обработчики (on object promise with property) на успешный результат или ошибку
promise
  .then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve
      console.log("Fulfilled: " + result); // result - аргумент resolve
    },
    error => {
      // вторая функция - запустится при вызове reject
      console.log("Rejected: " + error); // error - аргумент reject
    }
  );
function promisle_par(par){
return new Promise((resolve1) => {

  setTimeout(() => {
    // переведёт промис в состояние fulfilled с результатом "result"
    resolve1(par + "result");//return - no
  }, 1000);

});
}
//add poperty

//promise.par = 'my super';
console.log(promise);
// promise.then навешивает обработчики (on object promise with property) на успешный результат или ошибку
promisle_par('super_super_')
  .then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve
      console.log("Fulfilled: " + result); // result - аргумент resolve
    },
    error => {
      // вторая функция - запустится при вызове reject
      console.log("Rejected: " + error); // error - аргумент reject
    }
  );