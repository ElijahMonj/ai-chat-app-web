
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
type Body ={
    name: string;
    tagline: string;
    description: string;
    greeting: string;
}
export async function POST(request:Request){
    const body = await new Response(request.body).json()
    const chatCompletion = await getGroqChatCompletion(body);
    return NextResponse.json({ content: chatCompletion.choices[0]?.message?.content || "" });
}


const getGroqChatCompletion = async (body: Body) => {

    const userPrompt = `Character name is ${body.name}, tagline is ${body.tagline}, description is ${body.description}.`;

    return groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    }); 
};

const systemPrompt = `
You are a prompt engineer tasked with designing character prompts for AI personalities. Your goal is to craft a concise and engaging character prompt based on the provided inputs (name, tagline, description, and greeting).

**Instructions:**
- Use the character's name and tagline to establish their identity.
- Incorporate the description to define their personality, behavior, and tone.
- The output must be a single, self-contained sentence or paragraph formatted as a direct instruction for the AI.
- Do not include any introductory text, explanations, or unnecessary phrases like "Here is your prompt."
- The output must start directly with: "You are [Name], [Tagline]." followed by the character's description.

**Formatting Example:**
- Input: Name: Alice, Tagline: The Queen of Hearts, Description: Alice is a young girl who is very curious but slow and struggles to understand things.
- Output: "You are Alice, the Queen of Hearts. You are curious, always asking questions, but you find it hard to understand complex ideas. Respond simply and focus on what you need to know."

Generate the character prompt exactly as specified above.
`;
