import { Component, ElementRef, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h2>Enter Telephone Number</h2>
    <p>
      <input
        name="telephone"
        #telephone
        placeholder="(xxx) xxx-xxxx"
        (keyup)="format($event)"
        maxlength="14"
      />
    </p>
  `,
})
export class App {
  @ViewChild('telephone') input!: ElementRef;
  format(ev: KeyboardEvent) {
    if (ev.key === 'Backspace') {
      // do nothing;
    } else {
      const test = this.input.nativeElement.value;
      const newVal = test.replaceAll(/\D+/g, '').substring(0, 10);
      let output = '';
      newVal.split('').forEach((char: string, index: number) => {
        console.log('char: ', char, index);
        switch (index) {
          case 0:
            output += `(${char}`;
            break;
          case 2:
            output += `${char})`;
            break;
          case 3:
            output += ` ${char}`;
            break;
          case 6:
            output += `-${char}`;
            break;
          default:
            output += char;
        }
      });
      this.input.nativeElement.value = output;
    }
  }
}

bootstrapApplication(App);
