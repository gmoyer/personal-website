import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService, Post, SectionType } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  post : Post = {
    id: "",
    name: "",
    images: [],
    content: []
  };

  constructor(
    private route : ActivatedRoute,
    private blogService : BlogService
  ) {
  }

  public get sectionType() : typeof SectionType {
    return SectionType;
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const postRoute = params.get('id');
      if (postRoute) {
        this.blogService.getPost(postRoute).subscribe({
          next: (post) => {
            this.post = post;
          },
          error: (error) => {
            console.error('Error fetching HTML content:', error);
          }
        });
      }
    });
  }
}
