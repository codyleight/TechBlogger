
const router = require('express').Router();
const { Blog, User,  } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    let userName = '';

    // Check if the user is logged in and retrieve their name
    if (req.session.loggedIn) {
      const user = await User.findByPk(req.session.userId);
      if (user) {
        userName = user.username;
      }
    }

    res.render('homepage', {
      blogs: blogs.map((blog) => ({ ...blog.toJSON(), blogContent: blog.content })),
      loggedIn: req.session.loggedIn,
      userName: userName, // Add the userName variable to the template
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/dashboard', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  
  // Otherwise, render the 'login' template
  res.render('dashboard', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  // Otherwise, render the 'login' template and pass a variable indicating the login status
  res.render('login', { loggedIn: req.session.loggedIn });
});

module.exports = router;