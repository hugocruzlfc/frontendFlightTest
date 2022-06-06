import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CommentResponse,
  ResponseCreateComment,
  SearchResponse,
  Comment,
} from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private readonly httpClient: HttpClient) {}

  commentsByFlightId(flightId: string): Observable<Comment[]> {
    return this.httpClient
      .get<CommentResponse>(`/apiTest/comment/comments/${flightId}`)
      .pipe(
        map((resp) => {
          return resp.allCommentByFlightId.docs;
        })
      );
  }
  commentsByParams(flightId: string, paramFind: string): Observable<Comment[]> {
    return this.httpClient
      .post<SearchResponse>(`/apiTest/comment/comments`, {
        flightId,
        paramFind,
      })
      .pipe(
        map((resp) => {
          return resp.allCommentBySearch;
        })
      );
  }

  createComment(newComent: Comment): Observable<Comment> {
    return this.httpClient
      .post<ResponseCreateComment>('apiTest/comment/create', newComent)
      .pipe(
        map((resp) => {
          return resp.createComment;
        })
      );
  }
}
