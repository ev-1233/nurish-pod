import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import bannerSvg from '../assets/banaer-add.svg'; 

@customElement('hero-banner')
export class HeroBanner extends LitElement {
  @property({ type: String }) title = '';

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    /* Clean, modern standalone page heading style */
    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1d1b20; /* Dark material text color */
      margin: 0 0 16px 0; /* Pushes the banner image down slightly */
      font-family: 'Roboto', sans-serif;
      text-transform: capitalize; /* Forces consistent capitalization */
    }

    /* Dedicated frame strictly for the SVG aspect scaling */
    .banner-frame {
      width: 100%;
      aspect-ratio: 21334 / 9000; 
      border-radius: 16px;
      overflow: hidden;
      background-color: transparent;
    }

    .banner-background {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  `;

  render() {
    return html`
      <h1 class="page-title">${this.title}</h1>
      
      <div class="banner-frame">
        <img class="banner-background" src="${bannerSvg}" alt="Banner Art" />
      </div>
    `;
  }
}