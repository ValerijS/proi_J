var express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var requireTree              = require('require-tree');
var controllers              = requireTree('C:/nodeJs/proj_D/api/controllers');
var router = express.Router();
const mustAuthenticatedMw = require('C:/nodeJs/proj_D/api/controllers/mustAuthenticatedMw');

router.route('/admin')
  .all(mustAuthenticatedMw) 
  .get(controllers.admin_schools, controllers.render('views/boots_tiles_05_09_a.pug'))
  .post(controllers.pupils_of_school, controllers.render('views/Pupil_tabl_input_01_09.pug'));

router.delete('/admin_schools/:id', controllers.deleting_school_04_09_a);

router.put('/admin_schools/:name', controllers.insert_new_school_04_09_a, controllers.render('views/boots_tiles_05_09_a.pug'));

router.delete('/admin_pupils/:id', controllers.deleting_pupil_05_09);

router.put('/admin_pupils/:F_name/:L_name/:school', controllers.insert_new_pupil_05_09, controllers.render('views/Pupil_tabl_input_01_09.pug')); 

router.post('/updata_pupils', urlencodedParser, controllers.update_pupil_1, controllers.render('views/Pupil_tabl_input_01_09.pug'));

router.get('/updata_school/:value1/:value2/:id', controllers.update_school_05_09_a, controllers.render('views/boots_tiles_05_09_a.pug'));

router.post('/login',controllers.login_28_08);

router.route('/register')
  .get(function (req,res){res.send(pug.renderFile('views/register.pug'))})
  .post(controllers.register)
module.exports = router;