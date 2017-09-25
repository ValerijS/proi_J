
let promise = new Promise((resolve1, reject) => {

  setTimeout(() => {
    // переведёт промис в состояние fulfilled с результатом "result"
      console.log(promise,'a2');
     // console.log('b2', resolve("result"),'b2');
    resolve1("result");
      //console.log('b2', resolve("result"),'b2');
  }, 1000);
 setTimeout(() => {
    reject(new Error("время вышло!"));
  }, 1000);
});
//console.log(promise, 'a6');
// promise.then навешивает обработчики на успешный результат или ошибку
promise
  .then(
  
    /*result1 => {
       // console.log(result, resolve, 'a1');
      // первая функция-обработчик - запустится при вызове resolve
      console.log("Fulfilled: " + result1, 'a5' ); // result - аргумент resolve
    }*/null,
   /* error => {
      // вторая функция - запустится при вызове reject
      //console.log("Rejected: " + error); // error - аргумент reject
      console.log("Rejected: " + error.message, 'a4') // Rejected: время вышло!  
    },*/
   setTimeout(()=>{return console.log(promise, 'b1')},1100),
setTimeout(()=>{return console.log(promise, 'b2')},0)
)     
  ;
/*
var promise = new Promise((resolve, reject) => {

  setTimeout(() => {
    reject(new Error("время вышло!"));
  }, 1000);

});

promise
  .then(
    result => console.log("Fulfilled: " + result, 'a3'),
    error => console.log("Rejected: " + error.message, 'a4') // Rejected: время вышло!
  );
  */