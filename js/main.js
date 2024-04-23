document.addEventListener("DOMContentLoaded", function() {
  const searchBtn = document.querySelector(".search-btn");
  const cityInput = document.getElementById("city-input");
  const mainContent = document.querySelector(".main-content");

  searchBtn.addEventListener("click", function() {
    const city = cityInput.value.trim();
    if (city !== "") {
      fetch(`/.netlify/functions/weather?city=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
          if (data && !data.error) {
            const weatherInfo = data.results;
            const weatherHTML = `
              <h2>Previsão do tempo para ${weatherInfo.city_name}</h2>
              <p>Temperatura: ${weatherInfo.temp}°C</p>
              <p>Condição: ${weatherInfo.description}</p>
              <p>Umidade: ${weatherInfo.humidity}%</p>
              <p>Vento: ${weatherInfo.wind_speed} km/h</p>
              <!-- Adicione mais informações conforme necessário -->
            `;
            mainContent.innerHTML = weatherHTML;
          } else {
            mainContent.innerHTML = "<p>Não foi possível obter informações para esta cidade.</p>";
          }
        })
        .catch(error => {
          console.error("Erro ao buscar informações do clima:", error);
          mainContent.innerHTML = "<p>Erro ao buscar informações do clima. Por favor, tente novamente mais tarde.</p>";
        });
    } else {
      mainContent.innerHTML = "<p>Por favor, insira o nome de uma cidade.</p>";
    }
  });
});


