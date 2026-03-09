# Intel Analyst

**Geopolitical intelligence platform with Bayesian predictions, live data ingestion, and AI-assisted analysis.**

One command. Five assessments. Real data. No cloud.

![Dashboard Overview](screenshots/01-overview.png)

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Docker (recommended)](#docker-recommended)
  - [Standalone binary](#standalone-binary)
- [Usage](#usage)
  - [Accessing the dashboard](#accessing-the-dashboard)
  - [Adding AI analysis (optional)](#adding-ai-analysis-optional)
- [Services](#services)
- [Pre-loaded demo](#pre-loaded-demo)
- [How predictions work](#how-predictions-work)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Bayesian probability engine** -- WASM-compiled Rust running in the browser. Probabilities shift as evidence accumulates.
- **Multi-source intelligence pipeline** -- GDELT news, Google News RSS, Wikipedia, web search (SearXNG), knowledge graph traversal
- **Cross-assessment analysis** -- "How does losing Starlink access impact ALL assessments?" with visual probability impact cards
- **Source reliability tiers** -- World Bank (0.93) vs state media (0.25). Confidence flows through every prediction.
- **Evidence chains** -- every prediction is traceable to weighted, sourced evidence
- **AI-assisted analysis** -- Summarize, Challenge, "What Would Change It", free-form questions via local LLM
- **Fully offline** -- all data stays on your machine; SearXNG provides private web search

![Evidence Chains](screenshots/03-evidence-chains.png)

### What Needs to Happen

Every assessment shows exactly how much evidence is needed to shift the probability up or down. Not vibes -- math.

![Bayesian Calculator](screenshots/02-assessment-detail.png)

---

## Architecture

```
Browser (WASM + Vanilla JS)          Engram API              External
+---------------------------+    +----------------+    +------------------+
| Bayesian probability      |--->| /store         |    | GDELT News API   |
| Assessment cards          |    | /query         |    | Google News RSS  |
| Deep investigation        |--->| /ask (LLM)     |    | Wikipedia REST   |
| Cross-assessment analysis |    | /proxy/gdelt   |--->| SearXNG (local)  |
| Source citation renderer  |    | /proxy/rss     |    | Ollama LLM       |
| Knowledge accumulation    |--->| /proxy/search  |    +------------------+
+---------------------------+    | /proxy/llm     |
                                 +----------------+
```

Optional: [**Ollama**](https://ollama.com) running on the host provides LLM capabilities (summarization, challenging evidence, Q&A).

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| **Docker** | 20.10+ | [Install Docker](https://docs.docker.com/get-docker/) |
| **Docker Compose** | 2.0+ | Included with Docker Desktop |
| **Ollama** (optional) | any | Only needed for AI analysis features |

**Supported platforms:** Linux x86_64. The pre-built engram binary targets `linux-x86_64`. Docker handles this automatically on all platforms (including macOS/Windows via emulation).

**Disk space:** ~500 MB for Docker images + demo data.

**Memory:** 512 MB minimum, 1 GB recommended (2 GB+ if running Ollama alongside).

---

## Installation

### Docker (recommended)

**1. Clone the repository**

```bash
git clone https://github.com/dx111ge/intel-analyst.git
cd intel-analyst
```

**2. Build and start all services**

```bash
docker compose up -d
```

This builds three containers (engram, dashboard, searxng) and starts them in the background. First build takes 1-2 minutes.

**3. Verify services are running**

```bash
docker compose ps
```

All three services should show `running` status.

**4. Open the dashboard**

Open [http://localhost:8888](http://localhost:8888) in your browser.

**To stop:**

```bash
docker compose down
```

**To stop and remove all data (full reset):**

```bash
docker compose down -v
```

---

### Standalone binary

For running engram without Docker (dashboard and SearXNG not included):

**1. Download the binary**

```bash
# From the repository
cp binaries/engram-linux-x86_64 /usr/local/bin/engram
chmod +x /usr/local/bin/engram
```

**2. Run with the demo data**

```bash
engram --listen 0.0.0.0:3030 --brain data/russia.brain
```

> **Note:** The standalone binary only provides the engram API on port 3030. You will not have the dashboard UI or SearXNG search unless you set those up separately.

---

## Usage

### Accessing the dashboard

Once services are running, open [http://localhost:8888](http://localhost:8888).

The dashboard loads with a pre-built knowledge graph (1010 nodes) and 5 demo assessments. The WASM Bayesian engine runs in your browser -- all probability calculations happen client-side.

Click **"Ingest Now"** to pull live news from GDELT and watch the probabilities shift in real time.

**Key views:**

- **Overview** -- all assessments with current probability ranges
- **Assessment detail** -- drill into evidence for/against, source weights, probability breakdown
- **Evidence chains** -- trace how each piece of evidence affects predictions
- **What needs to happen** -- scenario analysis showing exactly what would shift probabilities
- **Cross-assessment analysis** -- see cascading impacts across linked assessments

### Adding AI analysis (optional)

Intel Analyst can use a local LLM via Ollama for AI-powered features: Summarize, Challenge, "What Would Change It", and free-form questions about assessments.

**1. Install Ollama**

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# macOS
brew install ollama

# Windows
# Download from https://ollama.com/download
```

**2. Pull a model**

```bash
ollama pull qwen2.5:7b
```

Any model works, but `qwen2.5:7b` is the recommended balance of quality and speed. Larger models (14b, 32b) give better analysis at the cost of more RAM and slower responses.

**3. Start Ollama**

```bash
ollama serve
```

The dashboard connects to Ollama at `localhost:11434` automatically -- no configuration needed. The Docker container is pre-configured to reach the host via `host.docker.internal:11434`.

> **Linux Docker note:** `host.docker.internal` may not resolve by default. Add this to the engram service in `docker-compose.yml`:
> ```yaml
> extra_hosts:
>   - "host.docker.internal:host-gateway"
> ```
> Or set the `ENGRAM_LLM_ENDPOINT` environment variable to your host IP.

---

## Services

| Service | Port | URL | Description |
|---|---|---|---|
| Dashboard | 8888 | http://localhost:8888 | Intelligence platform UI |
| Engram | 3030 | http://localhost:3030 | Knowledge graph + API |
| SearXNG | 8090 | http://localhost:8090 | Private web search (no tracking) |
| Ollama | 11434 | http://localhost:11434 | Local LLM (optional, runs on host) |

---

## Pre-loaded demo

The Docker image ships with a **1010-node knowledge graph** covering countries, borders, organizations, leaders, economic indicators, conflict data, sanctions, and disputed territories.

**5 intelligence assessments:**

| Assessment | Probability |
|---|---|
| Russian economic breakdown under sustained sanctions pressure | 41% |
| Domestic popular unrest forces political change in Russia | 18% |
| Ukraine war ends with frozen frontline / Korean War model | 48% |
| Ukraine recovers all territory including Crimea | 22% |
| Russia opens second front: Moldova/Transnistria or Baltic provocation | 31% |

Each assessment includes weighted evidence from multiple source tiers with full traceability.

---

## How predictions work

Each assessment has supporting and contradicting evidence, weighted by source reliability:

```
P = weighted_for * (1 - weighted_against * discount)

where:
  weighted_for     = sum of (evidence_weight * source_reliability) for supporting evidence
  weighted_against = sum of (evidence_weight * source_reliability) for contradicting evidence
  discount         = |against| / (|for| + |against|)
```

**Source reliability tiers:**

| Tier | Sources | Confidence |
|---|---|---|
| Institutional | World Bank, UN, NATO, Wikidata | 0.90 - 0.95 |
| Quality journalism | Reuters, AP, BBC, ISW, RUSI | 0.82 - 0.88 |
| General media | Major newspapers, broadcast news | 0.60 - 0.75 |
| Social / unverified | Social media, anonymous sources | 0.35 - 0.50 |
| State-controlled | TASS, RT, Sputnik | 0.20 - 0.30 |

---

## Configuration

### Environment variables

Set these in `docker-compose.yml` under the `engram` service:

| Variable | Default | Description |
|---|---|---|
| `ENGRAM_SEARXNG_URL` | `http://searxng:8080` | SearXNG endpoint (internal Docker network) |
| `ENGRAM_LLM_ENDPOINT` | `http://host.docker.internal:11434/v1/chat/completions` | Ollama API endpoint |

### Changing ports

Edit `docker-compose.yml` port mappings. The left side is your host port:

```yaml
ports:
  - "9999:80"    # Dashboard on port 9999 instead of 8888
  - "4040:3030"  # Engram API on port 4040 instead of 3030
```

### Persistent data

The engram service stores its knowledge graph in a Docker volume (`engram-data`). Data persists across `docker compose down` / `up` cycles. Use `docker compose down -v` to delete it.

---

## Troubleshooting

**Dashboard shows blank page or connection error**

Check that all services are running:
```bash
docker compose ps
docker compose logs engram
```

**AI features not available / Ollama not detected**

1. Confirm Ollama is running: `curl http://localhost:11434/api/tags`
2. Confirm a model is pulled: `ollama list`
3. On Linux with Docker, ensure `host.docker.internal` resolves (see [AI analysis setup](#adding-ai-analysis-optional))

**Port conflicts**

If ports 8888, 3030, or 8090 are already in use, change them in `docker-compose.yml` (see [Configuration](#configuration)).

**Trial expired**

The included binary has a 7-day evaluation period. For continued use or commercial licensing, see [github.com/dx111ge/engram](https://github.com/dx111ge/engram).

**Rebuilding after updates**

```bash
git pull
docker compose down
docker compose up -d --build
```

---

## Powered By

Built on [**Engram**](https://github.com/dx111ge/engram) -- AI memory engine with knowledge graph, semantic search, reasoning, and learning in a single Rust binary.

## License

Proprietary. Free for personal evaluation (7-day trial). Commercial use requires a license -- see [github.com/dx111ge/engram](https://github.com/dx111ge/engram).
