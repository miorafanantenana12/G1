const axios = require('axios');

module.exports = {
  config: {
    name: "adobo",
    author: "cliff", //api by hazey
    version: "1.0.0",
    countDown: 5,
    role: 0,
    category: "Ai",
    shortDescription: {
      en: "{p}adobo"
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      if (!args[0]) {
        return api.sendMessage("Please provide a prompt for Adobo.", event.threadID);
      }

      const searchMessage = await api.sendMessage(`🔍 ᏰᏒᏬᏁᎾ répondra à votre question, mais veuillez patienter....`, event.threadID);

      const prompt = encodeURIComponent(args.join(" "));
      const apiUrl = `https://markdevs-api.onrender.com/api/ashley/gpt?query=${prompt}`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.response) {
        // If a response is obtained, delete the search message and send the response
        api.deleteMessage(searchMessage.messageID, event.threadID);
        api.sendMessage(response.data.response, event.threadID);
      } else {
        // If no response is obtained, inform the user
        api.deleteMessage(searchMessage.messageID, event.threadID);
        api.sendMessage("Unable to get a response from Adobo.", event.threadID);
      }
    } catch (error) {
      console.error('Error making Adobo API request:', error.message);
      api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
  }
};
