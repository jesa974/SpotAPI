import { Component, OnInit } from '@angular/core';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <span>Login with</span>
  <div class="img-container">
    <img src="assets/spotify.png" (click)="login()" />
  </div>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private tokenSvc: TokenService, private router: Router) { }

  ngOnInit() {
    if(!!this.tokenSvc.oAuthToken){
      this.router.navigate(['user']);
    }
  }

  public login(): void {
    const scopes = new ScopesBuilder()/* .withScopes(ScopesBuilder.LIBRARY) */.build();
    const ac: AuthConfig = {
      client_id: "2e0037aa0e714e24909001d027a2ee5b",  // WebPortal App Id. Shoud be config
      response_type: "token",
      redirect_uri: "http://localhost:4200/authorized/",  // My URL
      state: "",
      show_dialog: true,
      scope: scopes
    };
    this.authService.configure(ac).authorize();
  }
}
