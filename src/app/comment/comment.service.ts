import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentPayload} from "./comment-payload";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getAllCommentsOfPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(this.baseUrl + 'api/comments/by-post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'api/comments/', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>(this.baseUrl + 'api/comments/by-user/' + name);
  }
}
