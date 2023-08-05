import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import ClueJson from './clue.json';

enum Type {
  Person,
  Weapon,
  Room
}

class Card {
  type : Type;

  constructor(type : Type) {
    this.type = type;
  }
}

class Player {
  name : String;

  constructor(name : String) {
    this.name = name;
  }
}

class Triple { //shown card to another person
  cards : Card[];
  player : Player;

  constructor(cards : Card[], player : Player) {
    this.cards = cards;
    this.player = player;
  }
}



@Component({
  selector: 'app-chess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clue.component.html',
  styleUrls: ['./clue.component.sass']
})
export class ChessComponent {

}
