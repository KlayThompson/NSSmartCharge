import { Component, OnInit } from '@angular/core';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastService} from '../service/toast.service';
import {LoginService} from '../service/login.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  showSendCodeBtn = true;
  count = 60;
  phone = '';
  vCode = '';
  constructor(
    private toastService: ToastService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    console.log('');
  }

  loginButtonClick() {
    if (this.phone.toString().length !== 11) {
      this.toastService.showToast('请输入正确的手机号');
      return;
    }
    if (this.vCode.toString().length !== 6) {
      return;
    }
    this.loading = true;
    this.loginService.login(this.phone, this.vCode).subscribe(value => {
      this.loading = false;
      if (value.code === 0) {
        console.log('');
      }
    }, () => {
      this.loading = false;
      this.toastService.showToast('登录失败，请检查网络连接');
    });
  }

  sendCode() {
    console.log('send message code');
    if (!this.showSendCodeBtn) {
      return;
    }
    if (this.phone.toString().length !== 11) {
      this.toastService.showToast('请输入正确的手机号');
      return;
    }
    this.loading = true;
    this.loginService.sendVerityCode(this.phone).subscribe(value => {
      this.loading = false;
      if (value.code === 0) {
        this.toastService.showToast('验证码已发送');
      }
    }, () => {
      this.loading = false;
      this.toastService.showToast('验证码发送失败，请检查网络连接');
    });
  }
}
