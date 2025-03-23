const express = require("express");
const router = express.Router();
const postController = require('../controller/postController')
const { requireAuth } = require('../Middleware/middleware')



//Home Page
// router.get('*', checkUser)
router.get('',requireAuth, postController.viwHome)
router.get('/viwAllPost', postController.viwAll)
router.get('/post/:id', postController.findPostById)

router.post('/viwAllPost', postController.searchPost)

router.get('/admin',requireAuth, postController.viwAdmin)
router.post('/admin', postController.adminSearchPost)
router.get('/adminViewPost/:id', postController.viwAdminPost)
router.delete('/adminViewPost/:id', postController.deleteAdminPost)

router.get('/adminViewPost/updatePost/:id', postController.updateAdminPost_get)
router.patch('/adminViewPost/updatePost/:id', postController.updateAdminPost)

router.get('/adminAddPost', postController.adminAddPost_get)
router.post('/adminAddPost', postController.adminAddPost_post)



module.exports = router;

