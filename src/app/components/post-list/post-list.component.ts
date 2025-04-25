import { Component } from '@angular/core';
import { Post } from '../../data/post';
import { PostService } from '../../../app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
