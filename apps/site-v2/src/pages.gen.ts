// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';


// prettier-ignore
type Page =
| { path: '/_root'; render: 'dynamic' }
| { path: '/about'; render: 'dynamic' }
| { path: '/episodes/1/vibe-coding-when-the-vibes-are-off'; render: 'dynamic' }
| { path: '/episodes/2/is-the-web-getting-worse'; render: 'dynamic' }
| { path: '/episodes/3/a-day-in-the-life-coding-coffee-and-commit-messages'; render: 'dynamic' }
| { path: '/episodes/4/perfecting-the-pull-request'; render: 'dynamic' }
| { path: '/episodes/5/testing-is-it-worth-it'; render: 'dynamic' }
| { path: '/episodes/6/scratching-the-surface-on-design-systems'; render: 'dynamic' }
| { path: '/episodes'; render: 'dynamic' }
| { path: '/'; render: 'dynamic' }
| { path: '/search'; render: 'dynamic' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
  