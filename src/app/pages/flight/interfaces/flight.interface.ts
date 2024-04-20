export interface ResponseFlight {
  status: number;
  message: string;
  allFlights: AllFlights;
}

interface AllFlights {
  docs: Flight[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

export interface Flight {
  _id?: string;
  name: string;
}
