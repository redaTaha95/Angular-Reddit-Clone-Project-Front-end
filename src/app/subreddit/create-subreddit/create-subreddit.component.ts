import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {SubredditModel} from "../subreddit-response";
import {Router} from "@angular/router";
import {SubredditService} from "../subreddit-service.service";

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm: UntypedFormGroup;
  subredditModel: SubredditModel;
  title = new UntypedFormControl('');
  description = new UntypedFormControl('');

  constructor(private router: Router, private subredditService: SubredditService) {
    this.createSubredditForm = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', Validators.required)
    });
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get('title')?.value;
    this.subredditModel.description = this.createSubredditForm.get('description')?.value;

    this.subredditService.createSubreddit(this.subredditModel).subscribe(data => {
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      console.log('Error Occurred');
    })
  }
}
