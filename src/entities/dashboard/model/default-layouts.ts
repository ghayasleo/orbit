// [ENTITIES/DASHBOARD/MODEL] - default-layouts
import type { DashboardLayouts } from './types';

export const defaultLayouts: DashboardLayouts = {
  lg: [
    { i: 'hero', x: 0, y: 0, w: 12, h: 2, static: true },
    { i: 'habits', x: 0, y: 2, w: 8, h: 2, minW: 3, minH: 2 },
    { i: 'priority-tasks', x: 8, y: 2, w: 4, h: 6, minW: 3, minH: 2 },
    { i: 'budget', x: 0, y: 6, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'active-goals', x: 4, y: 6, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'recent-expenses', x: 0, y: 10, w: 8, h: 4, minW: 3, minH: 2 },
    { i: 'upcoming-due', x: 8, y: 10, w: 4, h: 4, minW: 3, minH: 2 },
  ],
  md: [
    { i: 'hero', x: 0, y: 0, w: 10, h: 2, static: true },
    { i: 'habits', x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'priority-tasks', x: 6, y: 2, w: 4, h: 6, minW: 3, minH: 2 },
    { i: 'budget', x: 0, y: 6, w: 3, h: 4, minW: 3, minH: 2 },
    { i: 'active-goals', x: 3, y: 6, w: 3, h: 4, minW: 3, minH: 2 },
    { i: 'recent-expenses', x: 0, y: 10, w: 6, h: 4, minW: 3, minH: 2 },
    { i: 'upcoming-due', x: 6, y: 10, w: 4, h: 4, minW: 3, minH: 2 },
  ],
  sm: [
    { i: 'hero', x: 0, y: 0, w: 6, h: 2, static: true },
    { i: 'habits', x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'priority-tasks', x: 0, y: 6, w: 6, h: 6, minW: 3, minH: 2 },
    { i: 'budget', x: 0, y: 12, w: 3, h: 4, minW: 3, minH: 2 },
    { i: 'active-goals', x: 3, y: 12, w: 3, h: 4, minW: 3, minH: 2 },
    { i: 'recent-expenses', x: 0, y: 16, w: 6, h: 4, minW: 3, minH: 2 },
    { i: 'upcoming-due', x: 0, y: 20, w: 6, h: 4, minW: 3, minH: 2 },
  ],
  xs: [
    { i: 'hero', x: 0, y: 0, w: 4, h: 2, static: true },
    { i: 'habits', x: 0, y: 2, w: 4, h: 2, minW: 3, minH: 2 },
    { i: 'priority-tasks', x: 0, y: 6, w: 4, h: 6, minW: 3, minH: 2 },
    { i: 'budget', x: 0, y: 12, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'active-goals', x: 0, y: 16, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'recent-expenses', x: 0, y: 20, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'upcoming-due', x: 0, y: 24, w: 4, h: 4, minW: 3, minH: 2 },
  ],
};
