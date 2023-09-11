import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PostCardComponent } from './components/posts/post-card/post-card.component';
import { CommentComponent } from './components/posts/post/comments/comment/comment.component';
import { CommentsComponent } from './components/posts/post/comments/comments.component';
import { PostComponent } from './components/posts/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { GraphQLModule } from './graphql.module';
import { PostEffects } from './state/posts/posts.effects';
import { metaReducers, reducers } from './state/reducers';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoadingComponent,
    PostComponent,
    PostCardComponent,
    CommentsComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([PostEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    GraphQLModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
