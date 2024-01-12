import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpHeaders } from '@angular/common/http';
import { BASE_ENDPOINT } from './config/app';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title = 'DShop';

  constructor(private userService: UserService){}

  public ngOnDestroy(): void {

    sessionStorage.removeItem('userLogueado');
    sessionStorage.removeItem('userNombre');
    sessionStorage.removeItem('roles');

  }

}
