const express=require('express');
const router=express.Router();
const app = express();
app.use(express.urlencoded());
const userController=require('../controllers/user_controller');
router.get('/',userController.signUp);
router.use('/user',require('./user'));

module.exports=router;