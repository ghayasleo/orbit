# Orbit Dashboard — Draggable Widget System

## Full Functional & Non-Functional Requirements Prompt for Antigravity IDE

---

## Context

The Orbit dashboard currently looks exactly as shown in the reference screenshot — a gradient hero banner at the top with stats, and a card-based widget grid below showing Habit Streaks, Budget Planner, Active Goals, Priority Tasks, Recent Expenses, and Upcoming Due. The visual design is already correct and must not change. What needs to be built on top of the existing design is a complete drag-and-drop widget management system, a widget picker, and support for adding and removing widgets dynamically. The layout must be powered by `react-grid-layout`.

---

## Library to Install

Install `react-grid-layout` and its type definitions:

```
npm install react-grid-layout
npm install --save-dev @types/react-grid-layout
```

Import the required CSS in your root layout or `main.tsx`:

```
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
```

---

## Functional Requirements

### FR-01 — Edit Mode Toggle

There must be an "Edit Dashboard" button in the top-right area of the dashboard header, next to the search bar and notification bell. It uses the Lucide `LayoutDashboard` icon with the label "Edit Dashboard". Clicking it activates Edit Mode.

When Edit Mode is active:

- The button label changes to "Done Editing" and its icon changes to `Check`
- The button background changes to the brand gradient (indigo to violet)
- A subtle animated dashed border appears around each widget card to indicate it is draggable
- A drag handle icon (`GripVertical` from Lucide, `16px`, muted color) appears in the top-left corner of every widget card
- A remove button (`X` icon, `14px`, red color on hover) appears in the top-right corner of every widget card
- A floating "Add Widget" button appears at the bottom-center of the screen, fixed positioned, with a `+` icon and the label "Add Widget", brand gradient background, white text, `border-radius: 999px`, `padding: 12px 24px`
- Widgets become draggable and resizable only in Edit Mode — not in normal view mode
- A faint overlay message appears below the hero banner: "Drag widgets to rearrange · Resize from corners · Click + to add more" in muted small text

When Edit Mode is deactivated (Done Editing clicked):

- The layout is saved immediately to Supabase (`dashboard_layouts` table, keyed by `user_id`)
- All editing UI (drag handles, remove buttons, dashed borders, Add Widget button, overlay message) disappears
- The dashboard returns to normal interactive mode

---

### FR-02 — Drag and Drop

Use `react-grid-layout`'s `<ResponsiveGridLayout>` component (from `react-grid-layout/responsive`) to wrap all widgets.

Grid configuration:

- Columns: `{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }`
- Row height: `80px`
- Margin between widgets: `[16, 16]` (horizontal and vertical gap in pixels)
- Container padding: `[0, 0]`
- `isDraggable`: only `true` when Edit Mode is active, `false` otherwise
- `isResizable`: only `true` when Edit Mode is active, `false` otherwise
- `draggableHandle`: set to `.drag-handle` class so only the drag handle icon initiates drag, not the entire card
- `useCSSTransforms`: `true` for smooth GPU-accelerated movement
- `preventCollision`: `false` — widgets should push each other out of the way naturally

Each widget must have a drag handle element — a small `GripVertical` icon wrapped in a `div` with the class `drag-handle` and `cursor: grab`. This element only renders when Edit Mode is active.

Dragging behaviour:

- When a widget is being dragged, it should have `opacity: 0.85` and a slightly elevated `box-shadow` to indicate it is lifted
- Other widgets smoothly animate into their new positions as the dragged widget moves (react-grid-layout handles this automatically)
- On drop, the widget snaps to the nearest grid cell

---

### FR-03 — Widget Resizing

Each widget has resize handles on its bottom-right corner only (set `resizeHandles: ['se']` in react-grid-layout).

Each widget has defined minimum and maximum size constraints:

| Widget               | Min Width (cols) | Min Height (rows) | Max Width (cols) | Default Width | Default Height |
| -------------------- | ---------------- | ----------------- | ---------------- | ------------- | -------------- |
| Hero Banner          | 12               | 2                 | 12               | 12            | 2              |
| Habit Streaks        | 4                | 4                 | 12               | 8             | 4              |
| Priority Tasks       | 4                | 4                 | 12               | 4             | 6              |
| Budget Planner       | 3                | 3                 | 6                | 4             | 4              |
| Active Goals         | 3                | 3                 | 6                | 4             | 4              |
| Recent Expenses      | 4                | 4                 | 12               | 8             | 4              |
| Upcoming Due         | 4                | 4                 | 12               | 4             | 4              |
| Reminders Widget     | 3                | 3                 | 6                | 4             | 4              |
| Loans Widget         | 3                | 3                 | 6                | 4             | 4              |
| Subscriptions Widget | 3                | 3                 | 6                | 4             | 4              |
| Notes Quick Access   | 3                | 3                 | 8                | 4             | 4              |
| Events Widget        | 3                | 3                 | 8                | 4             | 4              |
| AI Chat Widget       | 4                | 4                 | 8                | 6             | 5              |

