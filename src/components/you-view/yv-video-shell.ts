import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('yv-video-shell')
export class YvVideoShell extends LitElement {
  render () {
    return html`
      <div id="wrapper">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host,
    #wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--spectrum-transparent-black-900);
    }

    :host {
      margin-block-start: 24px;
    }

    #wrapper {
      aspect-ratio: 4 / 3;
      max-width: 640px;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'yv-video-shell': YvVideoShell;
  }
}