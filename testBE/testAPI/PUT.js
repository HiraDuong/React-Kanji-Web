const data = {
    // password: "newPassword",
    name: 'New User 222',
    age: 25,
    email: 'newuser3@example.com',
  };
  
  fetch('http://localhost:5000/api/users/27', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  