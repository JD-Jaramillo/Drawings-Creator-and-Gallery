// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#drawing-name').value.trim();
//   const description = document.querySelector('#drawing-desc').value.trim();

//   if (name && description) {
//     const response = await fetch(`/api/drawings`, {
//       method: 'POST',
//       body: JSON.stringify({ name, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to create drawing');
//     }
//   }
// };

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/drawings/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete drawing');
//     }
//   }
// };

// document
//   .querySelector('.new-drawing-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.drawing-list')
//   .addEventListener('click', delButtonHandler);
