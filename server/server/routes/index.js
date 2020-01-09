var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello');
});

//登录
// router.post('/login', function(req, res, next) {
//   var param = {
//     email:req.body.email,
//     password:req.body.password
//   }
//   User.findOne(param, function (err, doc) {
//     if (err) {
//       res.json({
//         status:"400",
//         msg:err.message
//       })
//     } else {
//       if (doc) {
//         res.json({
//           status:'200',
//           msg:'',
//           result:{
//             email:doc.email
//           }
//         });
//       }
//     }
//   })
// })


module.exports = router;
