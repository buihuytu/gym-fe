import { Injectable } from "@angular/core";
import { HttpRequestService } from "../../services/http.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BasePageListService {
    constructor(
        private httpService: HttpRequestService,
    ) { }

    queryList(url: string,request?: any): Observable<any> {
        return this.httpService.makeGetRequest(
            'queryList',
            url,
        );
    }

    deleteIds(url: string,request?: any): Observable<any> {
        return this.httpService.makePostRequest(
            'deleteIds',
            url,
            request
        );
    }
    unapproveIds(url: string,request?: any): Observable<any> {
        return this.httpService.makePostRequest(
            'unapproveIds',
            url,
            request
        );
    }
}