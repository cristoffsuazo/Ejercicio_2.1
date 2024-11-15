const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());

// Función para obtener datos de la API de RestCountries por región
const getCountriesByRegion = async (region) => {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener los países: ${error}`);
        return [];
    }
};

// Endpoint para obtener países por región
app.get('/countries/:region', async (req, res) => {
    const { region } = req.params;
    const countries = await getCountriesByRegion(region);

    // Devuelve solo el nombre y la bandera de cada país
    const countryList = countries.map(country => ({
        name: country.name.common,
        flag: country.flags.png
    }));

    res.json(countryList);
});

// Endpoint para obtener detalles de un país específico
app.get('/country/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        const country = response.data[0];

        const countryDetails = {
            name: country.name.common,
            population: country.population,
            currencies: Object.values(country.currencies).map(currency => currency.name),
            languages: Object.values(country.languages),
            flag: country.flags.png,
            location: country.latlng
        };

        res.json(countryDetails);
    } catch (error) {
        console.error(`Error al obtener los detalles del país: ${error}`);
        res.status(404).json({ error: "País no encontrado" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
