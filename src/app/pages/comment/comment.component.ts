import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommentService } from './services/comment.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Comment } from './interfaces/comment.interface';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnChanges {
  @Input() flightId!: string;
  inputSearch = new FormControl('');
  comments$!: Observable<Comment[]>;
  commentsBackup$!: Observable<Comment[]>;
  panelOpenState = false;
  noComments: number;
  commentForm: FormGroup;
  paramSearch: string = '';
  intervalVariable: any;
  counter: number = 0;
  searchComment: string = '';
  pageEvent!: PageEvent;
  length = 200;
  pageSize = 0;
  pageSizeOptions: number[] = [10, 25, 100];

  constructor(
    private readonly commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.noComments = 1;
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      flightId: [''],
      tags: [''],
    });
  }

  ngOnInit(): void {
    this.searchComment = '';
  }

  /*
   *hook of state change
   *
   */
  ngOnChanges(): void {
    this.handleCommentByFlightId(this.flightId);
    if (this.flightId) {
      this.comments$.subscribe((element) => {
        element.length != 0 ? (this.noComments = 2) : (this.noComments = 3);
        this.pageSize = element.length;
      });
    } else {
      this.noComments = 1;
    }
    this.searchComment = '';
  }

  /*
   *function to render the data according to the chosen flight
   *
   */
  handleCommentByFlightId(sendFlightId: string): void {
    this.comments$ = this.commentService.commentsByFlightId(sendFlightId);
    this.commentsBackup$ = this.comments$;
  }

  /*
   *function to create  new comment according to the chosen flight
   *
   */

  handleCreateComment() {
    let newComment: Comment = this.commentForm.value;
    newComment.flightId = this.flightId;
    this.commentService.createComment(newComment).subscribe((resp) => {
      this.comments$ = this.commentService.commentsByFlightId(this.flightId);
    });
    this.commentForm.reset();
  }

  /*
   *functions to search comments by like comment
   *
   */

  handleSearchByFilter(event: any): void {
    this.counter = 0;
    let value = event.target.value;
    if (this.intervalVariable) {
      window.clearInterval(this.intervalVariable);
    }
    this.intervalVariable = window.setInterval(() => {
      this.counter++;
      if (this.counter === 1) {
        this.searchByFilterRequestComment(value);
      }
    }, 1000);
  }

  async searchByFilterRequestComment(value: string): Promise<void> {
    window.clearInterval(this.intervalVariable);
    if (value) {
      this.comments$ = this.commentService.commentsByParams(
        this.flightId,
        value
      );
    } else {
      this.comments$ = this.commentsBackup$;
    }
  }

  /*
   *function to paginate
   *
   * Obviously the logic is missing according to the response of the service.
   * but basically this is the body of the paging function.
   * the api returns paged objects and has the interface AllCommentByFlightID
   */
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  //logic and devolution of response for the new render
}
