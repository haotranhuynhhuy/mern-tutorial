const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Post = require('../models/Post');


// @route GET api/post
// @desc GET Post
// @access private
router.get('/', verifyToken, async (req, res) => {
    //populate (get a document from other collection)
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messsage: 'Internal Server Error' })
    }
})

// @route POST api/post
// @desc Create Post
// @access private
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    //Simple vailidation
    if (!title) {
        res.status(400).json({ success: false, message: "title is required" })
    }

    //All good
    try {
        let newPost = new Post({
            title,
            description: description || '',
            url: ((url.startsWith('http://')) ? url : `http://${url}`) || '',
            status: status || 'TO LEARN',
            user: req.userId
        })
        await newPost.save();
        res.json({ success: true, message: 'Post added successfully', newPost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messsage: 'Internal Server Error' })
    }
})

// @route PUT api/post/:id
// @desc PUT Post
// @access private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    //Simple validation
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' })
    }

    //All good
    try {
        let updatePost = {
            title,
            description: description || '',
            url: ((url.startsWith('http://')) ? url : `http://${url}`) || '',
            status: status || 'TO LEARN'
        }
        const updatePostCondition = { _id: req.params.id, user: req.userId };
        updatePost = await Post.findOneAndUpdate(updatePostCondition, updatePost, { new: true });

        //User not authorised  
        if (!updatePost) {
            return res.status(400).json({ success: false, message: 'Post not found' })
        }
        res.json({ success: true, message: 'Updated successfully', post: updatePost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messsage: 'Internal Server Error' })
    }
})

// @route Delete api/post/:id
// @desc Detele Post
// @access private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletePost = await Post.findOneAndDelete(postDeleteCondition);
        //User not authorised  
        if (!deletePost) {
            return res.status(400).json({ success: false, message: 'Post not found' })
        }
        res.json({ success: true, message: 'Post deleted successfully', post: deletePost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messsage: 'Internal Server Error' })
    }
})

module.exports = router