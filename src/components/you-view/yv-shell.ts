import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { DarkModeToggle } from 'dark-mode-toggle';
import 'dark-mode-toggle';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-thumb-up-outline.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-share-android.js';
import '@spectrum-web-components/divider/sp-divider.js';

import './yv-video-shell.js';

@customElement('yv-shell')
export class YvShell extends LitElement {
  @state() themeColor: 'light' | 'dark' = 'light';
  render() {
    return html`
      <sp-theme .color=${this.themeColor} theme="spectrum" scale="medium">
        <div id="wrapper">
          <nav>
            <section class="flex"></section>
            <section class="flex"><h1 class="heading l">YouView</h1></section>
            <section class="flex right">
              <dark-mode-toggle
                @colorschemechange=${this.onColorSchemeChange}
                permanent
              ></dark-mode-toggle>
            </section>
          </nav>
          <sp-divider></sp-divider>
          <div id="content">
            <div id="media-player">
              <yv-video-shell>
                <slot></slot>
              </yv-video-shell>
            </div>
            <div id="details" class="flex">
              <div class="left">
                <h2 class="heading">Your Livestream</h2>
                <sp-help-text>23,459 watching now</sp-help-text>
              </div>
              <div class="right flex">
                <span class="flex vote">
                  <sp-icon-thumb-up-outline size="xxl">
                  </sp-icon-thumb-up-outline>
                  <span>456</span>
                </span>
                <span class="flex vote down">
                  <sp-icon-thumb-up-outline size="xxl">
                  </sp-icon-thumb-up-outline>
                  <span>0</span>
                </span>
                <span class="flex share">
                  <sp-icon-share-android size="xxl"></sp-icon-share-android>
                  <span>Share</span>
                </span>
              </div>
            </div>
            <div id="comments"></div>
          </div>
        </div>
      </sp-theme>
    `;
  }

  onColorSchemeChange = (e: Event) => {
    const toggleEl = e.target as DarkModeToggle;
    this.themeColor = toggleEl.mode === 'dark' ? 'dark' : 'light';
  };

