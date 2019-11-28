import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  scanCode() {
    this.router.navigate(['/pileInfo', {pileNum: 'CP4810ANYO191010001'}]);
  }

  goUser() {
    this.router.navigate(['/user']);
  }
}
