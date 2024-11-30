import { sleep } from "./sleep";

// Define the function type for retries
type RetryFunction = (val: string) => bool;

/**
 * Retry a function, it will retry the cb if it's return value is falsy
 */
export function retryWithExponentialBackoff(
  fn: RetryFunction,
  maxRetries: i32,
  initialDelay: i32,
  args: string,
): void {
  let attempts = 0;
  let delay = initialDelay;

  while (attempts < maxRetries) {
    const success = fn(args);
    if (success) {
      // Exit if the function succeeds
      console.log("Function succeeded.");
      return;
    }

    console.log(
      "Attempt " +
        (attempts + 1).toString() +
        " failed. Retrying in " +
        delay.toString() +
        " ms...",
    );
    // Sleep (simulate delay) and increment delay
    sleep(delay);
    delay *= 2;
    attempts++;
  }

  throw new Error(`All attempts failed. Querying transcript with Id: ${args}`);
}
