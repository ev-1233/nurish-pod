import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { APP_ROUTES, type PageRoute } from './config';

// Import Shared Components
import './components/hero-banner';
import './components/side-nav';

// Import Page Components
import './pages/home-page';
import './pages/menu-page';
import './pages/map-page';

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

    /* Main Content Layout Wrapper */
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
      margin-top: 24px;
    }
  `;

  // Get configuration data for the current active page
  private get currentPage(): PageRoute {
    return APP_ROUTES.find(route => route.id === this.activePageId) || APP_ROUTES[0];
  }

  // Listens to the custom navigation events coming out of side-nav
  private _onPageChanged(e: CustomEvent<{ pageId: string }>) {
    this.activePageId = e.detail.pageId;
  }

  render() {
    const current = this.currentPage;

    return html`
      <side-nav 
        .activePageId=${this.activePageId}
        @page-changed=${this._onPageChanged}>
      </side-nav>

      <div class="main-wrapper">
        <main>
          <hero-banner 
            .title=${current.label} 
            .background=${current.heroImage}>
          </hero-banner>

          <div class="page-content">
            ${this.renderDynamicPage(current.tag)}
          </div>
        </main>
      </div>
    `;
  }

  //Evaluates which page component element to mount based on the tag property inside config.ts

  private renderDynamicPage(tag: string) {
    switch (tag) {
      case 'home-page':
        return html`<home-page></home-page>`;
      case 'menu-page':
        return html`<menu-page></menu-page>`;
      case 'map-page':
        return html`<map-page></map-page>`;
      default:
        return html`<h2>Page Not Found</h2><p>The requested component view is missing.</p>`;
    }
  }
}