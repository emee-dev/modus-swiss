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
