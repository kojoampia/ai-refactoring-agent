import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface RefactorResult {
  analysis: string;
  refactoredCode: string;
  isSimulated?: boolean;
}

export async function analysisSpringCode(code: string, fileName: string): Promise<RefactorResult> {
  const prompt = `
    You are a Senior Spring Boot Architect specializing in Refactoring.
    Task: Analyze and refactor the following Java code to Spring Boot 3+ / 4 standards.
    
    Context:
    - Target: Spring Boot 3.3+ (Forward compatible with Spring Boot 4 patterns)
    - Key Tech: Java 21, Records, Virtual Threads, Spring AI (Vector Stores, LLM APIs)
    - Pattern: Prefers functional approaches, cleaner dependency injection, and modern security filters.

    File: ${fileName}
    Content:
    \`\`\`java
    ${code}
    \`\`\`

    Requirements for output:
    1. Analysis: List technical debts, deprecated patterns, and opportunities for Spring AI integration.
    2. Refactored Code: Provide the complete refactored file.
    3. Use @RestController, @Service, and modern constructor injection.
    4. If it's a data class, use Java Records.
    5. If applicable, suggest where Spring AI (VectorStore or ChatClient) should be injected to make the component "AI-Native".

    Your response must be in JSON format:
    {
      "analysis": "markdown string",
      "refactoredCode": "java code string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      analysis: result.analysis || "No analysis generated.",
      refactoredCode: result.refactoredCode || code
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      analysis: "Failed to connect to AI for analysis. Please check your API key.",
      refactoredCode: code,
      isSimulated: true
    };
  }
}
