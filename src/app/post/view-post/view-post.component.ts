import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../shared/post-model";
import {PostService} from "../../shared/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {throwError} from "rxjs";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {CommentPayload} from "../../comment/comment-payload";
import {CommentService} from "../../comment/comment.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post!: PostModel;
  commentForm: UntypedFormGroup;
  commentPayload: CommentPayload;
  comments!: CommentPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private commentService: CommentService, private router: Router) {
    this.postId = this.activateRoute.snapshot.params['id'];

    this.commentForm = new UntypedFormGroup({
      text: new UntypedFormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    }
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsOfPost();
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsOfPost() {
    this.commentService.getAllCommentsOfPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    })
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')?.value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsOfPost();
    }, error => {
      throwError(error);
    })
  }
}
