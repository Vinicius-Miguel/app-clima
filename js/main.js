document.addEventListener("DOMContentLoaded", function() {
  const apiKey = "9a8f50a0"; // Substitua "SUA_CHAVE_DE_API_AQUI" pela sua chave de API do HGBrasil
  const searchBtn = document.querySelector(".search-btn");
  const cityInput = document.getElementById("city-input");
  const mainContent = document.querySelector(".main-content");

  searchBtn.addEventListener("click", function() {
    const city = cityInput.value.trim();
    if (city !== "") {
      fetch(`https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.results) {
            const weatherInfo = data.results;
            // Aqui você pode manipular os dados de acordo com o que deseja exibir no seu site
            // Por exemplo, você pode mostrar a temperatura, a descrição do clima, etc.
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
