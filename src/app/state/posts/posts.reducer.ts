import { Action, createReducer, on } from '@ngrx/store';
import { Posts } from 'src/app/models/post';
import {
  clearSelectedPost,
  createPost,
  createPostSuccess,
  getAllPosts,
  getAllPostsFinish,
  getAllPostsPage,
  getAllPostsSuccess,
  getPostById,
  getPostByIdSuccess,
  getSearchedPosts,
  getSearchedPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';

export const userFeatureKey = 'posts';

export const postsInitialState: Posts = {
  entities: [],
  loading: false,
  page: 1,
  totalCount: -1,
  detailedPost: {
    id: '',
    title: '',
    body: '',
    user: {
      name: '',
      username: '',
    },
    comments: {
      data: [
        { name: '', email: '', body: '' }
      ],
    },
  },
};


export const initialAppState: Posts = {
  ...postsInitialState,
};

export const reducer = createReducer(
  initialAppState as Posts,

  on(clearSelectedPost, state => ({
    ...state,
    detailedPost: postsInitialState.detailedPost,
  })),
  on(getAllPosts, state => ({
    ...state,
    loading: true,
  })),
  on(getAllPostsPage, (state, { page }) => ({
    ...state,
    loading: true,
    page
  })),
  on(getAllPostsSuccess, (state, { posts, totalCount }) => ({
    ...state,
    entities: [...posts],
    loading: false,
    totalCount,
  })),
  on(getAllPostsFinish, state => ({
    ...state,
    loading: false,
  })),
  on(getSearchedPosts, state => ({
    ...state,
    loading: true,
  })),
  on(getSearchedPostsSuccess, (state, { posts, totalCount }) => ({
    ...state,
    entities: posts,
    loading: false,
    totalCount,
  })),
  on(getPostById, state => ({
    ...state,
    loading: true,
  })),
  on(getPostByIdSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    detailedPost: post,
  })),
  on(createPost, state => ({
    ...state,
    loading: true,
  })),
  on(createPostSuccess, (state, { post }) => ({
    ...state,
    entities: [...state.entities, post],
    loading: false,
  })),
  on(updatePost, state => ({
    ...state,
    loading: true,
  })),
  on(updatePostSuccess, (state, { id, post }) => ({
    ...state,
    entities: state.entities.map(entity => {
      if (entity.id === id) {
        return post;
      }
      return entity;
    }),
    loading: false,
  })),
);

export function PostsReducer(state: Posts | undefined, action: Action): Posts {
  return reducer(state as Posts, action as Action);
}
