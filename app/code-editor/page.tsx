"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LANGUAGES, SNIPPETS } from "@/consts";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";

import { toast } from "@/hooks/use-toast";
import { oneDark } from "@codemirror/theme-one-dark";
import { useMutation } from "@tanstack/react-query";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import axios from "axios";
import { inlineCopilot } from "codemirror-copilot";

import { Loader } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

type PistonResponse = {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: any;
    output: string;
  };
  compile: {
    stdout: "";
    stderr: "";
    code: 0;
    signal: null;
    output: "";
  };
};

type PistonArgs = {
  language: string;
  version: string;
  files: [
    {
      content: string;
    },
  ];
  stdin?: "";
  args?: string[];
  compile_timeout?: 10000;
  run_timeout?: 3000;
  compile_memory_limit?: -1;
  run_memory_limit?: -1;
};

type LanguageTypes = keyof typeof LANGUAGES;

const customTheme = EditorView.theme({
  "&": {
    fontSize: "14px",
    fontFamily: "'Fira Code', monospace",
  },
  ".cm-scroller": {
    lineHeight: "1.5",
  },
});

const transcripts = graphql(`
  query SayHello($first: String!, $second: String!) {
    transcript(transcriptId: $first, apikey: $second)
  }
`);

export default function CodeEditor() {
  const [stdOut, setStdOut] = useState("");
  const [stdErr, setStdError] = useState("");
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<LanguageTypes>("javascript");
  const [activeTab, setActiveTab] = useState<"stdout" | "stderr">("stdout");

  const { isPending, error, data, mutate } = useMutation({
    mutationKey: ["execute_code"],
    mutationFn: async (args: PistonArgs) => {
      try {
        const req = await axios.post(
          "https://emkc.org/api/v2/piston/execute",
          args,
        );

        const res = req.data as PistonResponse;

        return Promise.resolve(res);
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          return Promise.reject(err.response?.data);
        } else {
          return Promise.reject(err.message);
        }
      }
    },
  });

  const getTranscripts = useMutation({
    mutationKey: ["transcripts"],
    mutationFn: (args: { first: string; second: string }) =>
      execute(transcripts, {
        first: args.first,
        second: args.second,
      }),
  });

  useEffect(() => {
    if (getTranscripts.data) {
      console.log("getTranscripts.data", getTranscripts.data);
    }
  }, [getTranscripts.data]);

  useEffect(() => {
    setCode(SNIPPETS[language]);
  }, [language]);

  useEffect(() => {
    if (data) {
      const stdErr = data.run.stderr;
      const stdOut = data.run.stdout;

      setStdError(stdErr);
      setStdOut(stdOut);

      if (stdErr && stdErr.length > 0) {
        setActiveTab("stderr");
      }

      if ((stdOut && !stdErr) || stdErr.length === 0) {
        setActiveTab("stdout");
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Code error",
        description: `Error: ${error?.message}`,
      });
    }
  }, [error]);

  return (
    <div className="h-screen font-geistMono flex flex-col bg-background text-foreground">
      <nav className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Code editor</h1>
        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => {
              console.log("Clicked");
              getTranscripts.mutate({
                first: "7c675ccd-0f80-4cf2-897d-3190de80db17",
                second: "2e2b74b18a7d4103b1ee2ec3a72830d8",
              });
            }}
          >
            Run Query
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex w-screen overflow-hidden">
        <div className="flex-grow flex w-screen overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full p-2 overflow-auto">
            <Card className="h-full w-full bg-muted p-2 flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <Select
                  value={language}
                  onValueChange={(value: LanguageTypes) => setLanguage(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(LANGUAGES).map((item) => (
                      <SelectItem value={item} key={item}>
                        {item.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {!isPending && (
                  <Button
                    onClick={() => {
                      mutate({
                        files: [
                          {
                            content: code,
                          },
                        ],
                        language,
                        version: LANGUAGES[language],
                      });
                    }}
                    size={"sm"}
                  >
                    Execute
                  </Button>
                )}
                {isPending && (
                  <Button disabled size={"sm"}>
                    Evaluating <Loader className="ml-1 size-4 animate-spin" />
                  </Button>
                )}
              </div>
              <div className="flex-grow bg-background rounded-md p-2 overflow-auto">
                <Suspense fallback={<div>Loading...</div>}>
                  <CodeMirror
                    width="100%"
                    height="100%"
                    theme={[oneDark, customTheme]}
                    value={code}
                    extensions={[loadLanguage(language) as any]}
                    onChange={(code) => setCode(code)}
                    className="text-base h-full w-full"
                  />
                </Suspense>
              </div>
            </Card>
            <Card className="h-full bg-muted p-2 border border-blue-400">
              <Tabs defaultValue="stdout" value={activeTab} className="h-full">
                <TabsList>
                  <TabsTrigger
                    value="stdout"
                    className="border data-[state=active]:border-black"
                  >
                    stdout
                  </TabsTrigger>
                  <TabsTrigger
                    value="stderr"
                    className="border data-[state=active]:border-black"
                  >
                    stderr
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="stdout" className="flex-grow">
                  <div className="h-full bg-background rounded-md p-2 overflow-auto">
                    <pre className="text-sm">{stdOut}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="stderr" className="flex-grow">
                  <div className="h-full bg-background rounded-md p-2 overflow-auto">
                    <pre className="text-sm text-red-500">{stdErr}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
