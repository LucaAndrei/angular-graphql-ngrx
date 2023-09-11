import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Posts } from '../models/post';
import { PostsReducer } from './posts/posts.reducer';

export interface IApp {
  posts: Posts;
}

export const reducers: ActionReducerMap<IApp> = {
  posts: PostsReducer,
};
export const metaReducers: MetaReducer<IApp>[] = [];
