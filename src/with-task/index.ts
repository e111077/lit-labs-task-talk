import { html, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { customElement, property } from 'lit/decorators.js';
import { Task } from '@lit-labs/task';
import { RedditResult } from '../shared-feed-logic';
import '../components/feed/feed-card.js';
import '../components/feed/feed-loading.js';

@customElement('task-card-renderer')
export class TaskCardRenderer extends LitElement {
  @property() subreddit = 'dogswithjobs';

  private getSubreddit = new Task(
    this,
    async ([subreddit]) => {
      const res = await fetch(`https://api.reddit.com/r/${subreddit}.json`);
      const json: RedditResult = await res.json();
      const postsWithThumbnails = json.data.children.filter((child) => {
        return (
          child.data.thumbnail !== 'self' && child.data.thumbnail !== 'default'
        );
      });
      return postsWithThumbnails;
    },
    () => [this.subreddit]
  );

  render() {
    return this.getSubreddit.render({
      initial: () => html`<feed-loading></feed-loading>`,
      pending: () => html`<feed-loading></feed-loading>`,
      error: () => html`<div>There was an error loading the content</div>`,
      complete: (results) =>
        repeat(
          results,
          (result) => result.data.id,
          (result) => html`<feed-card
            .author=${result.data.author}
            .url=${result.data.url}
            .thumbnail=${result.data.thumbnail}
            .header=${result.data.title}
          >
          </feed-card>`
        ),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'task-card-renderer': TaskCardRenderer;
  }
}
