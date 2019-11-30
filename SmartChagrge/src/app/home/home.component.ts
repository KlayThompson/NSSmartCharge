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
  // 1.切换用户按钮2.去充值按钮背景视图3.orderList的loading区域
  scanCode() {
    this.router.navigate(['/pileInfo', {pileNum: '00000868343040852209'}]);
  }

  goUser() {
    this.router.navigate(['/user']);
  }
}
