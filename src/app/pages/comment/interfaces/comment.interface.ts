export interface CommentResponse {
  status: number;
  message: string;
  allCommentByFlightId: AllCommentByFlightID;
}

export interface AllCommentByFlightID {
  docs: Comment[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

export interface Comment {
  _id?: string;
  comment: string;
  tags?: string;
  userId: string;
  flightId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseCreateComment {
  status: number;
  message: string;
  createComment: Comment;
}

///
export interface SearchResponse {
  status: number;
  message: string;
  allCommentBySearch: Comment[];
}
