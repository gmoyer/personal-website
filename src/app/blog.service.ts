import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  filename : String;
  route : String;
  name : String;
  images : String[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  readonly baseApi : String = 'https://raw.githubusercontent.com/gmoyer/web-blog/main/';

  constructor(
    private http : HttpClient
  ) { }

  getPosts() : Observable<Post[]> {
    return this.http.get<Post[]>(this.baseApi + 'bloglist.json');
  }

  getPost(name : String) : Observable<String> {
    return this.http.get<String>(this.baseApi + 'posts/' + name + '/index.html', {responseType: 'text' as 'json'});
  }

  parseHTML(html : String, post : Post) : String { //add api to any src
    var out : String[] = [];
    html.split("src").forEach((s, index) => {
      if (index != 0) {
        var m = s.split("\"");
      
        if (m.length > 2) {
          console.log(m[1]);
          m[1] = this.baseApi + 'posts/' + post.filename + '/' + m[1];
          console.log(m[1]);
        }

        out.push(m.join(""));
      } else {
        out.push(s);
      }
    })
    return out.join("src");
  }
}
