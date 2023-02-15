import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Task } from '@lit-labs/task';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import '../components/you-view/yv-error-message.js';

@customElement('video-loader')
export class VideoLoader extends LitElement {
  private getMediaStream = new Task(this, {
    task: async () => {
      return await navigator.mediaDevices.getUserMedia({ video: true });
    },
    autoRun: false,
  });

  render() {
    return html`
      ${this.getMediaStream.render({
        initial: () => html` <sp-button
          @click=${() => this.getMediaStream.run()}
          treatment="outline"
          size="l"
          variant="white"
          >Start Stream</sp-button
        >`,
        pending: () => html`<sp-progress-circle
          label="Requesting Media Stream"
          indeterminate
          over-background
          size="l"
        ></sp-progress-circle>`,
        error: () => html`<yv-error-message></yv-error-message>`,
        complete: (result) => {
          return html`<video
            playsinline
            controls
            autoplay
            .srcObject=${result}
          ></video>`;
        },
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'video-loader': VideoLoader;
  }
}
