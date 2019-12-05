import { Component, OnInit } from '@angular/core';
import {ngxLoadingAnimationTypes} from 'ngx-loading';
import {ToastService} from '../service/toast.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  loading = false;
  config = {animationType: ngxLoadingAnimationTypes.rectangleBounce};

  constructor(private toastService: ToastService,) { }

  ngOnInit() {
  }

  changeLoadingState(state: boolean) {
    this.loading = state;
  }

  showError(msg: string) {
    this.toastService.showToast(msg, 'error');
  }
}
