import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost() {
      // return [...this.posts];
      this.http.get<{message: string, post: any}>('http://localhost:3000/post')
      .pipe(map((postData) => {
            return postData.post.map(posts => {
                return {
                  title: posts.title,
                  content: posts.content,
                  id: posts._id,
                  imagePath: posts.imagePath
                };
            });
      }))
        .subscribe((transformedPost) => {
         this.posts =  transformedPost;
         this.postUpdated.next([...this.posts]);
        });
  }

  getUpdatedList() {
    return this.postUpdated.asObservable();
  }

  getsPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string, imagePath: string  }>('http://localhost:3000/post/' + id);
 }

// tslint:disable-next-line: no-shadowed-variable
  // addPost(post: Post) {
    addPost(title: string, content: string, image: File ) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{message: string, post: Post }>(
          'http://localhost:3000/post',
          postData
      )
      .subscribe((responseData) => {
// tslint:disable-next-line: no-shadowed-variable
        const post: Post = {
          id: responseData.post.id,
          title: title,
          content: content,
          imagePath: responseData.post.imagePath
        };
        // const id = getData.postId;
        // post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
 }


 updatePost(id: string, title: string, content: string, image: File | string) {
   let postData: Post | FormData;
   if (typeof(image) === 'object') {
     postData = new FormData();
     postData.append('id', id);
     postData.append('title', title);
     postData.append('content', content);
     postData.append('image', image, title);
   } else {
        postData = {
          id: id,
          title: title,
          content: content,
          imagePath: image
        };
   }
   this.http.put('http://localhost:3000/post/' + id, postData )
    .subscribe(response => {
      const updatedPost = [...this.posts];
      const oldIndex = updatedPost.findIndex(p => p.id === id);
      const post: Post = {
        id: id,
        title: title,
        content: content,
        imagePath: ''
      };
      updatedPost[oldIndex] = post;
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
 }

 deletePost(postId: string) {
   this.http.delete('http://localhost:3000/post/' + postId)
   .subscribe(() => {
      // update post data after being deleted
      const updatePosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatePosts;
      this.postUpdated.next([...this.posts]);
   });
 }
}
