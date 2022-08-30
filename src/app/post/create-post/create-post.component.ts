import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {CreatePostPayload} from "./create-post";
import {SubredditModel} from "../../subreddit/subreddit-response";
import {Router} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {SubredditService} from "../../subreddit/subreddit-service.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm: UntypedFormGroup = new UntypedFormGroup({});
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel> = [];

  constructor(private router: Router, private postService: PostService,
              private subredditService: SubredditService) {
    this.postPayload = {
      name: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit(): void {
    this.createPostForm = new UntypedFormGroup({
      postName: new UntypedFormControl('', Validators.required),
      subredditName: new UntypedFormControl('', Validators.required),
      url: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', Validators.required)
    });

    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.name = this.createPostForm.get('postName')?.value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}
