import { Component, OnInit } from '@angular/core';
import {PileService} from '../service/pile.service';
import {ToastService} from '../service/toast.service';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {SwitchModel} from '../model/pile.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pile-detail',
  templateUrl: './pile-detail.component.html',
  styleUrls: ['./pile-detail.component.css']
})
export class PileDetailComponent implements OnInit {

  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};
  pileNum = '';
  pileId = '';
  select1 = false;
  select2 = false;
  submitDisable = true;
  plugList: SwitchModel[] = [];
  constructor(
    private pileService: PileService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap => this.pileNum = pmap.get('pileNum'));
    this.loading = true;
    this.pileService.getPileInfo(this.pileNum).subscribe(value => {
      this.loading = false;
      console.log(value.status);
      this.pileId = value.id;
      for (const item of value.switches) {
        const model = new SwitchModel();
        if (item.status === '空闲中') {
          model.src = '../../assets/plug_green.png';
        } else if (item.status === '故障') {
          model.src = '../../assets/plug_error.png';
        } else {
          model.src = '../../assets/plug_inuse.png';
        }
        model.title = item.switchNo;
        model.select = false;
        model.status = item.status;
        this.plugList.push(model);
      }
    }, error1 => {
      console.log('');
      this.loading = false;
      this.toastService.showToast('获取数据失败！', 'error');
    });
  }

  selectSwitch(item: any) {
    console.log(item);
    if (item.status !== '空闲中') {
      return;
    }

    for (const model of this.plugList) {
      if (model.title === item.title) {
        model.select = true;
      } else {
        model.select = false;
      }
    }

    if (this.select1 || this.select2) {
      this.submitDisable = false;
    } else {
      this.submitDisable = true;
    }
  }

  selectMoney(money: number) {
    console.log(money);
    if (money === 1) {
      this.select1 = true;
      this.select2 = false;
    } else if (money === 2) {
        this.select1 = false;
        this.select2 = true;
    } else {
      this.select1 = false;
      this.select2 = false;
    }

    if (this.select1 || this.select2) {
      for (const model of this.plugList) {
        if (model.select) {
          this.submitDisable = false;
        }
      }
    }
  }

  startCharge() {

    this.loading = true;
    let switchId = '';
    for (const model of this.plugList) {
      if (model.select) {
        switchId = model.title;
      }
    }
    let time = 0;
    if (this.select1) {// 一块钱，3小时
      time = 3600 * 3;
    } else {
      time = 3600 * 6;
    }
    let money = '';
    if (this.select1) {
      money = '1';
    } else {
      money = '2';
    }
    this.router.navigate(['/payType', {selectMoney: money, selectTime: time, pileId: this.pileId, selectSwitchId: switchId}]);
  }
}
