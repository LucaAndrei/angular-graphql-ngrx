import { Component, Input } from '@angular/core';
import { PostComment } from 'src/app/models/post';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent {
  @Input() comment: PostComment;
}
