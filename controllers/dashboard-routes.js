const router = require('express').Router();
const { Blog, User } = require('../models');

// Get all posts for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll();
   

    // Render the dashboard template and pass the post data to the template
    res.render('dashboard', {
      blogs: blogs.map((blog) => ({ ...blog.toJSON(), blogContent: blog.content })),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});