  static styles = css`
    .flex {
      display: flex;
    }
    :host,
    sp-theme {
      min-height: 100vh;
      display: block;
      --dark-mode-toggle-light-icon: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 48 48' %3E%3Cpath fill='rgb(70,70,70)' d='M24 31q2.9 0 4.95-2.05Q31 26.9 31 24q0-2.9-2.05-4.95Q26.9 17 24 17q-2.9 0-4.95 2.05Q17 21.1 17 24q0 2.9 2.05 4.95Q21.1 31 24 31Zm0 3q-4.15 0-7.075-2.925T14 24q0-4.15 2.925-7.075T24 14q4.15 0 7.075 2.925T34 24q0 4.15-2.925 7.075T24 34ZM3.5 25.5q-.65 0-1.075-.425Q2 24.65 2 24q0-.65.425-1.075Q2.85 22.5 3.5 22.5h5q.65 0 1.075.425Q10 23.35 10 24q0 .65-.425 1.075-.425.425-1.075.425Zm36 0q-.65 0-1.075-.425Q38 24.65 38 24q0-.65.425-1.075.425-.425 1.075-.425h5q.65 0 1.075.425Q46 23.35 46 24q0 .65-.425 1.075-.425.425-1.075.425ZM24 10q-.65 0-1.075-.425Q22.5 9.15 22.5 8.5v-5q0-.65.425-1.075Q23.35 2 24 2q.65 0 1.075.425.425.425.425 1.075v5q0 .65-.425 1.075Q24.65 10 24 10Zm0 36q-.65 0-1.075-.425-.425-.425-.425-1.075v-5q0-.65.425-1.075Q23.35 38 24 38q.65 0 1.075.425.425.425.425 1.075v5q0 .65-.425 1.075Q24.65 46 24 46ZM12 14.1l-2.85-2.8q-.45-.45-.425-1.075.025-.625.425-1.075.45-.45 1.075-.45t1.075.45L14.1 12q.4.45.4 1.05 0 .6-.4 1-.4.45-1.025.45-.625 0-1.075-.4Zm24.7 24.75L33.9 36q-.4-.45-.4-1.075t.45-1.025q.4-.45 1-.45t1.05.45l2.85 2.8q.45.45.425 1.075-.025.625-.425 1.075-.45.45-1.075.45t-1.075-.45ZM33.9 14.1q-.45-.45-.45-1.05 0-.6.45-1.05l2.8-2.85q.45-.45 1.075-.425.625.025 1.075.425.45.45.45 1.075t-.45 1.075L36 14.1q-.4.4-1.025.4-.625 0-1.075-.4ZM9.15 38.85q-.45-.45-.45-1.075t.45-1.075L12 33.9q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05l-2.8 2.85q-.45.45-1.075.425-.625-.025-1.075-.425ZM24 24Z'/%3E%3C/svg%3E");
      --dark-mode-toggle-dark-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 48 48' %3E%3Cpath fill='rgb(209,209,209)' d='M24 42q-7.5 0-12.75-5.25T6 24q0-7.5 5.25-12.75T24 6q.4 0 .85.025.45.025 1.15.075-1.8 1.6-2.8 3.95-1 2.35-1 4.95 0 4.5 3.15 7.65Q28.5 25.8 33 25.8q2.6 0 4.95-.925T41.9 22.3q.05.6.075.975Q42 23.65 42 24q0 7.5-5.25 12.75T24 42Zm0-3q5.45 0 9.5-3.375t5.05-7.925q-1.25.55-2.675.825Q34.45 28.8 33 28.8q-5.75 0-9.775-4.025T19.2 15q0-1.2.25-2.575.25-1.375.9-3.125-4.9 1.35-8.125 5.475Q9 18.9 9 24q0 6.25 4.375 10.625T24 39Zm-.2-14.85Z'/%3E%3C/svg%3E");
      --dark-mode-toggle-icon-size: 24px;
      color: var(
        --spectrum-body-m-text-color,
        var(--spectrum-alias-text-color)
      );
      font-style: var(
        --spectrum-heading-m-text-font-style,
        var(--spectrum-global-font-style-regular)
      );
      letter-spacing: var(
        --spectrum-heading-m-text-letter-spacing,
        var(--spectrum-global-font-letter-spacing-none)
      );
      line-height: var(
        --spectrum-heading-m-text-line-height,
        var(--spectrum-alias-heading-text-line-height)
      );
    }

    .heading {
      margin-bottom: var(
        --spectrum-heading-m-margin-bottom,
        var(--spectrum-global-dimension-size-75)
      );
      margin-top: var(
        --spectrum-heading-m-margin-top,
        var(--spectrum-alias-heading-m-margin-top)
      );
      font-weight: var(
        --spectrum-heading-m-text-font-weight,
        var(--spectrum-alias-heading-text-font-weight-regular)
      );
      font-size: var(
        --spectrum-heading-m-text-size,
        var(--spectrum-alias-heading-m-text-size)
      );
    }

    .heading.l {
      margin-bottom: var(
        --spectrum-heading-l-margin-bottom,
        var(--spectrum-global-dimension-size-75)
      );
      margin-top: var(
        --spectrum-heading-l-margin-top,
        var(--spectrum-alias-heading-l-margin-top)
      );
      font-weight: var(
        --spectrum-heading-l-text-font-weight,
        var(--spectrum-alias-heading-text-font-weight-regular)
      );
      font-size: var(
        --spectrum-heading-l-text-size,
        var(--spectrum-alias-heading-l-text-size)
      );
    }

    dark-mode-toggle {
      display: inline-flex;
    }

    dark-mode-toggle::part(toggleLabel) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      position: relative;
      z-index: 0;
      border-radius: 50%;
    }

    #wrapper {
      margin-inline: 36px;
    }

    sp-theme {
      background-color: var(--spectrum-global-color-gray-100);
    }

    nav {
      display: flex;
    }

    nav section {
      flex-basis: 0;
      flex-grow: 1;
      justify-content: center;
      align-items: flex-end;
    }

    nav .right {
      justify-content: flex-end;
    }

    #details {
      align-items: center;
      justify-content: space-between;
    }

    #details .right > * {
      align-items: center;
      justify-content: center;
      margin-inline: 8px;
      cursor: pointer;
    }

    #details .right > * > * {
      margin-inline: 4px;
    }

    .vote.down sp-icon-thumb-up-outline {
      transform: rotate(180deg);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'yv-shell': YvShell;
  }
}
