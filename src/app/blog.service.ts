import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export enum SectionType {
  IMAGE,
  TEXT,
  LINK
}

export interface Section {
  type : SectionType;
  class : String;
  src : String; //image address for images
  text : String;
}

export interface Post {
  id : String;
  name : String;
  images : String[];
  content : Section[]; 
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

  getPost(route : String) : Observable<Post> {
    return new Observable((subscriber) => {
      this.getPosts().subscribe({
        next: (posts) => {
          posts.forEach(post => {
            if (post.id == route) {
              this.http.get<String>(this.baseApi + 'posts/' + route + '/content.txt', {responseType: 'text' as 'json'}).subscribe({
                next: (content) => {
                  post.content = this.parseContent(content, post);
                  subscriber.next(post);
                }
              });
            }
          });
        }
      });
    });
  }

  parseContent(content : String, post : Post) : Section[] { //add api to any src
    var out : Section[] = [];


    content.split("\n").forEach(line => {
      var parse = line.split(">>");
      if (parse.length > 1 && parse[0] == "") {
        switch(parse[1]) {
          case "IMAGE":
            out.push({
              text: parse[3],
              type: SectionType.IMAGE,
              class: "image",
              src: this.baseApi + 'posts/' + post.id + '/' + parse[2]
            });
            break;
          case "LINK":
            console.log("parsing link...");
            out.push({
              text: parse[3],
              type: SectionType.LINK,
              class: "link",
              src: parse[2]
            });
            break;
        }
      } else {
        out.push({
          text: line,
          type: SectionType.TEXT,
          class: "text",
          src: ""
        });
      }
    });

    return out;
  }
}
