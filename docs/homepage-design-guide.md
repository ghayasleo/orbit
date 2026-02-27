# Orbit — Homepage Product Specification (Antigravity IDE Input)
**Project:** Orbit — Open Source Daily Life PWA  
**Document Type:** Homepage UX + Visual System Specification  
**Purpose:** This document defines how the Orbit homepage should be designed and structured so Antigravity IDE can generate the homepage correctly.  
**Scope:** Homepage only (marketing-style product showcase).  
**Product Context:** Orbit is a free, open-source PWA that helps users organize daily life through modules like dashboard, tasks, reminders, habits, notes, expenses, goals, etc. :contentReference[oaicite:0]{index=0}

---

# 1. Product Positioning Strategy

## Positioning Direction
Orbit should feel like:

> **A calm daily companion that helps people organize life without stress.**

This is NOT a productivity-guru or aggressive startup vibe.

### Core Emotional Goals
- Calm
- Clear
- Trustworthy
- Helpful
- Lightweight

### Avoid
- Loud marketing language
- Overly corporate SaaS feeling
- Complex dashboards shown immediately
- Productivity pressure messaging

---

# 2. Homepage Objective

The homepage does NOT sell aggressively.

Primary objective:

> Showcase Orbit as a simple, beautiful, open-source app that anyone can use daily.

### Key Messages
1. Orbit simplifies daily life.
2. Everything lives in one place.
3. It’s free and open source.
4. Works fast and feels calm.

---

# 3. Strategic Approach (Structure Decision)

Orbit has many modules, but showing all features creates cognitive overload.

### Correct Approach:
**Present Orbit as ONE unified system.**

DO NOT treat modules like separate apps.

Instead:
- Show Orbit as a daily flow.
- Modules appear as supporting examples.

Users should feel:
> “I don’t need to learn tools — Orbit just organizes my day.”

---

# 4. Visual Concept Direction (Design Brainstorm)

## Design Philosophy
Modern SaaS structure + calm consumer-app softness.

Visual inspiration direction (conceptual):
- Apple-like spacing clarity
- Linear-level cleanliness
- Calm lifestyle-product energy

### Mood Keywords
- Soft contrast
- Breathing space
- Smooth transitions
- Friendly structure
- Minimal visual noise

---

# 5. Color System (Color Theory Driven)

Orbit manages daily life, habits, focus, and planning.

Color psychology goal:
- Trust + clarity (blue spectrum)
- Calm stability
- Slight modern energy

## Primary Palette

### Primary Brand Color
- Orbit Blue: `#3B6EF6`
  - Represents clarity, reliability, daily structure.

### Secondary Accent
- Soft Indigo: `#5B7BFF`
  - Used for gradients and emphasis.

### Supporting Accent (for calm UX moments)
- Calm Cyan: `#4FD1C5`

---

## Neutral System

### Backgrounds
- Main background: `#F8FAFC`
- Surface cards: `#FFFFFF`
- Elevated surface: `#F3F6FB`

### Text Colors
- Primary text: `#0F172A`
- Secondary text: `#475569`
- Muted text: `#94A3B8`

---

## Status Colors (subtle use only)
- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`

---

## Gradient Usage
Use ONLY for hero highlights:

Gradient: `#3B6EF6 → #5B7BFF`

No aggressive neon gradients.

---

# 6. Typography System

## Font Family
**Primary Font:** Inter

Reason:
- Extremely readable for productivity apps.
- Modern and neutral.
- Works across PWA environments.

## Font Scale

### Display
- Hero title: 56px desktop / 38px mobile
- Weight: 700

### Headings
- Section titles: 36px
- Subsections: 24px

### Body
- Body text: 18px
- Supporting text: 16px

### Button text
- 15px / weight 600

Line height should feel airy (1.4–1.6).

---

# 7. Spacing & Layout System

Orbit must feel calm and breathable.

## Section Spacing
- Desktop: 120px vertical spacing
- Mobile: 72px vertical spacing

## Container
- Max width: 1200px
- Horizontal padding:
  - Desktop: 48px
  - Mobile: 20px

## Grid
- 12-column desktop
- 4-column mobile

---

# 8. Homepage Structure

---

## Section 1 — Navigation (Sticky)

