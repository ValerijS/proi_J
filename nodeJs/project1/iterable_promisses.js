/*
Параллельное выполнение

Что, если мы хотим осуществить несколько асинхронных процессов одновременно и обработать их результат?

В классе Promise есть следующие статические методы.

Promise.all(iterable)

Вызов Promise.all(iterable) получает массив (или другой итерируемый объект) промисов и возвращает промис, который ждёт, пока все переданные промисы завершатся, и переходит в состояние «выполнено» с массивом их результатов.

Например:

 Promise.all([
  httpGet('/article/promise/user.json'),
  httpGet('/article/promise/guest.json')
]).then(results => {
  alert(results);
});
Допустим, у нас есть массив с URL.

let urls = [
  '/article/promise/user.json',
  '/article/promise/guest.json'
];
Чтобы загрузить их параллельно, нужно:

Создать для каждого URL соответствующий промис.
Обернуть массив таких промисов в Promise.all.
Получится так:

'use strict';

let urls = [
  '/article/promise/user.json',
  '/article/promise/guest.json'
];

Promise.all( urls.map(httpGet) )
  .then(results => {
    alert(results);
  });
Заметим, что если какой-то из промисов завершился с ошибкой, то результатом Promise.all будет эта ошибка. При этом остальные промисы игнорируются.

Например:

 Promise.all([
  httpGet('/article/promise/user.json'),
  httpGet('/article/promise/guest.json'),
  httpGet('/article/promise/no-such-page.json') // (нет такой страницы)
]).then(
  result => alert("не сработает"),
  error => alert("Ошибка: " + error.message) // Ошибка: Not Found
)
Promise.race(iterable)

Вызов Promise.race, как и Promise.all, получает итерируемый объект с промисами, которые нужно выполнить, и возвращает новый промис.

Но, в отличие от Promise.all, результатом будет только первый успешно выполнившийся промис из списка. Остальные игнорируются.

Например:

 Promise.race([
  httpGet('/article/promise/user.json'),
  httpGet('/article/promise/guest.json')
]).then(firstResult => {
  firstResult = JSON.parse(firstResult);
  alert( firstResult.name ); // iliakan или guest, смотря что загрузится раньше
});
Promise.resolve(value)

Вызов Promise.resolve(value) создаёт успешно выполнившийся промис с результатом value.

Он аналогичен конструкции:

new Promise((resolve) => resolve(value))
Promise.resolve используют, когда хотят построить асинхронную цепочку, и начальный результат уже есть.

Например:

 Promise.resolve(window.location) // начать с этого значения
  .then(httpGet) // вызвать для него httpGet
  .then(alert) // и вывести результат
Promise.reject(error)

Аналогично Promise.resolve(value) создаёт уже выполнившийся промис, но не с успешным результатом, а с ошибкой error.

Например:

 Promise.reject(new Error("..."))
  .catch(alert) // Error: ...
Метод Promise.reject используется очень редко, гораздо реже чем resolve, потому что ошибка возникает обычно не в начале цепочки, а в процессе её выполнения.

Итого

Промис – это специальный объект, который хранит своё состояние, текущий результат (если есть) и коллбэки.
При создании new Promise((resolve, reject) => ...) автоматически запускается функция-аргумент, которая должна вызвать resolve(result) при успешном выполнении и reject(error) – при ошибке.
Аргумент resolve/reject (только первый, остальные игнорируются) передаётся обработчикам на этом промисе.
Обработчики назначаются вызовом .then/catch.
Для передачи результата от одного обработчика к другому используется чейнинг.
У промисов есть некоторые ограничения. В частности, стандарт не предусматривает какой-то метод для «отмены» промиса, хотя в ряде ситуаций (http-запросы) это было бы довольно удобно. Возможно, он появится в следующей версии стандарта JavaScript.

В современной JavaScript-разработке сложные цепочки с промисами используются редко, так как они куда проще описываются при помощи генераторов с библиотекой co, которые рассмотрены в соответствующей главе. Можно сказать, что промисы лежат в основе более продвинутых способов асинхронной разработки.
*/
var faker = require('faker');

//var randomName = faker.name.findName(); // Rowan Nikolaus
//var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
//var randomCard = faker.helpers.createCard(); // random contact card containing many 
//console.log(randomEmail);
//console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
//console.log(faker.fake(" {{name.firstName}}"));
//console.log(faker.fake(" {{random.number}}") % 13);//parseInt
const {sequelize, School, Pupil} = require('C:/nodeJs/School_Rating/myapp/public/javascripts/db');

sequelize.sync({force:true})
.then(() => {
    const promises = [];
    for (let i = 0; i<10; i++) {
        promises.push(
            School.create({
                nameOrNumber: faker.fake(" {{random.number}}")%100,
                numberOfPupils: faker.fake(" {{random.number}}")%1000,
                averageScore: faker.fake(" {{random.number}}")%12
            })
            .then((school) => {
               const promises1 = [];
                 for (let j = 0; j<10; j++) {
                     
                   promises1.push( 
                    Pupil.create({ 
                    firstName: faker.fake(" {{name.firstName}}"),
                    lastName: faker.fake(" {{name.lastName}}"),
                    school: school.nameOrNumber,
                    averageScore: faker.fake(" {{random.number}}")%12 
                    
                })
                )
                }
                return Promise.all(promises1);
            })
            
        )
    }
    return Promise.all(promises)
})