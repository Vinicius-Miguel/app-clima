const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

navigator.geolocation.getCurrentPosition(position => {
  searchClimate(position.coords.latitude, position.coords.longitude);
});

function insertInHtml(json) {
  const city = "Cidade: " + json.results.city;
  const temp = "Temperatura: " + json.results.temp + " °C";
  const description = "Descrição do Tempo: " + json.results.description;
  const humidity = "Humidade: " + json.results.humidity + "%";
  const wind = "Vento: " + json.results.wind_speedy + " km/h";
  const todayTemp = "Hoje: " + json.results.forecast[0].min + "° - " + json.results.forecast[0].max + "°";

  // Atualize os campos fixos com os valores correspondentes
  document.getElementById("name-city").innerHTML = city;

  // Adicione as informações pesquisadas na frente dos campos fixos
  document.getElementById("graus").innerHTML = temp;
  document.getElementById("description").innerHTML = description;
  document.getElementById("humidity").innerHTML = humidity;
  document.getElementById("wind").innerHTML = wind;
  document.getElementById("day-0").innerHTML = todayTemp;
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

function buscarPrevisão(type = "agora") {
  const city = document.getElementById("city-input").value;
  const state = "";
  const apiKey = "9a8f50a0"; 
  let apiUrl;

  switch (type) {
    case "agora":
      apiUrl =  `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${city},${state}`;
      break;
    case "hoje":
      // Lógica para buscar previsão do dia atual
      apiUrl =  `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${city},${state}&forecast_only=true`;
      break;
    case "fim-de-semana":
      // Lógica para buscar previsão do fim de semana
      apiUrl =  `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${city},${state}&filter=weekend`;
      break;
    case "15-dias":
      // Lógica para buscar previsão dos próximos 15 dias
      apiUrl =  `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${city},${state}&forecast_days=15`;
      break;
    default:
      console.log("Tipo de previsão não reconhecido");
      return;
  }

  fetch(proxyUrl + apiUrl)
    .then(res => res.json())
    .then(json => {
      console.log(json.results);
      insertInHtml(json);
    })
    .catch(err => console.log("Erro ao buscar dados: ", err));
}

function handleSearch(event) {
  if (event.key === "Enter") {
    buscarPrevisão("agora");
  }
}

document.getElementById("city-input").addEventListener("keypress", handleSearch);

document.getElementById("agora-btn").addEventListener("click", function() {
  buscarPrevisão("agora");
});

document.getElementById("hoje-btn").addEventListener("click", function() {
  buscarPrevisão("hoje");
});

document.getElementById("fim-de-semana-btn").addEventListener("click", function() {
  buscarPrevisão("fim-de-semana");
});

document.getElementById("15-dias-btn").addEventListener("click", function() {
  buscarPrevisão("15-dias");
});

const submit = document.querySelector(".search-btn");
submit.onclick = function(e) {
  e.preventDefault();
  buscarPrevisão();
}



