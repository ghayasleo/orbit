# Daily Life PWA — Product Requirements & Module Specifications

**Prepared for:** Antigravity Development Team
**Version:** 1.0
**Date:** February 2026

---

## Document Overview

This document defines the complete product requirements for a Progressive Web App (PWA) designed to help users manage their daily life. It covers 10 core modules: Dashboard, Tasks, Reminders, Expenses, Loans, Habits, Budget Planner, Notes, Subscriptions, and Goals. Each module section details all features, data fields, user interactions, and edge cases required for development.

---

## Table of Contents

1. [Module 1 — Dashboard](#module-1--dashboard)
2. [Module 2 — Tasks](#module-2--tasks)
3. [Module 3 — Reminders](#module-3--reminders)
4. [Module 4 — Expenses](#module-4--expenses)
5. [Module 5 — Loans](#module-5--loans)
6. [Module 6 — Habits](#module-6--habits)
7. [Module 7 — Budget Planner](#module-7--budget-planner)
8. [Module 8 — Notes](#module-8--notes)
9. [Module 9 — Subscriptions Tracker](#module-9--subscriptions-tracker)
10. [Module 10 — Goals](#module-10--goals)
11. [Section 11 — Non-Functional Requirements](#section-11--non-functional-requirements)
12. [Appendix — Inter-Module Connections](#appendix--inter-module-connections)

---

## Module 1 — Dashboard

> The Dashboard is the home screen of the app. It surfaces the most important information from all modules in one glance — upcoming tasks, pending reminders, budget status, habit streaks, and loan due dates — so users never have to dig into individual modules to know what needs attention today.

### 1.1 Overview Cards

| Feature | Description |
|---|---|
| Today's Summary | A top card showing total tasks due today, reminders firing today, habits pending for the day, and total expenses logged this month. |
| Quick Add Button | A floating action button (FAB) that lets users quickly add a task, reminder, expense, or note without navigating away from the dashboard. |
| Greeting Header | Personalized greeting using the user's name and time of day (Good Morning / Afternoon / Evening). |
| Date & Day Display | Prominently shows today's date and day of week at the top of the dashboard. |

### 1.2 Widget Cards

| Feature | Description |
|---|---|
| Tasks Widget | Shows up to 5 tasks due today or overdue, with a checkbox to mark complete inline. Tapping the card navigates to the full Tasks module. |
| Reminders Widget | Lists the next 3 upcoming reminders for the day with time and title. Tapping navigates to Reminders. |
| Habits Widget | Shows today's habits as a horizontal row of icon + name. Completed ones are checked off. Tapping navigates to Habits. |
| Budget Widget | A mini donut or progress bar showing monthly spending vs budget. Color-coded: green (<70%), yellow (70–90%), red (>90%). |
| Loans Widget | Shows any loan payments due within the next 7 days with amount and lender name. |
| Subscriptions Widget | Shows any subscriptions renewing within the next 7 days. |
| Goals Widget | Displays active goals with progress bars. Shows the goal closest to its deadline. |

### 1.3 Customization & Settings

| Feature | Description |
|---|---|
| Widget Reordering | Users can drag and drop widgets to reorder them on the dashboard according to personal preference. |
| Widget Toggle | Users can show or hide individual widgets from the dashboard via a 'Customize' button. |
| Dark / Light Mode | Dashboard respects the system-level dark/light mode preference, with an in-app toggle override. |
| Notification Summary | A bell icon shows a count of all unread notifications across all modules. |

---

## Module 2 — Tasks

> The Tasks module is for managing actionable to-do items. Tasks are things the user needs to do — they have completion states, priorities, due dates, and can be organized into projects or categories. Tasks are distinct from Reminders: a task is about getting something done, while a reminder is about being notified at a specific time.

### 2.1 Task Creation & Fields

| Feature | Description |
|---|---|
| Task Title | Required short text field. Supports up to 200 characters. Users can create a task quickly by just entering a title. |
| Description / Notes | Optional multiline text area for adding context, instructions, or links related to the task. |
| Due Date | Optional date picker. Tasks without a due date appear in a 'No Date' section. Overdue tasks are highlighted in red. |
| Due Time | Optional time picker attached to the due date for time-specific tasks. |
| Priority Level | Four levels: None, Low, Medium, High. Displayed as colored flags (grey, blue, orange, red). Default is None. |
| Project / Category | Assign a task to a project or category (user-defined). Tasks can belong to one project at a time. |
| Tags / Labels | Users can add multiple free-form tags to a task (e.g., 'work', 'home', 'urgent'). Tags are color-coded. |
| Subtasks | A task can have unlimited nested subtasks. Each subtask has its own title and completion state. Parent task shows progress (e.g., '2 of 5 subtasks done'). |
| Attach Reminder | A task can have one or more reminders linked to it. Setting a reminder creates an entry in the Reminders module automatically. |
| Recurring Task | Option to repeat a task: daily, weekly, monthly, yearly, or custom interval (e.g., every 3 days, every 2nd Monday). |
| Estimated Duration | Optional field to set how long the task is expected to take (in minutes/hours). Useful for scheduling. |
| Attachments | Users can attach images or files (up to 10MB per attachment, max 5 per task). |

### 2.2 Task Management

| Feature | Description |
|---|---|
| Complete / Uncomplete | Tap a checkbox to mark a task complete. Completed tasks are struck through and moved to a 'Completed' section. Can be uncompleted at any time. |
| Swipe Actions | On mobile, swipe right to complete and swipe left to delete a task with a confirmation prompt. |
| Edit Task | Tap any task to open a full edit sheet. All fields are editable after creation. |
| Delete Task | Delete with confirmation dialog. Deleted tasks go to trash and are permanently deleted after 30 days. |
| Duplicate Task | Option to duplicate a task (copies all fields except completion state and creation date). |
| Move to Project | Reassign a task to a different project from the task detail view. |
| Bulk Actions | Long press to enter multi-select mode. Bulk complete, delete, move, or change priority. |

### 2.3 Views & Filters

| Feature | Description |
|---|---|
| Today View | Shows all tasks due today plus overdue tasks at the top. |
| Upcoming View | Shows tasks due in the next 7 days, grouped by day. |
| All Tasks View | A flat list of all incomplete tasks across all projects. |
| Project View | Tasks grouped by project. Each project can be collapsed or expanded. |
| Completed View | Shows all completed tasks with their completion date. Filterable by date range. |
| Filter by Priority | Filter the task list to show only tasks of a selected priority level. |
| Filter by Tag | Filter tasks by one or more tags. |
| Sort Options | Sort tasks by: due date, creation date, priority, alphabetical, or manual drag-and-drop order. |
| Search | Full-text search across task title, description, and tags with real-time results. |

### 2.4 Projects

| Feature | Description |
|---|---|
| Create Project | Users can create named projects with a custom color and optional emoji icon. |
| Project Dashboard | Each project shows total tasks, completed tasks, overdue tasks, and a progress ring. |
| Archive Project | Archive completed projects to hide them without deleting. Archiving a project hides all its tasks from main views. |
| Delete Project | Deleting a project moves all its tasks to an 'Inbox' project (unassigned) before deletion. |
| Project Reordering | Drag and drop to reorder projects in the sidebar. |

---

## Module 3 — Reminders

> Reminders are time-based alerts. Unlike tasks, reminders are about being notified — they fire a push notification at the right time and do not require 'completion' in the same way. Users can link reminders to tasks or keep them standalone (e.g., 'Take medicine at 8pm', 'Call mom on Sunday').

### 3.1 Reminder Creation & Fields

| Feature | Description |
|---|---|
| Reminder Title | Required short text. Up to 200 characters. |
| Date & Time | Trigger date and time for the notification. Mandatory for time-based reminders. |
| Notes | Optional notes or additional context shown in the notification. |
| Recurrence | Repeat options: once, daily, weekdays, weekends, weekly, monthly, yearly, or custom interval. |
| Priority | Low, Normal, or Urgent. Urgent reminders use a louder tone and persistent notification. |
| Snooze Duration | Per-reminder snooze setting: 5, 10, 15, 30, or 60 minutes. Can be set at creation or at notification time. |
| Link to Task | Optionally associate the reminder with an existing task. Completing the task automatically dismisses the reminder. |
| Notification Sound | Choose from a set of built-in notification sounds or device default. |
| Color Label | Assign a color to the reminder for visual grouping in the list view. |

### 3.2 Reminder Actions & Notifications

| Feature | Description |
|---|---|
| Push Notification | Fires a push notification at the set time. Notification shows title, notes, and action buttons. |
| Notification Actions | Notification buttons: 'Done' (dismisses reminder), 'Snooze' (delays by snooze duration), 'Open' (opens app to reminder detail). |
| Snooze | Snoozing delays the notification by the configured snooze duration and re-fires automatically. |
| Mark as Done | Mark a reminder as done from the app or directly from the notification. Done reminders are archived. |
| Edit / Delete | Full edit access to all fields. Deleting a recurring reminder offers options: 'This occurrence only', 'This and future', or 'All occurrences'. |
| Missed Reminder | If a reminder fires while the device is off or in Do Not Disturb, it is marked 'Missed' and shown prominently in the app when opened. |

### 3.3 Views & Organization

| Feature | Description |
|---|---|
| Today View | Shows all reminders for today, sorted by time. Past reminders shown as missed. |
| Upcoming View | Shows reminders for the next 30 days in a timeline grouped by day. |
| All Reminders | Full list of all active reminders. Toggle to show completed/archived. |
| Calendar View | Monthly calendar with dots on days that have reminders. Tap a day to see its reminders. |
| Search | Search by title or notes. |
| Filter by Color | Filter reminders by their assigned color label. |

---

## Module 4 — Expenses

> The Expenses module lets users log and track their spending. Every purchase or outgoing payment is recorded here. The module provides insights into where money is going through charts and summaries, and feeds data into the Budget Planner module.

### 4.1 Expense Entry & Fields

| Feature | Description |
|---|---|
| Amount | Required numeric field. Supports up to 2 decimal places. Negative values not allowed. |
| Currency | Multi-currency support. User sets a default currency in settings. Can log in any currency with automatic conversion to base currency. |
| Category | Required. Choose from built-in categories (Food, Transport, Shopping, Health, Entertainment, Utilities, Education, Other) or create custom categories. |
| Subcategory | Optional second-level category within a parent (e.g., Food > Groceries, Food > Restaurants). |
| Date | Date of expense. Defaults to today. Can be set to any past or future date. |
| Title / Merchant | Optional short label (e.g., 'Carrefour', 'Uber ride'). If left blank, the category is used as the display name. |
| Notes | Optional free-text notes (e.g., 'Business lunch — reimbursable'). |
| Payment Method | Cash, Debit Card, Credit Card, Bank Transfer, Digital Wallet (e.g., JazzCash, Easypaisa), or custom. Users can manage a list of their payment methods. |
| Receipt Photo | Attach a photo of the receipt. Stored locally on device or in cloud backup. |
| Split Expense | Mark an expense as shared with others. Enter participant names and split amounts (equal or custom). Tracks who owes what. |
| Reimbursable Flag | Mark an expense as reimbursable (e.g., work expense to be claimed). Tracks reimbursement status: Pending / Claimed / Received. |
| Tags | Add free-form tags for personal filtering (e.g., 'vacation', 'work', 'kids'). |

### 4.2 Expense Management

| Feature | Description |
|---|---|
| Edit Expense | All fields editable after creation. Edit history is logged internally. |
| Delete Expense | Delete with confirmation. Deleted expenses are soft-deleted and recoverable within 30 days. |
| Duplicate Expense | Duplicate an expense for recurring similar expenses (e.g., same coffee shop order). |
| Recurring Expense | Mark an expense as recurring to auto-create it on a schedule (daily, weekly, monthly). Recurring entries appear as 'scheduled' until confirmed. |
| Bulk Import | Import expenses from a CSV file with a column mapping interface. Useful for importing from bank statements. |
| Export | Export expenses as CSV or PDF for a selected date range, category, or tag. |

### 4.3 Analytics & Reports

| Feature | Description |
|---|---|
| Monthly Summary | Total spending for the current month vs previous month with percentage change. |
| Category Breakdown | Pie chart or donut chart showing spending by category for a selected period. |
| Daily Spending Chart | Bar chart showing spending per day for the current month. |
| Top Merchants | List of top 10 merchants/payees by total spend in the selected period. |
| Date Range Filter | Filter all analytics views by custom date range, this week, this month, last month, this year, or custom. |
| Payment Method Breakdown | Shows how much was spent via each payment method. |
| Trend Comparison | Month-over-month or year-over-year trend chart by category. |

---

## Module 5 — Loans

> The Loans module tracks both money lent to others and money borrowed from others. It provides full repayment schedules, payment tracking, interest calculations, and alerts for upcoming due dates. Both personal informal loans and formal bank/institution loans are supported.

### 5.1 Loan Creation & Fields

| Feature | Description |
|---|---|
| Loan Type | Two types: 'Borrowed' (user owes money) and 'Lent' (someone owes user money). |
| Principal Amount | The original loan amount. |
| Currency | Currency of the loan. |
| Lender / Borrower Name | Name of the other party. Linked to the Contacts module if available. |
| Loan Date | Date the loan was taken or given. |
| Due Date | Expected full repayment date. Optional for informal loans. |
| Interest Rate | Annual interest rate as a percentage. Set to 0 for interest-free loans. |
| Interest Type | Simple interest or compound interest (monthly/quarterly/annually). |
| Repayment Schedule | Choose: one-time (lump sum), EMI (equal monthly installments), or custom schedule. |
| EMI Amount | If EMI is selected, the monthly installment amount is calculated automatically or can be entered manually. |
| Collateral / Notes | Text field for noting any collateral, guarantor, or loan conditions. |
| Category | Label the loan: Personal, Home, Car, Education, Business, or Custom. |
| Reminder Preference | Set automatic reminders X days before each payment due date. |

### 5.2 Payment Tracking

| Feature | Description |
|---|---|
| Record Payment | Log a payment against a loan: amount paid, date, payment method, and notes (e.g., 'partial payment', 'settled via bank transfer'). |
| Payment History | Full log of all payments made/received against a loan, with running balance. |
| Outstanding Balance | Auto-calculated remaining balance after each payment, accounting for interest accrued. |
| Overpayment Handling | If more than the outstanding amount is paid, the system flags it and asks whether to apply the excess to the next installment or treat as complete. |
| Mark as Settled | Manually close a loan and mark it fully settled. Settled loans are archived. |
| Partial Settlement | Record partial settlements with notes, e.g., if a debt is forgiven or reduced by agreement. |

### 5.3 Loan Overview & Alerts

| Feature | Description |
|---|---|
| Loans Dashboard | Summary showing: total borrowed outstanding, total lent outstanding, total interest paid to date, and total interest earned (on lent loans). |
| Upcoming Payments | List of EMI/payment due dates in the next 30 days sorted by urgency. |
| Overdue Payments | Overdue loans are highlighted prominently in red with days overdue shown. |
| Amortization Schedule | Full amortization table for each loan showing each installment: principal component, interest component, and closing balance. |
| Interest Accrual Tracker | For compound interest loans, shows daily/monthly interest accrual. |
| Due Date Reminder | Automatic reminder notifications N days before each installment is due (configurable per loan). |
| Export Loan Details | Export full loan details and payment history as PDF. |

---

## Module 6 — Habits

> The Habits module helps users build and maintain daily, weekly, or custom routines. Habit tracking is built around streaks and visual progress — seeing consistency over time is the core motivator. Users can track both 'positive' habits to build (e.g., exercise) and 'negative' habits to break (e.g., smoking).

### 6.1 Habit Creation & Fields

| Feature | Description |
|---|---|
| Habit Name | Required text field. Short and descriptive (e.g., 'Drink 8 glasses of water'). |
| Habit Type | Build (positive habit to maintain) or Break (negative habit to avoid). |
| Icon & Color | Choose from a built-in icon library and assign a color to distinguish habits visually. |
| Frequency | How often the habit should be done: daily, specific days of the week (e.g., Mon/Wed/Fri), X times per week, or X times per month. |
| Target / Goal | Optional quantitative target (e.g., '8 glasses', '30 minutes', '10,000 steps'). Supports numerical entry with a unit label. |
| Reminder Time | Set a daily reminder time for the habit. Multiple reminder times can be set (e.g., morning and evening). |
| Start Date | Date from which tracking begins. Defaults to today. |
| End Date | Optional end date for time-limited habits (e.g., a 30-day challenge). |
| Notes / Why | Optional motivational note or reason for the habit. Shown as a reminder of intent. |
| Category | Group habits by category: Health, Fitness, Mindfulness, Productivity, Finance, Social, or Custom. |

### 6.2 Habit Tracking

| Feature | Description |
|---|---|
| Daily Check-in | One-tap check-in to mark a habit as done for the day. Long press to enter a quantity (if a target is set). |
| Check-in Notes | Optional short note when checking in (e.g., 'Did 35 minutes, felt great'). |
| Partial Completion | If a target is set, users can log partial completion (e.g., drank 5 out of 8 glasses). Shown as a partial fill on the progress ring. |
| Undo Check-in | Undo today's check-in if marked by mistake. |
| Back-filling | Log a check-in for a past date (up to 7 days back) in case the user forgot to log. |
| Streak Counter | Current streak in days displayed prominently. Streaks are calculated based on frequency — a weekly habit maintains its streak as long as the weekly target is met. |
| Best Streak | Tracks and displays the user's all-time best streak for each habit. |

### 6.3 Analytics & Visualization

| Feature | Description |
|---|---|
| Habit Heatmap | A GitHub-style calendar heatmap showing daily completion over the past year. Color intensity reflects completion level. |
| Weekly View | Shows the current week with each day as a circle — filled for completed, empty for missed, with a dot for today. |
| Monthly View | Calendar view with completion markers for the month. |
| Completion Rate | Percentage of scheduled days completed for the last 7 days, 30 days, and all time. |
| Streak History | List of all streak records with start date, end date, and length. |
| Habit Score | A single score (0–100) based on recent consistency. Helps users understand overall habit health at a glance. |
| Multi-Habit Progress | Overview grid showing all habits and their completion status for today and the last 7 days. |

---

## Module 7 — Budget Planner

> The Budget Planner module gives users a structured way to plan and control their monthly spending. Users set budget limits per category, and the module compares planned budgets against actual expenses (pulled from the Expenses module) in real time. It provides alerts when spending approaches or exceeds budget limits.

### 7.1 Budget Setup

| Feature | Description |
|---|---|
| Budget Period | Budgets are monthly by default. Users can also create weekly or custom-period budgets. |
| Total Monthly Income | Input total expected income for the month. Supports multiple income sources (salary, freelance, rent income, etc.). |
| Category Budgets | Assign a budget limit to each expense category (e.g., Food: PKR 20,000, Transport: PKR 5,000). Categories match the Expenses module. |
| Savings Target | Set a monthly savings goal. The system calculates whether planned budgets leave enough room for the savings target. |
| Rollover Option | Per-category option to roll over unspent budget to the next month (e.g., unspent entertainment budget carries forward). |
| Budget Templates | Save a budget as a template to quickly apply it to future months without re-entering all values. |
| Copy Previous Month | One-tap option to copy last month's budget to the current month. |

### 7.2 Budget Tracking

| Feature | Description |
|---|---|
| Real-Time Spending vs Budget | For each category, shows: Budget, Spent, and Remaining. A progress bar fills as spending increases. |
| Color-Coded Status | Green: under 70% spent. Yellow: 70–90% spent. Red: over 90% or over budget. |
| Over-Budget Alert | Push notification when spending in a category reaches 80%, 90%, and 100% of its budget. |
| Unbudgeted Expenses | Expenses in categories with no budget allocation are highlighted separately. |
| Daily Spending Allowance | Shows how much the user can spend per remaining day to stay on budget for the month. |
| Income Tracking | Track actual income received vs expected. Shows shortfall or surplus. |
| Net Position | Income minus total expenses shows net surplus or deficit for the month. |

### 7.3 Reports & Insights

| Feature | Description |
|---|---|
| Budget vs Actual Chart | Bar chart comparing budget and actual spending side-by-side per category. |
| Month-End Summary | At the end of each month, a summary is generated showing which categories were over/under budget and total savings achieved. |
| Savings Progress | Line chart showing savings accumulation over the year. |
| Spending Trend | 3-month or 6-month rolling average showing whether spending is trending up or down per category. |
| Budget Health Score | A single score indicating overall budget adherence — factors in how many categories are within budget and savings rate. |

---

## Module 8 — Notes

> The Notes module is a quick-capture scratch pad for freeform text, checklists, voice memos, and structured notes. It is designed for fast entry — users should be able to capture a thought in under 5 seconds. Notes can be long-form or short, organized in notebooks, or kept as quick jots.

### 8.1 Note Creation & Fields

| Feature | Description |
|---|---|
| Title | Optional note title. If left blank, the first line of content is used as the title. |
| Text Content | Rich text editor supporting: bold, italic, underline, strikethrough, headings, inline code, and hyperlinks. |
| Checklist Mode | Convert any note to a checklist. Each line becomes a checkable item. Mix text and checklist items in one note. |
| Voice Note | Record a voice memo within a note. Audio is stored with the note and playable inline. |
| Images | Insert photos from camera or gallery. Images are displayed inline within the note content. |
| Notebook | Assign notes to notebooks (user-created folders). Default notebook is 'All Notes'. |
| Tags | Add tags for cross-notebook organization. |
| Color | Assign a background color to the note for visual differentiation. |
| Pin | Pin important notes to the top of the notes list. |
| Created / Modified Date | Automatically tracked and shown on each note. |

### 8.2 Note Management

| Feature | Description |
|---|---|
| Auto-Save | Notes are auto-saved after every keystroke or after 1 second of inactivity. No manual save required. |
| Edit History / Versions | Keeps last 10 versions of a note. Users can view and restore any previous version. |
| Archive | Archive notes to remove them from the main view without deleting. |
| Delete & Trash | Deleted notes go to Trash and are auto-purged after 30 days. |
| Duplicate | Create an exact copy of a note. |
| Share | Share a note as plain text or formatted HTML via the system share sheet. |
| Export | Export a note as a .txt, .md, or PDF file. |
| Copy All Text | One-tap copy of all note content to clipboard. |
| Word Count | Live word and character count shown in the editor footer. |

### 8.3 Organization & Search

| Feature | Description |
|---|---|
| Notebooks | Users can create, rename, reorder, and delete notebooks. Notebooks can be nested one level deep (sub-notebooks). |
| All Notes View | A flat view of all notes across all notebooks, sorted by last modified date. |
| Grid / List View Toggle | Switch between a card grid layout (shows note preview) and a compact list layout. |
| Sort Options | Sort by: last modified, created date, title (alphabetical), or manual order. |
| Full-Text Search | Search across all note titles and content instantly as the user types. Highlighted matches shown in results. |
| Search by Tag | Tap a tag to filter all notes with that tag across notebooks. |
| Quick Note Widget | A home screen widget (on mobile) that opens a blank note instantly. |

---

## Module 9 — Subscriptions Tracker

> The Subscriptions module tracks all recurring payments — streaming services, software, memberships, gym, insurance, and any other regular outgoing. Users often lose track of how many subscriptions they have and what they collectively cost. This module provides full visibility, upcoming renewal alerts, and cost analysis.

### 9.1 Subscription Entry & Fields

| Feature | Description |
|---|---|
| Service Name | Name of the subscription (e.g., 'Netflix', 'Adobe Creative Cloud', 'Gym Membership'). |
| Logo / Icon | Auto-fetch logo for known services (built-in library of 500+ popular services). Option to upload custom icon. |
| Amount | Subscription cost per billing cycle. |
| Currency | Currency of the subscription. Converts to base currency for totals. |
| Billing Cycle | Weekly, monthly, quarterly, semi-annual, annual, or custom interval. |
| Next Billing Date | Date of the next charge. Automatically advances after each billing cycle. |
| Start Date | When the subscription was started. Used to calculate total amount spent to date. |
| Category | Entertainment, Software, Health, Finance, Education, Shopping, Utilities, or Custom. |
| Payment Method | Which payment method is charged (links to methods configured in Expenses module). |
| Notes | Free text for account details, login hints, or cancellation instructions. |
| Free Trial | Mark as free trial with trial end date. Reminder fires before trial ends to decide whether to keep or cancel. |
| Status | Active, Paused, Cancelled, or Trial. Paused subscriptions stop automatic renewal advancement. |
| Shared With | Flag if the subscription is shared among multiple people. Enter number of people sharing to calculate cost per person. |

### 9.2 Renewal & Alert Management

| Feature | Description |
|---|---|
| Upcoming Renewals | List of all subscriptions renewing in the next 7, 14, or 30 days (user-configurable window). |
| Renewal Reminder | Push notification X days before renewal (configurable: 1, 3, 5, or 7 days in advance). Set per subscription or globally. |
| Trial Expiry Alert | Notification 3 days before and 1 day before a free trial ends. |
| Price Change Alert | Users can manually mark if a subscription price has changed. System flags the record and updates future calculations. |
| Cancel Reminder | Set a 'remind me to cancel' date for unwanted subscriptions the user isn't ready to cancel yet. |

### 9.3 Analytics & Cost View

| Feature | Description |
|---|---|
| Monthly Cost Total | Total monthly subscription cost (annualized subscriptions divided by 12). Shown prominently on the module home screen. |
| Annual Cost Total | Total annual subscription cost across all active subscriptions. |
| Cost by Category | Pie chart showing subscription spend breakdown by category. |
| Per-Person Cost | For shared subscriptions, shows the effective per-person cost. |
| Total Spent to Date | Lifetime total spent on each subscription since the start date. |
| Subscription Timeline | A calendar timeline showing all renewal dates for the month, helping users anticipate heavy billing periods. |
| Could Save Analysis | Compares subscription costs against annual plan pricing — e.g., 'Switching to annual Netflix would save PKR 2,400/year'. |

---

## Module 10 — Goals

> The Goals module is for setting and tracking long-term objectives. Goals are bigger than tasks — they represent outcomes the user wants to achieve over weeks, months, or years. Each goal has milestones, progress tracking, and a link to the habits and tasks that contribute to it.

### 10.1 Goal Creation & Fields

| Feature | Description |
|---|---|
| Goal Title | Clear, concise name for the goal (e.g., 'Save PKR 500,000 for a car', 'Run a 10K race', 'Read 24 books this year'). |
| Goal Type | Quantitative (has a measurable number target) or Qualitative (descriptive outcome). |
| Target Value & Unit | For quantitative goals: the number to reach and its unit (e.g., 500000 PKR, 24 books, 10 km). |
| Start Date | When work on the goal begins. |
| Target Date | Deadline or expected completion date. |
| Category | Finance, Health & Fitness, Career, Education, Personal, Family, or Custom. |
| Why / Motivation | A personal note explaining why this goal matters. Shown as a motivational anchor when viewing the goal. |
| Cover Image | Add an inspirational image to the goal card for visual motivation. |
| Visibility | Private (only user sees) or Shared (can share progress via link). |

### 10.2 Milestones & Progress

| Feature | Description |
|---|---|
| Milestones | Break a goal into smaller milestones (sub-goals) each with their own target and due date. Completing milestones drives overall goal progress. |
| Manual Progress Update | Update current progress at any time (e.g., 'I have now saved PKR 120,000'). Add a note with each update. |
| Progress History | Log of every progress update with date, value, and note. Displayed as a sparkline chart. |
| Progress Bar | Visual progress bar showing percentage toward target. |
| Linked Habits | Link one or more habits to a goal. Each habit check-in contributes to goal momentum (e.g., 'Daily running' habit linked to '10K race' goal). |
| Linked Tasks | Link tasks to a goal. Completing linked tasks moves the goal forward. |
| Auto-Progress for Finance Goals | Finance goals linked to the Budget Planner module — savings tracked automatically by comparing income minus expenses. |

### 10.3 Goal Insights & Motivation

| Feature | Description |
|---|---|
| On Track / At Risk Status | System calculates whether the user is on track based on current progress vs time elapsed. Shows: On Track, At Risk, or Behind. |
| Projected Completion | Based on current rate of progress, predicts when the goal will be achieved. |
| Required Daily Progress | Shows how much daily progress is needed to meet the deadline (e.g., 'Save PKR 1,300/day to reach your goal on time'). |
| Celebration Milestone | When a goal is completed, a celebration animation is shown and the goal is moved to 'Achieved' with the completion date. |
| Goal Archive | Achieved and abandoned goals are archived with their full history for reflection. |
| Progress Sharing | Share a goal's progress card as an image or via a shareable link (for accountability partners). |
| Streak of Updates | Tracks how many consecutive days/weeks the user has logged progress updates — rewards consistency. |

---

## Section 11 — Non-Functional Requirements

> This section covers technical and quality requirements that apply to the entire application — not just individual modules. These requirements define how the system should behave rather than what it should do.

### 11.1 Performance

| Requirement | Description |
|---|---|
| App Load Time | Initial app load (first paint) must complete in under 2 seconds on a 4G connection. |
| Interaction Response | All user interactions (taps, swipes) must respond in under 100ms. Data operations must complete in under 300ms. |
| Offline Support | All core features must work offline. Data is stored locally and synced when connectivity is restored. No feature should be unavailable offline. |
| Background Sync | Data sync happens in the background when the app is not in focus. Sync conflicts are resolved by last-write-wins with a conflict log. |

### 11.2 PWA Requirements

| Requirement | Description |
|---|---|
| Installability | App must pass PWA installability criteria: valid web manifest, service worker, HTTPS. Users can install to home screen on Android and iOS. |
| Service Worker | Service worker must cache all static assets and API responses. App must be fully functional from cache when offline. |
| Push Notifications | Web Push notifications must work on Android. iOS notifications supported via iOS 16.4+ web push. Users must be asked for permission on first relevant action. |
| Responsive Design | App must be fully functional and well-designed on mobile (320px+), tablet (768px+), and desktop (1280px+). |
| App Manifest | Complete manifest.json with name, short_name, icons (all sizes), theme_color, background_color, display: standalone. |

### 11.3 Data & Security

| Requirement | Description |
|---|---|
| Local Storage | All user data must be stored locally using IndexedDB for structured data and the Cache API for assets. |
| Cloud Sync (Optional) | Optional cloud backup and sync via a user account. Data must be encrypted in transit (TLS 1.3) and at rest (AES-256). |
| Data Export | Users can export all their data from all modules as a single JSON file or per-module CSV/PDF. |
| Data Import | Users can import a previously exported JSON backup to restore all data. |
| Account Authentication | Email + password or social login (Google). Passwords must be hashed server-side (bcrypt). Support 2FA via TOTP. |
| Privacy First | No tracking, analytics, or advertising. No user data sold or shared. Full GDPR compliance. Right to erasure must be implemented. |

### 11.4 Accessibility & UX

| Requirement | Description |
|---|---|
| WCAG 2.1 AA Compliance | All UI elements must meet AA contrast ratios. All interactive elements must be keyboard accessible and screen-reader compatible. |
| Font Size Support | App must respect system font size settings. Text must remain readable at up to 200% font scale. |
| Haptic Feedback | Use haptic feedback on task completion, habit check-in, and destructive actions on supported devices. |
| Onboarding Flow | First-launch onboarding: 3-screen walkthrough explaining core features, then guide user to set up their first habit, budget, and task. |
| Empty States | Every module must have a friendly, illustrated empty state with a clear CTA when there is no data. |
| Undo Actions | All destructive actions (delete, complete, archive) must show an undo snackbar for 5 seconds. |
| Localization | Support for multiple languages via i18n strings. Initial launch: English and Urdu. RTL support required for Urdu. |

---

## Appendix — Inter-Module Connections

> This appendix maps how the modules interact with each other. These connections are critical for a cohesive user experience and must be implemented as first-class features, not afterthoughts.

### A.1 Key Data Flows Between Modules

| Connection | Description |
|---|---|
| Tasks → Reminders | A task can have reminders attached to it. Creating a reminder on a task automatically creates a Reminder entry. Completing the task automatically dismisses all linked reminders. |
| Expenses → Budget Planner | Every expense logged in the Expenses module is automatically reflected in the Budget Planner's 'Actual Spending' totals. No duplicate entry needed. |
| Expenses → Dashboard | The Budget widget on the Dashboard reads live data from Expenses and Budget Planner to show current month status. |
| Loans → Reminders | When a loan payment reminder preference is set, the Loans module auto-creates Reminder entries for each upcoming installment. |
| Loans → Expenses | When a loan payment is recorded, the user is optionally prompted to also log it as an expense under a 'Loan Repayment' category. |
| Subscriptions → Expenses | When a subscription renews, the user is prompted (or it auto-creates, based on settings) an expense entry in the Expenses module. |
| Subscriptions → Budget Planner | Subscription costs feed into the Budget Planner as a 'Subscriptions' category so they are accounted for in the monthly budget. |
| Habits → Goals | A habit can be linked to a Goal. Each habit check-in contributes to goal progress tracking. |
| Tasks → Goals | Tasks can be linked to a Goal. Completing linked tasks is reflected in the goal's progress log. |
| Goals → Budget Planner | Financial goals can be linked to the Budget Planner — the system calculates required monthly savings and monitors progress automatically. |

### A.2 Universal Features (Applies to All Modules)

| Feature | Description |
|---|---|
| Global Search | A global search bar searches across all modules simultaneously — tasks, notes, expenses, reminders, habits, goals, and loans — returning categorized results. |
| Notifications Centre | All module notifications are aggregated in a single Notifications Centre accessible from the top bar. |
| Themes | Light and dark mode apply uniformly across all modules. Three accent color themes available: Blue (default), Green, and Purple. |
| Settings | A global Settings screen covers: account, notifications (per-module toggles), currency, date format, first day of week, backup & sync, data export, and privacy. |
| Help & Feedback | In-app help with tooltips and a short guide per module. Users can submit feedback and bug reports directly from the app. |

---

*End of Document — Daily Life PWA Specification v1.0*