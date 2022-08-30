import {Component, Input, OnInit} from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import {PostModel} from "../post-model";
import {PostService} from "../post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {
  @Input() posts: Array<PostModel> = [];
  faComments = faComments;

  constructor(private postService: PostService, private router:Router) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    })
  }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
