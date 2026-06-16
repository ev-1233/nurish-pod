import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('home-page')
export class HomePage extends LitElement {
  static styles = css`
    :host { display: block; font-family: 'Roboto', sans-serif; }
    h2 { margin-top: 0; color: #1d1b20; }
  `;
  render() {
    return html`
      <h2>Home Workspace</h2>
      <p>This is the separate, isolated Home page component.</p>
    `;
  }
}
