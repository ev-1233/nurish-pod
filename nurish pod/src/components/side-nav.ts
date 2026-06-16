import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { APP_ROUTES } from '../config';


import brandLogo from '../assets/chiken chef.svg'; 

import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/icon/icon.js';

@customElement('side-nav')
export class SideNav extends LitElement {
  @property({ type: String }) activePageId = 'home';

  static styles = css`
    .drawer-container {
      display: flex;
      flex-direction: column;
      width: 320px;
      height: 100%;
      background-color: #f3edf7;
      border-radius: 0 16px 16px 0;
      box-sizing: border-box;
      padding: 12px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      padding: 24px 16px;
      gap: 12px;
    }

    /* 2. Changed from 'svg' to 'img' to keep your exact 40x40 sizing */
    .logo-container img {
      width: 40px;
      height: 40px;
      object-fit: contain; /* Ensures the logo scales cleanly without distorting */
    }

    .brand-name {
      font-size: 1.25rem;
      font-weight: 500;
      color: #1d1b20;
      font-family: 'Roboto', sans-serif;
    }

    md-list {
      background: transparent;
    }

    md-list-item {
      --md-list-item-label-text-font: 'Roboto', sans-serif;
      margin-bottom: 4px;
      border-radius: 28px;
    }
  `;

  private _handleNavigation(pageId: string) {
    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: { pageId },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <aside class="drawer-container">
        <div class="logo-container">
          <img src="${brandLogo}" alt="App Logo" />
          <span class="brand-name">LitApp</span>
        </div>

        <md-list>
          ${APP_ROUTES.map(route => html`
            <md-list-item 
              type="button"
              ?selected=${this.activePageId === route.id}
              @click=${() => this._handleNavigation(route.id)}
            >
              <md-icon slot="start">${route.icon}</md-icon>
              ${route.label}
            </md-list-item>
          `)}
        </md-list>
      </aside>
    `;
  }
}