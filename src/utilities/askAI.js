const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
  
async function askAI(prompt) {
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        temperature:0.9, 
        top_p:1, 
        max_tokens:1000, 
        frequency_penalty:0, 
        presence_penalty:0,
    });
    const answer = completion.data.choices[0].text;
  
    return answer;
}

module.exports={
    askAI,
}