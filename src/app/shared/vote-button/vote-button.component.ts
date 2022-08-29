import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../post-model";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {
  @Input() post: PostModel = new PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  downvoteColor: any;
  upvoteColor: any;

  constructor() { }

  ngOnInit(): void {
  }

  upvotePost() {

  }

  downvotePost() {

  }
}
