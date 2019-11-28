import {Component, OnDestroy, OnInit} from '@angular/core';
import {PileOrderModel} from '../model/pile.model';
import {PileService} from '../service/pile.service';
import {ToastService} from '../service/toast.service';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pile-charging',
  templateUrl: './pile-charging.component.html',
  styleUrls: ['./pile-charging.component.css']
})
export class PileChargingComponent implements OnInit, OnDestroy {

  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  order: PileOrderModel = {
    electricQuantity: '',
    completeReason: '',
    duration: 0,
    endTime: '',
    msg: '',
    pileId: '',
    pileNumber: '',
    recordId: '',
    startTime: '',
    status: '',
    switchNo: '',
  };
  showDetail = true;
  hidden = true;
  recordId = '';
  duration = '';
  timeInterval;
  constructor(
    private pileService: PileService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap => this.recordId = pmap.get('recordId'));
    if (this.recordId ===  '' || !this.recordId) {
      console.log('error: no record id');
      this.router.navigate(['/home']);
      return;
    }
    this.loading = true;
    this.pileService.getChargingInfo(this.recordId).subscribe(value => {
      this.loading = false;
      this.order = value;
      if (value.status === '结束') {
        clearInterval(this.timeInterval);
        this.toastService.showToast('充电结束');
        this.location.replaceState('/home');
        this.router.navigate(['/home']);
      } else {
        this.calculateDuration();
      }
    }, () => {
      this.loading = false;
      this.toastService.showToast('获取数据失败', 'error');
    });

    const that = this;
    this.timeInterval = setInterval(function () {
      that.getChargingInfo();
    }, 20000);
  }

  getChargingInfo() {
    this.pileService.getChargingInfo(this.recordId).subscribe(value => {
      this.order = value;
      if (value.status === '结束') {
        clearInterval(this.timeInterval);
        this.toastService.showToast('充电结束');
        this.location.replaceState('/home');
        this.router.navigate(['/home']);
      } else {
        this.calculateDuration();
      }
    }, () => {
    });
  }

  calculateDuration() {
    if (this.order.duration !== 0 && this.order.duration >= 3600) {
      const timeAll = this.order.duration;
      const hours = (timeAll / 3600).toFixed(0);
      const leaveSec = (timeAll % 3600).toFixed(0);
      const minute = (Number(leaveSec) / 60).toFixed(0);
      this.duration = hours + '时' + minute + '分';
    } else if (this.order.duration !== 0 && this.order.duration < 3600) {
      const timeAll = this.order.duration;
      const minute = (timeAll / 60).toFixed(0);
      this.duration = minute + '分';
    } else {
      this.duration = '0分';
    }
  }

  showDetailClick() {
    this.showDetail = !this.showDetail;
  }
}
