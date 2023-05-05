import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const message = body.message;
    const recipe = body.recipe;
    const prompt =
      "Adopt the identity of a cooking assistant. Answer questions about the following recipe, assume users already have access to the ingredients and instructions.\n" +
      JSON.stringify(recipe);

    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const messages = [{ role: "user", content: prompt }, ...message];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.8,
    });

    const reply: any = completion.data.choices[0].message;

    return new Response(JSON.stringify({ reply: reply }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
