const yourname = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const signupbtn = document.getElementById('signupbtn');

  function generateAccessToken() {
    // Function to generate a random 16-byte access token
    const randomArray = new Uint8Array(16);
    crypto.getRandomValues(randomArray);
    return Array.from(randomArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('');
  }

  function checkIfUserExist(email) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const obj = users.find((userObj) => {
      return userObj.email === email;
    });
    if (obj) return true;
    else return false;
  }

  function saveUser(yourname, email, password) {
    let userObj = {
      yourname: yourname,
      email: email,
      password: password,
      accessToken: generateAccessToken(), // Generating and adding the access token to the user object
    };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userObj);
    localStorage.setItem('users', JSON.stringify(users));

    sessionStorage.setItem('loggenInUser', JSON.stringify(userObj));
    yourname.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    alert('Sign up successful');
    window.location.href = './login';
  }

  signupbtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (
      yourname.value.trim() === '' ||
      email.value.trim() === '' ||
      password.value.trim() === '' ||
      confirmPassword.value.trim() === ''
    ) {
      alert('All fields are mandatory!');
    } else {
      if (password.value.trim() !== confirmPassword.value.trim()) {
        alert('Password not matching');
        password.value = '';
        confirmPassword.value = '';
      } else {
        if (localStorage.getItem('users')) {
          if (checkIfUserExist(email.value)) {
            alert('Email is linked to another account');
          } else {
            saveUser(yourname.value, email.value, password.value, confirmPassword.value);
          }
        } else {
          saveUser(yourname.value, email.value, password.value, confirmPassword.value);
        }
      }
    }
  });