import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { POSTS_PER_PAGE, PostData } from 'src/app/models/post';
import { IApp } from 'src/app/state/reducers';

import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/utils/autounsub';
import * as fromPostsActions from '../../state/posts/posts.actions';
import * as fromPostsSelectors from '../../state/posts/posts.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
@AutoUnsubscribe()
export class PostsComponent implements OnInit {
  posts: PostData[] = [];
  loading = false;
  pages: number[] = [];
  search: string;

  private posts$: Subscription;
  private loading$: Subscription;
  private pagination$: Subscription;

  constructor(private store: Store<IApp>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(fromPostsActions.getAllPosts());

    this.pagination$ = this.store
      .select(fromPostsSelectors.selectAllPostsLength)
      .subscribe(totalCount => {
        const pages = Math.ceil(totalCount / POSTS_PER_PAGE);
        this.pages = Array.from(Array(pages).keys());
      });


    this.posts$ = this.store
      .select(fromPostsSelectors.selectAllPosts)
      .subscribe(posts => this.posts = posts);

    this.loading$ = this.store
      .select(fromPostsSelectors.selectAllPostsLoading)
      .subscribe(loading => {
        this.loading = loading
      });
  }

  searchByTitle(): void {
    this.store.dispatch(fromPostsActions.getSearchedPosts({ search: this.search }));
  }

  onPageChange(page: number) {
    this.store.dispatch(fromPostsActions.getAllPostsPage({ page: page + 1 }));
  }

  navigateTo({ id, mode }: { id: string, mode?: string }) {
    this.router.navigate(['/post'], {
      queryParams: {
        id,
        mode
      }
    });
  }

}
