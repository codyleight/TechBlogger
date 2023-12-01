
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


router.get('/dashboard', async (req, res) => {
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

    res.render('dashboard', {
      blogs: blogs.map((blog) => ({ ...blog.toJSON(), blogContent: blog.content })),
      loggedIn: req.session.loggedIn,
      userName: userName, // Add the userName variable to the template
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    const blognum = blogData.get({ plain: true });
    // TODO: Send over the 'loggedIn' session variable to the 'homepage' template
    res.render('blog', { blognum, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.patch('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        // Update the fields you want to change
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (blogData[0] === 0) {
      res.status(404).json({ message: 'No blog post found with that id' });
      return;
    }

    res.status(200).json({ message: 'Blog post updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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