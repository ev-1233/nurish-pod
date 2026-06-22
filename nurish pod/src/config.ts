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
    title: 'NURISH POD',
    heroImage: 'linear-gradient(135deg,rgb(126, 80, 164), #EADDFF)',
    tag: 'home-page'
  },
  {
    id: 'Menu',
    label: 'menu',
    icon: 'restaurant',
    title: 'See whats cooking',
    heroImage: 'linear-gradient(135deg, #381E72, #625B71)',
    tag: 'menu-page'
  },
  {
    id: 'Map',
    label: 'Find Us',
    icon: 'location_on',
    title: 'See us on the Map',
    heroImage: 'linear-gradient(135deg, #00639B, #C2E7FF)',
    tag: 'Map-page'
  }
];
