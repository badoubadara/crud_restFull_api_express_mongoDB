const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


// Get All the posts
router.get('/', (req, res, next) => {
    Post.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => console.log(err));
});

// to Update a post
router.put('/update/:id', (req, res, next) => {
    // grab the ID of the post
    let id = req.params.id;
    // find the post by ID from the database
    Post.findById(id) 
    .then(post => {
        post.title = req.body.title;
        post.body = req.body.body;
        post.save()
        .then(post => {
            res.send({
                message: 'Post updated successfully',
                status: 'success',
                post: post
            })
        })
        .catch(err => console.log(err))
    })
})

// Create a post
router.post('/add', (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    newPost = new Post({
        title:title,
        body: body
    });
    newPost.save()
    .then(post => {
        res.json(post);
    })
    .catch(err => console.log(err));
})

// make delete Request
router.delete('/:id', (req, res, next) => {

    let id = req.params.id;

    Post.findById(id) 
    .then(post => {
        post.title = req.body.title;
        post.body = req.body.body;
        post.delete()
        .then(post => {
            res.send({
                message: 'Post deleted successfully',
                status: 'success',
                post: post
            })
        })
        .catch(err => console.log(err))
    })
})

module.exports =  router;