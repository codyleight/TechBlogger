const blogPostForm = document.querySelector('.blog-post-form');

console.log("here i am!");

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
      document.location.replace('/login');
    } else {
      console.log('Error posting blog');
    }
  }
};

blogPostForm.addEventListener('submit', blogPostHandler);