import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from '../models/post.model';
import { PostsService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription;
  totalPost = 10;
  postPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPost();
    this.postSub = this.postsService.getUpdatedList()
       .subscribe((post: Post[]) => {
         this.posts = post;
 });
  }

  onPageChanged(PageData: PageEvent) {
    console.log(PageData);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }


}
