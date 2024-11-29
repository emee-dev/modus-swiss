import { Command, Github, Zap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function DevUtilities() {
  const tools = [
    {
      title: "CSV to JSON",
      description:
        "Easily convert CSV data to JSON format with our free tool. Quickest way to turn tabular data into a JSON format for APIs and data processing.",
      href: "/tools/csv-to-json",
    },
    {
      title: "Base64 Encode/Decode",
      description:
        "Easily encode and decode Base64 data with our online utility, so you can transmit your data safely or decode Base64-encoded strings.",
      href: "/tools/base64",
    },
    {
      title: "JSON Formatter",
      description:
        "Format and beautify your JSON data for better readability and debugging. Quickly visualize and organize your JSON data with ease.",
      href: "/tools/json-formatter",
    },
    {
      title: "YAML to JSON",
      description:
        "Easily convert YAML to JSON with our converter. Transform your YAML configuration files into JSON format instantly.",
      href: "/tools/yaml-to-json",
    },
    {
      title: "URL Encode/Decode",
      description:
        "Convert URLs to a safe format with URL encoding and decoding. Handle special characters in URLs with ease.",
      href: "/tools/url-encoder",
    },
    {
      title: "Timestamp to Date Converter",
      description:
        "Paste Unix timestamps and get a human readable date format instantly. Convert between different date formats easily.",
      href: "/tools/timestamp-converter",
    },
  ];

  return (
    <main className="min-h-screen w-screen bg-background">
      <header className="border-b flex h-16 items-center px-4 sm:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Zap className="size-4" />
          <span className="text-xl font-bold">Dev Utils</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="https://github.com/your-repo">Contribute</Link>
          </Button>
          <Button variant="outline" size="icon">
            <Github className="size-4"></Github>
          </Button>
          <Button variant="outline" size="icon">
            <Github className="size-4"></Github>
          </Button>
        </div>
      </header>
      <section className=" w-full px-4 py-12 sm:px-8">
        {/* <div className="mx-auto max-w-[800px] space-y-8 text-center"> */}
        <div className="mx-auto space-y-8 text-center">
          <h1 className="text-4xl font-bold">Dev Utilities</h1>
          <p className="text-xl text-muted-foreground">
            We exist to make developers lives easier.
            <br />
            Here are fast, free, open source, ad-free tools.
          </p>
          <Button
            variant="outline"
            className="h-12 w-full justify-between px-4 sm:w-[400px]"
          >
            <span className="text-muted-foreground">Search</span>
            <kbd className="pointer-events-none flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-sm">
              <Command className="h-4 w-4" /> K
            </kbd>
          </Button>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group rounded-lg border p-6 transition-colors hover:bg-muted/50"
            >
              <h2 className="font-semibold">{tool.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {tool.description}
              </p>
              <Button className="mt-4" variant="secondary" size="sm">
                Try it
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
