import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent {
  tooltipMessage : String = "Click to copy";
  copyEmail() {
    navigator.clipboard.writeText("moyergriffin@gmail.com");
    this.tooltipMessage = "Copied!";
  }
}
