import { defineStore } from 'pinia';
import type { MainStore, Post } from "~/src/interfaces";
export const useMainStore = defineStore('main',{
  state: () : MainStore => ({
    limit: 10,
    page: 1,
    loading: false,
    posts: []
  }),
  actions: {
    setNewCheckedPage(payload: number): void {
      this.page = payload;
    },
    changeLoadingStatus(payload: boolean): void {
      this.loading = payload;
    },
    updatePosts(payload: Post): void {
      this.posts.push(payload);
    },
    async uploadAllPosts(): Promise<void> {
      this.changeLoadingStatus(true);

      try {
        const result: Response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data: Array<Post> = await result.json();
        this.posts = data;
        this.changeLoadingStatus(false);

      } catch (error) {
        console.error('Error getting posts list: ', error)
      }
    },
  }
});
