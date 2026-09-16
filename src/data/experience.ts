import { Experience } from '../types'

export const experienceData: Experience[] = [
    {
    id: 'seeking-new-opportunities',
    company: 'SEEKING NEW OPPORTUNITIES',
    location: 'REMOTE, HYBRID, GREATER CALGARY AREA, GREATER VANCOUVER AREA',
    position: 'Software Engineer',
    period: 'APR 2026 — PRESENT',
    startDate: '2026-04',
    endDate: 'PRESENT',
    tags: ['Software Engineer', 'Frontend Engineer', 'Backend Engineer', 'Solutions Engineer'],
    bullets: [
      'Seeking new opportunities that leverage my experience in full-stack development, technical program management and being a technical liaison to build interesting things.',
    ],
    highlight: 'Experimenting with agentic software development and getting dopamine rushes'
  },
  {
    id: 'career-break',
    company: 'SELF EMPLOYED // CAREER BREAK',
    location: 'GREATER CALGARY AREA, AB',
    position: 'Consultant & Volunteer',
    period: 'APR 2025 — APR 2026',
    startDate: '2025-04',
    endDate: '2026-04',
    tags: ['CONSULTING', 'VOLUNTEERING', 'SIDE QUESTS', 'PERSONAL FINANCE'],
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
    link: 'https://hypotenuse.ca/',
    tags: ['PROGRAM MANAGEMENT', 'DELIVERY', 'FINTECH', 'RISK MITIGATION', 'SR&ED', 'LINEAR'],
    bullets: [
      'Owned end-to-end delivery across 10+ concurrent SaaS programs in fin-tech and e-commerce, reducing leadership escalations to 0 from scoping to launch as the single point of accountability on scope, timeline, and delivery risk.',
      'Recovered a joint venture stalled by 7 months of requirement misalignment, re-establishing a single source of truth on scope, decomposing partner requirements into tracked deliverables, and eliminating $1.2M in idle spend.',
      'Cut delivery cycle time from 14+ days to under 7 on Ambient, a $4B+ trading platform, by tracing user drop-off to an unsustainable hotfix rate, overhauling release practices, and eliminating preventable downtime.',
      'Unlocked upwards of $3M+ in net new value across select programs by replacing ad-hoc updates with a trusted RYG reporting cadence, giving leadership decision-ready visibility.',
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
    link: 'https://hypotenuse.ca/',
    tags: ['REACT', 'TYPESCRIPT', 'PYTHON', 'DOCKER', 'AWS LAMBDA', 'SQS', 'POSTGRESQL', 'REDIS', 'DIGITALOCEAN'],
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
    link: 'https://hypotenuse.ca/',
    tags: ['REACT', 'TYPESCRIPT', 'TAILWIND', 'VOGUE FEATURED', 'E-COMMERCE'],
    bullets: [
      'Co-architected the React marketplace frontend for The Archivist, an LVMH award-finalist and Vogue-featured resale platform.',
      'Established core frontend patterns, responsive typography, and client-side caching strategies from initial 0-to-1 prototype to production launch.'
    ],
    highlight: 'Frontend architecture for LVMH Innovation Award finalist featured in Vogue and Forbes.'
  },
  {
    id: 'futureadvisor-coop',
    company: 'BLACKROCK (FUTUREADVISOR)',
    location: 'SAN FRANCISCO, CA',
    position: 'Software Engineering Intern',
    period: 'JAN 2017 — DEC 2017',
    startDate: '2017-01',
    endDate: '2017-12',
    link: 'https://app.futureadvisor.com/',
    tags: ['REACT', 'WEBPACK', 'STORYBOOK', 'DOCKER', 'RUBY ON RAILS'],
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
    link: 'https://medlantis.org/',
    tags: ['PYTHON', 'PHP', 'AUTH0', 'MIXPANEL', 'K-MEANS'],
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
    tags: ['SWIFT', 'UIKIT', 'QUICK', 'XCTEST', 'ASP.NET', 'SQL SERVER'],
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
    tags: ['PYTHON', 'PUPPET', 'COMPUTER VISION', 'POWERSHELL'],
    bullets: [
      'Replaced an in-person client deployment process with a remote, version-controlled automation service using Puppet.',
      'Shipped Python improvements to an edge image-processing and video-analytics platform, reducing overexposure and lighting errors.'
    ],
    highlight: 'Modernized hardware fleet automation and edge computer-vision detection fidelity.'
  }
]
