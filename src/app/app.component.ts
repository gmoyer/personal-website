import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Menu from './menu.json';


const BubbleAnimation = trigger('BubbleAnimation', [
  /*
  transition("* => *", [
    query('div', [
      style({rotate: '1 0 0 360deg'}),
      animate('2000ms ease-out', style({rotate: '1 0 0 0deg'}))
    ], { optional: true }),
  ])
  */
])

class Bubble {
  x : number = 0;
  y : number = 0;

  size : number;
  rotation : number;
  color : number;
  hovering : boolean = false;
  active : boolean = false;

  style : {[key: string] : any} = {};

  constructor(bubbles : Bubble[]) {
    var goodSpot = false;
    var attempts = 0;
    while (!goodSpot && attempts < 100) {
      this.x = Math.floor(Math.random() * 101);
      this.y = Math.floor(Math.random() * 101);
      
      goodSpot = true;
      bubbles.forEach(bubble => {
        if (Math.abs(bubble.x - this.x) <= 7 && Math.abs(bubble.y - this.y) <= 7)
          goodSpot = false;
      });
      attempts++;
    }
    this.size = Math.floor(Math.random() * 300) + 150;
    this.rotation = Math.floor(Math.random() * 360);
    this.color = 250 - Math.floor(Math.random() * 25); //rgb values
    this.updateColor();

    this.style['left'] = this.x + 'vw';
    this.style['top'] = this.y + 'vh';
    this.style['width'] = this.size + 'px';
    this.style['height'] = this.size + 'px';
    this.style['transform'] = `translate(-50%, -50%)`;// rotate(${this.rotation}deg)`;
  }

  setHovering(hovering : boolean) {
    if (hovering) {
      this.hovering = true;
      this.active = true;
      this.updateColor();
    }
    else {
      this.hovering = false;
      setTimeout(() => {
        if (!this.hovering)
          this.active = false;
        this.updateColor();
      }, 2000);
    }
  }

  updateColor() {
    if (this.active)
      this.style['backgroundColor'] = `rgb(${this.color-10}, ${this.color-10}, 255)`;
    else
      this.style['backgroundColor'] = `rgb(${this.color}, ${this.color}, ${this.color})`;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [BubbleAnimation]
})
export class AppComponent implements OnInit {
  bubbles : Bubble[] = [];
  bubbleCount : number = 70;

  zStart : number = 1;
  zStop : number = 5;
  zStep : number = 0.5;

  menu : any = Menu;

  zCount : number = (this.zStop-this.zStart) / this.zStep;

  constructor(public router : Router) {
    for (var i = 0; i < this.bubbleCount; i++) {
      this.bubbles.push(new Bubble(this.bubbles));
    }
  }

  ngOnInit(): void {
  }
}
