const express = require('express');
const router = express.Router();
const postController = require('../../controller/EmployeerController/post');
const authJwt = require('../../middlewares/authJwt')
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
});
const upload = multer({ storage: storage });

router.post('/createPost', authJwt.verifyToken, postController.createPost);
router.get('/getAllUserPost', authJwt.verifyToken, postController.getAllUserPost);
router.get('/all', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authJwt.verifyToken, postController.updatePost);
router.delete('/:id', authJwt.verifyToken, postController.deletePost);
router.post('/like/:id', authJwt.verifyToken, postController.addLike);
router.post('/comment/:id', authJwt.verifyToken, postController.addComment);
router.post('/reportOnPost/:id', authJwt.verifyToken, postController.reportOnPost);
module.exports = router;


