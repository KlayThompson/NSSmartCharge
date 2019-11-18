import { Component, OnInit } from '@angular/core';
import {ngxLoadingAnimationTypes} from 'ngx-loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = true;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  showSendCodeBtn = true;
  count = 60;
  phone = '';
  vCode = '';
  constructor() { }

  ngOnInit() {
  }

  loginButtonClick() {
    if (this.phone.length !== 11) {
      console.log('请输入正确的手机号');
    }
    if (this.vCode.length !== 6) {
      console.log('请输入短信验证码');
      return;
    }
  }
}