The Hero Banner widget is always locked at full width (12 columns) and always stays at the top of the grid. It cannot be moved or resized. Set `static: true` on the hero banner layout item.

When a widget is being resized, show a small tooltip near the resize handle displaying the current size in a human-readable format (e.g. "Wide · Short") — not raw grid units.

Widget content must adapt to its container size:

- If a widget is narrow (4 cols or less): show a compact version — smaller font sizes, fewer list items visible, condensed layout
- If a widget is wide (8+ cols): show an expanded version — more list items, potentially a two-column internal layout
- Use a `ResizeObserver` inside each widget component to detect its rendered pixel width and switch between compact and expanded layouts accordingly. Do not rely on breakpoints for this — the widget itself must respond to its own container width.

---

### FR-04 — Remove Widget

In Edit Mode, each widget card has an `X` button in its top-right corner. Clicking it:

1. Shows a small inline confirmation tooltip directly on the widget: "Remove this widget? [Yes] [Cancel]" — do not use a full modal dialog for this
2. If confirmed: the widget is removed from the grid with a smooth fade-out animation (`opacity: 1` to `opacity: 0`, `scale: 0.95` to `scale: 1`, duration `200ms`)
3. The remaining widgets smoothly rearrange to fill the space
4. The removed widget's ID is added to a `hidden_widgets` array in the user's layout object in Supabase
5. The widget can be re-added later from the Add Widget panel

The Hero Banner widget does not have a remove button — it is always present and cannot be removed.

---

### FR-05 — Add Widget Panel

Clicking the floating "Add Widget" button opens a slide-in panel from the right side of the screen. It overlays the dashboard without a full-screen modal.

Panel specifications:

- Width: `360px` on desktop, full screen on mobile
- Background: `--bg-card` color with `--border-subtle` left border
- A close button (`X`) in the top-right of the panel
- Title: "Add Widgets" in Heading SM, Plus Jakarta Sans `600`
- Subtitle: "Choose widgets to add to your dashboard" in Body SM, muted color

Panel content — a vertical scrollable list of all available widgets. Each row shows:

