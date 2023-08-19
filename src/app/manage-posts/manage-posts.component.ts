import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { INewPost } from '../models/INewPost';
import { DataServiceService } from '../data-service.service';
import { Output, EventEmitter } from '@angular/core';
import { IPost } from '../models/IPost';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent {

  constructor(public dataService: DataServiceService){}

  @Output() updatedPosts = new EventEmitter<IPost[]>();
  @Input() toEditPost: IPost = {
    userId: 0, 
    id: 0, 
    title: '', 
    body: '' 
  };

  onSubmit(postForm: NgForm){
    if(postForm.valid){
      let isExistId = false;
      let toEditPostId = -1;

      for(let index = 0; index < this.dataService.postsArray.length; index++){
        if(this.dataService.postsArray[index].id == postForm.value.id){
          isExistId = true;
          toEditPostId = index;
        }
      }
      if(isExistId == false){
        const newPostObject: IPost = {
          userId: 0,
          id: 0,
          title: postForm.value.title,
          body: postForm.value.body
        }
        this.dataService.createPost(newPostObject).subscribe(
          (response) => {
            this.dataService.postsArray.push(response);
            this.updatedPosts.emit(this.dataService.postsArray);
          }
        )
      }else{
        this.dataService.postsArray[toEditPostId].userId = postForm.value.userId;
        this.dataService.postsArray[toEditPostId].id = postForm.value.id;
        this.dataService.postsArray[toEditPostId].title = postForm.value.title;
        this.dataService.postsArray[toEditPostId].body = postForm.value.body;
      }
    }
  }
}
