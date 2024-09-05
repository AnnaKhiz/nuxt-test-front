import type {Post} from "~/src/interfaces/Post";

export interface MainStore {
  limit: number,
  loading: boolean,
  page: number,
  posts: Array<Post>
}
