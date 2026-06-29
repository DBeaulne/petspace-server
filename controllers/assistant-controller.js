const OpenAI = require("openai");
const { searchSittersForAssistant } = require("../utils/assistantSearch");

const parseFallbackCriteria = (message) => {
  const text = String(message || "");
  const lower = text.toLowerCase();
  const petType = ["dog", "cat", "reptile", "bird", "tarantula"].find((type) => lower.includes(type));
  const petSize = ["small", "medium", "large", "huge"].find((size) => lower.includes(size));
  const postalCode = text.match(/[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d/)?.[0];

  return {
    petType: petType ? petType[0].toUpperCase() + petType.slice(1) : "",
    petSize: petSize ? petSize[0].toUpperCase() + petSize.slice(1) : "",
    postalCode: postalCode || "",
    city: lower.includes("ajax") ? "Ajax" : lower.includes("oshawa") ? "Oshawa" : lower.includes("whitby") ? "Whitby" : ""
  };
};

const mergeFilled = (...sources) => {
  return sources.reduce((merged, source) => {
    Object.entries(source || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        merged[key] = value;
      }
    });
    return merged;
  }, {});
};

const assistantSearch = async (req, res) => {
  const { message, criteria = {} } = req.body;
  const fallbackCriteria = mergeFilled(parseFallbackCriteria(message), criteria);

  if (!process.env.OPENAI_API_KEY) {
    const result = await searchSittersForAssistant(fallbackCriteria);
    return res.json({
      reply: result.sitters.length
        ? "I found sitter matches from your details. You can refine the search with the form if anything looks off."
        : "I need a pet type, pet size, and approximate Durham Region location to find sitters.",
      criteria: fallbackCriteria,
      ...result,
      usedAi: false
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "Extract sitter search criteria for PetSpace. Return only JSON with petType, petSize, city, postalCode, startDateTime, endDateTime. Do not invent sitter names."
        },
        { role: "user", content: message || "" }
      ],
      text: { format: { type: "json_object" } }
    });

    const extracted = JSON.parse(response.output_text || "{}");
    const mergedCriteria = mergeFilled(fallbackCriteria, extracted);
    const result = await searchSittersForAssistant(mergedCriteria);

    return res.json({
      reply: result.sitters.length
        ? `I found ${result.sitters.length} approved sitter match${result.sitters.length === 1 ? "" : "es"} near your search area.`
        : "I could not find an approved sitter match yet. Try broadening the pet size or nearby city.",
      criteria: mergedCriteria,
      ...result,
      usedAi: true
    });
  } catch (error) {
    const result = await searchSittersForAssistant(fallbackCriteria);
    return res.json({
      reply: "The assistant had trouble reading that, so I used the fallback search details instead.",
      criteria: fallbackCriteria,
      ...result,
      usedAi: false
    });
  }
};

module.exports = { assistantSearch };
