const openai = require('openai');
require('dotenv').config();

const openaiClient = new openai.OpenAI({
  apiKey: process.env.OPENAI_KEY,  // Ensure this is correctly set in your .env file
});

const chatCompletion = async (req, res) => {
  const { message } = req.body;

  console.log('hello from chatCompletion api endpoint');
  
  try {
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Max, an AI assistant that helps users find pet sitters." },
        { role: "user", content: message }
      ],
      functions: [
        {
          name: "get_pet_details",
          description: "Extracts pet details and sitter location info",
          parameters: {
            type: "object",
            properties: {
              petType: { type: "string" },
              userLat: { type: "number" },
              userLng: { type: "number" }
            },
            required: ["petType", "userLat", "userLng"]
          }
        }
      ]
    });

    const { choices } = response;
    const chatResponse = choices[0];

    if (chatResponse.finish_reason === 'function_call') {
      const function_call = chatResponse.function_call;
      const function_name = function_call.name;
      const data = JSON.parse(function_call.arguments);
      
      return res.json({
        reply: "I've extracted your pet's details.",
        function_call: { name: function_name },
        data: data
      });
    } else {
      return res.json({
        reply: chatResponse.message.content
      });
    }

  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Error processing chat completion.' });
  }
};

module.exports = { chatCompletion };
