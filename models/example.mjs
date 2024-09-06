import OpenAI from "openai";
const openai = new OpenAI({apiKey: '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'});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);