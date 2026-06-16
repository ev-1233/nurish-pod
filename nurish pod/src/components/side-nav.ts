import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { APP_ROUTES } from '../config';

import '@material/web/navigationdrawer/navigation-drawer.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/icon/icon.js';

@customElement('side-nav')
export class SideNav extends LitElement {
  // Reflect the current active page from the parent
  @property({ type: String }) activePageId = 'home';

  static styles = css`
    md-navigation-drawer {
      height: 100%;
      border-right: 1px solid #e7e0ec;
    }
    .logo-container {
      display: flex;
      align-items: center;
      padding: 24px;
      gap: 12px;
    }
    .logo-container svg {
      width: 40px;
      height: 40px;
    }
    .brand-name {
      font-size: 1.25rem;
      font-weight: 500;
      color: #1d1b20;
      font-family: 'Roboto', sans-serif;
    }
  `;

  // Dispatches a custom event when a navigation item is selected
  private _handleNavigation(pageId: string) {
    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: { pageId },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <md-navigation-drawer opened>
        <div class="logo-container">
          <svg viewBox="0 0 24 24" fill="#6750A4">
            <path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/>
          </svg>
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
      </md-navigation-drawer>
    `;
  }
}