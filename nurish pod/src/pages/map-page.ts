import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import L from 'leaflet'; 

import leafletStyles from 'leaflet/dist/leaflet.css?inline';

// 1. Tell Vite to grab the actual image URLs for the markers
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 2. Fix the Leaflet icon paths globally
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

@customElement('map-page')
export class MapPage extends LitElement {
  // ... rest of your component remains exactly the same!
  @state()
  private markdownHtml = '<p>Loading markdown...</p>';

  private map: L.Map | null = null;

  // 2. Inject Leaflet's CSS into Lit's Shadow DOM styles
  static styles = css`
    ${unsafeCSS(leafletStyles)} 

    :host { 
      display: block; 
      font-family: 'Roboto', sans-serif; 
    }
    .markdown-container {
      margin-top: 2rem;
      padding: 1rem;
      border-radius: 4px;
    }
    /* CRITICAL: The map must have an explicit width and height */
    #map {
      height: 500px;
      width: 100%;
      background: #e5e3df; /* Gives a fallback color so you can see if the box is rendering */
      margin-top: 1rem;
      border-radius: 8px;
      z-index: 1; /* Keeps it under dropdown menus if you have any */
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadMarkdown();
  }

  async loadMarkdown() {
    try {
      const response = await fetch('/src/docs/map-page.md'); 
      if (!response.ok) throw new Error('File not found');
      const text = await response.text();
      this.markdownHtml = await marked.parse(text);
    } catch (error) {
      console.error('Error loading markdown:', error);
      this.markdownHtml = '<p>Error loading the markdown content.</p>';
    }
  }

  firstUpdated() {
    const mapContainer = this.renderRoot.querySelector('#map') as HTMLElement;
    
    if (mapContainer) {
      // 1. Initialize map instance
      this.map = L.map(mapContainer).setView([51.408501, -3.485159], 50);
  
      // 2. Load the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
  
      // 3. Add marker
      L.marker([51.408501, -3.485159]).addTo(this.map)
  
      const resizeObserver = new ResizeObserver(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      });
      
      resizeObserver.observe(mapContainer);
    }
  }

  render() {
    return html`
    <div class="markdown-container">
        ${unsafeHTML(this.markdownHtml)}
    </div>
    
    <div id="map"></div>
    `;
  }
}