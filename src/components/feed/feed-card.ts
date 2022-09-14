import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';

@customElement('feed-card')
export class FeedCard extends LitElement {
  @property() url = '';
  @property() thumbnail = '';
  @property() header = '';
  @property() author = '';

  render() {
    return html`<sl-card class="card">
      <h2>${this.header}</h2>
      <div slot="image" id="badge-wrapper">
        <sl-badge pill variant="primary">/u/${this.author}</sl-badge>
      </div>
      <img
        loading="lazy"
        alt=${this.header}
        src=${this.thumbnail}
        slot="image"
      />
      <div id="footer" slot="footer">
        <sl-button pill variant="primary" .href=${this.url}>Open</sl-button>
      </div>
    </sl-card>`;
  }

  static styles = css`
    :host {
      display: block;
    }

    .card {
      display: flex;
      position: relative;
      flex-direction: column;
      width: 300px;
      margin: 24px 20px;
    }

    h2 {
      --_font-size: 24px;
      --_line-height: calc(var(--_font-size) * 1.3);
      --_num-lines: 3;
      --_height: calc(var(--_line-height) * var(--_num-lines));
      font-weight: 400;
      font-size: var(--_font-size);
      line-height: var(--_line-height);
      height: var(--_height);
      margin: 0;
      text-overflow: ellipsis;
      line-clamp: 1;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: var(--_num-lines);
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    img {
      height: 200px;
      object-fit: cover;
    }

    #footer {
      display: flex;
      justify-content: flex-end;
    }

    #badge-wrapper {
      position: relative;
    }

    sl-badge {
      position: absolute;
      inset-inline-start: 8px;
      inset-block-start: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'feed-card': FeedCard;
  }
}
