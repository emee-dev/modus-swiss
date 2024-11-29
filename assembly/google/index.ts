
@json
class ReqContent {
  parts!: Part[];
}


@json
class Part {

  @omitnull()
  text: string | null = null;


  @omitnull()
  inline_data: InlineData | null = null;
}


@json
class InlineData {
  mime_type!: string;
  data!: string;
}


@json
export class GeminiImagePrompt {
  contents: ReqContent[];

  constructor(prompt: string, base64encoded: string) {
    this.contents = [
      {
        parts: [
          { text: prompt, inline_data: null },
          {
            text: null,
            inline_data: {
              mime_type: "image/jpeg",
              data: base64encoded,
            },
          },
        ],
      },
    ];
  }
}
