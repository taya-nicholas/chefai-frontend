import { Lambda } from "aws-sdk";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: any = await request.json();
    const { num_recipes, iterations } = body;

    if (typeof num_recipes !== "number" || typeof iterations !== "number") {
      return new Response(JSON.stringify({ message: "Invalid request body" }), {
        status: 400,
      });
    }

    const lambda = new Lambda({ region: "ap-southeast-2" });

    const params = {
      FunctionName: "recommendRecipes",
      Payload: JSON.stringify({ num_recipes, iterations }),
    };

    const req = await lambda.invoke(params).promise();
    const res = await req.Payload?.toString();

    return new Response(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
