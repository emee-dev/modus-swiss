import { http, models } from "@hypermode/modus-sdk-as";
import { Headers } from "@hypermode/modus-sdk-as/assembly/http";
import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
// import {} from "@hypermode/modus-sdk-as/models/meta/llama";

// import {
//   TextGenerationModel,
//   TextGenerationInput,
// } from "@hypermode/models-as/models/meta/llama";

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

export function aiAutoComplete(instruction: string, prompt: string): string {
  const model = models.getModel<OpenAIChatModel>("codellama");

  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  input.temperature = 0.2;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

enum TranscriptStatus {
  Queued = 0,
  Processing = 1,
  Completed = 2,
  Error = 3,
}


@json
class Word {
  language_model!: string;
  text!: string;
  start!: u64;
  end!: u64;
  confidence!: u64;
  speaker: string | null = "";
}


@json
class TranscriptResult {
  id!: string;
  language_model!: string;
  acoustic_model!: string;
  language_code!: string;
  status!: TranscriptStatus;
  audio_url!: string;
  text!: string;
  words!: Word[];
}

class Pair<T, U> {
  constructor(
    public first: T,
    public second: U,
  ) {}
}

export function getTranscript(transcriptId: string, apikey: string): string {
  let header = new Headers();
  // The specified way of setting env didnt work for me.
  header.append("Authorization", `Bearer ${apikey}`);

  const request = new http.Request(
    `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
    {
      body: null,
      method: "GET",
      headers: header,
    },
  );

  const response = http.fetch(request);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch transcript. Received: ${response.status} ${response.statusText}`,
    );
  }

  let responsedata = response.json<TranscriptResult>();

  return responsedata.text;
}


@json
class Quote {

  @alias("q")
  quote!: string;


  @alias("a")
  author!: string;
}

export function getRandomQuote(): Quote {
  const request = new http.Request("https://zenquotes.io/api/random");

  const response = http.fetch(request);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch quote. Received: ${response.status} ${response.statusText}`,
    );
  }

  return response.json<Quote[]>()[0];
}

export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}