### Elements
- Orbit logo (left)
- Links:
  - Features
  - Open Source
  - Privacy
  - FAQ
- Right:
  - Button: Install Orbit
  - Secondary: GitHub

### Behavior
- Transparent at top.
- Adds soft blur background on scroll.

---

## Section 2 — Hero (First Viewport)

### Goal
Immediately communicate calm daily organization.

### Headline Direction
Use emotional clarity instead of productivity hype.

Recommended concept:

> **Organize life without the chaos.**

### Supporting Text
Orbit brings tasks, reminders, notes, habits and more into one calm daily workspace — free and open source.

### Buttons
- Primary: Install Orbit
- Secondary: Explore Features

### Visual
Right side:
- Animated app preview.
- Show dashboard overview:
  - Today tasks
  - Habit streak
  - Reminder card
  - Budget progress

Animation:
- Slow floating motion.
- Subtle card depth.

---

## Section 3 — Problem → Solution Flow

Layout:
- 3 horizontal cards.

Cards:
1. Too many apps.
2. Things get forgotten.
3. Daily planning feels heavy.

After cards:
Single statement:

> Orbit brings everything together into one simple flow.

---

## Section 4 — Product Experience Showcase

This is the core section.

### Layout
Alternating left-right feature blocks.

Each block:
- Mock UI visual
- Title
- Short explanation

Show these experiences:

1. Dashboard overview
2. Tasks + Reminders together
3. Habits + consistency tracking
4. Expenses + budget awareness
5. Notes quick capture

IMPORTANT:
Never show full complexity.

Each section should feel effortless.

---

## Section 5 — Unified System Explanation

Visual diagram-style section.

Show how modules connect:

Example flow: `Tasks → Reminders → Habits → Goals → Daily Progress`

Small supporting text:
Orbit works as one system instead of separate apps.

---

## Section 6 — Open Source & Privacy

Background changes slightly darker for visual rhythm.

Content:
- Free forever core experience.
- Open-source transparency.
- Offline-first architecture.
- Privacy-first design.

Add icons for each.

---

## Section 7 — Installation Experience

Highlight PWA capabilities:

- Install instantly.
- Works offline.
- Fast loading.
- Mobile + desktop.

Visual:
Phone + desktop mock side by side.

---

## Section 8 — Final CTA

Centered minimal section.

Headline:
> Ready to organize your day with less friction?

Buttons:
- Install Orbit
- View on GitHub

---

## Section 9 — Footer

Links:
- GitHub
- Documentation
- Privacy
- License
- Contributors

Small note:
Orbit is open-source.

---

# 9. Motion & Animation System (Framer Motion Direction)

Animations should feel smooth and natural.

## Global Rules
- No fast motion.
- No aggressive scaling.
- Ease curves should feel soft.

---

## Section Reveal
- Fade + slight upward motion.
- Duration: ~0.6s.
- Trigger on entering viewport.

---

## Hero Animation
- Floating UI cards.
- Slow parallax scroll feel.

---

## Buttons
- Soft lift on hover.
- Slight shadow increase.
- Smooth 200ms transitions.

---

## Cards
- Gentle hover elevation.
- Micro scale (very subtle).

---

# 10. Imagery Style

Do NOT use stock photography.

Use:
- Product UI visuals
- Abstract soft shapes
- Minimal vector graphics

Orbit homepage should feel product-first.

---

# 11. Tone & Copywriting Rules

Tone:
- Calm
- Friendly
- Confident
- Minimal words

Avoid:
- Productivity hustle language.
- Growth-hack style messaging.
- Enterprise jargon.

---

# 12. Responsive Behavior

## Mobile Strategy
- Hero stacks vertically.
- Buttons full width.
- Feature blocks become cards.
- Reduce animation intensity.

---

# 13. Accessibility Requirements

- High contrast text.
- Large tap areas.
- Smooth reduced-motion fallback.
- Keyboard navigable navigation.

---

# 14. Implementation Notes for Antigravity IDE

- This is NOT a dashboard screen.
- This is a product showcase page.
- Keep layout airy.
- Emphasize emotional calm over complexity.
- Visual hierarchy must guide user naturally down page.

---

# End of Orbit Homepage Specification