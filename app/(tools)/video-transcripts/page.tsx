"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getDescription } from "@/consts";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useToast } from "@/hooks/use-toast";
import { UploadCareOnChangeEvent } from "@/type";
import { UploadCareUploadError } from "@/type/error";
import { useMutation } from "@tanstack/react-query";
import "@uploadcare/react-uploader/core.css";
import { FileUploaderMinimal } from "@uploadcare/react-uploader/next";
import {
  Bot,
  Captions,
  FileVideo,
  Loader,
  Loader2,
  Upload,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type QueuedFile = UploadCareOnChangeEvent["allEntries"][number];

const aiMediaToText = graphql(`
  query AiVideoToText($file_url: String!) {
    aiMediaToText(file_url: $file_url)
  }
`);

const generateText = graphql(`
  query AiSummarizeText($instruction: String!, $prompt: String!) {
    generateText(instruction: $instruction, prompt: $prompt)
  }
`);

const inputDescription = "Note: (YouTube links are not supported)";

const wait = (ms: number) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
};

export default function VideoTranscriptApp() {
  const { toast } = useToast();
  const [inputType, setInputType] = useState<"url" | "file">("url");
  const [outputType, setOutputType] = useState<"transcript" | "summary">(
    "transcript",
  );
  const [videoLink, setVideoLink] = useState<string>("");
  const [cdnLink, setCdnLink] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");

  const { data, isPending, status, error, mutate } = useMutation({
    mutationKey: ["upload_video_link"],
    mutationFn: async (args: { file_url: string }) =>
      execute(aiMediaToText, args),
  });

  const generateSummary = useMutation({
    mutationKey: ["generate_ai_summary"],
    mutationFn: async (args: { instruction: string; prompt: string }) =>
      execute(generateText, args),
  });

  const handleChangeEvent = (e: UploadCareOnChangeEvent) => {
    // We are only accepting single file uploads
    setCdnLink(e.allEntries[0]?.cdnUrl);
  };

  const handleUploadFailed = (e: UploadCareUploadError) => {};

  const handleUploadByLink = () => {
    if (!videoLink) return;
    mutate({ file_url: videoLink });
  };

  // capture uploadcare file
  useEffect(() => {
    if (cdnLink) {
      mutate({ file_url: cdnLink });
    }
  }, [cdnLink]);

  useEffect(() => {
    if (data) {
      setTranscript(data.data?.aiMediaToText);
    }
  }, [data]);

  useEffect(() => {
    if (generateSummary.data) {
      setSummary(generateSummary.data?.data.generateText);
    }
  }, [generateSummary.data]);

  useEffect(() => {
    if (error) {
      console.error(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: `Request Error: ${error.message}`,
      });
    }

    if (data && data.errors) {
      console.error(data.errors);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              if (inputType === "file") {
                mutate({ file_url: cdnLink! });
              } else {
                mutate({ file_url: videoLink });
              }
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }, [error, data]);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <main className="container mx-auto px-4">
        <Card className="mx-auto max-w-3xl p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-purple-400 p-3">
              <Video className="h-full w-full" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Video Transcripts</h1>
            <p className="text-gray-500">
              {getDescription("/video-transcripts").description}
            </p>
          </div>

          <div className="space-y-6">
            <Select
              onValueChange={(value) => setInputType(value as "url" | "file")}
              defaultValue="url"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select input type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="url">Video URL</SelectItem>
                <SelectItem value="file">File Upload</SelectItem>
              </SelectContent>
            </Select>

            {inputType === "url" ? (
              <div className="space-y-3">
                <Label htmlFor="url">Enter a video URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="eg cdn link to file"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
                <p className="text-sm text-gray-500" id="url-description">
                  {inputDescription}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 pt-4 pb-3 px-4">
                <div className="text-center flex flex-col transition-all group justify-center relative h-[110px]">
                  <FileUploaderMinimal
                    accept="video/*"
                    multipleMax={1}
                    pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!}
                    onChange={(ev: any) => handleChangeEvent(ev)}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onFileUploadFailed={(e: any) => handleUploadFailed(e)}
                    removeCopyright
                    maxLocalFileSizeBytes={41943040} // 40MB
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Max size 40MB</p>
              </div>
            )}

            {!isPending && (
              <Button
                onClick={handleUploadByLink}
                className={`w-full ${inputType === "url" ? "flex" : "hidden"}`}
              >
                <Upload className="mr-2 size-4" /> Upload
              </Button>
            )}

            {isPending && (
              <Button disabled className="w-full">
                <Loader className="mr-2 size-4 animate-spin" /> Upload...
              </Button>
            )}

            <div className="flex items-center space-x-2">
              {isPending && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Transcribing video...</span>
                </>
              )}

              {!isPending &&
                data?.data?.aiMediaToText &&
                status === "success" && (
                  <>
                    <FileVideo className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">
                      Transcription complete
                    </span>
                  </>
                )}
            </div>

            {transcript && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Transcript</h2>
                <Textarea
                  value={
                    outputType === "transcript"
                      ? transcript
                      : summary || "AI summary will show up here."
                  }
                  readOnly
                  className="min-h-[200px]"
                />

                <ToggleGroup variant="outline" type="single" value={outputType}>
                  <ToggleGroupItem
                    value="transcript"
                    aria-label="Toggle transcript"
                    onClick={() => setOutputType("transcript")}
                  >
                    Transcript
                    <Captions className="size-4 ml-1" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="summary"
                    aria-label="Toggle summary"
                    onClick={() => setOutputType("summary")}
                  >
                    AI Summary
                    <Bot className="size-4 ml-1" />
                  </ToggleGroupItem>
                </ToggleGroup>

                {!generateSummary.isPending && (
                  <Button
                    onClick={() => {
                      generateSummary.mutate({
                        instruction:
                          "You are an AI assistant that help users understand complex concepts easier.",
                        prompt: `
                            Summarize the following text. Do not return markdown.

                            ${transcript}
                            `,
                      });
                    }}
                    className="w-full"
                  >
                    <Bot className="mr-2 h-4 w-4" /> Summarize with AI
                  </Button>
                )}

                {generateSummary.isPending && (
                  <Button disabled className="w-full">
                    <Loader className="mr-2 size-4 animate-spin" />{" "}
                    Summarizing...
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
