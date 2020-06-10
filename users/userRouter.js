const express = require("express");

const router = express.Router();
const db = require("./userDb");

router.post("/", validateUser ,(req, res) => {
  db.insert(req.body)
});

router.post("/:id/posts", validateUserId , validatePost ,(req, res) => {
  const posts = db.getUserPosts(req.params.id)
  posts.insert(...posts, req.body)
});

router.get("/", (req, res) => {
  let users = db.get().then((users) => {
    res.json(users);
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message: "Couldn't get users"})
  })
});

router.get("/:id", validateUserId ,(req, res) => {
  db.getById(req.params.id)
  .then(user => {
    res.json(user)
  })
  
  
 
});

router.get("/:id/posts", validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
  .then(posts=>{
    res.json(posts)
  })
  
});

router.delete("/:id", validateUserId, (req, res) => {
  db.remove(req.params.id)
  .then(user => {
    res.json({message: "user removed"})
  })
});

router.put("/:id",validateUserId, validateUser,  (req, res) => {
  db.update(req.params.id, req.body)
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then((user) => {
      if (user) {
        next();
        } else {
        res.status(404).json({ message: "invalid user id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error getting user" });
    });
}

function validateUser(req, res, next) {
  let user = req.body;
  if(!req.body){
    res.status(400).json({ message: "missing user data" })
  } else if(!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
    
  }
}

function validatePost(req, res, next) {
  const post = req.body;
  if(!req.body){
    res.status(400).json({ message: "missing post data" })
  } else if (req.body.text){
    res.status(400).json({ message: "missing required text field" })
  } else{
    next()
    return post
  }
}

module.exports = router;
