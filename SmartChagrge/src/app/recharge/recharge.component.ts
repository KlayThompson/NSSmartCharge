import {Component, OnInit} from '@angular/core';
import {PayService} from '../service/pay.service';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastService} from '../service/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  oneChoose = true;
  twoChoose = false;
  threeChoose = false;
  fourChoose = false;
  fiveChoose = false;
  selectMoney = 99;
  inputMoney: number;
  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  constructor(
    private payService: PayService,
    private toastService: ToastService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  recharge() {
    const money = this.selectMoney * 100;
    this.loading = true;
    // 支付渠道：(1)ALI:支付宝(2)WX:微信(3)YRF:云闪付(目前使用这种)
    this.payService.rechargeMoney('YRF', money).subscribe(value => {
      this.loading = false;
      // 请求成功直接调用查询充值记录接口 for test
      this.queryRechargeDetail(value.rechargeNumber);
    }, error1 => {
      this.loading = false;
      if (error1.status === 401) { // 重新登录
        this.router.navigate(['/login', {showToast: true}]);
      } else if (error1.status === 403) {
        this.toastService.showToast(error1.error.msg, 'error');
      } else {
        this.toastService.showToast('充值失败，请检查网络', 'error');
      }
    });
  }

  queryRechargeDetail(num: string) {
    this.payService.getRechargeOrderByRechargeNum(num).subscribe(value => {
      history.go(-1);
      const that = this;
      setTimeout( () => {
        that.toastService.showToast('充值成功');
      }, 100);
    }, error1 => {
      if (error1.status === 401) { // 重新登录
        this.router.navigate(['/login', {showToast: true}]);
      } else if (error1.status === 403) {
        this.toastService.showToast(error1.error.msg, 'error');
      } else {
        this.toastService.showToast('查询失败，请检查网络', 'error');
      }
    });
  }

  chooseRechargeMoney(money: number) {

    if (money === 99) {
      this.oneChoose = true;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = 99;
    } else if (money === 199) {
      this.oneChoose = false;
      this.twoChoose = true;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = 199;
    } else if (money === 299) {
      this.oneChoose = false;
      this.twoChoose = false;
      this.threeChoose = true;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = 299;
    } else if (money === 599) {
      this.oneChoose = false;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = true;
      this.fiveChoose = false;
      this.selectMoney = 599;
    } else if (money === 350) {
      this.oneChoose = false;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = true;
      this.selectMoney = 350;
    }
  }

  change(value: string) {
    if (!value || value === '') {
      this.oneChoose = true;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = 99;
      return;
    } else {
      this.oneChoose = false;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = Number(value);
    }
  }
}
