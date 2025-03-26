import { HttpStatus } from "../enums/http-status.enum";

export interface Status {
    statusMsg: keyof typeof HttpStatus;
    statusCode: HttpStatus;
    error: string | null;
}