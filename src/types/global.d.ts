interface Window {
  adsbygoogle: {
    [key: string]: unknown;
    push(arg?: unknown): void;
    loaded?: boolean;
  };
}
