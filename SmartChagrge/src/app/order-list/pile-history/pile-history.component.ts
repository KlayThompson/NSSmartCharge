import { Component, OnInit } from '@angular/core';
import {PileService} from '../../service/pile.service';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastService} from '../../service/toast.service';
import {PileOrderModel} from '../../model/pile.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pile-history',
  templateUrl: './pile-history.component.html',
  styleUrls: ['./pile-history.component.css']
})
export class PileHistoryComponent implements OnInit {
  orderList: PileOrderModel[] = [];
  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  constructor(
    private pileService: PileService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.pileService.getPileChargeRocord(1).subscribe(value => {
      this.loading = false;
      this.orderList = value.recordInfos;
    }, () => {
      this.loading = false;
      this.toastService.showToast('数据加载失败', 'error');
    });
  }

  itemClick(order: PileOrderModel) {
    if (order.status === '充电') {
      this.router.navigate(['/pileCharging', {recordId: order.recordId}]);
    } else {
      this.router.navigate(['/pileOrderDetail', {orderDetail: JSON.stringify(order)}]);
    }
  }

}
