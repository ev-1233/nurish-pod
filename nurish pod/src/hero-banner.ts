import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hero-banner')
export class HeroBanner extends LitElement {
  // Properties passed from the parent component
  @property({ type: String }) title = '';
  @property({ type: String }) background = '#6750A4';

  static styles = css`
    :host {
      display: block;
      margin-bottom: 24px;
    }
    .banner {
      display: flex;
      align-items: center;
      min-height: 200px;
      padding: 32px;
      border-radius: 28px; /* Material 3 extra-large corner radius */
      color: #ffffff;
      font-family: 'Roboto', sans-serif;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 400;
      margin: 0;
      letter-spacing: -0.5px;
    }
  `;

  render() {
    return html`
      <div class="banner" style="background: ${this.background}">
        <h1>${this.title}</h1>
      </div>
    `;
  }
}
