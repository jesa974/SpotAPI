import { Component, Input } from '@angular/core';
import { utilisateur } from './user.component';

@Component({
  selector: 'user-details',
  template: `
    <div>
      <h2>{{UserCurrent.name}} - {{UserCurrent.id}}</h2>
      <p>Email : {{UserCurrent.email}}</p>
      <p>Pays : {{UserCurrent.country}}</p>
      <p>Nombre de followers : {{UserCurrent.followers}}</p>
      <p>Type du compte : {{UserCurrent.type}}</p>
      <a href={{UserCurrent.url}}>
        <img src={{UserCurrent.image}}/>
      </a>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class UserDetailsComponent {
  @Input() UserCurrent: utilisateur;

}
