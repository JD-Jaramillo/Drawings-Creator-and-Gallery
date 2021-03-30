// New drawing Form Handler
const newDrawingHandler = async (event) => {
  event.preventDefault();

  // Get the drawing title and drawing text from the form
  const name = document.querySelector('input[name="drawing-title"]').value.trim();
  const description = document.querySelector('input[name="drawing-description"]').value.trim();

  //Save drawing name to localstorage for upload to Cloudinary
  localStorage.setItem('lastDrawing', name);

  // use the add a new drawing drawing route to add the drawing 
  // user id is added from the session information in the route
  if (name && description) {
    const response = await fetch(`/api/drawing`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // if the response is okay, reload the page, showing the newest drawing now in the user's drawing list
    if (response.ok) {
      document.location.replace('/drawing');
      // otherwise, display the error
    } else {
      alert(response.statusText);
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/drawing/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

// Event Listener for the new drawing create button
document.querySelector('.new-drawing-form').addEventListener('submit', newDrawingHandler);
// Event Listener for the drawing delete button
document.querySelector('.your-drawings').addEventListener('submit', delButtonHandler);


