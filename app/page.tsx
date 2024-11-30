import { Button } from "@/components/ui/button";
import { tools } from "@/consts";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Command, Github, Zap } from "lucide-react";
import Link from "next/link";

export default function DevUtilities() {
  return (
    <main className="min-h-screen w-screen bg-background">
      <header className="border-b flex h-16 items-center px-4 sm:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Zap className="size-4" />
          <span className="text-xl font-bold">Dev tools</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="https://github.com/emee-dev/modus-swiss">
              Contribute
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Link
              href="https://github.com/emee-dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Link
              href="https://x.com/___emee_"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TwitterLogoIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </header>
      <section className=" w-full px-4 py-12 sm:px-8">
        <div className="mx-auto space-y-8 text-center">
          <h1 className="text-4xl font-bold">Dev tools</h1>
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
              <div className="w-full flex mt-4">
                <Button className="ml-auto" variant="secondary" size="sm">
                  Try it
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
