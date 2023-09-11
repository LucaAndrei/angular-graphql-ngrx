import { Component, Input } from '@angular/core';
import { PostComment } from 'src/app/models/post';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent {
  @Input() comments: PostComment[];
}
