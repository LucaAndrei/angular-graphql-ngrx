import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/posts/post/post.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  { path: 'post', component: PostComponent },
  { path: 'list', component: PostsComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
