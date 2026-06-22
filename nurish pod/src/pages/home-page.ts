import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';

@customElement('home-page')
export class HomePage extends LitElement {
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
      const response = await fetch('/src/docs/home-page.md'); 
      
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
    `;
  }
}