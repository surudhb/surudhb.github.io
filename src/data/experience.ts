import { Experience } from '../types'

export const experienceData: Experience[] = [
  {
    id: 'seeking-new-opportunities',
    company: 'SEEKING NEW OPPORTUNITIES',
    location: 'Remote, Hybrid, Greater Calgary Area, Greater Vancouver Area',
    position: 'Software Engineer',
    period: 'APR 2026 — PRESENT',
    startDate: '2026-04',
    endDate: 'PRESENT',
    links: [
      { label: 'Github', href: 'https://github.com/surudhb' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/surudhb/' },
    ],
    tags: ['REACT', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'POSTGRESQL', 'SYSTEM ARCHITECTURE', 'FULL-STACK', 'DISTRIBUTED SYSTEMS'],
    bullets: [
      'Seeking new opportunities that leverage my experience in full-stack development, technical program management and being a technical liaison to build interesting things.',
    ],
    highlight: 'Experimenting with agentic software development and getting dopamine rushes'
  },
  {
    id: 'career-break',
    company: 'SELF EMPLOYED // CAREER BREAK',
    location: 'Greater Calgary Area, AB',
    position: 'Consultant & Volunteer',
    period: 'APR 2025 — APR 2026',
    startDate: '2025-04',
    endDate: '2026-04',
    tags: ['AI/LLM IN SDLC', 'AGENTIC WORKFLOWS', 'SYSTEM ARCHITECTURE', 'TECHNICAL CONSULTING', 'SABBATICAL'],
    bullets: [
      'Active volunteering, personal milestones, and technical exploration with AI in the SDLC.',
      'Personal projects, motovlogging & riding my MT-03 into the mountains, and exploring the Canadian Rockies.',
    ],
    highlight: 'Dedicated sabbatical focusing on learning, self-development, and athletic/personal milestones.'
  },
  {
    id: 'hypotenuse-tpm',
    company: 'HYPOTENUSE LABS',
    location: 'Greater Toronto Area, ON',
    position: 'Lead Technical Program Manager',
    period: 'APR 2024 — APR 2025',
    startDate: '2024-04',
    endDate: '2025-04',
    link: 'https://www.hypotenuselabs.com/',
    links: [
      {
        label: 'Kaidro - Web3 Gaming',
        title: 'KAIDRO — TRANSMEDIA WEB3 GAMING ECOSYSTEM',
        engagementWindow: 'Apr 2024 – Apr 2025',
        role: 'Lead Technical Program Manager',
        links: [
          { label: 'Kaidro Official', href: 'https://kaidro.com/' },
          { label: 'Ronin Network', href: 'https://roninchain.com/' }
        ],
        bullets: [
          'Steered technical program delivery across game client, smart contract, and web portal teams for a major transmedia gaming franchise on the Ronin network.',
          'Decomposed multi-platform tokenomics and NFT minting requirements into trackable sprint milestones, ensuring zero launch delays across major drop events.',
          'Coordinated the design and delivery of portal infrastructure facilitating frictionless custodial and non-custodial wallet onboarding for non-crypto native players.'
        ],
        tags: ['RONIN NETWORK', 'SMART CONTRACTS', 'TYPESCRIPT', 'SYSTEM ARCHITECTURE', 'TECHNICAL PROGRAM MANAGEMENT', 'WEB3 GAMING']
      },
      {
        label: 'Cultured - Web3 Prediction Market',
        title: 'CULTURED — DECENTRALIZED PREDICTION MARKETS',
        engagementWindow: 'Mid 2024',
        role: 'Technical Program Manager',
        links: [
          { label: 'Cultured App', href: 'https://www.cultured.finance/' }
        ],
        bullets: [
          'Led technical program management for a high-frequency decentralized prediction market platform on emerging EVM chains.',
          'Coordinated market resolution oracle integrations, liquidity pool mechanics, and real-time odds calculation service delivery.',
          'Unified delivery cadences across frontend client interfaces, smart contract security audits, and backend indexing subgraphs.'
        ],
        tags: ['EVM', 'ORACLES', 'SUBGRAPHS', 'TYPESCRIPT', 'SMART CONTRACTS', 'PREDICTION MARKETS', 'DEFI']
      },
      {
        label: 'Mansa Finance - Web3 Settlements',
        title: 'MANSA FINANCE — CROSS-BORDER LIQUIDITY PROTOCOL',
        engagementWindow: '2024',
        role: 'Technical Program Manager',
        links: [
          { label: 'Mansa Platform', href: 'https://mansa.xyz/' }
        ],
        bullets: [
          'Managed technical delivery for an institutional decentralized liquidity protocol financing cross-border trade payments in emerging markets.',
          'Facilitated requirement alignment between fintech liquidity providers, smart contract auditors, and regulatory compliance stakeholders.',
          'Oversaw risk mitigation strategies and deployment timelines across staging testnets and production.'
        ],
        tags: ['SMART CONTRACTS', 'CROSS-BORDER PAYMENTS', 'FINTECH', 'DEFI', 'DELIVERY RISK']
      },
      {
        label: 'Ambient Finance - Web3 Exchange',
        title: 'AMBIENT FINANCE — ZERO-TO-ONE DEX PLATFORM',
        engagementWindow: '2023 – 2024',
        role: 'Technical Program Manager & Release Lead',
        links: [
          { label: 'Ambient Finance App', href: 'https://ambient.finance/' },
          { label: 'Documentation', href: 'https://docs.ambient.finance/' }
        ],
        bullets: [
          'Cut delivery cycle time from 14+ days to under 7 on Ambient, a $4B+ trading platform, by tracing user drop-off to an unsustainable hotfix rate and overhauling release practices.',
          'Eliminated preventable downtime by implementing continuous integration verification, automated smoke tests on testnets, and environment health checks against mainnet.',
          'Streamlined cross-functional engineering handoffs between core protocol researchers, contract engineers, and frontend teams.'
        ],
        tags: ['REACT', 'TYPESCRIPT', 'CI/CD', 'AUTOMATED TESTING', 'RELEASE ENGINEERING', 'DEX', 'DEFI']
      },
      {
        label: 'Animoca Brands - Web3',
        title: 'ANIMOCA BRANDS — ECOSYSTEM INITIATIVES',
        engagementWindow: '2024',
        role: 'Technical Program Manager',
        links: [
          { label: 'Animoca Brands', href: 'https://www.animocabrands.com/' }
        ],
        bullets: [
          'Managed cross-portfolio program delivery coordination across select partner gaming studios and infrastructure initiatives.',
          'Established transparent RYG reporting cadences tracking shared milestone dependencies and unblocking partner integrations.'
        ],
        tags: ['ECOSYSTEM DELIVERY', 'XFN MANAGEMENT', 'WEB3 GAMING']
      },
      {
        label: 'Berachain - Web3',
        title: 'BERACHAIN — ECOSYSTEM PROTOCOL DELIVERY',
        engagementWindow: '2024',
        role: 'Technical Program Manager',
        links: [
          { label: 'Berachain Network', href: 'https://www.berachain.com/' }
        ],
        bullets: [
          'Coordinated protocol deployment roadmap and testing cadences for ecosystem partners preparing for testnet launch.',
          'Aligned partner developer teams on Proof-of-Liquidity mechanics and validator tooling integration requirements.'
        ],
        tags: ['PROOF-OF-LIQUIDITY', 'L1 INFRASTRUCTURE', 'VALIDATOR TOOLING', 'TPM']
      },
      {
        label: 'Internal Contributions - Ops & Scaling',
        title: 'HYPOTENUSE LABS — OPERATIONS, SCALING & INTERNAL CONTRIBUTIONS',
        engagementWindow: 'Apr 2024 – Apr 2025',
        role: 'Lead Technical Program Manager',
        links: [
          { label: 'Hypotenuse Labs', href: 'https://www.hypotenuselabs.com/' }
        ],
        bullets: [
          'Synthesized multi-product technical documentation standards across the company (PRDs, Linear tickets, release notes, compliance logs) into formal R&D methodologies, securing over $1.2M+ in Canadian government SR&ED tax incentives.',
          'Created and championed project one-pagers ("Black Books") in Notion, centralizing business objectives, system architecture, invariants, and technical debt ("dirty laundry") to ensure 100% project context survival during lead rotations.',
          'Drafted and enforced the Policy on Scoping and Project Proposals, instituting a structured sales-to-engineering handoff that captured critical unknowns early and eliminated ad-hoc kickoff delays.',
          'Authored the formal On-Call Service Level Agreement (SLA), instituting strict <30-minute response times for Critical (SEV-1) production incidents (e.g., liquidation engine failures, contract exploits) while protecting developer bandwidth from non-emergency escalations.',
          'Spearheaded the organizational transition to a globally distributed contractor model, designing structured onboarding systems, timezone-aware async communication cadences, and regular 1:1 check-ins across global team members.',
          'Partnered with executive leadership to extract technical metrics from 12+ completed portfolio programs (including Ambient, The Archivist, Disa, Shrapnel, Aptos DX Audit), authoring master case study assets that accelerated enterprise sales conversion.',
          'Standardized the candidate assessment methodology, establishing a multi-vector qualitative rating formula (Recruiting + Pairing + Technical + Resume) backed by leadership sanity checks to ensure candidates hit the Senior or Intermediate-Senior bar.',
          'Instituted the Monday/Wednesday/Friday check-in cadence (commitments, mid-sprint progress, retrospectives) and enforced the 4P Test (People, Purpose, Process, Product) to eliminate low-value meetings across all active accounts.'
        ],
        tags: ['NOTION', 'LINEAR', 'SR&ED TAX INCENTIVES', 'ON-CALL SLAS', 'SYSTEM ARCHITECTURE', 'SDLC PLAYBOOKS', 'TECHNICAL PROGRAM MANAGEMENT', 'OPERATIONS']
      },
    ],
    tags: ['TYPESCRIPT', 'PYTHON', 'POSTGRESQL', 'AWS', 'DOCKER', 'SYSTEM ARCHITECTURE', 'RELEASE ENGINEERING', 'SDLC', 'TECHNICAL PROGRAM MANAGEMENT', 'FINTECH', 'SR&ED'],
    bullets: [
      'Owned end-to-end delivery across 10+ concurrent SaaS programs in fin-tech and e-commerce, reducing leadership escalations to 0 from scoping to launch as the single point of accountability on scope, timeline, and delivery risk.',
      'Recovered a joint venture stalled by 7 months of requirement misalignment, re-establishing a single source of truth on scope, decomposing partner requirements into tracked deliverables, and eliminating $1.2M in idle spend.',
      'Cut delivery cycle time from 14+ days to under 7 on Ambient, a $4B+ trading platform, by tracing user drop-off to an unsustainable hotfix rate, overhauling release practices, and eliminating preventable downtime.',
      'Unlocked $3M+ in net new value across select programs by replacing ad-hoc updates with a trusted RYG reporting cadence, giving leadership decision-ready visibility.',
      'Eliminated $1.5M in annualized cost by building portfolio-wide visibility into skills gaps and delivery risk, converting precautionary contractor hiring into evidence-based staffing decisions.',
      'Streamlined qualification for $1.4M+ in government R&D (SR&ED) grants by standardizing technical documentation and continuous evidence collection across a $10M+ portfolio.'
    ],
    highlight: 'Founding TPM role steering a $10M+ client portfolio, establishing delivery predictability across distributed teams.'
  },
  {
    id: 'hypotenuse-swe',
    company: 'HYPOTENUSE LABS',
    location: 'Greater Toronto Area, ON',
    position: 'Software Engineer',
    period: 'JUN 2021 — APR 2024',
    startDate: '2021-06',
    endDate: '2024-04',
    link: 'https://www.hypotenuselabs.com/',
    links: [
      {
        label: 'The Archivist - Resale E-commerce',
        title: 'THE ARCHIVIST — LUXURY RESALE E-COMMERCE',
        engagementWindow: 'Dec 2020 – May 2022',
        role: 'Founding Software Engineer & Lead Frontend Engineer',
        links: [
          { label: 'Highsnobiety Feature', href: 'https://www.highsnobiety.com/p/archivist-interview/' },
          { label: 'Business of Fashion Feature', href: 'https://www.businessoffashion.com/articles/technology/new-resale-start-up-sees-data-as-the-answer-to-courting-luxury-brands/' },
        ],
        bullets: [
          'Owned the React frontend development and architecture for the white-label luxury marketplace, Seller Hub, and Corporate Information System from 0-to-1 prototype through production launch (LVMH Innovation Award finalist, Vogue-featured).',
          'Processed 1M+ products/day by architecting high-throughput data ingestion ETL pipelines utilizing Python, ScrapingBee, AWS Lambda, SQS, and PostgreSQL.',
          'Built a complete checkout and billing overhaul integrating Stripe Invoicing and the (at-the-time invite-only) Stripe Tax system, generating itemized invoices',
          'Streamlined backend checkout logic and state machine by eliminating redundant API calls, adding a "finalized" status field on orders to prevent spoofing, and adding checkout pagination.',
          'Migrated the analytics pipeline to TimescaleDB for handling time-series data, building real-time dashboard stats (GMV, daily % change) with materialized views for fast reads.',
          'Developed "Godmode" admin features including vendor-specific data filtering, content moderation UIs (vendor banning/approval), and multi-format export tools (Customer CSVs, Vendor CSVs, and expanded summary PDFs).',
          'Refactored and maintained resilient web scrapers targeting Farfetch, TheRealReal, eBay, Poshmark, StockX, and Goat to adapt to evolving bot-detection measures across luxury resale platforms.',
          'Built transactional HTML email templates (order confirmations, shipping updates, verification), vendor product listing draft states, payment method selection, and navbar mobile support.'
        ],
        tags: ['REACT', 'TYPESCRIPT', 'PYTHON (FLASK)', 'POSTGRESQL', 'TIMESCALEDB', 'STRIPE', 'ALGOLIA', 'AWS (LAMBDA/SQS)', 'DATADOG', 'E-COMMERCE', 'LUXURY RESALE']
      },
      {
        label: 'Skio - Shopify Subscriptions',
        title: 'SKIO — ENTERPRISE SHOPIFY SUBSCRIPTIONS & MIGRATIONS',
        engagementWindow: 'Jul 25 – Oct 24, 2022',
        role: 'Data Analytics & Scripting Engineer / IC',
        links: [
          { label: 'Skio Platform', href: 'https://www.skio.com/' },
          { label: 'Shopify App Store', href: 'https://apps.shopify.com/skio' }
        ],
        bullets: [
          'Built vendor-specific Python data-normalization scripts to execute automated product catalog and subscription migrations from Shopify to Skio.',
          'Resolved complex edge cases where non-standard vendor product structures caused SKU mismatching, metadata corruption, or incorrect subscription plan mapping.',
          'Engineered performant, headless subscription checkout extensions and customer portal widgets for high-volume enterprise Shopify Plus merchants with near-zero impact on storefront Core Web Vitals.'
        ],
        tags: ['PYTHON', 'SQL', 'SHOPIFY API', 'SKIO API', 'NODE.JS', 'DATA MIGRATIONS', 'SUBSCRIPTIONS']
      },
      {
        label: 'Ambient Finance - Web3 Exchange',
        title: 'AMBIENT FINANCE — FRONTEND ARCHITECTURE & REFACTOR',
        engagementWindow: 'May 22, 2023 – Jan 8, 2024',
        role: 'Lead Frontend Developer / Frontend Refactor & Execution Lead',
        links: [
          { label: 'Ambient Finance App', href: 'https://ambient.finance/' },
          { label: 'Ambient - Github', href: 'https://github.com/CrocSwap/ambient-spot' }
        ],
        bullets: [
          'Led a large-scale, multi-month refactor of a high-concurrency DEX codebase combining concentrated and ambient constant-product liquidity ($4B+ cumulative volume).',
          'Deleted 50,000+ lines of redundant/dead code (eliminating duplicate files like widget.tsx, widget2.tsx), and split 3,000–5,000 line monolith files into clean modules capped at 500 lines.',
          'Upgraded React, restructured state management using React Contexts, and eliminated nested useEffect hooks that caused component flickering, race conditions, and unnecessary re-renders.',
          'Modernized build pipelines by migrating to Vite and progressively migrating from Styled Components to Tailwind CSS, eliminating thousands of lines of overridden CSS files.',
          'Implemented pre-commit hooks, strict TypeScript linting, unit tests for math-heavy code, bi-weekly PR review cadences, and GitHub issue template enforcement.'
        ],
        tags: ['REACT', 'TYPESCRIPT', 'VITE', 'TAILWIND CSS', 'STYLED COMPONENTS', 'REACT CONTEXTS', 'GITHUB ACTIONS', 'DEX', 'DEFI']
      },
      {
        label: 'Kaskade - Web3 Rewards Platform',
        title: 'KASKADE — GAMIFIED LIQUIDITY & REWARDS ENGINE',
        engagementWindow: 'Jan 15 – Mar 18, 2024',
        role: 'Lead Frontend Engineer',
        links: [
          { label: 'Kaskade Finance - X', href: 'https://x.com/Kaskade_Finance' },
        ],
        bullets: [
          'Engineered custom frontend components and application pages to support tiered reward multiplier campaigns that incentivized token swapping across specific liquidity pools.',
          'Forked and streamlined the Uniswap v3 interface codebase, stripping out unnecessary components to leave a lean UI tailored to Kaskade\'s brand.',
          'Integrated custom campaign frontend with Uniswap\'s DEX aggregator order router and connected on-chain/off-chain data services with backend engineers.',
          'Onboarded and mentored incoming client engineers on the codebase to ensure continuous delivery.'
        ],
        tags: ['REACT', 'TYPESCRIPT', 'UNISWAP V3', 'WEB3.JS / ETHERS.JS', 'SUPABASE', 'AWS', 'DEFI', 'INCENTIVE MECHANISMS']
      },
      {
        label: 'Conductive.ai - Staking & Analytics',
        title: 'CONDUCTIVE.AI — HYPERPERK & SOFTSTAKING PLATFORM',
        engagementWindow: 'May 9 – Jul 25, 2022',
        role: 'Frontend Engineer / IC with partial product ownership',
        links: [
          { label: 'Company Profile', href: 'https://www.linkedin.com/company/conductiveai/about/' }
        ],
        bullets: [
          'Developed user-facing frontend components and state architecture for Hyperperk SoftStaking, an off-chain token staking microservice designed as a Web2 alternative to smart contracts.',
          'Implemented UI and validation logic for staking epoch increments, reward token claims, unstaking actions, and admin payout authorization.',
          'Worked independently to adapt frontend structures as backend requirements and staking pool definitions evolved without a fixed product manager.',
          'Engineered web3 game analytics dashboard components providing game studios with real-time on-chain player retention and attribution insights.'
        ],
        tags: ['REACT', 'TYPESCRIPT', 'PYTHON (FASTAPI)', 'PEEWEE ORM', 'POSTGRESQL', 'DOCKER', 'LINEAR', 'WEB3 GAMING', 'TOKEN STAKING']
      },
      {
        label: 'Highstreet - Metaverse Marketplace',
        title: 'HIGHSTREET — COMMERCE-DRIVEN METAVERSE & NFT MARKETPLACE',
        engagementWindow: 'Jan 17 – Feb 28, 2022',
        role: 'Frontend Engineer (IC)',
        links: [
          { label: 'Highstreet Market', href: 'https://www.highstreet.market/' }
        ],
        bullets: [
          'Engineered a server-validated, environment-variable-configurable countdown timer; prevented tech-savvy users from bypassing client-side clocks to leak upcoming NFT drop details early.',
          'Contributed to a unified hybrid authentication scheme linking Web2 Auth0 accounts with Web3 MetaMask wallets for seamless phygital commerce.',
          'Onboarded to build core launch features, including an NFT marketplace visibility toggle to reveal upcoming product drops, header navigation, and marketplace layouts from Figma.'
        ],
        tags: ['REACT', 'TYPESCRIPT', 'AUTH0', 'METAMASK', 'SASS', 'BOOTSTRAP', 'HEROKU', 'WEB3 COMMERCE', 'NFT MARKETPLACE']
      },
      {
        label: 'Ampleforth - Web3 Lending',
        title: 'AMPLEFORTH — DECENTRALIZED LENDING PROTOCOL',
        engagementWindow: 'Early Full-Time IC Phase',
        role: 'Frontend Individual Contributor (IC)',
        links: [
          { label: 'Ampleforth Protocol', href: 'https://www.ampleforth.org/' },
          { label: 'Token Geyser V2 - Github', href: 'https://github.com/fragmentsorg/token-geyser-v2' }
        ],
        bullets: [
          'Integrated smart contracts to deposit AMPL into ButtonTranche contracts, splitting tokens into risk-stratified tranches (stable/unstable) and converting tranches into USDT/USDC via Uniswap.',
          'Built the React frontend integrated with MetaMask for a pseudonymous, zero-interest USDT lending application using AMPL elastic-supply tokens as collateral.',
          'Designed and developed the collateral selection UI, interest-rate-versus-collateral charts, and automated selection logic to deposit funds into perpetual bonds.',
          'Constructed the "My Loans" page displaying active loan positions, backing bond values, tranche ratios, and maturation dates.',
          'Built a "Pro/Advanced" interface for liquidity providers to search, filter, and deposit AMPL directly into specific ButtonTranche contracts via Buttonwood Subgraphs.'
        ],
        tags: ['REACT', 'TYPESCRIPT', 'WEB3.JS / ETHERS.JS', 'GRAPHQL (SUBGRAPHS)', 'METAMASK', 'UNISWAP', 'DEFI', 'DECENTRALIZED LENDING']
      },
      {
        label: 'Disa - iOS Fitness Platform',
        title: 'DISA — IOS & WATCHOS FITNESS PLATFORM',
        engagementWindow: 'Nov 24, 2022 – May 8, 2023',
        role: 'Full-Stack Mobile Engineer & Product Lead (2-person team)',
        bullets: [
          'Built an Apple Watch and iOS fitness tracking app from concept to App Store launch in 4 months using SwiftUI as engineering lead on a 2-person team.',
          'Bypassed watchOS Firebase SDK limitations by building a custom REST API layer with manual Swift JSON encoders/decoders to interface directly with Cloud Firestore.',
          'Designed and developed a standalone watch-only interface enabling students to find workouts, check into classes, and review performance metrics without a phone.',
          'Integrated IPFS and Polygon L2 smart contracts to cryptographically log student KPI evaluations on-chain.',
          'Implemented location-based check-in/out logic via Apple\'s CoreLocation framework, and prototyped proximity-based session-verification mechanics using acoustic and haptic signals as an experimental alternative to GPS check-in.',
          'Managed App Store submission, screenshots, Apple UX compliance, and TestFlight builds.'
        ],
        tags: ['SWIFT', 'SWIFTUI', 'WATCHOS', 'CLOUDFIRESTORE (REST API)', 'FIREBASE AUTH', 'XCODE', 'WEARABLES']
      },
      {
        label: 'Kaidro - Web3 Gaming',
        title: 'KAIDRO — GAMING WEB PORTAL & TOKEN LAUNCH',
        engagementWindow: 'Late 2023 – Early 2024',
        role: 'Full-Stack Software Engineer',
        links: [
          { label: 'Kaidro Official', href: 'https://kaidro.com/' },
          { label: 'Ronin Network', href: 'https://roninchain.com/' }
        ],
        bullets: [
          'Engineered full-stack portal features for NFT avatar customization, staking pools, and quest reward progression.',
          'Implemented responsive web3 wallet connection flows supporting Ronin, MetaMask, and WalletConnect.'
        ],
        tags: ['TYPESCRIPT', 'NEXT.JS', 'RONIN NETWORK', 'SMART CONTRACTS', 'WEB3 GAMING']
      },
      {
        label: 'Internal Contributions - Engineering & Culture',
        title: 'HYPOTENUSE LABS — ENGINEERING CULTURE & INTERNAL CONTRIBUTIONS',
        engagementWindow: 'Jun 2021 – Apr 2024',
        role: 'Software Engineer',
        links: [
          { label: 'Hypotenuse Labs', href: 'https://www.hypotenuselabs.com/' }
        ],
        bullets: [
          'Co-authored and executed the standardized technical pair-programming interview process using custom sandbox codebases (hype-coin for Web3/Blockchain and texas-hypem-web3 for Full-Stack), establishing a strict rubric prioritizing collaborative problem-solving and architectural reasoning.',
          'Established an interviewer shadowing framework where intermediate and senior engineers completed 3–4 live pairing observation sessions before leading technical evaluations independently, standardizing candidate scoring across the engineering org.',
          'Structured and led an engineering mentorship program pairing full-time senior engineers with contract developers (~5 hours/week), cross-pollinating code quality standards, conducting architecture reviews, and providing technical safety nets.',
          'Co-created project one-pagers ("Black Books") in Notion to document system architecture, core API constants, and technical debt ("dirty laundry"), ensuring new engineering joiners could onboard and ship code within days.',
          'Designed framework proposals to upskill engineers during bench periods (including shadowing senior leads on Solana smart contract implementations), facilitating cross-chain and full-stack technical growth without disrupting client delivery.',
          'Personally conducted technical pairing rounds and culture evaluations across major engineering hiring pushes, maintaining a rigorous technical bar for Senior and Intermediate-Senior full-stack and web3 talent.',
          'Extracted technical benchmarks, architecture diagrams, and performance achievements from completed engineering engagements (including The Archivist, Ambient Finance, and Disa) for master case study documentation.'
        ],
        tags: ['PAIR PROGRAMMING', 'TECHNICAL EVALUATION', 'SYSTEM ARCHITECTURE', 'ENGINEERING MENTORSHIP', 'DEVELOPER ONBOARDING', 'CODE QUALITY', 'FULL-STACK']
      },
    ],
    tags: ['REACT', 'TYPESCRIPT', 'PYTHON/FLASK', 'SWIFT/SWIFTUI', 'POSTGRESQL', 'TIMESCALEDB', 'REDIS', 'AWS (LAMBDA/SQS)', 'DOCKER', 'ETHERS.JS', 'FULL-STACK', 'DEFI', 'E-COMMERCE'],
    bullets: [
      'Processed 1M+ products/day for The Archivist by architecting high-throughput data ingestion ETL pipelines utilizing Python, ScrapingBee, AWS Lambda, SQS, and PostgreSQL.',
      'Delivered The Archivist’s resale analytics dashboard, enabling real-time market insights by designing interactive visualizations (Recharts) backed by custom APIs and data stores (Flask, Redis, Algolia).',
      'Increased team velocity by roughly 66% (empowering a 3-person team to exceed a prior 5-person team’s output) and cleared a months-long PR backlog by restructuring sprint cadences and acceptance criteria as lead customer-facing engineer.',
      'Delivered custom gamification mechanisms for a DEX aggregator reward platform by engineering tiered-multiplier campaign logic atop a Uniswap v3 React fork, successfully leading client demos and onboarding new engineers.',
      'Trimmed 10–15K lines of application code and resolved UX and performance-degrading bugs on Ambient, a $4B+ trading platform, by leading a multi-month React refactor standardizing components and migrating state management to React Context.'
    ],
    highlight: 'Scaled 6 production platforms, deployed 1M+ product/day ingestion pipelines, and led client-facing delivery.'
  },
  {
    id: 'hypotenuse-freelance',
    company: 'HYPOTENUSE LABS',
    location: 'Greater Toronto Area, ON',
    position: 'Freelance Software Engineer',
    period: 'DEC 2020 — JUN 2021',
    startDate: '2020-12',
    endDate: '2021-06',
    link: 'https://www.hypotenuselabs.com/',
    links: [
      {
        label: 'The Archivist - Resale E-commerce',
        title: 'THE ARCHIVIST — 0-TO-1 FRONTEND ARCHITECTURE',
        engagementWindow: 'Dec 2020 – Jun 2021',
        role: 'Freelance Software Engineer & Frontend Architect',
        links: [
          { label: 'Business of Fashion Feature', href: 'https://www.businessoffashion.com/articles/technology/new-resale-start-up-sees-data-as-the-answer-to-courting-luxury-brands/' },
        ],
        bullets: [
          'Co-architected the React marketplace frontend for The Archivist, an LVMH award-finalist and Vogue-featured resale platform.',
          'Established core frontend patterns, responsive typography, and client-side caching strategies from initial 0-to-1 prototype to production launch.'
        ],
        tags: ['REACT', 'TYPESCRIPT', 'PYTHON/FLASK', 'JEST', 'BOOTSTRAP', 'FRONTEND ARCHITECTURE', 'E-COMMERCE', 'LUXURY RESALE']
      },
    ],
    tags: ['REACT', 'TYPESCRIPT', 'PYTHON/FLASK', 'JEST', 'POSTGRESQL', 'FRONTEND ARCHITECTURE', 'E-COMMERCE', 'LUXURY RESALE'],
    bullets: [
      'Co-architected the React marketplace frontend for The Archivist, an LVMH award-finalist and Vogue-featured resale platform.',
      'Established core frontend patterns, responsive typography, and client-side caching strategies from initial 0-to-1 prototype to production launch.'
    ],
    highlight: 'Frontend architecture for LVMH Innovation Award finalist featured in Vogue Business and Business of Fashion.'
  },
  {
    id: 'futureadvisor-coop',
    company: 'BLACKROCK (FUTUREADVISOR)',
    location: 'SAN FRANCISCO, CA',
    position: 'Software Engineering Intern',
    period: 'JAN 2017 — DEC 2017',
    startDate: '2017-01',
    endDate: '2017-12',
    link: 'https://www.ycombinator.com/companies/futureadvisor',
    tags: ['REACT', 'TYPESCRIPT', 'RUBY ON RAILS', 'WEBPACK', 'DOCKER', 'STORYBOOK.JS', 'JEST', 'WEALTH MANAGEMENT', 'FINTECH'],
    bullets: [
      'Migrated authentication and dashboard components from native JS and jQuery to React.js, improving client rendering performance.',
      'Built and maintained a shared UI component library deployed across a dozen major institutional banking portals in React Storybook.',
      'Spearheaded core backend asset pipeline migration from legacy Ruby Sprockets to Webpack, speeding up builds by ~30%.',
      'Authored and pitched an RFC proposing containerized developer environments during the hackathon, reducing engineer onboarding from 1 week to 1 day.'
    ],
    highlight: 'Two consecutive terms mastering frontend scale and developer infrastructure across BlackRock client platforms.'
  },
  {
    id: 'medlantis-coop',
    company: 'MEDLANTIS',
    location: 'Greater Toronto Area, ON',
    position: 'Full-Stack Developer Intern',
    period: 'MAY 2016 — SEP 2016',
    startDate: '2016-05',
    endDate: '2016-09',
    link: 'https://medlantis.thinkific.com/',
    tags: ['PYTHON', 'PHP', 'AUTH0', 'MIXPANEL', 'SCIKIT-LEARN (K-MEANS)', 'REST APIS', 'HEALTHTECH'],
    bullets: [
      'Built a personalized video-lessons recommendation engine based on k-means clustering in Python for medical continuing education.',
      'Refactored identity and user authentication services with Auth0 integration, augmenting analytical instrumentation via Mixpanel.',
      'Served as interim engineering manager and scrum master for a 4-person intern team, leading bi-weekly sprint planning and retrospectives.'
    ],
    highlight: 'Algorithmic machine-learning clustering combined with intern engineering leadership.'
  },
  {
    id: 'rvh-coop',
    company: 'ROYAL VICTORIA REGIONAL HEALTH CENTRE',
    location: 'BARRIE, ON',
    position: 'iOS Developer Intern',
    period: 'SEP 2015 — DEC 2015',
    startDate: '2015-09',
    endDate: '2015-12',
    link: 'https://www.rvh.on.ca/',
    tags: ['SWIFT', 'UIKIT', 'ASP.NET', 'SQL SERVER', 'XCTEST', 'REST APIS', 'CLINICAL MOBILITY', 'HEALTHTECH'],
    bullets: [
      'Independently built an iOS-native hospital inventory data-visualization mobile app in Swift for clinical operations.',
      'Achieved >90% code coverage across the application using Quick and XCTest.',
      'Engineered backend data pipelines and REST endpoints in ASP.NET and SQL Server to aggregate hospital asset records.'
    ],
    highlight: 'Commended at provincial Ignite Research Conference for clinical mobility app.'
  },
  {
    id: 'solink-coop',
    company: 'SOLINK',
    location: 'OTTAWA, ON',
    position: 'DevOps Engineering Intern',
    period: 'JAN 2015 — APR 2015',
    startDate: '2015-01',
    endDate: '2015-04',
    link: 'https://solink.com/',
    tags: ['PYTHON', 'PUPPET', 'OPENCV', 'POWERSHELL', 'AUTOMATION', 'COMPUTER VISION', 'IOT'],
    bullets: [
      'Replaced an in-person client deployment process with a remote, version-controlled automation service using Puppet.',
      'Shipped Python improvements to an edge image-processing and video-analytics platform, reducing overexposure and lighting errors.'
    ],
    highlight: 'Modernized hardware fleet automation and edge computer-vision detection fidelity.'
  }
]
