import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wait',
  template: `
  <div class="img-container">
        <h2>{{details}}</h2>
        <h3>Please login</h3>
        <img src="assets/spotify.png"/>
      </div>
  `,
  styleUrls: ['./login.component.css']
})
export class WaitComponent {
  @Input() details: String;

}
