# Orbit — Homepage Design & Content Specification
**App Name:** Orbit
**Tagline:** Organise your world.
**Type:** Open Source PWA
**For:** Antigravity IDE
**Stack:** Vite + React + TypeScript + shadcn/ui + Tailwind CSS + TanStack Query
**Version:** 1.0 | February 2026

---

## Table of Contents

1. [Design System](#1-design-system)
2. [Page Structure Overview](#2-page-structure-overview)
3. [Section 01 — Navbar](#3-section-01--navbar)
4. [Section 02 — Hero](#4-section-02--hero)
5. [Section 03 — Social Proof Bar](#5-section-03--social-proof-bar)
6. [Section 04 — Problem Statement](#6-section-04--problem-statement)
7. [Section 05 — Features / Modules](#7-section-05--features--modules)
8. [Section 06 — How It Works](#8-section-06--how-it-works)
9. [Section 07 — App Preview](#9-section-07--app-preview)
10. [Section 08 — Open Source & Community](#10-section-08--open-source--community)
11. [Section 09 — Testimonials](#11-section-09--testimonials)
12. [Section 10 — FAQ](#12-section-10--faq)
13. [Section 11 — Final CTA Banner](#13-section-11--final-cta-banner)
14. [Section 12 — Footer](#14-section-12--footer)
15. [Animations & Motion Direction](#15-animations--motion-direction)
16. [Responsive Behaviour](#16-responsive-behaviour)

---

## 1. Design System

### 1.1 Design Philosophy

**Base style: Refined Minimalism** — clean layouts, deliberate whitespace, and a restrained use of color. Nothing decorative for decoration's sake.

**Accent layer: Subtle Glassmorphism** — used selectively on the navbar (when scrolled), the hero widget mockup, featured pricing/module cards, and the open source section. Never applied globally to every card.

**Theme: Neutral — supports both Light and Dark mode.** The design must look intentional and polished in both. Light mode is the default. Dark mode mirrors the same structure with inverted surface and text tokens. Use CSS variables (or Tailwind's `dark:` prefix) throughout so that every color switches correctly.

**Overall feeling:** Approachable, trustworthy, calm, and quietly confident. Orbit is for everyone — not just power users or developers. The design should feel like a well-made consumer product that anyone would feel comfortable picking up, not a niche productivity tool for techies.

---

### 1.2 Color Palette

All colors are defined as semantic tokens with a light and dark value. The design system should use these token names — not raw hex values — throughout the implementation so that theme switching works automatically.

#### Semantic Color Tokens

| Token | Light Value | Dark Value | Usage |
|---|---|---|---|
| `--bg-base` | `#FFFFFF` | `#0C0E14` | Main page background |
| `--bg-subtle` | `#F7F8FA` | `#13161F` | Alternate section background |
| `--bg-card` | `#FFFFFF` | `#1A1E2A` | Card backgrounds |
| `--bg-card-hover` | `#F3F4F8` | `#1F2436` | Card hover state |
| `--border-subtle` | `#E8EAF0` | `rgba(255,255,255,0.07)` | Card borders, dividers |
| `--border-medium` | `#D0D4E0` | `rgba(255,255,255,0.12)` | Stronger borders |
| `--text-primary` | `#0F1117` | `#EEF0F7` | Headings, important text |
| `--text-secondary` | `#5C6478` | `#8890A8` | Body copy, descriptions |
| `--text-muted` | `#9BA3B8` | `#4A5270` | Labels, metadata, placeholders |
| `--brand` | `#5B6AF0` | `#6B7AF5` | Primary brand color — indigo-blue |
| `--brand-hover` | `#4A58E8` | `#7A88F7` | Brand color hover state |
| `--brand-subtle` | `#EEF0FE` | `rgba(91,106,240,0.12)` | Brand color backgrounds, badges |
| `--brand-gradient` | `#5B6AF0` → `#9B6BF2` at 135deg | same | CTAs, logo, gradient accents |
| `--shadow-card` | `0 2px 16px rgba(0,0,0,0.06)` | `0 4px 24px rgba(0,0,0,0.4)` | Card shadows |
| `--glass-bg` | `rgba(255,255,255,0.70)` | `rgba(255,255,255,0.04)` | Glass card fill |
| `--glass-border` | `rgba(255,255,255,0.90)` | `rgba(255,255,255,0.08)` | Glass card border |

#### Brand Gradient
Direction: 135 degrees.
From: `#5B6AF0` (indigo blue)
To: `#9B6BF2` (soft violet)

This gradient is used on: the logo mark, primary CTA buttons, eyebrow badge backgrounds, the hero headline accent word, and the open source section accent elements.

#### Module Accent Colors
Each module has its own accent used for card top borders and icons. These are the same in both light and dark mode — they are vivid enough to work on both.

| Module | Accent Color | Hex |
|---|---|---|
| Dashboard | Indigo | `#5B6AF0` |
| Tasks | Blue | `#3B82F6` |
| Reminders | Amber | `#F59E0B` |
| Expenses | Emerald | `#10B981` |
| Loans | Rose | `#F43F5E` |
| Habits | Violet | `#8B5CF6` |
| Budget Planner | Cyan | `#06B6D4` |
| Notes | Orange | `#F97316` |
| Subscriptions | Pink | `#EC4899` |
| Goals | Lime | `#84CC16` |

---

### 1.3 Typography

**Display font: Plus Jakarta Sans**
Geometric, modern, and characterful without being cold. Excellent legibility at large sizes. Works beautifully for both consumer and professional contexts. Used for all headings, the logo wordmark, and hero text.

**Body font: Inter**
The most legible UI font available. Clean, neutral, and universally readable. Used for all body copy, descriptions, labels, buttons, and UI strings.

Both fonts available on Google Fonts.

#### Type Scale

| Role | Size | Weight | Font | Used For |
|---|---|---|---|---|
| Display XL | `68px` | `800` | Plus Jakarta Sans | Hero headline (desktop) |
| Display LG | `52px` | `700` | Plus Jakarta Sans | Section headings |
| Display MD | `38px` | `700` | Plus Jakarta Sans | Sub-section headings |
| Heading SM | `22px` | `600` | Plus Jakarta Sans | Card titles, step headings |
| Body LG | `18px` | `400` | Inter | Hero subtext, lead paragraphs |
| Body MD | `16px` | `400` | Inter | General body copy |
| Body SM | `14px` | `400` | Inter | Card descriptions, captions |
| Label | `12px` | `600` | Inter | Eyebrow text, tags, badges |

Line height: `1.6` for body text. `1.2` for display headings.
Letter spacing: `0.06em` uppercase for all Label / eyebrow text.

---

### 1.4 Spacing & Layout

- Max content width: `1160px`, horizontally centered, `24px` padding on each side
- Section vertical padding: `112px` top and bottom on desktop, `72px` on tablet, `56px` on mobile
- Card internal padding: `28px`
- Card gap in grids: `20px`
- Border radius — cards: `16px` — buttons: `10px` — pill badges: `999px` — input fields: `8px`

---

### 1.5 Glassmorphism Card Style (Accent Use Only)

Apply only to: scrolled navbar, hero mockup card, featured pricing card, open source section card.

Light mode:
- Background: `rgba(255, 255, 255, 0.70)`
- Border: `1px solid rgba(255, 255, 255, 0.90)`
- Backdrop blur: `16px`
- Box shadow: `0 8px 32px rgba(0, 0, 0, 0.08)`

Dark mode:
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Backdrop blur: `16px`
- Box shadow: `0 8px 32px rgba(0, 0, 0, 0.40)`

On hover: background brightens slightly, border becomes more opaque, card lifts `2px` upward. Transition: `0.2s ease`.

---

### 1.6 Light / Dark Mode Background Texture

In light mode: the `--bg-subtle` sections have a very faint dot-grid pattern overlay at `4% opacity` — gives the page subtle texture without being distracting.

In dark mode: no texture. Depth is achieved through layered surface colors and card shadows.

---

## 2. Page Structure Overview

Sections alternate between `--bg-base` and `--bg-subtle` to create visual rhythm. The order is:

```
Navbar                          — fixed, full width
↓
Hero Section                    — bg-base
↓
Social Proof Bar                — bg-subtle
↓
Problem Statement               — bg-base
↓
Features / Modules              — bg-subtle
↓
How It Works                    — bg-base
↓
App Preview                     — bg-subtle
↓
Open Source & Community         — bg-base
↓
Testimonials                    — bg-subtle
↓
FAQ                             — bg-base
↓
Final CTA Banner                — brand gradient background
↓
Footer                          — bg-subtle
```

---

## 3. Section 01 — Navbar

### Behaviour
Fixed to the top of the viewport at all times. Full width. Content max-width `1160px` centered.
Height: `60px`.

On page load: background is `--bg-base` with a `1px` bottom border in `--border-subtle`.
After scrolling past `72px`: background transitions to the glassmorphism style. The bottom border remains but becomes `--border-medium`. Transition duration: `0.3s ease`.

### Left — Logo
A circular logo mark made of two overlapping orbit-like rings in the brand gradient, suggesting a planet or orbital path. Paired with the wordmark **"Orbit"** in Plus Jakarta Sans `700` weight, `--text-primary` color.

### Center — Navigation Links (desktop only)
Five links. Font: Inter `500`, `14px`, `--text-secondary` color. On hover: color transitions to `--text-primary`. Active link: `--brand` color with a small `2px` underline dot beneath it.

Links: `Home` · `Features` · `How it Works` · `Open Source` · `FAQ`

### Right — Actions
- **GitHub** — a small icon button showing the GitHub mark and a star count (e.g. `★ 1.2k`). Style: small outlined pill button, `--text-secondary`, `--border-medium` border. Hover: `--text-primary`. Opens GitHub repo in new tab.
- **Get Started** — filled button. Brand gradient background. White text. Inter `600`, `14px`. Border radius `10px`. Padding `10px 18px`. Hover: lifts `1px`, gradient brightens slightly.

### Mobile
Logo on the left. On the right: GitHub icon button and a hamburger menu icon (`Menu` from Lucide). Hamburger opens a bottom sheet drawer (slides up from the bottom on mobile) with all nav links stacked, and the Get Started button full-width at the bottom.

---

## 4. Section 02 — Hero

### Background
`--bg-base`. In light mode, a very subtle radial gradient glow at the top center — from `rgba(91,106,240,0.07)` to transparent — adds warmth without being obvious. In dark mode the glow is stronger: `rgba(91,106,240,0.14)` to transparent.

### Layout
Two columns on desktop. Left column: all text content. Right column: the floating app mockup. Equal width columns. Vertically centered. Single column on mobile — text first, mockup below.

### Eyebrow Badge
A small pill badge above the headline.
Background: `--brand-subtle`. Text color: `--brand`. Font: Label size, Inter `600`, uppercase, letter-spaced.
Left side of the badge: a small `✦` symbol.
Content: `✦ Free & Open Source`

### Headline
Display XL size (`68px` desktop, `44px` mobile). Plus Jakarta Sans `800`. `--text-primary`.

Line 1: `Everything you need`
Line 2: `to run your life.`

The word **"life"** on line 2 has the brand gradient applied as a text gradient. This is the single most important visual moment on the page — it should feel effortless and inevitable, not loud.

### Subheadline
Body LG (`18px`). Inter `400`. `--text-secondary`. Max width `500px`.

Content:
`Orbit is a free, open source app that brings your tasks, habits, expenses, goals, reminders, loans, notes, and more into one beautifully organised place.`

`No subscription required. No data sold. Just a better way to manage your everyday life.`

### CTA Buttons
Two buttons, side by side, left-aligned on desktop, full-width stacked on mobile.

**Primary — "Get Started — It's Free"**
Brand gradient background. White text. Plus Jakarta Sans `600`. Border radius `10px`. Height `48px`. Padding `0 24px`. On hover: lifts `1px`, shadow appears beneath.

**Secondary — "View on GitHub →"**
No fill. `--border-medium` border. `--text-primary` text. Same height. On hover: border color shifts to `--brand`, text shifts to `--brand`.

### Trust Line
Below the buttons. Inter `400`, `13px`, `--text-muted`.
Content: `No account needed to explore · Works offline · MIT Licensed`

### Stats Row
Three stats in a horizontal row below the trust line, separated by faint `--border-subtle` vertical dividers.

Each stat has a number in Display MD weight, Plus Jakarta Sans `700`, `--text-primary`, and a label in Body SM, Inter, `--text-secondary`.

Stats:
| Number | Label |
|---|---|
| `10,000+` | People using Orbit |
| `100%` | Free, forever |
| `MIT` | Open Source License |

The first stat (`10,000+`) is fetched live via TanStack Query from `/api/stats`. While loading, show a skeleton placeholder of the same width/height. The other two are static.

### Right Column — App Mockup
A floating card showing a simplified, stylised illustration of Orbit's Dashboard screen. This is a **static illustration / image asset** — not a live embed.

The card uses the glassmorphism style. Inside it shows:
- A top bar with the Orbit logo and a greeting: `Good afternoon, Zara ☀️`
- A 2×2 grid of mini summary chips: `4 tasks due`, `3 habits today`, `Budget: 61% used`, `Goal: 42% to target`
- A short task list with 3 items, one with a checked checkbox
- A small horizontal habits row with ring icons — 2 filled, 1 empty

The mockup floats gently — continuous vertical float animation, `8px` travel, `5 second` cycle, `ease-in-out`. A very soft brand-colored glow sits behind the card (not a hard shadow — a diffused radial glow).

---

## 5. Section 03 — Social Proof Bar

### Background
`--bg-subtle`.

### Layout
A single centered row of logos or text names of notable tools, communities, or press mentions that reference or recommend Orbit. If real logos aren't available yet, use the names as styled text in `--text-muted`.

### Content

Left side label: `Trusted and used by people from` — Inter `400`, `14px`, `--text-muted`.

Followed by a horizontal row of logos/names. Suggested placeholders until real ones are available:

`Product Hunt` · `GitHub` · `Hacker News` · `Dev.to` · `Reddit r/selfhosted`

All logos/names in `--text-muted`. On hover: transition to `--text-secondary`. The row scrolls horizontally and loops on mobile (marquee-style, auto-scrolling, no user input needed).

---

## 6. Section 04 — Problem Statement

### Background
`--bg-base`.

### Layout
Centered heading block at the top. Below it, three cards in a row.

### Eyebrow Label
Label size. `--text-muted`. Uppercase. Letter-spaced.
Content: `THE PROBLEM`

### Headline
Display LG (`52px`). Plus Jakarta Sans `700`. `--text-primary`. Center-aligned. Max width `640px`.
Content: `Life is scattered. Your tools make it worse.`

### Body Copy
Body LG. Inter `400`. `--text-secondary`. Center-aligned. Max width `580px`.

Content:
`Most people use 5 to 8 different apps to manage their daily life. A habit tracker here, a budget spreadsheet there, sticky notes on the fridge, and reminders lost in a notification pile.`

`The apps don't talk to each other. Context gets lost. Things slip through the cracks. And somehow the tools meant to help you feel like more work than the tasks themselves.`

### Three Problem Cards

Standard cards (not glass). Background `--bg-card`. Border `1px solid --border-subtle`. Border radius `16px`. Shadow `--shadow-card`. Padding `28px`. Equal width, three across.

On hover: background shifts to `--bg-card-hover`, border brightens to `--border-medium`, card lifts `2px`. Transition `0.2s ease`.

Each card has:
- A Lucide icon, `28px`, `--text-muted` color, inside a small `48px × 48px` rounded square with `--bg-subtle` background
- A heading — Heading SM, Plus Jakarta Sans `600`, `--text-primary`
- A description — Body MD, Inter `400`, `--text-secondary`

---

**Card 1**
Icon: `Layers`
Heading: `Too many apps`
Description: `You need a different app for every part of your life. The switching, the syncing, the separate logins — it's exhausting before you've even started.`

**Card 2**
Icon: `Unlink`
Heading: `Nothing connects`
Description: `Your expense tracker doesn't know your budget exists. Your habit app doesn't feed your goals. Every tool is its own island.`

**Card 3**
Icon: `BatteryLow`
Heading: `Mental overhead adds up`
Description: `Remembering where everything lives takes as much energy as doing the actual work. Your tools should clear your head, not fill it.`

---

## 7. Section 05 — Features / Modules

### Background
`--bg-subtle`.

### Layout
Centered heading block at the top. Below it, a grid of 10 module cards — 3 columns on desktop (last row has 1 card centered), 2 columns on tablet, 1 column on mobile.

### Eyebrow Label
Label size. `--brand`. Uppercase. Letter-spaced.
Content: `WHAT'S INSIDE`

### Headline
Display LG. Plus Jakarta Sans `700`. `--text-primary`. Center-aligned.
Content: `One app. Ten modules. Total clarity.`

### Subheading
Body LG. Inter `400`. `--text-secondary`. Center-aligned. Max width `520px`.
Content: `Each module is thoughtfully built and fully capable on its own. Together, they create something greater — a complete view of your daily life.`

### Module Cards

Each card: background `--bg-card`, border `1px solid --border-subtle`, border radius `16px`, shadow `--shadow-card`. A `3px` top border in the module's accent color (this is the only place accent colors appear on the cards). Padding `24px`.

On hover: card lifts `2px`, border brightens, the icon's background square deepens in the accent color's tint.

Each card contains:
- **Icon** — Lucide icon, `24px`, in the module's accent color. Sits inside a `44px × 44px` rounded square background at `12% opacity` of the accent color.
- **Module name** — Heading SM, Plus Jakarta Sans `600`, `--text-primary`
- **One-line description** — Body SM, Inter `400`, `--text-secondary`
- **Three feature bullets** — Body SM, Inter `400`, `--text-secondary`, each preceded by a `✓` in the module's accent color

---

**Card 01 — Dashboard**
Accent: Indigo `#5B6AF0` | Icon: `LayoutDashboard`
Name: `Dashboard`
Description: `The first thing you see every day. Built to answer one question: what needs my attention right now?`
Bullets:
- Customisable widgets pulled live from all modules
- Today's summary: tasks, habits, budget, and loans at a glance
- Quick-add anything without leaving the dashboard

---

**Card 02 — Tasks**
Accent: Blue `#3B82F6` | Icon: `CheckSquare`
Name: `Tasks`
Description: `Simple enough for a grocery list. Powerful enough for complex projects.`
Bullets:
- Projects, subtasks, priorities, and due dates
- Recurring tasks and inline reminder attachment
- Swipe to complete, bulk actions, and full-text search

---

**Card 03 — Reminders**
Accent: Amber `#F59E0B` | Icon: `Bell`
Name: `Reminders`
Description: `The right nudge at exactly the right time.`
Bullets:
- Push notifications with snooze and action buttons
- Recurring reminders and missed reminder tracking
- Link any reminder to an existing task

---

**Card 04 — Expenses**
Accent: Emerald `#10B981` | Icon: `Receipt`
Name: `Expenses`
Description: `Know where every rupee is going before it's gone.`
Bullets:
- Categories, tags, payment methods, and receipt photos
- Split expenses with others and track reimbursements
- Automatic feed into the Budget Planner — no double entry

---

**Card 05 — Loans**
Accent: Rose `#F43F5E` | Icon: `Landmark`
Name: `Loans`
Description: `Whether you're borrowing or lending — track it all.`
Bullets:
- Full interest calculation with simple and compound options
- EMI schedules and amortisation tables
- Auto-reminders before every payment due date

---

**Card 06 — Habits**
Accent: Violet `#8B5CF6` | Icon: `Flame`
Name: `Habits`
Description: `Build the routines your future self will thank you for.`
Bullets:
- Streaks, heatmaps, and per-habit completion rates
- Quantitative targets — steps, glasses, minutes, pages
- Link habits to Goals to track momentum automatically

---

**Card 07 — Budget Planner**
Accent: Cyan `#06B6D4` | Icon: `PieChart`
Name: `Budget Planner`
Description: `Plan your money. Watch the plan work.`
Bullets:
- Set category budgets and track them in real time
- Colour-coded alerts at 80%, 90%, and 100% of budget
- Monthly rollover, income tracking, and net position

---

**Card 08 — Notes**
Accent: Orange `#F97316` | Icon: `NotebookPen`
Name: `Notes`
Description: `A thought captured is a thought kept.`
Bullets:
- Rich text, checklists, voice memos, and image attachments
- Notebooks, tags, pinning, and full-text search
- Auto-saves every keystroke — no manual save ever needed

---

**Card 09 — Subscriptions**
Accent: Pink `#EC4899` | Icon: `RefreshCw`
Name: `Subscriptions`
Description: `Stop paying for services you forgot you had.`
Bullets:
- Track every recurring payment with renewal dates
- Alerts days before you're charged — cancel before it's too late
- Monthly and annual cost totals with per-person breakdowns

---

**Card 10 — Goals**
Accent: Lime `#84CC16` | Icon: `Target`
Name: `Goals`
Description: `The big picture, broken into steps you can actually take.`
Bullets:
- Milestones, progress updates, and deadline tracking
- Linked to Habits and Tasks for automatic progress
- On-track vs at-risk status with projected completion date

---

### Below the Grid
One centered line. Body MD. Inter `400`. `--text-muted`.
Content: `All 10 modules share data automatically. Expenses feed the Budget. Habits advance Goals. Loans create Reminders. Everything works together.`

---

## 8. Section 06 — How It Works

### Background
`--bg-base`.

### Layout
Centered heading at top. Below it, three steps arranged horizontally on desktop. A faint dashed line connects the three steps between them. Single column vertical stack on mobile with a vertical dashed connector.

### Eyebrow Label
Label size. `--text-muted`. Uppercase. Letter-spaced.
Content: `HOW IT WORKS`

### Headline
Display LG. Plus Jakarta Sans `700`. `--text-primary`. Center-aligned.
Content: `From zero to organised in minutes.`

### Three Steps

Each step:
- Large step number — Display MD, Plus Jakarta Sans `800`, brand gradient as text gradient. e.g. `01`
- Lucide icon — `24px`, `--brand` color
- Heading — Heading SM, Plus Jakarta Sans `600`, `--text-primary`
- Description — Body MD, Inter `400`, `--text-secondary`. Max width `280px` per step.

---

**Step 01**
Icon: `UserPlus`
Heading: `Create your account`
Description: `Sign up with an email or continue as a guest. No credit card. No commitments. Your account is ready in under 30 seconds.`

**Step 02**
Icon: `Sliders`
Heading: `Pick your modules`
Description: `Enable only the modules you need. Set up your first task, log a habit, or connect your budget. A short onboarding guide walks you through it.`

**Step 03**
Icon: `Orbit` *(or use `Globe` as a fallback Lucide icon)*
Heading: `Everything falls into orbit`
Description: `Your modules start working together automatically. Expenses feed your budget. Habits count toward goals. Orbit keeps it all connected in the background.`

---

## 9. Section 07 — App Preview

### Background
`--bg-subtle`.

### Layout
Two columns on desktop — left: text content, right: large app mockup in a device frame. On mobile: text on top, mockup below.

### Eyebrow Label
Label size. `--brand`. Uppercase. Letter-spaced.
Content: `SEE IT IN ACTION`

### Headline
Display LG. Plus Jakarta Sans `700`. `--text-primary`.
Content: `A dashboard that actually tells you something.`

### Body Copy
Body LG. Inter `400`. `--text-secondary`. Max width `460px`.

Content:
`Most dashboards are just menus with extra steps. Orbit's Dashboard is different — it's a daily briefing. It knows what's due, what's at risk, what needs your attention, and what you're on track with.`

`Open the app and in five seconds you know exactly where things stand. That's the whole point.`

### Four Feature Bullets
Each with a small `--brand` filled circle bullet. Body MD. Inter `400`. `--text-secondary`.

- Widgets show live data from every module — always current
- Budget status colour-coded so there's no math required
- Tap any widget to go straight into that module
- Fully functional offline — your data is always on your device

### Right Column — Device Mockup
A large, detailed static illustration of the Orbit app inside a browser window or phone device frame. The device frame is neutral — light grey in light mode, dark charcoal in dark mode.

The screen shows the Dashboard view in full detail including:
- The greeting header with user name and time of day
- A 4-chip summary row (tasks, habits, budget, upcoming loan)
- A budget progress bar with colour-coded fill
- A habits check-in row with 5 ring icons (3 complete, 2 pending)
- A task list with 4 items, varying priority flags

The mockup sits without a card wrapper — it floats directly as an image with a soft shadow beneath it. A very faint brand-colored glow radiates from behind it.

---

## 10. Section 08 — Open Source & Community

### Background
`--bg-base`. This is a special section — it should feel distinct from the product sections around it. Slightly more personality here is appropriate.

### Layout
Two-column layout. Left column: the text content and stats. Right column: a large glass card showing open source highlights (license, repo stats, contributor avatars). Equal width.

### Eyebrow Label
Label size. `--brand`. Uppercase. Letter-spaced.
Content: `OPEN SOURCE`

### Headline
Display LG. Plus Jakarta Sans `700`. `--text-primary`.
Content: `Built in the open. For everyone.`

### Body Copy
Body LG. Inter `400`. `--text-secondary`. Max width `480px`.

Content:
`Orbit is fully open source under the MIT License. Every line of code is public, every decision is transparent, and every person is welcome to contribute, fork, or self-host.`

`We believe productivity tools shouldn't be locked behind subscriptions or proprietary walls. Orbit is free today, and it will be free forever — because the community owns it.`

### Open Source Stat Row
Three stats in a horizontal row, separated by `--border-subtle` dividers. Each stat: number in Heading SM Plus Jakarta Sans `700` `--text-primary`, label in Body SM Inter `--text-secondary`.

| Stat | Label |
|---|---|
| `MIT` | License |
| `GitHub` | Source Available |
| `100%` | Free Forever |

These are static — no API fetch needed.

### CTA Buttons (left column, below stats)
Two buttons side by side:

**Primary — "Star on GitHub ★"**
`--bg-card` background. `--border-medium` border. `--text-primary` text. Inter `600`. Border radius `10px`. Height `44px`. On hover: background shifts to `--bg-card-hover`, border to `--brand`, text to `--brand`. Has the GitHub icon (Lucide `Github`) on the left side of the label.

**Secondary — "Read the Docs →"**
Text-only button. `--brand` color. Inter `600`. Arrow on the right. On hover: underline appears.

### Right Column — Open Source Card
A glass card (full glassmorphism style). Inside the card:

**Top area:**
A large centered Orbit logo mark (just the icon, not the wordmark), rendered in the brand gradient. Below it the MIT badge — a small pill: `MIT License` in `--brand` color on `--brand-subtle` background.

**Middle area — Repo Stats Row:**
Four mini stats in a 2×2 grid inside the card. Each stat: icon + number + label. Style: Body SM, `--text-secondary`.

| Icon | Number | Label |
|---|---|---|
| `Star` | `1.2k` | GitHub Stars |
| `GitFork` | `180` | Forks |
| `Users` | `34` | Contributors |
| `GitCommit` | `420+` | Commits |

**Bottom area — Contributors:**
Label: `Contributors` in Label size, `--text-muted`, uppercase.
Below it: a horizontal row of contributor avatar circles (small, `32px` each, overlapping slightly). Show 8 avatars then a `+26 more` pill. Use placeholder avatar images or initials-based avatars if real ones aren't available yet.

---

### Community Call-Out Strip
Below the two-column layout, a full-width strip in `--bg-subtle`. Border `1px solid --border-subtle` on top and bottom. Padding `32px` vertically. Content centered.

Text: `Want to help build Orbit?` — Heading SM, Plus Jakarta Sans `600`, `--text-primary`.
Below it: `We welcome contributions of all kinds — code, design, documentation, and feedback.` — Body MD, Inter, `--text-secondary`.
Button: `Contribute on GitHub →` — outlined brand button. Same style as the secondary CTA above.

---

## 11. Section 09 — Testimonials

### Background
`--bg-subtle`.

### Layout
Centered heading at top. Below it, a 3-column grid of testimonial cards on desktop. On mobile: a horizontally scrollable single-row carousel (user swipes through cards).

### Eyebrow Label
Label size. `--text-muted`. Uppercase. Letter-spaced.
Content: `WHAT PEOPLE ARE SAYING`

### Headline
Display MD. Plus Jakarta Sans `700`. `--text-primary`. Center-aligned.
Content: `People switched. They didn't go back.`

### Testimonial Cards
Each card: background `--bg-card`, border `1px solid --border-subtle`, border radius `16px`, shadow `--shadow-card`, padding `28px`.

Inside each card:
- Five stars in a row — Amber `#F59E0B`, `16px` each
- Quote text — Body MD, Inter `400`, `--text-primary` (slightly brighter than secondary, for readability)
- Reviewer name — Body MD, Plus Jakarta Sans `600`, `--text-primary`
- Reviewer detail — Body SM, Inter `400`, `--text-muted`

---

**Testimonial 1**
Stars: ★★★★★
Quote: `I've tried Notion, Todoist, YNAB, and three different habit trackers. Orbit replaced all of them. Not because it does everything perfectly — but because it does everything *together*.`
Name: `Sana M.`
Detail: `UX Designer, Lahore`

---

**Testimonial 2**
Stars: ★★★★★
Quote: `The fact that it's open source and free made me sceptical at first. But after two weeks I recommended it to my entire team. The loans module alone has saved me from so many awkward conversations.`
Name: `Hamza K.`
Detail: `Freelance Developer, Karachi`

---

**Testimonial 3**
Stars: ★★★★★
Quote: `I'm a student on a tight budget. The expenses and budget modules together have genuinely changed how I think about money. And the habit tracker keeps me consistent with studying.`
Name: `Nadia R.`
Detail: `University Student, Islamabad`

---

**Testimonial 4**
Stars: ★★★★★
Quote: `What got me was the offline support. I log expenses immediately as I spend — no signal needed. By the time I'm home it's all synced. My budgeting has never been more accurate.`
Name: `Tariq A.`
Detail: `Accountant, Rawalpindi`

---

**Testimonial 5**
Stars: ★★★★★
Quote: `I contribute to the project on GitHub and I use it daily. That combination is rare. The codebase is clean, the team is responsive, and the roadmap is public. Highly recommend to any developer.`
Name: `Zara F.`
Detail: `Software Engineer & Contributor`

---

**Testimonial 6**
Stars: ★★★★★
Quote: `Found three forgotten subscriptions in the first ten minutes. Cancelled them all. Orbit paid for itself immediately — except it's free. Which makes it even better.`
Name: `Bilal S.`
Detail: `Marketing Lead, Faisalabad`

---

## 12. Section 10 — FAQ

### Background
`--bg-base`.

### Layout
Two-column layout on desktop. Left column: eyebrow, headline, and a short intro paragraph plus a contact nudge. Right column: the accordion. Single column stacked on mobile.

### Eyebrow Label
Label size. `--text-muted`. Uppercase. Letter-spaced.
Content: `FAQ`

### Headline
Display MD. Plus Jakarta Sans `700`. `--text-primary`.
Content: `Good questions deserve good answers.`

### Left Column Body Copy
Body MD. Inter `400`. `--text-secondary`. Max width `340px`.

Content:
`These are the questions we get asked the most. If something isn't answered here, open an issue on GitHub or reach out directly — we read everything.`

Below that, a small link in `--brand` color, Inter `600`, Body SM:
`→ Ask a question on GitHub`

### Accordion Items

Built with shadcn's Accordion component. Each question: Plus Jakarta Sans `600`, Heading SM, `--text-primary`. Each answer: Inter `400`, Body MD, `--text-secondary`. Smooth height transition on expand/collapse. Divider between items in `--border-subtle`.

---

**Q1: Is Orbit really free? What's the catch?**
A: There is no catch. Orbit is open source under the MIT License — free to use, free to self-host, and free to modify. There is no paid tier, no premium features behind a paywall, and no plans to change that. The project is community-supported.

---

**Q2: How is my data stored? Is it private?**
A: Your data is stored locally on your device using IndexedDB. The app works fully offline without sending any data to a server. If you choose to enable cloud sync (optional), your data is encrypted in transit with TLS 1.3 and at rest with AES-256. We have no advertising, no tracking, and no interest in your personal data.

---

**Q3: Can I self-host Orbit?**
A: Yes. Because Orbit is MIT licensed, you can clone the repository, deploy it on your own infrastructure, and use it entirely independently. Self-hosting documentation is available in the GitHub repo.

---

**Q4: Does it work on iPhone and Android?**
A: Yes. Orbit is a Progressive Web App (PWA), which means it runs in any modern browser on any device. On Android (Chrome) and iOS (Safari), you can install it to your home screen and it behaves like a native app — including offline support and push notifications.

---

**Q5: How do the modules connect to each other?**
A: This is the core idea behind Orbit. Every expense you log automatically updates your Budget Planner. Loan payment dates generate Reminders automatically. Subscriptions create Expense entries when they renew. Habits you complete count toward linked Goals. Tasks can be tied to Goals too. The Dashboard pulls from all of them at once. You enter data once, and it flows everywhere it's relevant.

---

**Q6: Can I import data from other apps?**
A: Yes. The Expenses module accepts CSV imports with a column mapping interface, so you can bring in data from bank statements or any other tracker. You can also import a full Orbit backup (JSON format) to restore your data on a new device.

---

**Q7: Is there a mobile app on the App Store or Play Store?**
A: Not yet — Orbit is currently available as a PWA only. A listing on the Play Store (via TWA) is on the roadmap. The PWA experience on both Android and iOS is already very close to native.

---

**Q8: How can I contribute to Orbit?**
A: Open the GitHub repository and look for issues tagged `good first issue` or `help wanted`. Contributions of all kinds are welcome — code, design, translations, documentation, and bug reports. There's a contributing guide in the repo to help you get started.

---

## 13. Section 11 — Final CTA Banner

### Background
This is the only section with a brand gradient background. The gradient runs at `135 degrees` from `#5B6AF0` to `#9B6BF2`, full width. No card — the gradient fills the entire section. Subtle noise texture overlay at `5% opacity` over the gradient for tactility.

This section should feel like a moment of arrival — warm, confident, and inviting.

### Layout
Everything centered. Max width `680px` for text content.

### Eyebrow Label
Label size. White at `70% opacity`. Uppercase. Letter-spaced.
Content: `GET STARTED`

### Headline
Display LG. Plus Jakarta Sans `800`. White. Center-aligned.
Content: `Your most organised life`
Second line: `is one app away.`

### Subheading
Body LG. Inter `400`. White at `80% opacity`. Center-aligned. Max width `460px`.

Content:
`Free forever. Open source. Works on every device. No excuses left — just a better way to manage your everyday.`

### CTA Buttons
Two buttons, centered, side by side. Both have white text.

**Primary — "Get Started — It's Free"**
White background. Brand blue (`--brand`) text. Plus Jakarta Sans `600`. Border radius `10px`. Height `50px`. Padding `0 28px`. On hover: background shifts to `rgba(255,255,255,0.92)`, lifts `1px`.

**Secondary — "View on GitHub"**
White border (`1px`, `rgba(255,255,255,0.50)`). Transparent background. White text. Same height. On hover: border becomes fully white, background becomes `rgba(255,255,255,0.08)`.

### Trust Line
Below buttons. Inter `400`, `13px`. White at `60% opacity`.
Content: `MIT Licensed · No credit card · Works offline · Your data is yours`

---

## 14. Section 12 — Footer

### Background
`--bg-subtle`. `1px solid --border-subtle` top border separating it from the CTA banner above.

### Layout
Four columns on desktop. Two columns on tablet. Single column on mobile. Logo column on the far left, three link columns to the right.

### Left Column — Brand
Orbit logo mark + wordmark, same as navbar.

Tagline below in Body SM, Inter `400`, `--text-muted`:
`Organise your world.`

Below tagline: small GitHub star button — same style as the one in the navbar. Updates dynamically.

Below that: `MIT Licensed · Open Source` as a small pill badge in `--brand-subtle` background, `--brand` text.

### Link Columns

Style for all column headings: Label size, Inter `600`, `--text-muted`, uppercase, letter-spaced.
Style for all links: Body SM, Inter `400`, `--text-secondary`. Hover: `--text-primary`.

**Column: Product**
- Features
- How it Works
- Changelog
- Roadmap
- Self-Hosting Guide

**Column: Open Source**
- GitHub Repository
- Contributing Guide
- Report a Bug
- Request a Feature
- License (MIT)

**Column: General**
- About Orbit
- Privacy Policy
- Terms of Use
- Contact

### Bottom Bar
Full-width `--border-subtle` divider above.

Left: `© 2026 Orbit. Open Source.` — Body SM, Inter, `--text-muted`.
Right: `Built with ♥ by the community` — Body SM, Inter, `--text-muted`. The `♥` is in `--brand` color.

---

## 15. Animations & Motion Direction

All motion should feel calm, smooth, and purposeful. Orbit is a productivity tool — the animations should reinforce focus, not distract from it. No bounce effects, no dramatic transitions, nothing that feels like it's showing off.

Use `framer-motion` for all scroll-triggered reveals and page-level transitions.

### Scroll Reveal — Universal Rule
Every section heading, body copy block, and card should animate into view as it enters the viewport. The animation: fade in from `opacity: 0` and `translateY: 20px` to `opacity: 1` and `translateY: 0`. Duration: `0.5s`. Easing: `ease-out`. Do not trigger until the element is at least `10%` into the viewport. Use `useInView` from framer-motion or `react-intersection-observer`.

For grids of cards: stagger children by `60ms` each so they appear in sequence, not all at once.

### Hero Floating Mockup
Gentle continuous float. Vertical travel: `8px`. Cycle duration: `5 seconds`. Easing: `ease-in-out`. This is always running — it's not triggered by scroll. It gives the hero a sense of life without being distracting.

### Navbar Glass Transition
When the user scrolls past `72px`, the navbar background transitions to glassmorphism over `0.3s ease`. Smooth and unnoticeable unless you're looking for it.

### Stats Counter — Hero
When the stats row enters the viewport for the first time, the `10,000+` stat counts up from `0` to its value over `1.5 seconds` using an `ease-out` curve. The other two static stats simply fade in. This happens once per page load — it does not re-trigger on scroll.

### Feature Card Hover
On hover: card rises `2px` upward. Background transitions from `--bg-card` to `--bg-card-hover`. Border brightens from `--border-subtle` to `--border-medium`. Duration: `0.2s ease`. The accent-colored icon background deepens slightly in opacity. No scale transform — just the lift and background change.

### CTA Buttons — Hover
Primary button: rises `1px`, shadow intensifies gently beneath it. Duration `0.15s`.
Secondary button: border color transitions to `--brand`. Duration `0.15s`.

### Accordion — FAQ
Expand and collapse with smooth height animation at `0.25s ease`. shadcn's built-in Accordion handles this. No custom override needed.

### Testimonial Carousel — Mobile
On mobile the testimonial row becomes a swipeable carousel. Swipe left/right to move between cards. Small dot indicators below. No auto-play — user controls navigation entirely.

### Social Proof Bar
The logos/names row on the Social Proof Bar auto-scrolls horizontally in a continuous loop (like a marquee) on all screen sizes. Speed: slow and smooth — approximately `30 seconds` for a full loop. No interaction required or expected.

---

## 16. Responsive Behaviour

### Breakpoints
- Mobile: below `768px`
- Tablet: `768px` to `1024px`
- Desktop: above `1024px`

### Navbar
- Desktop: Logo · centered links · GitHub + Get Started
- Mobile: Logo left · hamburger right · bottom sheet drawer on open

### Hero
- Desktop: Two equal columns — text left, mockup right
- Tablet: Two columns — text slightly wider than mockup
- Mobile: Single column — eyebrow, headline, subtext, buttons, trust line, stats, then mockup below. Mockup scales to fit within the viewport width.

### Social Proof Bar
- All screen sizes: horizontal scrolling marquee row, no layout change

### Problem Statement Cards
- Desktop: 3 columns
- Tablet: 2 columns (3rd card centered below)
- Mobile: 1 column stack

### Features Grid
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

### How It Works
- Desktop: 3 steps side by side, horizontal dashed connector between them
- Mobile: 3 steps stacked vertically, vertical dashed connector between them

### App Preview
- Desktop: 2 columns — text left, device mockup right
- Mobile: Single column — text then mockup below. Mockup scales to fit.

### Open Source & Community
- Desktop: 2 columns — text + stats left, glass card right
- Mobile: Single column — text first, card below. Community strip remains full width.

### Testimonials
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: Horizontal swipeable carousel, one card visible at a time, dot indicators below

### Pricing
- Desktop: 3 columns
- Tablet: 3 narrow columns (or 1 column if cards become too cramped)
- Mobile: 1 column stack

### FAQ
- Desktop: 2 columns — intro text left, accordion right
- Mobile: 1 column — heading + intro, then accordion below

### CTA Banner
- All sizes: centered content, buttons stack vertically on mobile

### Footer
- Desktop: 4 columns
- Tablet: 2 columns (brand column, links column)
- Mobile: 1 column stack. Bottom bar stacks vertically too.

---

*End of Document — Orbit Homepage Specification v1.0*