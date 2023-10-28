let rendu;
let title;
let description;
let jour;
let getlist;
let valider;
let filter;
let listetache;
let clear;
let Edit;
let searchInput;

//   Fonction des Champts de Recuperation et de sortie des inputs entre par l'utilisateur.
function getElement() {
  rendu = document.getElementById("rendu");
  title = document.getElementById("title");
  description = document.getElementById("description");
  jour = document.getElementById("jour");
  getlist = document.getElementById("");
  valider = document.getElementById("valider");
  filter = document.getElementById("filtrer");
  listetache = document.getElementById("todo");
  clear = document.getElementById("clear");
  Edit = document.querySelector("Edit");
  searchInput = document.getElementById("search");
}

// Fonction de Verification des inputs entrees par l'utilisateurs

getElement();
valider.addEventListener("click", () => {
  if (title.value && description.value && jour.value) {
    AjouterLN();
  } else {
    alert("Veillez remplire tous les champs.");
  }
});

// Fonction de Recuperation des inputs entrer par l'utilisateur par notre Localstorage.

function getItem() {
  let todoList = localStorage.getItem("todolist");
  let listetache;
  if (todoList === null) {
    listetache = [];
  } else {
    listetache = JSON.parse(todoList);
  }
  return listetache;
}

// Fonction d'ajout des donnees entrer par  l'utilisateur  dans le LocalStorage et le navigateur.
function AjouterLN() {
  getElement();
  let titre = title.value;
  let descript = description.value;
  let date = jour.value;
  console.log(titre);
  addData({ title: titre, description: descript, jour: date });
  affichage(getItem());
  title.value = "";
  description.value = "";
  jour.value = "";
}

// supprime

function deleteData(index) {
  let tabletache = getItem();
  let remove = tabletache.splice(index, 1);
  console.log(tabletache);
  localStorage.setItem("todolist", JSON.stringify(tabletache));
  document.location.reload();
  affichage(tabletache);
}
// Modifier les inputs entre par l'utilisateur

function update(index) {
  document.getElementById("valider").style.display = "none";
  document.getElementById("Edit").style.display = "block";
  document.getElementById("filtrer").style.display = "none";

  // document.getElementById("rendu").style.display = "block";
  let update = getItem();

  document.getElementById("title").value = update[index].title;
  document.getElementById("description").value = update[index].description;
  document.getElementById("jour").value = update[index].jour;

  document.getElementById("Edit").onclick = function () {
    update[index].title = document.getElementById("title").value;
    update[index].description = document.getElementById("description").value;
    update[index].jour = document.getElementById("jour").value;

    localStorage.setItem("todoList", JSON.stringify(update));
    affichage(update);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("jour").value = "";

    document.getElementById("valider").style.display = "block";
    document.getElementById("filtrer").style.display = "block";

    document.getElementById("Edit").style.display = "none";
    document.location.reload();

  };
}

// Filtrer une tache
function filtrerdate() {
  getElement();
  let listeta = getItem();
  filter.addEventListener("click", () => {
    const date = jour.value;
    console.log(date);
    let filtre = listeta.filter((j) => j.jour == date);

    affichage(filtre);
  });
}
filtrerdate();

// rechercher un une tache precise

function seachTask() {
  getElement();
  let listTask = getItem();
  console.log(listTask);

  searchInput.addEventListener("keyup", () => {
    const tache = searchInput.value;
    console.log(tache);
    let recherche = listTask.filter((t) => t.title.includes(tache));

    affichage(recherche);
  });
}
seachTask();

function addData(setUserEntre) {
  let getUserEntre = getItem();
  console.log(getItem());
  getUserEntre.push(setUserEntre);
  // document.location.reload();
  localStorage.setItem("todolist", JSON.stringify(getUserEntre));
  document.location.reload();

}

// recuperer et afficher la liste des todo qui sont dans le local storage.

function setList() {
  getElement();

  let informations = getItem();
  console.log(informations);
  affichage(informations);
}

setList();

// Afficher selon les contraintes definie

function affichage(listTodo) {
  document.getElementById("rendu").innerHTML = "";
  // console.log(listTodo);
  listTodo.forEach((element, index) => {
    document.getElementById("rendu").innerHTML += `    <div class="gride">

    <div id="one">${element.title}</div>
    <div id="one">${element.description}</div>
    <div id="one">${element.jour}</div>
    <div id="one">   <button onclick ="deleteData ('${index}')" class="btn_delete">Supprimer</button>  <button onclick="update('${index}')" class = "Edit">Modifier</button>
    </div>
   </div>
`;
  });
}
