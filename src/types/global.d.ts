/// <reference types="navermaps" />

interface Window {
  adsbygoogle: { [key: string]: unknown; push(arg?: object): void };
}

declare var naver: typeof naver;
