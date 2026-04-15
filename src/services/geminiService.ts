import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AnalysisResult {
  pulse: {
    recipientPersona: string;
    currentDynamic: string;
    hiddenNeeds: string;
    personalityTraits: {
      mbti?: string;
      bigFive?: string;
      enneagram?: string;
    };
    advancedInsights?: string; // Locked for free users
  };
  strategies: {
    tactician: {
      response: string;
      whyItWorks: string;
    };
    empath: {
      response: string;
      whyItWorks: string;
    };
    alpha: {
      response: string;
      whyItWorks: string;
    };
  };
}

export async function analyzeInteraction(text: string, language: string = 'en'): Promise<AnalysisResult> {
  const langName = language === 'ar' ? 'Arabic' : 'English';
  
  // Limit input text to prevent massive payloads that might cause truncation
  const sanitizedText = text.slice(0, 5000).replace(/"/g, '\\"');
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following text-based human interaction as PersonaPulse AI.
      
      Input Text: "${sanitizedText}"
      
      Provide a psychological analysis and strategic responses.
      
      CRITICAL: You MUST provide all text values in the JSON response in ${langName}.
      Be concise and surgical in your analysis. Do not repeat the input text.
      
      Return the result in JSON format following this schema:
      {
        "pulse": {
          "recipientPersona": "2-sentence psychological profile in ${langName}",
          "currentDynamic": "Description of power struggle, plea, etc. in ${langName}",
          "hiddenNeeds": "What they actually want but aren't saying in ${langName}",
          "advancedInsights": "Deep-level psychological manipulation tactics or vulnerabilities found in the text, in ${langName}. This is for PRO users.",
          "personalityTraits": {
            "mbti": "Likely MBTI type",
            "bigFive": "Key Big Five traits",
            "enneagram": "Likely Enneagram type"
          }
        },
        "strategies": {
          "tactician": {
            "response": "Logic-focused response in ${langName}",
            "whyItWorks": "Psychological justification in ${langName}"
          },
          "empath": {
            "response": "EQ-focused response in ${langName}",
            "whyItWorks": "Psychological justification in ${langName}"
          },
          "alpha": {
            "response": "Boundary-focused response in ${langName}",
            "whyItWorks": "Psychological justification in ${langName}"
          }
        }
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pulse: {
              type: Type.OBJECT,
              properties: {
                recipientPersona: { type: Type.STRING },
                currentDynamic: { type: Type.STRING },
                hiddenNeeds: { type: Type.STRING },
                advancedInsights: { type: Type.STRING },
                personalityTraits: {
                  type: Type.OBJECT,
                  properties: {
                    mbti: { type: Type.STRING },
                    bigFive: { type: Type.STRING },
                    enneagram: { type: Type.STRING }
                  }
                }
              },
              required: ["recipientPersona", "currentDynamic", "hiddenNeeds", "advancedInsights"]
            },
            strategies: {
              type: Type.OBJECT,
              properties: {
                tactician: {
                  type: Type.OBJECT,
                  properties: {
                    response: { type: Type.STRING },
                    whyItWorks: { type: Type.STRING }
                  },
                  required: ["response", "whyItWorks"]
                },
                empath: {
                  type: Type.OBJECT,
                  properties: {
                    response: { type: Type.STRING },
                    whyItWorks: { type: Type.STRING }
                  },
                  required: ["response", "whyItWorks"]
                },
                alpha: {
                  type: Type.OBJECT,
                  properties: {
                    response: { type: Type.STRING },
                    whyItWorks: { type: Type.STRING }
                  },
                  required: ["response", "whyItWorks"]
                }
              },
              required: ["tactician", "empath", "alpha"]
            }
          },
          required: ["pulse", "strategies"]
        }
      }
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("Empty response from AI");
    }

    // Attempt to find the first '{' and last '}' to handle potential markdown wrapping or extra text
    const startIdx = rawText.indexOf('{');
    const endIdx = rawText.lastIndexOf('}');
    
    if (startIdx === -1 || endIdx === -1) {
      throw new Error("Invalid JSON structure in AI response");
    }

    const jsonStr = rawText.substring(startIdx, endIdx + 1);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
}
