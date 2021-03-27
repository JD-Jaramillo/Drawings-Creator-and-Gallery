// // New drawing Form Handler
// async function newFormHandler(event) {
//   event.preventDefault();

//   // Get the drawing title and drawing text from the form
//   const drawingName = document.querySelector('input[name="drawing-title"]').value;

//   // use the add a new drawing drawing route to add the drawing 
//   // user id is added from the session information in the route
//   const response = await fetch(`/api/drawing`, {
//     method: 'POST',
//     body: JSON.stringify({
//       title
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   // if the response is okay, reload the page, showing the newest drawing now in the user's drawing list
//   if (response.ok) {
//     document.location.replace('/dashboard');
//     // otherwise, display the error
//   } else {
//     alert(response.statusText);
//   }
// }

// // Event Listener for the new drawing submit button
// document.querySelector('.new-drawing-form').addEventListener('submit', newFormHandler);