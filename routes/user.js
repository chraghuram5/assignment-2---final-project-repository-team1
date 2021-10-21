const express=require('express');
const router=express.Router();
const app = express();
const passport=require('../config/passport');
app.use(express.urlencoded());
//importing controller
const userController=require('../controllers/user_controller');
router.get('/home', userController.home);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.createUser);
router.get('/sign-out', userController.destroySession);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/users/sign-in' }), userController.createSession);
module.exports=router;