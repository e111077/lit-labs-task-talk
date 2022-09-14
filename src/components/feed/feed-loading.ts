import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';

@customElement('feed-loading')
export class FeedLoading extends LitElement {
  render() {
    return html`
      <sl-spinner style="font-size: 8rem;--track-width: 10px;"></sl-spinner>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      position: fixed;
      inset: 0;
      flex-grow: 1;
      flex-basis: 0;
      justify-content: center;
      align-items: center;
      --mdc-theme-primary: var(--md-sys-color-primary);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'feed-loading': FeedLoading;
  }
}