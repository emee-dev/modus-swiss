"use client";
import { FileUploaderMinimal } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { UploadCareUploadError } from "@/type/error";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Link, FileVideo, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadCareOnChangeEvent } from "@/type";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

type QueuedFile = UploadCareOnChangeEvent["allEntries"][number];

// import { ArrowUpDown, Github } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useEffect, useState } from "react";
// import { UploadCareOnChangeEvent } from "@/type";

// export default function VideoToText() {
//   const [files, setFiles] = useState<QueuedFile[]>([]);

//   useEffect(() => {
//     if (files && files.length > 0) {
//       console.log("files", files);
//     }
//   }, [files]);

// const handleChangeEvent = (e: UploadCareOnChangeEvent) => {
//   setFiles([
//     ...e.allEntries?.filter((file: QueuedFile) => file.status === "success"),
//   ]);
// };

// const handleUploadFailed = (e: UploadCareUploadError) => {};

//   return (
//     <div className="min-h-screen bg-white">
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-purple-400 p-3">
//             <Image
//               src="/placeholder.svg?height=40&width=40"
//               alt="Logo"
//               width={40}
//               height={40}
//               className="h-full w-full"
//             />
//           </div>
//           <h1 className="mb-2 text-3xl font-bold">Video Transcripts</h1>
//           <p className="text-gray-500">
//             Seamless Transcripts and AI Summarization.
//           </p>
//         </div>

//         <Card className="mx-auto max-w-2xl p-6">
//           <div className="mb-6 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8">
//             <div className="text-center flex flex-col transition-all group justify-center relative h-[110px]">
//               <FileUploaderMinimal
//                 accept="video/*"
//                 multipleMax={1}
//                 pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!}
//                 onChange={(ev: any) => handleChangeEvent(ev)}
//                 className="absolute inset-0 w-full h-full cursor-pointer"
//                 onFileUploadFailed={(e: any) => handleUploadFailed(e)}
//                 removeCopyright
//               />
//             </div>
//             <p className={`text-xs text-gray-400`}>Max size 40MB</p>
//           </div>

//           <div className="mb-6 grid gap-6 md:grid-cols-2">
//             <div>
//               <Label htmlFor="width">Width (px)</Label>
//               <Input id="width" placeholder="Enter width" className="mt-1" />
//             </div>
//             <div>
//               <Label htmlFor="height">Height (px)</Label>
//               <Input id="height" placeholder="Enter height" className="mt-1" />
//             </div>
//           </div>

//           <div className="mb-6 flex items-center space-x-2">
//             {/* <Checkbox id="aspect-ratio" /> */}
//             <Label htmlFor="aspect-ratio">Preserve Aspect Ratio</Label>
//           </div>

//           <div className="mb-6">
//             <Label htmlFor="format">Format</Label>
//             <Select>
//               <SelectTrigger className="mt-1 w-full">
//                 <SelectValue placeholder="PNG" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="png">PNG</SelectItem>
//                 <SelectItem value="jpg">JPG</SelectItem>
//                 <SelectItem value="webp">WebP</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2">
//             <Button className="w-full bg-gray-600 hover:bg-gray-700">
//               Resize
//             </Button>
//             <Button variant="outline" className="w-full" disabled>
//               Download Image
//             </Button>
//           </div>
//         </Card>
//       </main>
//     </div>
//   );
// }

// Working
// export default function VideoTranscriptApp() {
//   const [videoSource, setVideoSource] = useState<string>("");
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<
//     "idle" | "uploading" | "uploaded"
//   >("idle");
//   const [transcriptionStatus, setTranscriptionStatus] = useState<
//     "idle" | "transcribing" | "done"
//   >("idle");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [transcript, setTranscript] = useState("");
//   const { toast } = useToast();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFile(file);
//       setVideoSource("");
//     }
//   };

//   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setVideoSource(event.target.value);
//     setFile(null);
//   };

//   const handleUpload = () => {
//     if (!file && !videoSource) return;

//     setUploadStatus("uploading");
//     setUploadProgress(0);

//     // Simulating upload progress
//     const interval = setInterval(() => {
//       setUploadProgress((prevProgress) => {
//         if (prevProgress >= 100) {
//           clearInterval(interval);
//           setUploadStatus("uploaded");
//           toast({
//             description:
//               "Video uploaded successfully. Starting transcription...",
//           });
//           startTranscription();
//           return 100;
//         }
//         return prevProgress + 10;
//       });
//     }, 500);
//   };

//   const startTranscription = () => {
//     setTranscriptionStatus("transcribing");
//     // Simulating transcription process
//     setTimeout(() => {
//       setTranscriptionStatus("done");
//       setTranscript(
//         "This is a sample transcript of the uploaded video. In a real application, this would be the actual transcript returned from the transcription service.",
//       );
//       toast({
//         description: "Transcription completed!",
//       });
//     }, 5000); // Simulating a 5-second transcription process
//   };

//   const handleSummarize = () => {
//     toast({
//       description:
//         "In a real application, this would send the transcript to an AI service for summarization.",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-purple-400 p-3">
//             <Image
//               src="/placeholder.svg?height=40&width=40"
//               alt="Logo"
//               width={40}
//               height={40}
//               className="h-full w-full"
//             />
//           </div>
//           <h1 className="mb-2 text-3xl font-bold">Video Transcripts</h1>
//           <p className="text-gray-500">
//             Seamless Transcripts and AI Summarization.
//           </p>
//         </div>

