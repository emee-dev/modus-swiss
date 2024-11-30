export function sleep(ms: i64): void {
  const target = Date.now() + ms;

  while (target > Date.now()) {}
}

export function sleepCallback(callback: () => void, ms: i64): void {
  const target = Date.now() + ms;

  while (target > Date.now()) {}

  callback();
}
