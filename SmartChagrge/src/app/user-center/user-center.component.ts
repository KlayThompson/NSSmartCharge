import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {

  userName = '18217602034';
  carUrl = '../car/car';
  batteryUrl = '../battery/battery';
  packageUrl = '../package/package';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  changeUser() {
    console.log('change user');
    // localStorage.clear();
    // this.router.navigate(['/login']);
    if (window.confirm('确认退出登录吗')) {
      console.log('退出登录');
    } else {
      console.log('取消');
    }
  }
}
