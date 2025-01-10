

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

window.logIn = logIn;
async function logIn() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        location.assign("index.html");
    } catch (error) {
        alert("failed email or password try again: ");
    }
};

document.getElementById('logInForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    var isValid = true;

    // التحقق من البريد الإلكتروني
    var email = form.querySelector('#email');
    if (!email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
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
