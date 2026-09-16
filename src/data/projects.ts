import { Project } from '../types'

export const projectsData: Project[] = [
  {
    id: 'custom-survey',
    title: 'CUSTOM SURVEY',
    subtitle: 'Ranked-Choice Group Voting & Live Tabulation Engine',
    description: 'A lightweight, anonymous ranked-choice group decision app engineered for offsites, team activities, and trips. Features animated drag-to-rank card physics with renumbering on drop, live Borda-count leaderboard tabulation, dynamic confetti physics, and an interactive drumroll slider revealing the winning venue with Google Maps integration.',
    tags: ['TYPESCRIPT', 'CLOUDFLARE WORKERS', 'KV STORAGE', 'NODE.JS', 'BORDA COUNT', 'INTERACTIVE UI'],
    githubUrl: 'https://github.com/surudhb/custom-survey',
    date: 'SEP 2026',
    featured: true,
    highlight: 'Zero-account voting using local token authorization with sub-50ms Cloudflare edge latency.'
  },
  {
    id: 'avatar-tla-api',
    title: 'AVATAR: THE LAST AIRBENDER API',
    subtitle: 'RESTful API & Universe Data Service',
    description: 'A comprehensive, high-throughput REST API cataloging characters, nations, elements, and episode transcripts from Avatar: The Last Airbender. Engineered with resilient schema validation, caching, and custom endpoints.',
    tags: ['NODE.JS', 'EXPRESS', 'MONGODB ATLAS', 'REST API', 'PAPER CSS'],
    liveUrl: 'https://avatar-the-last-airbender-api.herokuapp.com/',
    githubUrl: 'https://github.com/surudhb/avatar-the-last-airbender-api',
    date: '2020',
    featured: true,
    highlight: 'Engineered complete relational character graph and full text quote querying.'
  },
  {
    id: 'virtual-arcade',
    title: 'VIRTUAL ARCADE',
    subtitle: 'Real-Time Multiplayer Gaming Platform',
    description: 'Web-based interactive multiplayer gaming hub supporting concurrent room matchmaking, low-latency state synchronization via WebSockets, and immersive browser-based arcade mini-games.',
    tags: ['REACT', 'WEBSOCKETS', 'THREE.JS', 'WEBGL', 'NODE.JS'],
    githubUrl: 'https://github.com/surudhb',
    date: '2021',
    featured: true,
    highlight: 'Sub-30ms bidirectional state synchronization across concurrent clients.'
  },
  {
    id: 'gary-twitter-bot',
    title: 'GARY TWITTER BOT',
    subtitle: 'Automated Micro-Content Engine',
    description: 'Autonomous cron-scheduled daemon streaming algorithmic daily humor, linguistics, and curated GIF pairings directly to Twitter using the Twitter Developer API and serverless workers.',
    tags: ['NODE.JS', 'TWITTER API', 'SERVERLESS', 'AUTOMATION'],
    githubUrl: 'https://github.com/surudhb/first-twitter-bot',
    liveUrl: 'https://twitter.com/GarySquarepan13',
    date: '2020',
    featured: true,
    highlight: 'Zero-downtime execution running headless scheduled tasks.'
  },
  {
    id: 'concentration',
    title: 'CONCENTRATION',
    subtitle: 'Spatial Memory Engine for iOS',
    description: 'Native iOS spatial memory game engineered in Swift using UIKit and MVC architecture. Features fluid card flip physics, adaptive score penalization mechanics, and customized asset rendering.',
    tags: ['SWIFT', 'UIKIT', 'IOS', 'XCODE'],
    githubUrl: 'https://github.com/surudhb/Concentration',
    date: '2019',
    featured: false,
    highlight: 'Strict UIKit view lifecycle management and state persistence.'
  },
  {
    id: 'gatsby-starter',
    title: 'GATSBY DEVELOPER STARTER',
    subtitle: 'Minimalist Engineering Scaffold',
    description: 'Opinionated developer portfolio starter featuring automated Markdown-to-HTML compilation, dynamic OpenGraph tag synthesis, and responsive mobile architecture.',
    tags: ['REACT', 'GATSBY', 'GRAPHQL', 'MARKDOWN', 'SEO'],
    githubUrl: 'https://github.com/surudhb/gatsby-personal-site-template',
    date: '2019',
    featured: false,
    highlight: 'Over 50+ GitHub forks and developer adoptions.'
  },
  {
    id: 'rock-paper-scissors',
    title: 'ROCK PAPER SCISSORS',
    subtitle: 'Algorithmic Probability Duel',
    description: 'Interactive browser game pitting players against a heuristic engine predicting move patterns based on Markov decision chains and psychological player frequency analysis.',
    tags: ['JAVASCRIPT', 'HTML5 CANVAS', 'GAME LOOPS'],
    githubUrl: 'https://github.com/surudhb',
    date: '2018',
    featured: false
  }
]
