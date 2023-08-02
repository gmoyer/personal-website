import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  gradient : string = "linear-gradient(270deg, #FA8BFF 0%, #2BD2FF 42%, #2BFF88 90%)";

  constructor() {

  }
  ngOnInit(): void {
    addEventListener("mousemove", (event) => {
      var angle = this.mouseAngle(event.clientX, event.clientY);
      this.gradient = `linear-gradient(${angle}deg, #FA8BFF 0%, #2BD2FF 42%, #2BFF88 90%)`
    })
  }

  mouseAngle(x : number, y : number) : number {
    x -= window.innerWidth/2;
    y -= window.innerHeight/2;
    var tan = 90 - Math.atan(y / x) * 180 / Math.PI;
    if (x < 0)
      tan += 180;
    return tan;
  }
}
