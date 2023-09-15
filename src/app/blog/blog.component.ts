import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  content : String = "";

  constructor(
    private route : ActivatedRoute,
    private blogService : BlogService
  ) {}
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('id');
      if (name) {
        this.blogService.getPosts().subscribe({
          next: (posts) => {
            posts.forEach(post => {
              if (post.route == name) {
                this.blogService.getPost(post.filename).subscribe({
                  next: (content) => {
                    this.content = this.blogService.parseHTML(content, post);
                  },
                  error: (error) => {
                    console.error('Error fetching HTML content:', error);
                  }
                });
              }
            })
          },
          error: (error) => {
            console.error('Error fetching HTML content:', error);
          }
        });
      }
    });
  }
}
