import { HttpParams } from '@angular/common/http';

export interface IRequest {
  path(): string;
  query(): HttpParams
}

