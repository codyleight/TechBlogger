
const editButton = document.querySelector('.edit-button');

editButton.addEventListener('click', async () => {
  const postId = "1";
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    try {
      const response = await fetch(`/blog/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('Blog post updated successfully');
        // Handle success, e.g., show a success message or redirect to another page
      } else {
        console.log('Error updating blog post');
        // Handle error, e.g., show an error message
      }
    } catch (err) {
      console.log(err);
      // Handle error, e.g., show an error message
    }
  }
});