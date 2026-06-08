import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { APP_ROUTES, type PageRoute } from './config';
import './components/hero-banner';

import '@material/web/navigationdrawer/navigation-drawer.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/icon/icon.js';

@customElement('app-root')
export class AppRoot extends LitElement {
  // Track the current active page state
  @state() private activePageId = 'home';

  static styles = css`
    :host {
      display: flex;
      height: 100vh;
      background-color: #fef7ff; /* Material 3 Surface Light */
      font-family: 'Roboto', sans-serif;
    }

    /* Sidebar Layout */
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
    }

    /* Main Content Area */
    .main-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    main {
      padding: 32px;
      max-width: 1200px;
      width: 100%;
      box-sizing: border-box;
      margin: 0 auto;
    }

    .page-content {
      background-color: #ffffff;
      border-radius: 16px;
      padding: 24px;
      min-height: 300px;
      border: 1px solid #e7e0ec;
      color: #49454f;
    }
  `;

  // Get configuration data for the current active page
  private get currentPage(): PageRoute {
    return APP_ROUTES.find(route => route.id === this.activePageId) || APP_ROUTES[0];
  }

  render() {
    const current = this.currentPage;

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
              @click=${() => this.activePageId = route.id}
            >
              <md-icon slot="start">${route.icon}</md-icon>
              ${route.label}
            </md-list-item>
          `)}
        </md-list>
      </md-navigation-drawer>

      <div class="main-wrapper">
        <main>
          <hero-banner 
            .title=${current.title} 
            .background=${current.heroImage}>
          </hero-banner>

          <div class="page-content">
            ${this.renderPageView(current.id)}
          </div>
        </main>
      </div>
    `;
  }

  /**
   * Evaluates which blank view structure to return based on the active ID
   */
  private renderPageView(pageId: string) {
    switch (pageId) {
      case 'home':
        return html`<h2>Home Space</h2><p>Your modular landing block content goes here.</p>`;
      case 'analytics':
        return html`<h2>Analytics Space</h2><p>Data visualization frameworks can be populated here.</p>`;
      case 'settings':
        return html`<h2>Settings Space</h2><p>User configuration forms and controls belong here.</p>`;
      default:
        return html`<h2>Page Not Found</h2>`;
    }
  }
}