import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log("Erro ao fazer logout")
      console.error(error);
    });
  }

}
