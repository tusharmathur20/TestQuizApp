import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _http: HttpClient) {}
  //load all the cateogries
  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  public addCategory(category: any){
    return this._http.post(`${baseUrl}/category/`,category)
  }
}
