import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { REFINE_SYSTEM_PROMPT } from '@/lib/schemas';

// Initialize Gemini (Validating key presence)
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: NextRequest) {
  if (!genAI) {
    return NextResponse.json(
      { error: 'Gemini API Key is not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const promptText = formData.get('text') as string;
    const files = formData.getAll('files') as File[];

    // Construct the parts for Gemini
    const parts: any[] = [];
    
    // Add the System Prompt context as the first text part (or strict system instruction if supported)
    // For simple 1.5 Pro usage, mixing prompt is fine.
    parts.push({ text: REFINE_SYSTEM_PROMPT + "\n\nUser Input:\n" });

    if (promptText) {
      parts.push({ text: promptText });
    }

    // Process Files (Images/PDFs)
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const base64Data = Buffer.from(bytes).toString('base64');
      
      parts.push({
        inlineData: {
          mimeType: file.type,
          data: base64Data
        }
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Response:", text.substring(0, 100) + "...");

    // Attempt to parse JSON from the potential markdown block
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
    let jsonData = null;
    
    if (jsonMatch) {
       // If match is from regex group 1 or just the raw match
       const rawJson = jsonMatch[1] ? jsonMatch[1] : jsonMatch[0];
       try {
         jsonData = JSON.parse(rawJson);
       } catch (e) {
         console.error("JSON parse failed", e);
       }
    }

    return NextResponse.json({ 
      raw: text,
      structured: jsonData 
    });

  } catch (error: any) {
    console.error('Refinement error FULL:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
