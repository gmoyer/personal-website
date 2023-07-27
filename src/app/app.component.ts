import { state, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

class BubbleLayer {
  bubbles : Bubble[] = [];
  z : number = 0;
  mx : number = 0.5;
  my : number = 0.5;
  style : {[key : string] : any} = {
    left: '0%',
    top: '0%'
  };

  constructor(z : number) {
    this.z = z;
    //this.z = Math.random()*3+3;
  }


  updateStyle() {
    this.style['left'] = ((0.5-this.mx)*this.z) + '%';
    this.style['top'] = ((0.5-this.my)*this.z) + '%';
  }
}

class Bubble {
  x : number = 0;
  y : number = 0;

  size : number;
  color : number;
  hovering : boolean = false;

  style : {[key: string] : any} = {};

  constructor(bubbles : Bubble[], bubbleLayer : BubbleLayer) {
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
    this.updateColor();

    this.style['left'] = this.x + 'vw';
    this.style['top'] = this.y + 'vh';
    this.style['width'] = this.size + 'px';
    this.style['height'] = this.size + 'px';

    bubbleLayer.bubbles.push(this);
  }

  setHovering(hovering : boolean) {
    if (hovering) {
      this.hovering = true;
      this.updateColor();
    }
    else
      setTimeout(() => {
        this.hovering = false;
        this.updateColor();
      }, 2000);
  }

  updateColor() {
    if (this.hovering)
      this.style['backgroundColor'] = `rgb(${this.color-50}, 255, ${this.color-50})`;
    else
      this.style['backgroundColor'] = `rgb(${this.color}, ${this.color}, ${this.color})`;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  bubbles : Bubble[] = [];
  bubbleLayers : BubbleLayer[] = [];
  bubbleCount : number = 200;

  zStart : number = 3;
  zStop : number = 6;
  zStep : number = 0.5;

  zCount : number = (this.zStop-this.zStart) / this.zStep;

  constructor() {
    for (var z = this.zStart; z < this.zStop; z += this.zStep) {
      var layer = new BubbleLayer(z);
      this.bubbleLayers.push(layer);
      for (var i = 0; i < this.bubbleCount / this.zCount; i++) {
        this.bubbles.push(new Bubble(this.bubbles, layer));
      }
    }
  }

  ngOnInit(): void {
    addEventListener("mousemove", (event) => {
      this.bubbleLayers.forEach(layer => {
        layer.mx = event.clientX / window.innerWidth;
        layer.my = event.clientY / window.innerHeight;
        layer.updateStyle();
      })
    })
  }
}
