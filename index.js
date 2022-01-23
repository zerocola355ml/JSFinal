//weather
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "fe0d07dabde884c1b7b4977ff5083ac7";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerHTML = `<font color = white>${data.name}`;
      weather.innerHTML = ` <font color = white> ${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//todo
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerHTML = `<font color = white> ${newTodo.text}`;
  const button = document.createElement("button");
  button.innerText = "✔";
  button.style.color = "white";
  button.style.backgroundColor = "transparent";
  button.style.border = "0px";
  button.addEventListener("click", deleteToDo);
  li.appendChild(button);
  li.appendChild(span);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now()
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

//login
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.style.color = "white";
  greeting.innerText = `Just Do It! ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}

//background
const fs = require("fs");
fs.readdir("./img", (err, files) => {
  document.body.style.backgroundImage = `url('./img/${Math.floor(
    Math.random() * files.length
  )}.jpg')`;
  document.body.style.backgroundSize = "cover";
});

//phrase
const phrase = {
  "I don't count my situps. I only start counting once it starts hurting.":
    "Muhammad Ali",
  "I've failed over and over again in my life. And that is why I succeed":
    "Michael Jordan",
  "The only way to prove you are a good sport is to lose": "Ernie Banks",
  "If you fail to prepare, you're prepared to fail": "Mark Spitz",
  "Its is not the size of a man but the size of his heart that matters":
    "Evander Holyfield"
};
const rnd_phr = Math.floor(Math.random() * Object.keys(phrase).length);

document.querySelector("#sen").innerHTML = `<font color = white> ${
  Object.keys(phrase)[rnd_phr]
} </font>`;
document.querySelector("#author").innerHTML = `<font color = white> ${
  Object.values(phrase)[rnd_phr]
} </font>`;

//clock
function timer() {
  const clock = document.querySelector("#clock h1");
  const time = new Date();
  const sec =
    time.getSeconds() < 10
      ? "0" + time.getSeconds()
      : time.getSeconds().toString();
  const min =
    time.getMinutes() < 10
      ? "0" + time.getMinutes()
      : time.getMinutes().toString();
  const hour =
    time.getHours() < 10 ? "0" + time.getHours() : time.getHours().toString();
  clock.innerHTML = `<font color = white>${hour}:${min}:${sec}</font>`;
}
timer();
setInterval(timer, 1000);
