import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  filename : String;
  route : String;
  name : String;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseApi : String = 'https://raw.githubusercontent.com/gmoyer/web-blog/main/';

  constructor(
    private http : HttpClient
  ) { }

  getPosts() : Observable<Post[]> {
    return this.http.get<Post[]>(this.baseApi + 'bloglist.json');
  }

  getPost(name : String) : Observable<String> {
    return this.http.get<String>(this.baseApi + 'posts/' + name, {responseType: 'text' as 'json'});
  }
}
