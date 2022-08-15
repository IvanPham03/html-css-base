// ****** SELECT ITEMS **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option

let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

// submit button
form.addEventListener("submit", addItem);
// clear button
clearBtn.addEventListener("click", clearAll);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********

// add item

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value !== "" && !editFlag) {
    createItem(id, value);
    displayAlert("success", "success");
    container.classList.add("show-container");
    addToLocalStorage(id, value);
    setBackToDefault();
    // backDefault
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    //
    displayAlert("changed", "success");
    editLocalStorage(editID, value);
    // backDefault
    setBackToDefault();
  } else {
    displayAlert("please enter the input", "danger");
  }
}

// delete item

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  console.log(id);
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("items removed", "danger");
  setBackToDefault();
  removeFromLocalStorage(id);
}
// clear
function clearAll() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.remove(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}
// edit
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  console.log(editElement);
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.innerHTML = "edit";
}
// alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}
// default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********

// add
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();

  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

// get
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// remove
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function(item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem('list', JSON.stringify(items))
}

// edit
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
}
// ****** SETUP ITEMS **********
// setup

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
}
