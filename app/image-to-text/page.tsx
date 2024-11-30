"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDescription, tools } from "@/consts";
import { graphql } from "@/graphql";
import { execute } from "@/graphql/execute";
import { useToast } from "@/hooks/use-toast";
import { convertImageToBase64 } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const aiImageToText = graphql(`
  query AiImageToText($base64Img: String!, $prompt: String!) {
    aiImageToText(base64Img: $base64Img, prompt: $prompt)
  }
`);

const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 40 * 1024 * 1024,
      "File size must be less than 40MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "File must be an image (JPEG, PNG, or WebP)",
    ),
  prompt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ImageToText() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { data, isPending, error, mutate } = useMutation({
    mutationKey: ["convert_to_text"],
    mutationFn: (args: { base64Img: string; prompt: string }) =>
      execute(aiImageToText, args),
  });

  useEffect(() => {
    if (error) {
      console.error("ImageToText Error:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [error]);

  const onSubmit = async (values: FormValues) => {
    if (values.file) {
      const base64 = await convertImageToBase64(values.file);

      mutate({
        base64Img: base64.split(",")[1], // exclude the metadata
        prompt: form.getValues("prompt") || "",
      });
    }
  };

  const handleCopy = () => {
    if (data?.data.aiImageToText) {
      navigator.clipboard.writeText(data.data.aiImageToText);
    }
  };

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
          <h1 className="mb-2 text-3xl font-bold">Image to Text</h1>
          <p className="text-gray-500">
            {getDescription("/image-to-text").description}
          </p>
        </div>

        <Card className="mx-auto max-w-xl p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="mb-6 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8">
                        <div className="text-center flex flex-col transition-all group justify-center relative h-[110px]">
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file);
                              }
                            }}
                            accept="image/*"
                          />
                        </div>
                        <p className="text-xs text-gray-400">Max size 40MB</p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <Label htmlFor="prompt">Additional Prompt:</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg Return only the transaction numbers and names."
                        className="mt-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {data?.data?.aiImageToText && (
                <div className="mb-6 mt-6 relative">
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute right-2 top-3"
                    onClick={handleCopy}
                    type="button"
                  >
                    <Copy className="size-4" />
                  </Button>
                  <div className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                    <pre className="text-sm whitespace-pre-wrap break-words">
                      {data?.data?.aiImageToText}
                    </pre>
                  </div>
                </div>
              )}

              <div className="">
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? "Converting..." : "Convert"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
}
