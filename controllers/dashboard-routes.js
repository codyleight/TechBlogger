const router = require('express').Router();
const { Post, User } = require('../models');

// Get all posts for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User }],
    });

    // Render the dashboard template and pass the post data to the template
    res.render('dashboard', {
      posts: postData.map((post) => post.get({ plain: true })),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});