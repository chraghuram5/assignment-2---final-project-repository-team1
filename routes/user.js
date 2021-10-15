const express=require('express');
const router=express.Router();
const app = express();
app.use(express.urlencoded());
//importing controller
const userController=require('../controllers/user_controller');
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.createUser);
router.post('/login',userController.loginUser);
module.exports=router;