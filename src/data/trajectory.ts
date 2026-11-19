import { TrajectoryStop } from '../types'

// Career trajectory, oldest to newest. Company names and dates only.
// Source of truth: resume (automated-resume/surudh_startup_base.tex; co-op dates from the 2-page resume).
export const trajectoryData: TrajectoryStop[] = [
  { company: 'Solink', period: 'Jan 2015 - Apr 2015', coop: true, link: 'https://solink.com/' },
  { company: 'Royal Victoria Hospital', period: 'Sep 2015 - Dec 2015', coop: true, link: 'https://www.rvh.on.ca/' },
  { company: 'Medlantis', period: 'May 2016 - Sep 2016', coop: true },
  { company: 'FutureAdvisor (BlackRock)', period: 'Jan 2017 - Dec 2017', coop: true },
  { company: 'Hypotenuse Labs', period: 'Dec 2020 - Apr 2025', link: 'https://www.hypotenuselabs.com/' },
  { company: 'Self Employed', period: 'Apr 2025 - Present', current: true }
]
