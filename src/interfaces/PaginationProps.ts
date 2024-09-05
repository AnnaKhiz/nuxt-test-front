import type { Post } from "./Post";

export interface PaginationProps {
  page: number,
  posts: Array<Post>,
  limit: number,
  loading: boolean
}
