const form = document.querySelector("#motto-form");
const formRow = document.querySelector(".form-row");
const mottoInput = document.querySelector("#motto");
const personInput = document.querySelector("#isim");
const dateInput = document.querySelector("#date");
const mottoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");

eventListeners();

function eventListeners(){ //Tüm Event Listenerlar
    form.addEventListener("submit", addMotto);
    document.addEventListener("DOMContentLoaded", loadAllParametersToUI);
    secondCardBody.addEventListener("click",deleteMotto);
    filter.addEventListener("keyup", filterMottos);
}
function filterMottos(e){
    const filterValue = e.target.value.toLowerCase();
    const mottoItems = document.querySelectorAll(".motto");
    mottoItems.forEach(function(mottoItem){
        const text = mottoItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            //Bulamadı
            mottoItem.parentElement.parentElement.setAttribute("style","display : none !important");
        }
        else {
            mottoItem.parentElement.parentElement.setAttribute("style", "display : block");
        }
    })
}
function deleteMotto (e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteMottoFromStorage(e.target.parentElement.parentElement.children[0].children[0].textContent);
    }
}
function deleteMottoFromStorage(deletemotto){
    let mottos = getMottosFromStorage();
    let people = getPeopleFromStorage();
    let dates = getDatesFromStorage();
    mottos.forEach(function(motto,index){
        if ("Motto: " + motto === deletemotto){
            mottos.splice(index,1); // Arraydan değeri silme
            people.splice(index,1);
            dates.splice(index,1);
        }
    });

    localStorage.setItem("mottos",JSON.stringify(mottos));
    localStorage.setItem("people",JSON.stringify(people));
    localStorage.setItem("dates",JSON.stringify(dates));
}
function loadAllParametersToUI(){
    let mottos = getMottosFromStorage();
    let people = getPeopleFromStorage();
    let dates = getDatesFromStorage();
    for(let i = 0; i<=mottos.length-1; i++){
        addMottoToUI(mottos[i], people[i], dates[i]);
    }  
}
function addMotto(e){
    e.preventDefault();
    const newMotto = mottoInput.value.trim();
    const newPerson = personInput.value;
    const newDate = dateInput.value;
    
    formRow.querySelectorAll('.alert').forEach(function(item) {
        item.remove();
    })

    if (newMotto === ""){
        showAlert("danger","Lütfen bir Motto girin");
    }
    if (newPerson === ""){
        showAlert("danger", "Lütfen Kişi Seçin");
    }
    if (newDate === ""){
        showAlert("danger", "Lütfen Tarih Seçin");
    }
    else {
        addMottoToUI(newMotto, newPerson, newDate);
        addMottoToStorage(newMotto);
        addPersonToStorage(newPerson);
        addDateToStorage(newDate);
    }
}
function getMottosFromStorage(){ //Storagedan mottoları alma
    let mottos;
    if(localStorage.getItem("mottos") === null){
        mottos = [];
    }
    else {
        mottos = JSON.parse(localStorage.getItem("mottos"));
    }
    return mottos;
}
function getPeopleFromStorage(){ //Storagedan kişileri alma
    let people;
    if(localStorage.getItem("people") === null){
        people = [];
    }
    else {
        people = JSON.parse(localStorage.getItem("people"));
    }
    return people;
}
function getDatesFromStorage(){ //Storagedan tarihleri alma
    let dates;
    if(localStorage.getItem("dates") === null){
        dates = [];
    }
    else {
        dates = JSON.parse(localStorage.getItem("dates"));
    }
    return dates;
}
function addMottoToStorage(newMotto){
    let mottos = getMottosFromStorage();
    mottos.push(newMotto);
    localStorage.setItem("mottos", JSON.stringify(mottos));
}
function addPersonToStorage(newPerson){
    let people = getPeopleFromStorage();
    people.push(newPerson);
    localStorage.setItem("people", JSON.stringify(people));
}
function addDateToStorage(newDate){
    let dates = getDatesFromStorage();
    dates.push(newDate);
    localStorage.setItem("dates", JSON.stringify(dates));
}
function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    formRow.appendChild(alert);
}

function addMottoToUI(newMotto, newPerson, newDate){ //String değerini list item olarak UI'ya ekleme
    // List Item Oluşturma
    const listItem = document.createElement("li");
    listItem.className = "list-item list-group-item d-flex justify-content-between";
    // Divleri oluşturma
    const content = document.createElement("div");
    content.className = "content d-flex justify-content-between";
    const motto = document.createElement("div");
    motto.className = "motto px-2";
    motto.appendChild(document.createTextNode("Motto: " + newMotto)); //Text Node Olarak Ekleme
    const owner = document.createElement("div");
    owner.className = "owner px-2";
    owner.appendChild(document.createTextNode("Sahibi: " + newPerson));
    const date = document.createElement("div");
    date.className = "date px-2";
    date.appendChild(document.createTextNode("Tarihi: " + newDate)); 
    // link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    //Çocukları ekleme
    listItem.appendChild(content);
    listItem.appendChild(link);
    content.appendChild(motto);
    content.appendChild(owner);
    content.appendChild(date);

    //Motto List'e List Item'ı ekleme
    mottoList.appendChild(listItem);

    //Motto girildikten sonra kutucuğu temizleme
    mottoInput.value = "";
    personInput.value = "";
    dateInput.value = "";
}
