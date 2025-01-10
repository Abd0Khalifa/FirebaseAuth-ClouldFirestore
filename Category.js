import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
    getFirestore,
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where,
    getDocs,
    orderBy,
    startAt,
    endAt,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Auth logOut
window.logOut = logOut;
async function logOut() {
    var isAgree = confirm("Are you sure you want to LogOut ?");
        if (isAgree) {
            await signOut(auth);
        }
}

onAuthStateChanged(auth, function (user) {
    if (!user) {
        location.assign("logIn.html");
    }
});

// save or update
window.save = save;
async function save() {
    const id = document.getElementById("ID").value;
    const name = document.getElementById("Name").value;

    const category = {
        Name: name.toLowerCase(),
    };

    if (id == '') {
        await addDoc(collection(db, 'Category'), category);
        clear();
    } else {
        updateDoc(doc(db, 'Category', id), category);
        clear();
    }
}

//clear
function clear() {
    document.getElementById("ID").value = '';
    document.getElementById("Name").value = '';
}

//show Category real-time
onSnapshot(collection(db, 'Category'), function (snapshot) {
    const category = [];
    snapshot.docs.forEach((doc) => {
        category.push({ id: doc.id, ...doc.data() });
    });
    showCategory(category);
});

//show category in table
function showCategory(category) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    category.forEach((cat) => {
        tbody.innerHTML += `
        <tr>
            <td>${cat.Name}</td>
            <td><input type="button" value="Delete" class="btn btn-danger" onclick="deleteCat('${cat.id}')"/></td>
            <td><input type="button" value="Update" class="btn btn-warning" onclick="updateCat('${cat.id}','${cat.Name}')"/></td>
        </tr>`;
    });
}
//delete
window.deleteCat = deleteCat;
async function deleteCat(id) {
    const isAgree = confirm("Are you sure you want to delete this Category?");
    if (isAgree) {
        await deleteDoc(doc(db, 'Category', id));
    }
}
// update
window.updateCat = updateCat;
async function updateCat(id, name) {
    document.getElementById("ID").value = id;
    document.getElementById("Name").value = name;
}
//search
window.searchCategory = searchCategory;
async function searchCategory() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    let q;
    if (searchValue == "") {
        q = collection(db, 'Category');
    } else {
        q = query(
                    collection(db, 'Category'),
                    orderBy('Name'), 
                    startAt(searchValue), 
                    endAt(searchValue + '\uf8ff')
                );
    }
    const res = await getDocs(q);
    const categories = [];
    res.forEach(doc => {
        categories.push({ id: doc.id, ...doc.data() });
    });
    showCategory(categories);
}

export { logOut, save, deleteCat, updateCat, searchCategory }
