const express = require('express');
const Post = require('../models/posts');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    cb(null, "backend/images");
    if (isValid) {
      error = null;
    }
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//storing of image using multer
router.post('', multer({storage: storage}).single("image"),(req,res,next) => {
  const url = req.protocol  + '://' + req.get("host");
  const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "ok done",
      post: {
        ...createdPost,
        id: createdPost._id,
      }
    });
  });

});

router.get('', (req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  Post.find().then((documents) => {
    res.status(200).json({
      message: "ok",
      post: documents
  });
  });
});

router.put('/:id', multer({storage: storage}).single("image"), (req,res,next)=>{
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol  + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  Post.updateOne({_id: req.params.id}, post).then(response => {
    console.log(response);
    res.status(201).json({message: 'ok'});
  })
});

router.get('/:id', (req,res,next) => {
  // console.log(req.params.id);
  Post.findById(req.params.id).then(post => {
    // console.log(post);
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "not found"});
    }
  });
});

router.delete('/:id', (req,res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "post deleted"
    });
  });

});

module.exports = router;
