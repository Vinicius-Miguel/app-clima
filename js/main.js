function getAPIData() {
  const apiUrl = "https://api.hgbrasil.com/weather?woeid=455828";

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }

      return response.json();
    })
    .then(data => {
      document.getElementById('weather').innerText = JSON.stringify(data);
    })
    .catch(error => {
      console.error("Erro:", error);
    });
}

window.onload = getAPIData;

