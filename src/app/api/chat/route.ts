import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: `You are Refine Assistant, a helpful AI tutor that helps students refine their ideas and thoughts for academic tasks.
            - Help students brainstorm ideas
            - Provide constructive feedback
            - Ask thought-provoking questions
            - Suggest improvements
            - Keep responses concise and focused
            - Be encouraging and supportive`
        },
        ...messages
      ],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
