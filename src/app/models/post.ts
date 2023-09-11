export interface Posts {
  entities: PostData[];
  loading: boolean;
  page: number;
  totalCount: number;
  detailedPost: DetailedPost;
}

export interface PostData {
  id: string;
  title: string;
  body: string;
  user: {
    name: string;
    username: string;
  };
}

export interface PostComment {
  name: string;
  email: string;
  body: string;
}

export interface DetailedPost {
  id: string;
  title: string;
  body: string;
  user: {
    name: string;
    username: string;
  };
  comments: {
    data: PostComment[];
  };
}

export const POSTS_PER_PAGE = 14;