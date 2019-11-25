import {Component, OnDestroy, OnInit} from '@angular/core';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastService} from '../service/toast.service';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  showSendCodeBtn = true;
  count = 60;
  phone = '';
  vCode = '';
  timeInterval;

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  constructor(
    private toastService: ToastService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    console.log('');
  }

  loginButtonClick() {
    if (this.phone.toString().length !== 11) {
      this.toastService.showToast('请输入正确的手机号', 'warning');
      return;
    }
    if (this.vCode.toString().length !== 6) {
      this.toastService.showToast('请输入正确验证码', 'warning');
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
      this.toastService.showToast('登录失败，请检查网络连接', 'error');
    });
  }

  sendCode() {
    console.log('send message code');
    if (!this.showSendCodeBtn) {
      return;
    }
    if (this.phone.toString().length !== 11) {
      this.toastService.showToast('请输入正确的手机号', 'warning');
      return;
    }
    this.loading = true;
    this.loginService.sendVerityCode(this.phone).subscribe(value => {
      this.loading = false;
      const that = this;
      if (value.code === 0) {
        this.toastService.showToast('验证码已发送');
        this.showSendCodeBtn = false;
        this.timeInterval = setInterval(function () {
          that.countdown();
        }, 1000);
      }
    }, () => {
      this.loading = false;
      this.toastService.showToast('验证码发送失败，请检查网络连接', 'error');
      const that = this;
      this.showSendCodeBtn = false;
      this.timeInterval = setInterval(function () {
        that.countdown();
      }, 1000);
    });
  }

  countdown() {
    if (this.count === 0) {
      this.showSendCodeBtn = true;
      this.cleanTimeOut();
    } else {
      this.count--;
    }
    console.log(this.count);
  }

  cleanTimeOut() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    this.count = 60;
  }
}
