import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, last, map } from "rxjs";

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  /*
    Access-Control-Allow-Credentials allows the request to access cookies (including HttpOnly)
    to be improved: set it only when refreshing token
  */
  'Access-Control-Allow-Credentials': 'true'
})

const cacheHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'cacheRequest': 'true',
})


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(private http: HttpClient) {
  }

  makePostRequest(name: string, relativeApiEndPoint: string, payload: any): Observable<any> {
    return this.http.post<any>(relativeApiEndPoint, payload, {
      headers: headers, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        last(),
        // catchError(this.handleError(name))
      )
  }

  makeGetRequest(name: string, relativeApiEndPoint: string, cacheRequest: boolean = false): Observable<any> {
    return this.http.get<any>(relativeApiEndPoint, {
      headers: cacheRequest ? cacheHeaders : headers, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        map(response => response),
        last(), // :void return last (completed) message to caller
        // catchError(this.handleError(name))
      )
  }
}