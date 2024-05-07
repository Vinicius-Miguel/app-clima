document.addEventListener("DOMContentLoaded", function() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const cityInput = document.getElementById('city-input');

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true });

  function successCallback(position) {
    searchClimate(position.coords.latitude, position.coords.longitude);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchClimateByCity(); // Chame a função para pesquisar o clima por cidade
    }
  }

  function buscarPrevisão() {
    const cityName = document.getElementById('city-input').value.trim(); // Obtém o valor da cidade e remove espaços em branco extras

    if (cityName !== '') {
      const baseUrl = `https://api.hgbrasil.com/weather?key=9a8f50a0&city_name=${cityName}`;
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

      fetch(proxyUrl + baseUrl)
        .then(res => res.json())
        .then(json => {
          console.log(json.results);
          insertInHtml(json);
        })
        .catch(err => console.log("Erro ao buscar dados: ", err));
    } else {
      console.log("Por favor, insira um nome de cidade válido.");
    }
  }


  cityInput.addEventListener('keypress', handleKeyPress);

  function errorCallback(error) {
    console.log(error);
  }

  function insertInHtml(json) {
    const city = "Cidade: " + json.results.city;
    const temp = "Temperatura: " + json.results.temp + " °C";
    const description = "Descrição do Tempo: " + json.results.description;
    const humidity = "Humidade: " + json.results.humidity + "%";
    const wind = "Vento: " + json.results.wind_speedy + " km/h";
    const todayTemp = "Hoje: " + json.results.forecast[0].min + "° - " + json.results.forecast[0].max + "°";

    // Atualize os campos fixos com os valores correspondentes
    document.getElementById("name-city").innerHTML = city;
    document.getElementById("graus").innerHTML = temp;
    document.getElementById("description").innerHTML = description;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("wind").innerHTML = wind;
    document.getElementById("day-0").innerHTML = todayTemp;

    // Exibe o ícone correspondente à condição climática
    const weatherIcon = document.getElementById("weather-icon");
    const iconUrl = getWeatherIconUrl(json.results.condition_slug);
    weatherIcon.src = iconUrl;
  }

  function searchClimate(latitude, longitude) {
    const baseUrl = `https://api.hgbrasil.com/weather?key=9a8f50a0&user_ip=remote&lat=${latitude}&lon=${longitude}`;
    fetch(proxyUrl + baseUrl)
      .then(res => res.json())
      .then(json => {
        console.log(json.results);
        insertInHtml(json);
      })
      .catch(err => console.log("Erro ao buscar dados: ", err));
  }

  // Função para pesquisar o clima por cidade
  function searchClimateByCity() {
    const cityName = cityInput.value.trim(); // Obtém o valor da cidade e remove espaços em branco extras

    if (cityName !== '') {
      const baseUrl = `https://api.hgbrasil.com/weather?key=9a8f50a0&city_name=${cityName}`;
      fetch(proxyUrl + baseUrl)
        .then(res => res.json())
        .then(json => {
          console.log(json.results);
          insertInHtml(json);
        })
        .catch(err => console.log("Erro ao buscar dados: ", err));
    } else {
      console.log("Por favor, insira um nome de cidade válido.");
    }
  }

  function getWeatherIconUrl(conditionSlug) {
    const iconBaseUrl = 'https://assets.hgbrasil.com/weather/icons/conditions/';
    const iconExtension = '.svg';

    // Mapeia as condições climáticas para os URLs dos ícones correspondentes
    const iconMap = {
      storm: 'storm',
      snow: 'snow',
      hail: 'hail',
      rain: 'rain',
      fog: 'fog',
      clear_day: 'clear_day',
      clear_night: 'clear_night',
      cloud: 'cloud',
      cloudly_day: 'cloudly_day',
      cloudly_night: 'cloudly_night',
      none_day: 'none_day',
      none_night: 'none_night'
      // Adicione mais condições climáticas conforme necessário
    };

    // Verifica se a condição climática está mapeada e retorna o URL do ícone correspondente
    if (iconMap.hasOwnProperty(conditionSlug)) {
      return iconBaseUrl + iconMap[conditionSlug] + iconExtension;
    } else {
      return ''; // Retorna uma string vazia se a condição não estiver mapeada
    }
  }
});

