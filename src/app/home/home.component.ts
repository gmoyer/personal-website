import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import Menu from './menu.json';


const MenuAnimation = trigger('MenuAnimation', [
  transition("* => *", [
    query(':enter', [
      style({ opacity: 0}),
      stagger(50, [
        animate('300ms ease-out', style({ opacity: 1})),
      ]),
    ], { optional: true })
  ])
])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [MenuAnimation],
})
export class HomeComponent implements OnInit {
  gradient : string = "linear-gradient(270deg, #FA8BFF 0%, #2BD2FF 42%, #2BFF88 90%)";

  menu : any = Menu;

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
    x /= window.innerWidth/window.innerHeight;
    y /= window.innerHeight/window.innerWidth;
    var tan = 90 + Math.atan(y / x) * 180 / Math.PI;
    if (x < 0)
      tan += 180;
    return tan;
  }
}
