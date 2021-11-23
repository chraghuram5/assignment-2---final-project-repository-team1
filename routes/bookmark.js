const express=require('express');
const router=express.Router();
const app = express();
app.use(express.urlencoded());
const bookmarkController=require('../controllers/bookmark_controller.js');
router.get('/bookmarks', bookmarkController.bookmarksPage);
router.post('/add-bookmark', bookmarkController.addBookmark);
module.exports=router;