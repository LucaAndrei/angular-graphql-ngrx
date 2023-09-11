import { createAction, props } from '@ngrx/store';
import { DetailedPost, PostData } from 'src/app/models/post';

export const getAllPosts = createAction('[Posts] get all posts');
export const clearSelectedPost = createAction('[Posts] clearSelectedPost');


export const getAllPostsPage = createAction(
  '[Posts] get all posts page',
  props<{ page: number }>()
);

export const getAllPostsSuccess = createAction(
  '[Posts API] get all posts success',
  props<{ posts: PostData[]; totalCount: number }>()
);

export const getAllPostsFinish = createAction(
  '[Posts API] get all posts finish'
);

export const getPostById = createAction(
  '[Posts] get post by id',
  props<{ id: number }>()
);

export const getPostByIdSuccess = createAction(
  '[Posts API] get post by id success',
  props<{ post: DetailedPost }>()
);

export const getSearchedPosts = createAction(
  '[Posts] get searched posts',
  props<{ search: string }>()
);

export const getSearchedPostsSuccess = createAction(
  '[Posts API] get searched posts success',
  props<{ posts: PostData[]; totalCount: number }>()
);

export const updatePost = createAction(
  '[Posts] update post by id',
  props<{ id: string; title: string; body: string }>()
);

export const updatePostSuccess = createAction(
  '[Posts API] update post by id success',
  props<{ id: string, post: PostData }>()
);

export const createPost = createAction(
  '[Posts] create post by id',
  props<{ title: string; body: string }>()
);

export const createPostSuccess = createAction(
  '[Posts API] create post by id success',
  props<{ post: PostData }>()
);