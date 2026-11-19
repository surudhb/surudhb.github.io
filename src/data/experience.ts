import { Experience } from '../types'

// Copy source of truth: surudh-brand skill (project-stories.md, resume-data.md).
// Keep bullets short, past tense, no em dashes, no Web3 jargon.
export const experienceData: Experience[] = [
  {
    id: 'open-to-roles',
    company: 'OPEN TO NEW ROLES',
    location: 'Calgary, AB // Hybrid or Remote',
    position: 'Technical Program / Project Manager',
    period: 'NOW',
    startDate: '2026-04',
    endDate: 'PRESENT',
    tags: ['TECHNICAL PROGRAM MANAGEMENT', 'PROJECT MANAGEMENT', 'IT PROJECTS', 'PROJECT COORDINATION'],
    bullets: [
      'Looking for technical program, project, and IT project management roles, at startups or in the public sector.'
    ]
  },
  {
    id: 'freelance-consultant',
    company: 'SELF EMPLOYED',
    location: 'Calgary, AB',
    position: 'Freelance Technical Consultant',
    period: 'APR 2025 - PRESENT',
    startDate: '2025-04',
    endDate: 'PRESENT',
    tags: ['DELIVERY CONSULTING', 'AI WORKFLOW AUTOMATION'],
    bullets: [
      'Consulted on project delivery for early-stage startups.',
      'Picked up new PM domains, including healthcare and construction, and built AI-assisted workflow automations.'
    ]
  },
  {
    id: 'hypotenuse-tpm',
    company: 'HYPOTENUSE LABS',
    location: 'Toronto, ON',
    position: 'Lead Technical Program Manager',
    period: 'APR 2024 - APR 2025',
    startDate: '2024-04',
    endDate: '2025-04',
    link: 'https://www.hypotenuselabs.com/',
    tags: ['PROGRAM MANAGEMENT', 'SDLC', 'AGILE', 'VENDOR MANAGEMENT', 'CAPACITY PLANNING'],
    bullets: [
      'Built the firm\'s project management practice from scratch and ran delivery across a $10M+ portfolio of 10+ client programs.',
      'Earned $3M+ in account expansions and near-100% repeat business as the go-to contact for escalations, SOWs, vendor contracts, and collections.',
      'Restarted a joint venture stalled for 7 months: froze scope, reset the roadmap with the partner, and added an on-call SLA. Halted $1.2M a year in idle spend.',
      'Took over a stalled cross-border lending platform after its CTO left, ran a code and security audit, and drove an architecture pivot that cleared the way for a $10M raise.',
      'Scaled engineering from 10 to 30 and saved $1.5M a year with a Python staffing model that forecast hiring and matched engineers to programs.'
    ],
    highlight: 'First dedicated TPM at the firm.'
  },
  {
    id: 'hypotenuse-swe',
    company: 'HYPOTENUSE LABS',
    location: 'Toronto, ON',
    position: 'Software Engineer / Project Lead',
    period: 'JUN 2021 - APR 2024',
    startDate: '2021-06',
    endDate: '2024-04',
    link: 'https://www.hypotenuselabs.com/',
    links: [
      { label: 'Ambient', href: 'https://ambient.finance/' }
    ],
    tags: ['REACT', 'TYPESCRIPT', 'PYTHON', 'SWIFT', 'POSTGRESQL', 'AWS'],
    bullets: [
      'The Archivist (Forbes-featured luxury resale): built data pipelines ingesting 1M+ records a day, then took over delivery, ran investor demos, and right-sized the team from 7 to 3, saving the client $1.4M.',
      'Ambient (trading platform, $4B+ volume): fixed the state management problems behind constant hotfixes and removed 50K+ lines of code.',
      'Disa (iOS and watchOS fitness app): sole engineer from concept to App Store in 4 months.',
      'Kaskade (trading platform): built the trading UI, then took over product coordination and weekly investor demos with the client.'
    ],
    highlight: 'Grew from building features to owning client delivery end to end.'
  },
  {
    id: 'hypotenuse-freelance',
    company: 'HYPOTENUSE LABS',
    location: 'Toronto, ON',
    position: 'Freelance Software Engineer',
    period: 'DEC 2020 - JUN 2021',
    startDate: '2020-12',
    endDate: '2021-06',
    link: 'https://www.hypotenuselabs.com/',
    links: [
      { label: 'Forbes feature', href: 'https://www.forbes.com/sites/sharonedelson/2021/07/19/the-archivist-wants-to-help-luxury-brands-reclaim-resale/' }
    ],
    tags: ['REACT', 'TYPESCRIPT', 'PYTHON'],
    bullets: [
      'Joined The Archivist, a Forbes-featured luxury resale startup, as a founding engineer and built the React marketplace from prototype to launch.'
    ],
    highlight: 'LVMH Innovation Award finalist.'
  },
  {
    id: 'futureadvisor-coop',
    company: 'BLACKROCK (FUTUREADVISOR)',
    location: 'San Francisco, CA',
    position: 'Software Engineering Intern',
    period: 'JAN 2017 - DEC 2017',
    startDate: '2017-01',
    endDate: '2017-12',
    link: 'https://www.ycombinator.com/companies/futureadvisor',
    tags: ['REACT', 'RUBY ON RAILS', 'STORYBOOK'],
    bullets: [
      'Moved dashboards from jQuery to React and built a shared component library used by 12 partner banks.',
      'Pitched a Docker dev environment at a company hackathon that cut onboarding from a week to a day.'
    ]
  },
  {
    id: 'medlantis-coop',
    company: 'MEDLANTIS',
    location: 'Toronto, ON',
    position: 'Full-Stack Developer Intern',
    period: 'MAY 2016 - SEP 2016',
    startDate: '2016-05',
    endDate: '2016-09',
    link: 'https://medlantis.thinkific.com/',
    tags: ['PYTHON', 'PHP', 'AUTH0'],
    bullets: [
      'Built a recommendation engine for video lessons and stepped in as interim scrum master for a 4-person intern team.'
    ]
  },
  {
    id: 'rvh-coop',
    company: 'ROYAL VICTORIA REGIONAL HEALTH CENTRE',
    location: 'Barrie, ON',
    position: 'iOS Developer Intern',
    period: 'SEP 2015 - DEC 2015',
    startDate: '2015-09',
    endDate: '2015-12',
    link: 'https://www.rvh.on.ca/',
    tags: ['SWIFT', 'ASP.NET', 'SQL SERVER'],
    bullets: [
      'Built an iOS hospital inventory app with ~90% test coverage; commended at the provincial Ignite Research Conference.'
    ]
  },
  {
    id: 'solink-coop',
    company: 'SOLINK',
    location: 'Ottawa, ON',
    position: 'DevOps Engineering Intern',
    period: 'JAN 2015 - APR 2015',
    startDate: '2015-01',
    endDate: '2015-04',
    link: 'https://solink.com/',
    tags: ['PYTHON', 'PUPPET'],
    bullets: [
      'Replaced in-person client deployments with a remote, versioned process using Puppet.'
    ]
  }
]
