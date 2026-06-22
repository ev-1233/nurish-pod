import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';

import '@googlemaps/extended-component-library/overlay_layout.js';

@customElement('map-page')
export class MapPage extends LitElement {
  // 1. Add state to hold the converted HTML
  @state()
  private markdownHtml = '<p>Loading markdown...</p>';

  static styles = css`
    :host { 
      display: block; 
      font-family: 'Roboto', sans-serif; 
    }
    h2 { 
      margin-top: 0; 
      color: #1d1b20; 
    }
    .markdown-container {
      margin-top: 2rem;
      padding: 1rem;
      border-radius: 4px
    }
  `;

  // 2. Trigger the fetch when the page loads
  connectedCallback() {
    super.connectedCallback();
    this.loadMarkdown();
  }

  // 3. Fetch and parse the file
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

  render() {
    return html`
    <div class="markdown-container">
        ${unsafeHTML(this.markdownHtml)}
    </div>
    
    <script type="module" src="https://unpkg.com/@googlemaps/extended-component-library"></script>

    <gmpx-api-loader key="YOUR_API_KEY"></gmpx-api-loader>

    <gmpx-split-layout>
    <gmpx-place-overview slot="fixed" place="ChIJ39Y-tdg1fYcRQcZcBb499do"></gmpx-place-overview>
    <gmp-map slot="main" center="43.880,-103.459" zoom="10" map-id="DEMO_MAP_ID">
        <gmp-advanced-marker position="43.880,-103.459"></gmp-advanced-marker>
    </gmp-map>
    </gmpx-split-layout>
    `;
  }
}