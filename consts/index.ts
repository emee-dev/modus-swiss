export const LANGUAGES = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
} as const;

export const SNIPPETS = {
  javascript: `\n// Find the sum of all numbers in an array\nfunction sumArray(arr) {\n\treturn arr.reduce((sum, num) => sum + num, 0);\n}\n\nconsole.log(sumArray([1, 2, 3, 4])); // Output: 10\n`,
  typescript: `\n// Check if a string is a palindrome\ntype Params = {\n\tinput: string;\n}\n\nfunction isPalindrome({ input }: Params): boolean {\n\tconst reversed = input.split("").reverse().join("");\n\treturn input === reversed;\n}\n\nconsole.log(isPalindrome({ input: "radar" })); // Output: true\n`,
  python: `\n# Find the factorial of a number\ndef factorial(n):\n\tif n == 0 or n == 1:\n\t\treturn 1\n\telse:\n\t\treturn n * factorial(n - 1)\n\nprint(factorial(5)) # Output: 120\n`,
} as const;

export const tools = [
  {
    title: "Code Editor with co-pilot",
    description:
      "An online code editor that allows you to easily prototype and evaluate code. Comes with copilot.",
    href: "/code-editor",
  },
  {
    title: "Image to Text",
    description:
      "Easily extract key details from documents such as reciepts, bank notes etc.",
    href: "/image-to-text",
  },
  {
    title: "Video Transcripts",
    description:
      "Generate highly accurate video transcripts with the option to summarize using AI-powered language models.",
    href: "/video-transcripts",
  },
] as const;

type Href = (typeof tools)[number]["href"];

export const getDescription = (href: Href) => {
  return tools.find((item) => item.href === href) as (typeof tools)[number];
};
