import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostComment } from 'src/app/models/post';
import { IApp } from 'src/app/state/reducers';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/utils/autounsub';
import * as fromPostsActions from '../../../state/posts/posts.actions';
import * as fromPostsSelectors from '../../../state/posts/posts.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
@AutoUnsubscribe()
export class PostComponent {
  comments: PostComment[];
  mode: "edit" | "" = "";
  loading: boolean;
  form: FormGroup;

  private id: number;

  private post$: Subscription;
  private loading$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IApp>,
    private toastr: ToastrService
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id') as unknown as number;

    if (this.id) {
      this.mode = this.route.snapshot.queryParamMap.get('mode') as any;
    } else {
      this.mode = "edit";
    }

    this.form = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'username': new FormControl(null, [Validators.required]),
      'body': new FormControl(null, [Validators.required]),
    });

  }

  ngOnInit(): void {
    if (this.id) {
      this.store.dispatch(fromPostsActions.getPostById({ id: this.id as number }));
    } else {
      this.store.dispatch(fromPostsActions.clearSelectedPost());
    }
    this.post$ = this.store
      .select(fromPostsSelectors.selectDetailedPost)
      .subscribe(post => {
        this.comments = post.comments.data;
        this.form.patchValue({
          title: post.title || '',
          username: post.user?.username || 'Your username',
          body: post.body || ''
        })
      });

    this.loading$ = this.store
      .select(fromPostsSelectors.selectAllPostsLoading)
      .subscribe(loading => this.loading = loading);
  }


  onSubmit() {
    if (this.form.invalid) {
      const errors = this.getValidationErrors();
      return this.toastr.error(errors.join('\n'));
    }
    const isNew = this.mode === "edit" && this.id === null;
    const { title, body } = this.form.value;
    if (isNew) {
      return this.store.dispatch(fromPostsActions.createPost({ title, body }))
    } else {
      return this.store.dispatch(fromPostsActions.updatePost({ id: `${this.id}`, title, body }));
    }
  }

  private getValidationErrors() {
    return Object.keys(this.form.controls)
      .map(key => ({ key, control: this.form.get(key) }))
      .map(({ key, control }) => ({ key, errors: control.errors }))
      .filter(({ key, errors }) => errors)
      .map(({ key, errors }) => {
        return Object.keys(errors).map(errorKey => {
          return `${key} is ${errorKey}`;
        });
      }).reduce((acc, val) => {
        return [...acc, ...val]
      }, []);
  }
}
