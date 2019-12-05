import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PileService} from '../../service/pile.service';
import {PileOrderModel} from '../../model/pile.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pile-history',
  templateUrl: './pile-history.component.html',
  styleUrls: ['./pile-history.component.css']
})
export class PileHistoryComponent implements OnInit {
  orderList: PileOrderModel[] = [];
  @Output() loadingEmit = new EventEmitter<boolean>();
  @Output() showErrorToastEmit = new EventEmitter<string>();

  constructor(
    private pileService: PileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadingEmit.emit(true);
    this.pileService.getPileChargeRocord(1).subscribe(value => {
      this.loadingEmit.emit(false);
      this.orderList = value.recordInfos;
    }, error1 => {
      this.loadingEmit.emit(false);
      if (error1.status === 401) { // 重新登录
        this.router.navigate(['/login', {showToast: true}]);
      } else if (error1.status === 403) {
        this.showErrorToastEmit.emit(error1.error.msg);
      } else {
        this.showErrorToastEmit.emit('数据加载失败');
      }
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
