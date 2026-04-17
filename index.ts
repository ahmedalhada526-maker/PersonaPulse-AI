import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local if it exists for local testing
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Setup AI Gateway provider
const gateway = createOpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  // If using a specific gateway proxy, you would typically add baseURL here:
  // baseURL: 'https://gateway.ai.cloudflare.com/v1/...',
});

async function main() {
  console.log('--- AI Gateway Text Generation ---');
  console.log('Model: openai/gpt-5.4');
  console.log('Status: Initiating stream...\n');

  try {
    const result = await streamText({
      model: gateway.chat('gpt-5.4'),
      prompt: 'Write a short greeting as a technical AI gateway.',
      onFinish({ usage }) {
        console.log('\n\n--- Token Usage Metrics ---');
        console.log(`Completion Tokens: ${usage.completionTokens}`);
        console.log(`Prompt Tokens: ${usage.promptTokens}`);
        console.log(`Total Tokens: ${usage.totalTokens}`);
        console.log('---------------------------');
      },
    });

    console.log('Response Content:');
    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('\n[Gateway Error]:', error.message);
    } else {
      console.error('\n[Gateway Error]: An unknown error occurred.');
    }
    
    console.log('\nNote: "openai/gpt-5.4" is a futuristic/placeholder model identifier.');
    console.log('This script requires a valid AI_GATEWAY_API_KEY in .env.local.');
  }
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
