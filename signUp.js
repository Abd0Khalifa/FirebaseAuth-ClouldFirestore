

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCbUdDx-MjFSK5jvmLK1TY6Hxi8eks_DUc",
    authDomain: "firestore-project-5d1a4.firebaseapp.com",
    projectId: "firestore-project-5d1a4",
    storageBucket: "firestore-project-5d1a4.firebasestorage.app",
    messagingSenderId: "838420799883",
    appId: "1:838420799883:web:8d6177ce4e8ab7d0de8f8e",
    measurementId: "G-EPYGQTDPSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signUp=signUp;
async function signUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        location.assign("logIn.html");
    } catch (error) {

        alert("try again : ");
    }
}


document.getElementById('signUpForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    var isValid = true;

    // التحقق من اسم المستخدم
    var username = form.querySelector('#validationServerUsername');
    if (!username.value.match(/^[a-zA-Z0-9_]{5,15}$/)) {
        username.classList.add('is-invalid');
        isValid = false;
    } else {
        username.classList.add('is-valid');
    }

    // التحقق من البريد الإلكتروني
    var email = form.querySelector('#email');
    if (!email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.add('is-valid');
    }

    // التحقق من كلمة المرور
    var password = form.querySelector('#password');
    if (!password.value.match(/.{6,}/)) {
        password.classList.add('is-invalid');
        isValid = false;
    } else {
        password.classList.add('is-valid');
    }

    if (!isValid) {
        e.preventDefault();
    } 
});

// الالوان يزعامه
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function () {
        if (this.checkValidity()) {
            this.classList.add('is-valid');
            this.classList.remove('is-invalid');
        } else {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
        }
    });
});
