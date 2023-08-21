import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../app/models/IPost'
import { Observable } from 'rxjs';
import { INewPost } from './models/INewPost';
import { IComment } from './models/IComment';
import { IDetails } from './models/IDetails';
import { IErrorMessages } from './models/IErrorMessages';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  postUrl = 'https://jsonplaceholder.typicode.com/posts';
  commentsUrl = 'https://jsonplaceholder.typicode.com/posts/1/comments';

  // allPosts: string[] = [];
  // postDetail: string = "";
  postsArray: IPost[] = [];
  commentsArray: IComment[] = [];
  // detailsObj: IDetails[] = [];
  detailsObj: any = {
    body: "",
    comments: [{
      postId: 0,
      id: 0,
      name: '',
      email: '',
      body: ''
    }]
  }

  toEditPostObj: IPost = {
    userId: 0,
    id: 0,
    title: '',
    body: ''
  };

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postUrl);
  }
  getComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.commentsUrl)
  }
  createPost(newPostData: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.postUrl, newPostData)
  }

}
