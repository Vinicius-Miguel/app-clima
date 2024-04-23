const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

navigator.geolocation.getCurrentPosition(position => {
  searchClimate(position.coords.latitude, position.coords.longitude);
});

function insertInHtml(json) {
  document.getElementById("name-city").innerHTML = json.results.city;
  document.getElementById("graus").innerHTML = json.results.temp + " °C";
  document.getElementById("description").innerHTML = json.results.description;
  document.getElementById("humidity").innerHTML = json.results.humidity + "%";
  document.getElementById("wind").innerHTML = json.results.wind_speedy;
  document.getElementById("day-0").innerHTML = json.results.forecast[0].weekday;
}

function searchClimate(latitude, longitude) {
  const baseUrl = `https://api.hgbrasil.com/weather?key=9a8f50a0&lat=${latitude}&lon=${longitude}&user_ip=remote`;
  fetch(proxyUrl + baseUrl)
    .then(res => res.json())
    .then(json => {
      console.log(json.results);
      insertInHtml(json);
    })
    .catch(err => console.log("Erro ao buscar dados: ", err));
}

function buscarPrevisão() {
  const city = document.getElementById("city-input").value.replace(/ /g, "-");
  const state = ""; // O estado não é fornecido pelo usuário no seu HTML, então está vazio aqui

  searchClimate(city.toLowerCase(), state.toUpperCase());
}

// Remova o atributo wm-submit do seu botão de busca
const submit = document.querySelector(".search-btn");
submit.onclick = function(e) {
  e.preventDefault();
  buscarPrevisão();
}

