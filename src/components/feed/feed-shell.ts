import { css, html, LitElement } from 'lit';
import {
  customElement,
  property,
  state,
  queryAssignedElements,
} from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';

@customElement('feed-shell')
export class FeedShell extends LitElement {
  @property() url = '';
  @queryAssignedElements({ slot: '', flatten: true, selector: '*' })
  cardRenderers!: (HTMLElement & { subreddit: string })[];
  render() {
    return html`
      <div id="header">
        <section class="left"><div></div></section>
        <section class="middle">
          <h1>Taskkit</h1>
        </section>
        <section class="right">
          <sl-select
            placeholder="Subreddit"
            value="dogswithjobs"
            @sl-change=${this.onChange}
          >
            <sl-menu-item value="dogswithjobs">Dogs with jobs</sl-menu-item>
            <sl-menu-item value="catswithjobs">Cats with jobs</sl-menu-item>
            <sl-menu-item value="aww">Aww</sl-menu-item>
          </sl-select>
        </section>
      </div>
      <sl-divider></sl-divider>
      <div id="content">
        <slot></slot>
      </div>
    `;
  }

  private onChange(e: Event) {
    if (!this.cardRenderers.length) {
      return;
    }

    const target = e.target as HTMLSelectElement;
    this.cardRenderers[0].subreddit = target.value;
  }

  static styles = css`
    :host,
    select {
      font-family: 'Google Sans', sans-serif;
    }

    #header {
      display: flex;
      padding: 16px 24px 0 16px;
      position: relative;
      align-items: center;
    }

    #header section {
      display: flex;
      flex-grow: 1;
      flex-basis: 0;
      justify-content: center;
    }

    #header .right {
      justify-content: flex-end;
    }

    .middle {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    h1 {
      margin: 0;
      font-weight: 400;
      font-size: 48px;
    }

    #content ::slotted(*) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'feed-shell': FeedShell;
  }
}
