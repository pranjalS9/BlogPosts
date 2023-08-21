import { Component, Output } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Input, EventEmitter } from '@angular/core';
import { INewPost } from '../models/INewPost';
import { IPost } from '../models/IPost';
import { IDetails } from '../models/IDetails';
import { IComment } from '../models/IComment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dataService: DataServiceService){}

  // @Output() toEditPost = new EventEmitter<INewPost>();


  selectedPostIndex: number | null = null;
  showToggle: boolean = false;
  // detailsObj: IDetails[] = []

  ngOnInit(){
    this.dataService.getPosts().subscribe(data => {
      for(let i=0; i<data.length; i++){
        this.dataService.postsArray.push(data[i])
      }
    })
  }

  onDetails(index: number){
    this.showToggle = !this.showToggle;
    this.selectedPostIndex = index; 
    this.dataService.getComments().subscribe(data => {
      this.dataService.commentsArray = data;

      if (this.dataService.commentsArray.length > 0) {
      this.dataService.detailsObj = {
        body: this.dataService.postsArray[index].body,
        comments: this.dataService.commentsArray
      };
        console.log(this.dataService.detailsObj);
      } else {
        console.log("No comments available.");
      }
    })
  }

  onEdit(index: number){
    this.dataService.toEditPostObj = this.dataService.postsArray[index];
  }

  onDelete(index: number){
    this.dataService.postsArray.splice(index, 1);
    this.showToggle = !this.showToggle
  }
}
