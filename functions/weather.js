exports.handler = async function(event, context) {
  const apiKey = "9a8f50a0"; // Substitua pela sua chave de API do HGBrasil
  const city = event.queryStringParameters.city;
  const url = `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao buscar informações do clima" })
    };
  }
};