- A colored icon square on the left (matching the widget's module accent color)
- The widget name in Body MD, Plus Jakarta Sans `600`
- A short description in Body SM, muted color
- On the right: if the widget is currently on the dashboard, show a grey "Added" badge. If it is not on the dashboard, show an indigo "+ Add" button

Available widgets list (shown in the panel):

| Widget Name     | Icon           | Accent Color      | Description                         |
| --------------- | -------------- | ----------------- | ----------------------------------- |
| Habit Streaks   | `Flame`        | Violet `#8B5CF6`  | Today's habits with streak rings    |
| Priority Tasks  | `CheckSquare`  | Blue `#3B82F6`    | High priority tasks due today       |
| Budget Planner  | `PieChart`     | Cyan `#06B6D4`    | Monthly budget vs spending          |
| Active Goals    | `Target`       | Lime `#84CC16`    | Goals with progress bars            |
| Recent Expenses | `Receipt`      | Emerald `#10B981` | Latest expense entries              |
| Upcoming Due    | `Calendar`     | Rose `#F43F5E`    | Loans, EMIs, subscriptions due soon |
| Reminders       | `Bell`         | Amber `#F59E0B`   | Next upcoming reminders             |
| Loans Overview  | `Landmark`     | Rose `#F43F5E`    | Outstanding borrowed and lent       |
| Subscriptions   | `RefreshCw`    | Pink `#EC4899`    | Renewals due this month             |
| Notes           | `NotebookPen`  | Orange `#F97316`  | Recent notes and quick capture      |
| Events          | `CalendarDays` | Indigo `#5B6AF0`  | Upcoming calendar events            |
| AI Assistant    | `Sparkles`     | Brand gradient    | Quick AI chat for actions           |

When "+ Add" is clicked:

- The widget is added to the bottom of the grid with a smooth fade-in animation
- The button changes to a grey "Added" badge immediately
- The layout is not saved until the user clicks "Done Editing"

---

### FR-06 — Layout Persistence

Every time the user clicks "Done Editing", save the full layout state to Supabase.

Table structure for `dashboard_layouts`:

- `user_id` (foreign key to auth.users)
- `layout_lg` (JSONB — layout array for large screens)
- `layout_md` (JSONB — layout array for medium screens)
- `layout_sm` (JSONB — layout array for small screens)
- `hidden_widgets` (JSONB array of widget IDs that have been removed)
- `updated_at` (timestamp)

On dashboard load:

1. Fetch the user's saved layout from Supabase using TanStack Query (`queryKey: ['dashboard-layout', userId]`)
2. If a saved layout exists, apply it
3. If no saved layout exists (first time user), apply the default layout as shown in the reference screenshot
4. Show a skeleton loader for each widget card while the layout is loading — do not show an empty grid

Add a "Reset to Default" option inside the Add Widget panel (small text link at the bottom of the panel). Clicking it shows a confirmation: "Reset your dashboard layout to the default? This cannot be undone." If confirmed, delete the user's layout record from Supabase and reload the default layout.

---

### FR-07 — New Widgets to Add

The following widgets are not currently on the dashboard and must be built as new widget components and made available in the Add Widget panel:

**Reminders Widget**
Shows the next 3 upcoming reminders sorted by time. Each row: reminder title, time remaining (e.g. "In 2 hours"), and a small bell icon. If a reminder is overdue, show it in rose/red color with "Overdue" label.

**Loans Overview Widget**
Two rows: "You Owe" total (sum of all borrowed loans outstanding) in rose color, and "Owed to You" total (sum of all lent loans outstanding) in emerald color. Below each: the count of active loans (e.g. "3 active loans"). A "View All" link navigates to the Loans module.

**Subscriptions Widget**
Shows subscriptions renewing in the next 30 days as a list. Each row: service name with logo/icon, renewal date, and monthly cost right-aligned in muted color. Highlight rows where renewal is within 7 days in amber. Show maximum 4 rows, then "View All".

**Notes Quick Access Widget**
Shows the 3 most recently modified notes as rows — note title, first line of content as subtitle, and last modified time (relative, e.g. "2 hours ago"). A "New Note" button at the bottom of the card opens a quick note creation modal without leaving the dashboard.

**Events Widget**
Shows upcoming calendar events for the next 7 days. Each row: event name, date, and time. Today's events are highlighted with a brand-color left border. If there are no events, show an empty state with a "Add Event" button.

**AI Assistant Widget**
A compact AI chat widget on the dashboard. Shows a single input field with placeholder text "Ask Orbit anything or say 'add a task'...". Above the input, shows the last 2 messages in the conversation (user message right-aligned in brand-subtle background, AI response left-aligned in card background). Submitting a message sends it to the AI and streams the response inline. A "Open Full Chat" link at the top-right of the widget opens the full AI chat panel.

---

## Non-Functional Requirements

### NFR-01 — Performance

- The drag and drop operation must run at a consistent 60fps. Do not perform any Supabase writes during dragging — only write when "Done Editing" is clicked.
- Each widget must fetch its own data independently using TanStack Query. A slow widget (e.g. AI widget taking time to load) must not block other widgets from rendering.
- All widget data queries must have `staleTime: 1000 * 60 * 5` (5 minutes) so navigating away and back does not re-fetch unnecessarily.
- Widget skeleton loaders must match the shape and size of the actual widget content exactly — not generic grey rectangles. Each widget has its own custom skeleton.

### NFR-02 — Animations

All animations use `framer-motion`. No CSS-only transitions for widget-level interactions.

- Widget add: `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}`, duration `250ms`, ease `easeOut`
- Widget remove: `animate={{ opacity: 0, scale: 0.95 }}`, duration `200ms`, ease `easeIn`, then unmount
- Edit mode activation: drag handles and remove buttons fade in with `staggerChildren: 0.03s` so they appear one by one across the grid, not all at once
- Add Widget panel: slides in from the right (`x: 360` → `x: 0`), duration `300ms`, ease `easeOut`. Slides back out on close.
- Layout rearrangement after remove: react-grid-layout handles this with its built-in CSS transitions — set `transition: 'transform 200ms ease'` in the grid's CSS

### NFR-03 — Responsiveness

- On desktop (1024px+): full react-grid-layout grid with dragging and resizing
- On tablet (768px–1023px): react-grid-layout grid active but with fewer columns. Dragging works. Resizing is hidden (too fiddly on touch).
- On mobile (below 768px): disable react-grid-layout entirely. Switch to a simple vertical stack of widget cards. Drag and drop is not available on mobile. The "Edit Dashboard" button on mobile only allows adding and removing widgets — not repositioning. Show a small info message: "Rearranging widgets is available on desktop."

### NFR-04 — Accessibility

- All drag handles must have `aria-label="Drag to reorder widget"`
- All remove buttons must have `aria-label="Remove [widget name] widget"`
- The Add Widget panel must trap focus when open — tabbing should cycle through panel elements only
- Escape key closes the Add Widget panel and cancels any pending remove confirmations
- Widget cards must maintain their existing `role` and heading structure regardless of their position in the grid

### NFR-05 — Error Handling

- If saving the layout to Supabase fails: show a small toast notification (bottom-right, `3 seconds`) — "Failed to save layout. Your changes may not persist." with a "Retry" button. Do not exit Edit Mode on failure.
- If loading the saved layout fails: fall back to the default layout silently. Log the error to the console. Do not show an error to the user — a broken dashboard is worse than a reset one.
- If a widget's data fetch fails: show an inline error state within the widget card — a small warning icon and the message "Couldn't load data. [Retry]" — do not crash the entire dashboard.

### NFR-06 — State Management

- Edit mode state (`isEditMode: boolean`) lives in a React context (`DashboardContext`) so all widget components can read it without prop drilling
- The current layout state lives in the same context
- Hidden widgets list lives in the same context
- Do not use any global state library (Redux, Zustand) for this — React context + TanStack Query is sufficient

---

## Default Layout (First-Time User)

When no saved layout exists, apply this default:

```
Row 1: Hero Banner (full width, 12 cols, 2 rows tall) — static, locked
Row 2: Habit Streaks (8 cols, 4 rows) | Priority Tasks (4 cols, 6 rows)
Row 3: Budget Planner (4 cols, 4 rows) | Active Goals (4 cols, 4 rows) | [Priority Tasks continues]
Row 4: Recent Expenses (8 cols, 4 rows) | Upcoming Due (4 cols, 4 rows)
```

This matches exactly the layout shown in the reference screenshot.

---

## Component File Structure

Organise the dashboard widget system as follows:

```
src/
  shared/
    components/
      widgets/
        HeroBanner.tsx
        HabitStreaksWidget.tsx
        PriorityTasksWidget.tsx
        BudgetPlannerWidget.tsx
        ActiveGoalsWidget.tsx
        RecentExpensesWidget.tsx
        UpcomingDueWidget.tsx
        RemindersWidget.tsx
        LoansOverviewWidget.tsx
        SubscriptionsWidget.tsx
        NotesWidget.tsx
        EventsWidget.tsx
        AIAssistantWidget.tsx
        WidgetWrapper.tsx
        WidgetSkeleton.tsx
      DashboardGrid.tsx
      EditModeBar.tsx
      AddWidgetPanel.tsx
    context/
      DashboardContext.tsx

  features/
    dashboard/
      pages/
        dashboard-page.tsx        — imports DashboardGrid, DashboardContext, EditModeBar
```

Every widget is wrapped in `<WidgetWrapper>` which handles the edit-mode UI (drag handle, remove button, dashed border). The widget component itself only contains its own content and data fetching logic.

---

## Summary of What to Build

1. Install and configure `react-grid-layout` with `ResponsiveGridLayout`
2. Build `DashboardContext` with edit mode state, layout state, and hidden widgets list
3. Build `WidgetWrapper` component that shows drag handle and remove button in edit mode
4. Convert the existing dashboard grid to use `ResponsiveGridLayout` — all existing widgets become layout items
5. Build the `AddWidgetPanel` slide-in component with the full widget list
6. Build the 6 new widget components (Reminders, Loans Overview, Subscriptions, Notes, Events, AI Assistant)
7. Implement layout save and load with Supabase (`dashboard_layouts` table)
8. Implement all animations with framer-motion
9. Implement mobile fallback (vertical stack, no drag on mobile)
10. Implement error handling for save failures and widget data failures

Do not change the visual design of any existing widget. The card styles, colors, typography, hero banner gradient, and overall aesthetic must remain exactly as they are in the current dashboard screenshot. Only add the drag-and-drop system, widget management, and new widgets on top of the existing design.

---

_End of Prompt — Orbit Dashboard Widget System_
