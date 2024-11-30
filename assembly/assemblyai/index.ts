import { http } from "@hypermode/modus-sdk-as";
import { Headers } from "@hypermode/modus-sdk-as/assembly/http";


@json
class Word {
  language_model!: string;
  text!: string;
  start!: u64;
  end!: u64;
  confidence!: u64;


  @omitnull()
  speaker: string | null = null;
}


@json
class AssemblyAIGenerateTranscriptResponse {
  id!: string;
  language_model!: string;
  acoustic_model!: string;
  language_code!: string;
  status!: string;
  audio_url!: string;


  @omitnull()
  text: string | null = null;


  @omitnull()
  words: Word[] | null = null;


  @omitnull()
  utterances: string[] | null = null;


  @omitnull()
  confidence!: f32;


  @omitnull()
  audio_duration!: f32;


  @omitnull()
  punctuate!: bool;
  format_text!: bool;


  @omitnull()
  dual_channel!: bool;


  @omitnull()
  webhook_url: string | null = null;


  @omitnull()
  webhook_status_code!: i32;
  webhook_auth!: bool;


  @omitnull()
  webhook_auth_header_name: string | null = null;
  speed_boost!: bool;


  @omitnull()
  auto_highlights_result: string | null = null;
  auto_highlights!: bool;


  @omitnull()
  audio_start_from!: f32;


  @omitnull()
  audio_end_at!: f32;
  word_boost!: string[];


  @omitnull()
  boost_param: string | null = null;
  filter_profanity!: bool;
  redact_pii!: bool;
  redact_pii_audio!: bool;


  @omitnull()
  redact_pii_audio_quality: string | null = null;


  @omitnull()
  redact_pii_policies: string | null = null;


  @omitnull()
  redact_pii_sub: string | null = null;
  speaker_labels!: bool;
  content_safety!: bool;
  iab_categories!: bool;
  content_safety_labels!: Map<string, string>;
  iab_categories_result!: Map<string, string>;
  language_detection!: bool;


  @omitnull()
  language_confidence_threshold!: f32;


  @omitnull()
  language_confidence!: f32;


  @omitnull()
  custom_spelling: string | null = null;
  throttled!: bool;
  auto_chapters!: bool;
  summarization!: bool;


  @omitnull()
  summary_type: string | null = null;


  @omitnull()
  summary_model: string | null = null;


  @omitnull()
  custom_topics: string | null = null;
  topics!: string[];


  @omitnull()
  speech_threshold!: f32;
  speech_model!: string;


  @omitnull()
  chapters: string | null = null;
  disfluencies!: bool;
  entity_detection!: bool;
  sentiment_analysis!: bool;


  @omitnull()
  sentiment_analysis_results: string | null = null;


  @omitnull()
  entities: string[] | null = null;


  @omitnull()
  speakers_expected!: i32;


  @omitnull()
  summary: string | null = null;


  @omitnull()
  custom_topics_results: string[] | null = null;


  @omitnull()
  is_deleted!: bool;
  multichannel!: bool;
}


@json
class AssemblyAIGetTranscriptByIdResponse {
  id!: string;
  language_model!: string;
  acoustic_model!: string;
  language_code!: string;
  status!: string;
  audio_url!: string;
  text!: string;
  words!: Word[];


  @omitnull()
  utterances: string[] | null = null;
  confidence!: f32;
  audio_duration!: f32;
  punctuate!: bool;
  format_text!: bool;


  @omitnull()
  dual_channel!: bool;


  @omitnull()
  webhook_url: string | null = null;


  @omitnull()
  webhook_status_code!: i32;
  webhook_auth!: bool;


  @omitnull()
  webhook_auth_header_name: string | null = null;
  speed_boost!: bool;


  @omitnull()
  auto_highlights_result: string | null = null;
  auto_highlights!: bool;


  @omitnull()
  audio_start_from!: f32;


  @omitnull()
  audio_end_at!: f32;
  word_boost!: string[];


  @omitnull()
  boost_param: string | null = null;
  filter_profanity!: bool;
  redact_pii!: bool;
  redact_pii_audio!: bool;


  @omitnull()
  redact_pii_audio_quality: string | null = null;


  @omitnull()
  redact_pii_policies: string | null = null;


  @omitnull()
  redact_pii_sub: string | null = null;
  speaker_labels!: bool;
  content_safety!: bool;
  iab_categories!: bool;
  content_safety_labels!: ContentSafetyLabels;
  iab_categories_result!: ContentSafetyLabels;
  language_detection!: bool;


  @omitnull()
  language_confidence_threshold!: f32;


  @omitnull()
  language_confidence!: f32;


  @omitnull()
  custom_spelling: string | null = null;
  throttled!: bool;
  auto_chapters!: bool;
  summarization!: bool;


  @omitnull()
  summary_type: string | null = null;


  @omitnull()
  summary_model: string | null = null;
  custom_topics!: bool;
  topics!: string[];


  @omitnull()
  speech_threshold!: f32;
  speech_model!: string;


  @omitnull()
  chapters: string | null = null;
  disfluencies!: bool;
  entity_detection!: bool;
  sentiment_analysis!: bool;


  @omitnull()
  sentiment_analysis_results: string | null = null;


  @omitnull()
  entities: string[] | null = null;


  @omitnull()
  speakers_expected!: i32;


  @omitnull()
  summary: string | null = null;


  @omitnull()
  custom_topics_results: string[] | null = null;


  @omitnull()
  is_deleted!: bool;


  @omitnull()
  multichannel!: bool;
}

// Supporting class for content safety labels
@json
class ContentSafetyLabels {
  status!: string;
  results!: string[];
  summary!: Map<string, string>;
}

// Utility class for generating transcript

@json
export class AssemblyAITranscriptPrompt {
  audio_url!: string;
  speech_model!: string;

  constructor(file_url: string) {
    this.audio_url = file_url;
    this.speech_model = "best";
  }
}

export enum ReturnType {
  STRING,
  BOOLEAN,
}


@json
class Result {
  type!: ReturnType;
  value: string = "";
}

export function generateTranscript(file_url: string): string {
  let header = new Headers();

  const body = http.Content.from(new AssemblyAITranscriptPrompt(file_url));

  const request = new http.Request(`https://api.assemblyai.com/v2/transcript`, {
    body: body,
    method: "POST",
    headers: header,
  });

  const response = http.fetch(request);

  if (!response.ok) {
    throw new Error(
      `Failed to generate transcript. Received: ${response.status} ${response.statusText}; Text: ${response.text()}`,
    );
  }

  let responsedata = response.json<AssemblyAIGenerateTranscriptResponse>();

  if (responsedata.status !== "queued") {
    throw new Error(
      `Error processing the file ${responsedata.audio_url} and id: ${responsedata.id}`,
    );
  }

  return responsedata.id;
}

export function queryTranscriptById(transcriptId: string): Result {
  let header = new Headers();

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
      `Failed to fetch transcript. Received: ${response.status} ${response.statusText}; Text: ${response.text()}`,
    );
  }

  let responsedata = response.json<AssemblyAIGetTranscriptByIdResponse>();

  if (responsedata.status === "completed") {
    return { type: ReturnType.STRING, value: responsedata.text };
  } else {
    return {
      type: ReturnType.BOOLEAN,
      value: `Failed to get transcript by Id status: ${responsedata.status}`,
    };
  }
}
