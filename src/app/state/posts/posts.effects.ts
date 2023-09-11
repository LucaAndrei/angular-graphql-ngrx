import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { POSTS_PER_PAGE } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { IApp } from '../reducers';
import * as fromPostsActions from './posts.actions';
import * as fromPostSelectors from './posts.selectors';

@Injectable()
export class PostEffects {
  constructor(
    private store: Store<IApp>,
    private actions$: Actions,
    private postService: PostsService
  ) { }

  getAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostsActions.getAllPosts, fromPostsActions.getAllPostsPage),
      withLatestFrom(
        this.store.pipe(select(fromPostSelectors.selectAllPostsPage)),
        this.store.pipe(select(fromPostSelectors.areAllPostsLoaded))
      ),
      switchMap(([, page, areAllPostsLoaded]) => {
        if (areAllPostsLoaded) {
          return of(fromPostsActions.getAllPostsFinish());
        }

        return this.postService.getAllPosts(page, POSTS_PER_PAGE).pipe(
          map(apolloResult => {
            return fromPostsActions.getAllPostsSuccess({
              posts: apolloResult.data.posts.data,
              totalCount: apolloResult.data.posts.meta.totalCount,
            });
          })
        );
      })
    )
  );

  getSearchedPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostsActions.getSearchedPosts),
      switchMap(({ search }) =>
        this.postService.searchPostsByTitle(search, 1, POSTS_PER_PAGE).pipe(
          map(apolloResult => {
            return fromPostsActions.getSearchedPostsSuccess({
              posts: apolloResult.data.posts.data,
              totalCount: apolloResult.data.posts.meta.totalCount,
            });
          })
        )
      )
    )
  );

  getDetailedPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostsActions.getPostById),
      switchMap(({ id }) =>
        this.postService.getSinglePost(id, 1, POSTS_PER_PAGE).pipe(
          map(apolloResult => {
            return fromPostsActions.getPostByIdSuccess({
              post: apolloResult.data.post,
            });
          })
        )
      )
    )
  );

  createSinglePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostsActions.createPost),
      switchMap(({ title, body }) =>
        this.postService.createSinglePost(title, body).pipe(
          map(apolloResult => {
            return fromPostsActions.createPostSuccess({
              post: {
                id: Math.floor(Math.random() * 1000),
                ...apolloResult.data.createPost
              },
            });
          })
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostsActions.updatePost),
      switchMap(({ id, title, body }) =>
        this.postService.updatePost(id, title, body).pipe(
          map(apolloResult => {
            return fromPostsActions.updatePostSuccess({
              id,
              post: apolloResult.data.updatePost,
            });
          }),
        )
      )
    )
  );
}
