import { HttpStatus } from "../enums/http-status.enum";

interface Metadata {
  page: number;
  lastPage: number;
  limit: number;
  total: number;
}

interface Status {
  statusMsg: keyof typeof HttpStatus;
  statusCode: HttpStatus;
  error: string | null;
}

export interface ApiOneResponse<T> {
  status: Status;
  data: T;
}

export interface ApiAllResponse<T> {
  meta: Metadata;
  status: Status;
  data: T[];
}
