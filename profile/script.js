const logout = document.getElementById('logout');
const fullName= document.getElementById('yourname');
const email= document.getElementById('email');
const token= document.getElementById('token');
const password=document.getElementById('password');

let currentUser = JSON.parse(sessionStorage.getItem('loggenInUser'));

fullName.innerText = currentUser.yourname;
email.innerText = currentUser.email;
password.innerText = currentUser.password;

// Generate a random 16-digit string
const tokenString = Math.random().toString(36).substring(2, 38);

// Set the inner text of the token element
token.innerText = tokenString;

logout.addEventListener('click',function(){
    window.location.href = '/index.html';
})