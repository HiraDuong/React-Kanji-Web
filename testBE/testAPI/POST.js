const data = {
    username: "newUser2",
    password: "newPassword",
    name: "New User",
    age: 25,
    email: "newuser@example.com",
    role: 1
  };
  
  fetch('http://localhost:5000/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  