export interface PageRoute {
    id: string;
    label: string;
    icon: string; // Material Icon name
    title: string;
    heroImage: string;
  }
  
  export const APP_ROUTES: PageRoute[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      title: 'Welcome to the Platform',
      heroImage: 'linear-gradient(135deg, #6750A4, #EADDFF)'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'bar_chart',
      title: 'Performance Insights',
      heroImage: 'linear-gradient(135deg, #381E72, #625B71)'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      title: 'Account Settings',
      heroImage: 'linear-gradient(135deg, #00639B, #C2E7FF)'
    }
  ];