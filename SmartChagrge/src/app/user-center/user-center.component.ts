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
    const wConfirm = window.confirm;
    window.confirm =  (message) => {
      try {
        const iframe = document.createElement('IFRAME');
        iframe.style.display = 'none';
        iframe.setAttribute('src', 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        const alertFrame = window.frames[0];
        let iwindow = alertFrame.window;
        if (iwindow === undefined) {
          iwindow = alertFrame.contentWindow;
        }
        const result = iwindow.confirm(message);
        iframe.parentNode.removeChild(iframe);
        return result;
      } catch (exc) {
        return wConfirm(message);
      }
    };
    if (confirm('确认退出登录吗')) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
