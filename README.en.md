# Manufacture HOT · Server & PC Industry Daily Briefing

A strategic daily briefing site for the server & PC industry: curated every day from first-party vendor channels, leading research firms and quality media, covering OEM/ODM, upstream components, manufacturing automation, key customers, trade compliance and competitor moves.

> Customized from the open-source engine [AIHOT](https://github.com/KKKKhazix/AIHOT): source list, score thresholds, prompts and site copy are replaced. Merge upstream updates with `git pull upstream main`.

## Features

- **Collection**: 20 sources (vendor newsrooms: NVIDIA/AMD/Intel/TSMC/Samsung/Apple/Quanta; research: IDC/Counterpoint/TrendForce; media: The Register/DigiTimes/Tom's Hardware/36kr…), continuously polled with intervals auto-tuned per source output
- **Pipeline**: industry prefilter → content understanding (typing, tagging, Chinese titles/summaries) → dual scoring (two independent 0–100 attention scores averaged) → story clustering
- **Selection**: per-tier thresholds (T1 vendors ≥ 60, T1.5 quasi-official ≥ 65, T2 media ≥ 76); clustered stories show one representative article
- **Hot topics**: events resonating across sources in a 48h window, at least 2 sources required
- **Daily / weekly / monthly reports**: the daily is published at **08:30** (Asia/Shanghai) covering the previous 24 hours; the weekly on Mondays and the monthly on the 1st, both at 08:30, compiled from dailies
- **Topics**: all material organized by company / direction / content format tags
- **Feeds**: RSS, public API, MCP and llms.txt — anonymous, read-only
- **Admin** (`/admin`): source management and trial fetches, content diagnostics, run history and alerts

## Quick start

```bash
cp .env.example .env     # fill SITE_URL, ADMIN_PASSWORD, SESSION_SECRET, LLM_API_KEY…
docker compose up -d --build
```

Open `http://localhost:3000`; the admin is at `/admin`.

First start migrates the database and seeds the 20 sources from `industry/sources.json`. The `.env` file holds all secrets and is git-ignored — never commit it.
