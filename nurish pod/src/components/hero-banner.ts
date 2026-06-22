import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// 1. Import your banner SVG file from the assets folder
import bannerSvg from '../assets/banaer-add.svg'; 

@customElement('hero-banner')
export class HeroBanner extends LitElement {
  @property({ type: String }) title = '';

  static styles = css`
    .banner-container {
      position: relative;
      width: 100%;
      height: 200px; /* Adjust height to fit your design */
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 0 32px;
      box-sizing: border-box;
    }

    /* 2. Style the SVG image to span across the background */
    .banner-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover; /* Stretches and crops perfectly without distortion */
      z-index: 1;
    }

    /* 3. Style the overlay text so it stands out over the graphic */
    .banner-title {
      position: relative;
      z-index: 2;
      color: #ffffff;
      font-size: 2.25rem;
      font-weight: 700;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* Makes text readable over any art */
    }
  `;

  render() {
    return html`
      <div class="banner-container">
        <img class="banner-background" src="${bannerSvg}" alt="Banner Background" />
        
        <h1 class="banner-title">${this.title}</h1>
      </div>
    `;
  }
}