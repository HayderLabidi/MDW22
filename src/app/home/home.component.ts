import { Component , OnInit } from '@angular/core';
import { team } from 'team';
import { TeamService } from '../services/team.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  showSpinner = false;
  listeteam! : team[]
  constructor (private serviceteam :TeamService,private router: Router) {}

  ngOnInit (): void {
    this.serviceteam.getportfolio().subscribe((data:team[])=>this.listeteam = data);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  logout() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.router.navigate(['/login']);
    }, 3000);
  }
}