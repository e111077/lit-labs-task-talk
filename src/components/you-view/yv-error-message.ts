import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('yv-error-message')
export class YvErrorMessage extends LitElement {
  render() {
    return html`
      Permissions were denied. Please enable camera permission and reload the
      page.
    `;
  }

  static styles = css`
    :host {
      color: var(--spectrum-transparent-white-900);
      font-size: var( --spectrum-body-l-text-size,var(--spectrum-global-dimension-font-size-200) );
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'yv-error-': YvErrorMessage;
  }
}
