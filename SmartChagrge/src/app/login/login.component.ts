import {Component, OnDestroy, OnInit} from '@angular/core';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastService} from '../service/toast.service';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';

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
    private loginService: LoginService,
    private router: Router
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
      console.log(value.phoneNumber);
      localStorage.setItem('TOKEN', value.sessionToken);
      this.toastService.showToast('登录成功！');
      this.router.navigate(['/home']);
    }, (err) => {
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
    this.loginService.sendVerityCode(this.phone).subscribe(() => {
      const that = this;
      this.loading = false;
      this.showSendCodeBtn = false;
      this.toastService.showToast('验证码已发送');
      this.timeInterval = setInterval(function () {
        that.countdown();
      }, 1000);
    }, () => {
      this.loading = false;
      this.toastService.showToast('验证码发送失败，请检查网络连接', 'error');
    });
  }

  countdown() {
    if (this.count === 0) {
      this.showSendCodeBtn = true;
      this.cleanTimeOut();
    } else {
      this.count--;
    }
  }

  cleanTimeOut() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    this.count = 60;
  }
}
