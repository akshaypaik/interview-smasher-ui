import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppCommonService {

  constructor(private httpClient: HttpClient) { }

  getInterviewQuestionsData(): Observable<any>{
    return this.httpClient.get<any>("../assets/interview-questions-data.json");
  }

}
