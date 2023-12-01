const blogPostForm = document.querySelector('.blog-post-form');
const blogPostEdit = document.querySelector('.blog-post-edit');

const blogPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    const response = await fetch('/api/blog/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log('Error posting blog');
    }
  }
};

const blogPostEditor = async (event) => {
  event.preventDefault();

  const postId = 1;
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    const response = await fetch(`/blog/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log('Error updating blog post');
    }
  }
};

blogPostForm.addEventListener('submit', blogPostHandler);
blogPostEdit.addEventListener('click', blogPostEditor); // Change event type to 'click'