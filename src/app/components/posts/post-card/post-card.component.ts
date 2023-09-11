import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostData } from 'src/app/models/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post: PostData;
  @Output() navigateTo = new EventEmitter<{id: string; mode: string}>();

  goTo(mode?: string) {
    this.navigateTo.emit({id: this.post.id, mode});
  }
}
