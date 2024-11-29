"use client";
import { FileUploaderMinimal } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
// import { motion } from "framer-motion";
import { UploadCareUploadError } from "@/type/error";
// import { Upload } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

type QueuedFile = UploadCareOnChangeEvent["allEntries"][number];

// function App() {
// const [dragActive, setDragActive] = useState(false);
// const [files, setFiles] = useState<QueuedFile[]>([]);
// const [file, setFile] = useState<File | null>(null);
// const [extractedText, setExtractedText] = useState<string | null>(null);
// const [isProcessing, setIsProcessing] = useState(false);

// useEffect(() => {
//   if (files && files.length > 0) {
//     console.log("files", files);
//   }
// }, [files]);

// const handleChangeEvent = (e: UploadCareOnChangeEvent) => {
//   setFiles([
//     ...e.allEntries?.filter((file: QueuedFile) => file.status === "success"),
//   ]);
// };

// const handleUploadFailed = (e: UploadCareUploadError) => {};

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br ">
//       <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-md rounded-md overflow-hidden transition-all ">
//         <CardContent>
//           <div className="relative group cursor-pointer">
//             <div className="absolute inset-0 bg-gray-100 opacity-75 rounded-lg transition-all duration-300 group-hover:bg-gray-200"></div>
//             <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 transition-all duration-300 group-hover:border-gray-400">
//               <Upload className="size-7 mx-auto mb-4 text-gray-400 transition-all duration-300 group-hover:text-gray-600" />
//               <p className="text-center text-sm font-medium text-gray-500 transition-all duration-300 group-hover:text-gray-700">
//                 Drag and drop your receipt image here, or click to select a file
//               </p>
// <FileUploaderMinimal
//   imgOnly
//   multipleMax={1}
//   pubkey=""
//   onChange={(ev: any) => handleChangeEvent(ev)}
//   removeCopyright
//   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//   onFileUploadFailed={(e: any) => handleUploadFailed(e)}
// />
//             </div>
//           </div>
//         </CardContent>
//         <div className="w-full flex items-center justify-center">
//           <Button size="sm" className="w-full">
//             Continue
//           </Button>
//         </div>
//       </Card>
//     </main>
//   );
// }

// export default App;

import { ArrowUpDown, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import { useEffect, useState } from "react";
import { UploadCareOnChangeEvent } from "@/type";

export default function VideoToText() {
  const [files, setFiles] = useState<QueuedFile[]>([]);

  useEffect(() => {
    if (files && files.length > 0) {
      console.log("files", files);
    }
  }, [files]);

  const handleChangeEvent = (e: UploadCareOnChangeEvent) => {
    setFiles([
      ...e.allEntries?.filter((file: QueuedFile) => file.status === "success"),
    ]);
  };

  const handleUploadFailed = (e: UploadCareUploadError) => {};

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
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

        <Card className="mx-auto max-w-2xl p-6">
          <div className="mb-6 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8">
            <div className="text-center flex flex-col transition-all group justify-center relative h-[110px]">
              <FileUploaderMinimal
                imgOnly
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

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="width">Width (px)</Label>
              <Input id="width" placeholder="Enter width" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="height">Height (px)</Label>
              <Input id="height" placeholder="Enter height" className="mt-1" />
            </div>
          </div>

          <div className="mb-6 flex items-center space-x-2">
            {/* <Checkbox id="aspect-ratio" /> */}
            <Label htmlFor="aspect-ratio">Preserve Aspect Ratio</Label>
          </div>

          <div className="mb-6">
            <Label htmlFor="format">Format</Label>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="PNG" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Button className="w-full bg-gray-600 hover:bg-gray-700">
              Resize
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Download Image
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
