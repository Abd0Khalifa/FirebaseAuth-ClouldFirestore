// Import the functions you need from the SDKs you need
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

window.logOut = logOut;
async function logOut() {
    var isAgree = confirm("Are you sure you want to LogOut ?");
    if (isAgree) {
        await signOut(auth);
    }
}
onAuthStateChanged(auth, function (user) {
    if (!user) {
        location.assign("login.html");
    }
});


// save or update

window.save = save;
async function save() {
    var id = document.getElementById("ID").value;
    var name = document.getElementById("Name").value;
    var image = document.getElementById("Image").value;
    var price = document.getElementById("Price").value;
    var category = document.getElementById("Category").value;

    var product = {
        Name: name.toLowerCase(),
        Image: image,
        Price: parseInt(price),
        Category: category,
    };

    if (id == '') {
        await addDoc(collection(db, 'Product'), product);
        clear();
    } else {
        updateDoc(doc(db, 'Product', id), product);
        clear();
    }


}

// clear
function clear() {
    var id = document.getElementById("ID").value = '';
    var name = document.getElementById("Name").value = '';
    var image = document.getElementById("Image").value = '';
    var price = document.getElementById("Price").value = '';
    var category = document.getElementById("Category").value = '';
}

var categorySelect = document.getElementById('Category');
var categoryMap = {};

const category = collection(db, "Category");

// show category in select
onSnapshot(category, (snapshot) => {
    categorySelect.innerHTML = '';
    categoryMap = {};

    snapshot.forEach((doc) => {
        const categoryData = doc.data();
        categoryMap[doc.id] = categoryData.Name;

        var option = document.createElement('option');
        option.value = doc.id;
        option.textContent = categoryData.Name;
        categorySelect.appendChild(option);
    });
});

// show products real-time
onSnapshot(collection(db, 'Product'), function (snapshot) {
    var products = [];
    for (const doc of snapshot.docs) {
        products.push({ id: doc.id, ...doc.data() });
    }
    showProducts(products);
});

//show products in cards
function showProducts(products) {
    var div = document.getElementById("div");
    div.innerHTML = "";

    for (const prd of products) {
        var categoryName = categoryMap[prd.Category] || "Unknown";

        div.innerHTML += `
               <div class="col-md-4 mb-3">
    <div class="card mb-3 shadow-sm hover-card">
        <div class="row g-0 border-3">
            <div class="col-md-4">
                <img src="${prd.Image}" class="img-fluid rounded-start" alt="..." style="height: 165px;">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h3 class="card-title">${prd.Name}</h3>
                    <h5 class="card-text">${prd.Price} $</h5>
                    <h6 class="card-text">${categoryName}</h6>
                    <input type="button" value="Delete" class="btn btn-danger" onclick="deletePrd('${prd.id}')"/>
                    <input type="button" value="Update" class="btn btn-warning" onclick="updatePrd('${prd.id}','${prd.Name}','${prd.Image}','${prd.Price}','${prd.Category}')"/>
                </div>
            </div>
        </div>
    </div>
</div>

        `;
    }
}

// delete
window.deletePrd = deletePrd;
async function deletePrd(id) {
    var isAgree = confirm("Are you sure you want to delete this product ?");
    if (isAgree) {
        await deleteDoc(doc(db, 'Product', id));
    }
}

// update
window.updatePrd=updatePrd;
async function updatePrd(id, name, image, price, category) {
    var id = document.getElementById("ID").value = id;
    var name = document.getElementById("Name").value = name;
    var image = document.getElementById("Image").value = image;
    var price = document.getElementById("Price").value = price;
    var category = document.getElementById("Category").value = category;

}


// search
window.searchProduct = async function () {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();

    let q;

    if (searchValue == "") {
        q = collection(db, 'Product');
    } else {
        q = query(collection(db, 'Product'), where('Name', '==', searchValue));
    }

    const res = await getDocs(q);

    const products = [];

    res.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
    });

    showProducts(products);
};

// filter 

window.filterProduct = async function () {
    const filterValue = document.getElementById('filterInput').value;

    let q;

    if (filterValue == "") {
        q = collection(db, 'Product');
    } else {
        q = query(collection(db, 'Product'), where('Price', '<=', parseInt(filterValue)));
    }

    const res = await getDocs(q);

    const products = [];

    res.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
    });

    showProducts(products);
};




