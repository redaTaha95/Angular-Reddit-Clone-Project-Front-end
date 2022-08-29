import { Component, OnInit } from '@angular/core';
import {PostModel} from "../shared/post-model";
import {PostService} from "../shared/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];
  faArrowUp: any;
  upvoteColor: any;
  downvoteColor: any;
  faArrowDown: any;
  faComments: any;

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    })
  }

  ngOnInit(): void {
  }

  upvotePost() {
    
  }

  downvotePost() {
    
  }

  goToPost(id: any) {
    
  }
}
