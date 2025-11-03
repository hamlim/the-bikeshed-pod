// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_Episodes1VibeCodingWhenTheVibesAreOffIndex_getConfig } from './pages/episodes/1/vibe-coding-when-the-vibes-are-off/index';
// prettier-ignore
import type { getConfig as File_Episodes10ManagingDependenciesItDependsIndex_getConfig } from './pages/episodes/10/managing-dependencies-it-depends/index';
// prettier-ignore
import type { getConfig as File_Episodes11DeployFastAndBreakThingsIndex_getConfig } from './pages/episodes/11/deploy-fast-and-break-things/index';
// prettier-ignore
import type { getConfig as File_Episodes12IsTheWebScrewedIndex_getConfig } from './pages/episodes/12/is-the-web-screwed/index';
// prettier-ignore
import type { getConfig as File_Episodes2IsTheWebGettingWorseIndex_getConfig } from './pages/episodes/2/is-the-web-getting-worse/index';
// prettier-ignore
import type { getConfig as File_Episodes3ADayInTheLifeCodingCoffeeAndCommitMessagesIndex_getConfig } from './pages/episodes/3/a-day-in-the-life-coding-coffee-and-commit-messages/index';
// prettier-ignore
import type { getConfig as File_Episodes4PerfectingThePullRequestIndex_getConfig } from './pages/episodes/4/perfecting-the-pull-request/index';
// prettier-ignore
import type { getConfig as File_Episodes5TestingIsItWorthItIndex_getConfig } from './pages/episodes/5/testing-is-it-worth-it/index';
// prettier-ignore
import type { getConfig as File_Episodes6ScratchingTheSurfaceOnDesignSystemsIndex_getConfig } from './pages/episodes/6/scratching-the-surface-on-design-systems/index';
// prettier-ignore
import type { getConfig as File_Episodes7DitchTheCareerLadderIndex_getConfig } from './pages/episodes/7/ditch-the-career-ladder/index';
// prettier-ignore
import type { getConfig as File_Episodes8MonorepoMadnessIndex_getConfig } from './pages/episodes/8/monorepo-madness/index';
// prettier-ignore
import type { getConfig as File_Episodes9AreReactServerComponentsRiskyIndex_getConfig } from './pages/episodes/9/are-react-server-components-risky/index';

// prettier-ignore
type Page =
| { path: '/_root'; render: 'dynamic' }
| { path: '/about'; render: 'dynamic' }
| ({ path: '/episodes/1/vibe-coding-when-the-vibes-are-off' } & GetConfigResponse<typeof File_Episodes1VibeCodingWhenTheVibesAreOffIndex_getConfig>)
| ({ path: '/episodes/10/managing-dependencies-it-depends' } & GetConfigResponse<typeof File_Episodes10ManagingDependenciesItDependsIndex_getConfig>)
| ({ path: '/episodes/11/deploy-fast-and-break-things' } & GetConfigResponse<typeof File_Episodes11DeployFastAndBreakThingsIndex_getConfig>)
| ({ path: '/episodes/12/is-the-web-screwed' } & GetConfigResponse<typeof File_Episodes12IsTheWebScrewedIndex_getConfig>)
| ({ path: '/episodes/2/is-the-web-getting-worse' } & GetConfigResponse<typeof File_Episodes2IsTheWebGettingWorseIndex_getConfig>)
| ({ path: '/episodes/3/a-day-in-the-life-coding-coffee-and-commit-messages' } & GetConfigResponse<typeof File_Episodes3ADayInTheLifeCodingCoffeeAndCommitMessagesIndex_getConfig>)
| ({ path: '/episodes/4/perfecting-the-pull-request' } & GetConfigResponse<typeof File_Episodes4PerfectingThePullRequestIndex_getConfig>)
| ({ path: '/episodes/5/testing-is-it-worth-it' } & GetConfigResponse<typeof File_Episodes5TestingIsItWorthItIndex_getConfig>)
| ({ path: '/episodes/6/scratching-the-surface-on-design-systems' } & GetConfigResponse<typeof File_Episodes6ScratchingTheSurfaceOnDesignSystemsIndex_getConfig>)
| ({ path: '/episodes/7/ditch-the-career-ladder' } & GetConfigResponse<typeof File_Episodes7DitchTheCareerLadderIndex_getConfig>)
| ({ path: '/episodes/8/monorepo-madness' } & GetConfigResponse<typeof File_Episodes8MonorepoMadnessIndex_getConfig>)
| ({ path: '/episodes/9/are-react-server-components-risky' } & GetConfigResponse<typeof File_Episodes9AreReactServerComponentsRiskyIndex_getConfig>)
| { path: '/episodes'; render: 'dynamic' }
| { path: '/'; render: 'dynamic' }
| { path: '/search'; render: 'dynamic' }
| { path: '/shows/how-they-work'; render: 'dynamic' }
| { path: '/shows/the-bikeshed-pod'; render: 'dynamic' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
