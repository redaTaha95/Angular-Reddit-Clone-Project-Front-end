import {Component, Input, OnInit} from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import {PostModel} from "../post-model";

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {
  @Input() data: Array<PostModel> = [];
  faComments = faComments;

  constructor() { }

  ngOnInit(): void {
  }

  goToPost(id: any) {

  }
}
