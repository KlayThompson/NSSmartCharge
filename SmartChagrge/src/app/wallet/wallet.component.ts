import { Component, OnInit } from '@angular/core';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastService} from '../service/toast.service';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  totalMoney = 0;
  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  constructor(
    private toastService: ToastService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUserInfo().subscribe(value => {
      this.loading = false;
      this.totalMoney = value.balance / 100;
    }, error1 => {
      this.loading = false;
      if (error1.status === 401) { // 重新登录
        this.router.navigate(['/login', {showToast: true}]);
      } else if (error1.status === 403) {
        this.toastService.showToast(error1.error.msg, 'error');
      } else {
        this.toastService.showToast('加载失败，请检查网络连接！', 'error');
      }
    });
  }

}
