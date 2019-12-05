import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PileService} from '../service/pile.service';
import {ToastService} from '../service/toast.service';
import {Location} from '@angular/common';
import {ngxLoadingAnimationTypes} from 'ngx-loading';

@Component({
  selector: 'app-pay-type',
  templateUrl: './pay-type.component.html',
  styleUrls: ['./pay-type.component.css']
})
export class PayTypeComponent implements OnInit {

  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  rechargeMoney = '1';
  time = '';
  pileId = '';
  switchId = '';
  checkedIcon = '../../assets/checked-icon.png';
  uncheckIcon = '../../assets/icon_unselected.png';
  payTypeArr = [
    {
      label: '钱包',
      src: '../../assets/wallet_type.png',
      isSelected: true,
      hiddenTip: true
    },
    {
      label: '银联',
      src: '../../assets/yinlian.png',
      isSelected: false,
      hiddenTip: false
    },
    {
      label: '微信',
      src: '../../assets/wx-icon.png',
      isSelected: false,
      hiddenTip: true
    },
    // {
    //   label: '支付宝',
    //   src: '../../assets/pay_alipay.png',
    //   isSelected: false,
    //   hiddenTip: true
    // }
    ];

  constructor(
    private pileService: PileService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.paramMap.subscribe(pmap => {
      this.rechargeMoney = pmap.get('selectMoney');
      this.switchId = pmap.get('selectSwitchId');
      this.pileId = pmap.get('pileId');
      this.time = pmap.get('selectTime');
    });

  }

  ngOnInit() {
  }

  selectType(item: any) {
    for (const model of this.payTypeArr) {
      model.isSelected = model.label === item.label;
    }
  }

  goRecharge() {
    console.log('去充值');
  }

  goCharging() {
    this.loading = true;
    this.pileService.startCharging(this.pileId, this.switchId, Number(this.time)).subscribe(value => {
      this.loading = false;
      console.log('开启充电成功' + value.recordId);
      this.toastService.showToast('开启充电成功！');
      this.location.replaceState('/pileCharging');
      this.router.navigate(['/pileCharging', {recordId: value.recordId}]);
    }, error1 => {
      this.loading = false;
      if (error1.status === 401) { // 重新登录
        this.router.navigate(['/login', {showToast: true}]);
      } else if (error1.status === 403) {
        this.toastService.showToast(error1.error.msg, 'error');
      } else {
        this.loading = false;
        this.toastService.showToast('开启充电失败！', 'error');
      }
    });
  }
}
