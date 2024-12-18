import { GeminiGenerateOutput } from "@hypermode/models-as/models/gemini/generate";
import { http, models } from "@hypermode/modus-sdk-as";
import { Headers } from "@hypermode/modus-sdk-as/assembly/http";
import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
import {
  generateTranscript,
  queryTranscriptById,
  ReturnType,
} from "./assemblyai";
import { GeminiImagePrompt } from "./google";
import { retryWithExponentialBackoff } from "./utils/retry";

// store temp data, since there are no closures yet.
var store = new Map<string, string>();

export function generateText(instruction: string, prompt: string): string {
  const model = models.getModel<OpenAIChatModel>("text-generator");

  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

export function aiAutoComplete(
  prefix: string,
  suffix: string,
  lang: string,
): string {
  const model = models.getModel<OpenAIChatModel>("auto-complete");

  // let instruction: string = `
  // You are a coding assistant/code autocompletion AI bot.
  // You are to replace a code snippet with the
  // existing or given code. Suggest meaningful and semantically code.
  // Try to infer what the user is trying to achieve and use
  // that in generating your response.
  // Do not add any explanation or markdown.
  // `;

  const input = model.createInput([
    new SystemMessage(
      `You are a ${
        lang ? lang + " " : ""
      }programmer that replaces <FILL_ME> part with the right code. Only output the code that replaces <FILL_ME> part. Do not add any explanation or markdown.`,
    ),
    new UserMessage(`${prefix}<FILL_ME>${suffix}`),
  ]);

  input.temperature = 0.4;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

export function aiImageToText(
  base64Img: string,
  prompt: string | null = null,
): string {
  let header = new Headers();

  let template = `
  Extract data from the image, expecially the text.
  ${prompt ? `Additional info: ${prompt}` : ""}
  `;

  const body = http.Content.from(new GeminiImagePrompt(template, base64Img));

  const request = new http.Request(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
    {
      body: body,
      method: "POST",
      headers: header,
    },
  );

  const response = http.fetch(request);

  if (!response.ok) {
    throw new Error(
      `Failed to analyze image. Received: ${response.status}; Text: ${response.text()}`,
    );
  }

  let responsedata = response.json<GeminiGenerateOutput>();

  let content = responsedata.candidates[0].content;
  let text: string;

  // Since we can't use the typescript nullish coalescing, we may do the following
  if (content && content.parts && content.parts[0] && content.parts[0].text) {
    text = content.parts[0].text;
  } else {
    throw new Error(`LLM response was null.`);
  }

  return text;
}

export function aiMediaToText(file_url: string): string {
  const maxRetries = 5;
  const initialDelay = 1000;
  const transcriptId = generateTranscript(file_url);

  function callBack(id: string): bool {
    let call = queryTranscriptById(id);

    if (call.type === ReturnType.BOOLEAN) {
      return false;
    } else {
      store.set(id, call.value);
      return true;
    }
  }

  // Retry the function if it fails or is processing.
  retryWithExponentialBackoff(callBack, maxRetries, initialDelay, transcriptId);

  const transcript = store.get(transcriptId);

  // wipe the data
  store.delete(transcriptId);

  return transcript;
}
