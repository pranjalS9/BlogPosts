import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { INewPost } from '../models/INewPost';
import { DataServiceService } from '../data-service.service';
import { Output, EventEmitter } from '@angular/core';
import { IPost } from '../models/IPost';
import { IErrorMessages } from '../models/IErrorMessages';

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
    id: -1, 
    title: '', 
    body: '' 
  };
  
  errorMessages: IErrorMessages = {
    titleError: '',
    bodyError: ''
  }

  onSubmit(postForm: NgForm){
    if(postForm.valid){
      let toEditPostId = this.dataService.toEditPostObj.id;

      let isExistId = false;
      for(let i=0; i<this.dataService.postsArray.length; i++){
        if(toEditPostId == this.dataService.postsArray[i].id){
          isExistId = true;
        }
      }

      if(isExistId == true){
        let newEditedPost: IPost = {
          userId: this.dataService.toEditPostObj.userId,
          id: this.dataService.toEditPostObj.id,
          title: postForm.value.title,
          body: postForm.value.body
        }
        this.dataService.detailsObj.body = newEditedPost.body
        
        this.dataService.postsArray.splice(toEditPostId-1, 1, newEditedPost)

        this.dataService.toEditPostObj = {
          userId: 0,
          id: -1,
          title: '',
          body: ''
        }
        isExistId = false;
        postForm.reset()
      }else{
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
      }
      postForm.reset()
    }else{
      if(postForm.value.title == "" && postForm.value.body == ""){
        this.errorMessages.titleError = "*Title can't be empty";
        this.errorMessages.bodyError = "*Description can't be empty";
      }else if(postForm.value.body == "" && postForm.value.title != ""){
        this.errorMessages.bodyError = "*Description can't be empty";
      }else if(postForm.value.title == "" && postForm.value.body != ""){
        this.errorMessages.titleError = "*Title can't be empty";
      }
    }
    if(postForm.value.title !== "" && postForm.value.body !== ""){
      this.errorMessages.titleError = "";
      this.errorMessages.bodyError = "";
    }else if(postForm.value.title !== "" && postForm.value.body == ""){
      this.errorMessages.titleError = "";
    }else if(postForm.value.title == "" && postForm.value.body !== ""){
      this.errorMessages.bodyError = "";
    }
  }
}
