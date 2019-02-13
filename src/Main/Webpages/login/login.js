async function Signin(event) {
  event.preventDefault(); // prevent default form submission

  const username = document.getElementById("Username").value;
  const password = document.getElementById("Password").value;
  const credentials = {
    username,
    password
  }
  console.log(username);
  console.log(password);


  const result = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  console.log('passed fecth');
  if (result.status === 200) {

    console.log('Found User');

    let body = await result.json();
    localStorage.setItem('session', JSON.stringify(body));

    window.location = '../Manage-users/manage-users-screen.html';
  } else {
    console.log('failed to log in');
    document.getElementById('Password').value = '';
    document.getElementById('error-message').innerText = 'failed to login';
  }


}