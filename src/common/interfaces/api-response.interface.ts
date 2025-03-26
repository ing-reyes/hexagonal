import { Metadata } from "./metadata.interface";
import { Status } from "./status.interface";

export interface ApiOneResponse<T> {
    status: Status;
    data: T;
}

export interface ApiAllResponse<T> {
    meta: Metadata;
    status: Status;
    data: T[];
}
