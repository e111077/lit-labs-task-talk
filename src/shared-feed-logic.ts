export interface RedditResult {
  data: {
    children: RedditResult[];
    url: string;
    thumbnail: string;
    title: string;
    author: string;
    id: string;
  };
}