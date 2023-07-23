import { Component } from '@angular/core';



class Bubble {
  x : number = 0;
  y : number = 0;
  size : number;
  color : number;
  hovering : boolean = false;

  constructor(bubbles : Bubble[]) {
    var goodSpot = false;
    var attempts = 0;
    while (!goodSpot && attempts < 100) {
      this.x = Math.floor(Math.random() * 101);
      this.y = Math.floor(Math.random() * 101);
      goodSpot = true;
      bubbles.forEach(bubble => {
        if (Math.abs(bubble.x - this.x) <= 4 && Math.abs(bubble.y - this.y) <= 4)
          goodSpot = false;
      });
      attempts++;
    }
    this.size = Math.floor(Math.random() * 150) + 100;
    this.color = 245 - Math.floor(Math.random() * 45); //rgb values
  }


  styles() : {[key: string]: any} {
    return {
      left: this.x + '%',
      top: this.y + '%',
      backgroundColor: this.getColor(),
      width: this.size + 'px',
      height: this.size + 'px'
    }
  }

  getColor() {
    if (this.hovering)
      return `rgb(${this.color-50}, 255, ${this.color-50})`;
    else
      return `rgb(${this.color}, ${this.color}, ${this.color})`;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  bubbles : Bubble[] = [];
  bubbleCount : number = 200;


  constructor() {
    for (var i = 0; i < this.bubbleCount; i++) {
      this.bubbles.push(new Bubble(this.bubbles));
    }
  }
}
