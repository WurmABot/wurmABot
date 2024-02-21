const axios = require('axios');

async function getPageContent(pageTitle) {
  const apiUrl = 'https://www.wurmpedia.com/api.php'; // WurmPedia-API-URL

  try {
    const response = await axios.get(apiUrl, {
      params: {
        action: 'parse',
        page: pageTitle,
        format: 'json',
      },
    });
