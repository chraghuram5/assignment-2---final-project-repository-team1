const express=require('express');
const router=express.Router();
const app = express();
//const passport=require('../config/passport');
app.use(express.urlencoded());
//importing controller
const preferenceController=require('../controllers/preference_controller.js');
router.get('/preference', preferenceController.preferencePage);
router.post('/preference', preferenceController.savePreferences);
router.get('/update', preferenceController.updatePage);
router.post('/update-preference', preferenceController.updatePreferences);
//router.post('/createPreferences', )
module.exports=router;