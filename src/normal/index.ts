import { html, LitElement, PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { customElement, property, state } from 'lit/decorators.js';
import { RedditResult } from '../shared-feed-logic.js';
import '../components/feed/feed-card.js';
import '../components/feed/feed-loading.js';

type FetchStatus = 'INITIAL' | 'PENDING' | 'COMPLETE' | 'ERROR';

@customElement('card-renderer')
export class CardRenderer extends LitElement {
  @property() subreddit = 'dogswithjobs';

  @state() private fetchResults: undefined | RedditResult[] = undefined;
  @state() private fetchStatus: FetchStatus = 'INITIAL';

  private callId = 0;

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('subreddit')) {
      this.fetchSubreddit();
    }
  }

  private async fetchSubreddit() {
    const callId = ++this.callId;
    this.fetchStatus = 'PENDING';
    const res = await fetch(`https://api.reddit.com/r/${this.subreddit}.json`);

    if (callId === this.callId) {
      try {
        const json = (await res.json()) as RedditResult;
        console.log(json);
        this.fetchResults = json.data.children.filter((child) => {
          return (
            child.data.thumbnail !== 'self' &&
            child.data.thumbnail !== 'default'
          );
        });
        this.fetchStatus = 'COMPLETE';
      } catch {
        this.fetchResults = undefined;
        this.fetchStatus = 'ERROR';
      }
    }
  }

  render() {
    switch (this.fetchStatus) {
      case 'ERROR':
        return html`<div>There was an error loading the content</div>`;
      case 'COMPLETE':
        return repeat(
          this.fetchResults,
          (result) => result.data.id,
          (result) => html` <feed-card
            .author=${result.data.author}
            .url=${result.data.url}
            .thumbnail=${result.data.thumbnail}
            .header=${result.data.title}
          >
          </feed-card>`
        );
      case 'PENDING':
      case 'INITIAL':
      default:
        return html`<feed-loading></feed-loading>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'card-renderer': CardRenderer;
  }
}
