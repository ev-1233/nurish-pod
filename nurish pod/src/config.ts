export interface PageRoute {
  id: string;
  label: string;
  icon: string;
  title: string;
  heroImage: string;
  tag: string; // The HTML element tag name for the page component
}

export const APP_ROUTES: PageRoute[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    title: 'Welcome to the Platform',
    heroImage: 'linear-gradient(135deg, #6750A4, #EADDFF)',
    tag: 'home-page'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'bar_chart',
    title: 'Performance Insights',
    heroImage: 'linear-gradient(135deg, #381E72, #625B71)',
    tag: 'analytics-page'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    title: 'Account Settings',
    heroImage: 'linear-gradient(135deg, #00639B, #C2E7FF)',
    tag: 'settings-page'
  }
];
