require('dotenv').config();
const axios = require('axios');

async function getGeminiData(inputText) {
    const API_KEY = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await axios.post(url, {
            "contents": [{
                "parts": [{ "text": inputText }]
            }]// Use the correct key as per API documentation
        });

        if (response.data && response.data.candidates) {
            return response.data.candidates.map(candidate => candidate.content.parts[0].text).join('\n');
        } else {
            console.error("Unexpected response format:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching data from Gemini API:", error.message);
        if (error.response) {
            console.error("Error details:", error.response.data);
        }
        return null;
    }
}

module.exports = {
    getGeminiData
};