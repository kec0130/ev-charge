// Next.js checks types before the Contentlayer webpack plugin runs.
// Use its generator directly to also avoid the 0.3.x CLI exitCode bug on modern Node.
import '@contentlayer/utils/effect/Tracing/Enable';
import { generateDotpkg, getConfig, logGenerateInfo, runMain } from 'contentlayer/core';
import { pipe, T } from '@contentlayer/utils/effect';

await runMain({ tracingServiceName: 'ev-charge-content-build', verbose: false })(
  pipe(
    getConfig({}),
    T.chain((config) => generateDotpkg({ config, verbose: false })),
    T.tap(logGenerateInfo)
  )
);