//         <Card className="mx-auto max-w-2xl p-6">
//           <div className="space-y-4">
//             <div
//               className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
//               onClick={() => document.getElementById("file-upload")?.click()}
//             >
//               <input
//                 id="file-upload"
//                 type="file"
//                 className="hidden"
//                 accept="video/*"
//                 onChange={handleFileChange}
//               />
//               {file ? (
//                 <p className="text-sm text-gray-500">{file.name}</p>
//               ) : (
//                 <>
//                   <FileVideo className="mx-auto h-12 w-12 text-gray-400" />
//                   <p className="mt-2 text-sm text-gray-500">
//                     Click to upload or drag and drop a video file
//                   </p>
//                 </>
//               )}
//             </div>

//             <div className="flex space-x-2">
//               <Input
//                 type="url"
//                 placeholder="Or enter a video URL"
//                 value={videoSource}
//                 onChange={handleUrlChange}
//               />
//               <Button onClick={handleUpload} disabled={uploadStatus !== "idle"}>
//                 <Upload className="mr-2 h-4 w-4" /> Upload
//               </Button>
//             </div>
//           </div>

//           {uploadStatus !== "idle" && (
//             <div className="space-y-2">
//               <div className="flex items-center space-x-2">
//                 <Progress value={uploadProgress} className="flex-grow" />
//                 <span className="text-sm font-medium">{uploadProgress}%</span>
//               </div>
//               <p className="text-sm text-gray-500">
//                 {uploadStatus === "uploading"
//                   ? "Uploading video..."
//                   : "Upload complete"}
//               </p>
//             </div>
//           )}

//           {transcriptionStatus !== "idle" && (
//             <div className="flex items-center space-x-2">
//               {transcriptionStatus === "transcribing" ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <span className="text-sm">Transcribing video...</span>
//                 </>
//               ) : (
//                 <>
//                   <FileVideo className="h-4 w-4 text-green-500" />
//                   <span className="text-sm text-green-500">
//                     Transcription complete
//                   </span>
//                 </>
//               )}
//             </div>
//           )}

//           {transcript && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Transcript</h2>
//               <Textarea value={transcript} readOnly className="min-h-[200px]" />
//               <Button onClick={handleSummarize}>
//                 <Link className="mr-2 h-4 w-4" /> Summarize with AI
//               </Button>
//             </div>
//           )}
//         </Card>
//       </main>
//     </div>
//   );
// }

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

// "https://assembly.ai/wildfires.mp3"

const inputDescription = "Enter a video URL (YouTube links are not supported)";

const wait = (ms: number) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
};

export default function VideoTranscriptApp() {
  const [inputType, setInputType] = useState<"url" | "file">("url");
  const [videoLink, setVideoLink] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();

  const [files, setFiles] = useState<QueuedFile[]>([]);

  const { data, isPending, status, error, mutate } = useMutation({
    mutationKey: ["upload_video_link"],
    mutationFn: async (args: { file_url: string }) =>
      execute(aiMediaToText, args),
    // wait(5000),
  });

  useEffect(() => {
    if (data) {
      setTranscript(data.data.aiMediaToText);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        description: `Error: ${error.message}`,
      });
    }
  }, [error]);

  const handleChangeEvent = (e: UploadCareOnChangeEvent) => {
    setFiles([
      ...e.allEntries?.filter((file: QueuedFile) => file.status === "success"),
    ]);
  };

  const handleUploadFailed = (e: UploadCareUploadError) => {};

  const handleUploadByLink = () => {
    if (!file && !videoLink) return;

    mutate({ file_url: videoLink });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <main className="container mx-auto px-4">
        <Card className="mx-auto max-w-3xl p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-purple-400 p-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Logo"
                width={40}
                height={40}
                className="h-full w-full"
              />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Video Transcripts</h1>
            <p className="text-gray-500">
              Seamless Transcripts and AI Summarization.
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
              <div className="space-y-4">
                <Input
                  type="url"
                  placeholder="Enter a video URL"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
                <p className="text-sm text-gray-500" id="url-description">
                  {inputDescription}
                </p>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8">
                <div className="text-center flex flex-col transition-all group justify-center relative h-[110px]">
                  <FileUploaderMinimal
                    accept="video/*"
                    multipleMax={1}
                    pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!}
                    onChange={(ev: any) => handleChangeEvent(ev)}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onFileUploadFailed={(e: any) => handleUploadFailed(e)}
                    removeCopyright
                  />
                </div>
                <p className={`text-xs text-gray-400`}>Max size 40MB</p>
              </div>
            )}

            {/* Hide button if view is file */}
            <Button
              onClick={handleUploadByLink}
              disabled={isPending}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>

            {/* {inputType === "file" && status === "pending" && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Progress value={uploadProgress} className="flex-grow" />
                  <span className="text-sm font-medium">{uploadProgress}%</span>
                </div>
                <p className="text-sm text-gray-500">
                  {uploadStatus === "uploading"
                    ? "Uploading video..."
                    : "Upload complete"}
                </p>
              </div>
            )} */}

            <div className="flex items-center space-x-2">
              {isPending && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Transcribing video...</span>
                </>
              )}

              {!isPending && status === "success" && (
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
                  value={transcript}
                  readOnly
                  className="min-h-[200px]"
                />
                <Button onClick={() => {}} className="w-full">
                  <Link className="mr-2 h-4 w-4" /> Summarize with AI
                </Button>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
