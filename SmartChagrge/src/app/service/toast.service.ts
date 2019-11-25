import { Injectable } from '@angular/core';
import {ToastaConfig, ToastaService, ToastOptions} from 'ngx-toasta';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig
  ) {
    this.toastaConfig.theme = 'material';
    this.toastaConfig.position = 'top-center';
    this.toastaConfig.limit = 1;
  }

  showToast(value: string, type: string= 'success') {
    const toastOptions: ToastOptions = {
      title: value,
      msg: '',
      showClose: true,
      timeout: 3000,
      theme: 'material',
      showDuration: false
    };
    // Add see all possible types in one shot
    switch (type) {
      case 'default': this.toastaService.default(toastOptions); break;
      case 'info': this.toastaService.info(toastOptions); break;
      case 'success': this.toastaService.success(toastOptions); break;
      case 'wait': this.toastaService.wait(toastOptions); break;
      case 'error': this.toastaService.error(toastOptions); break;
      case 'warning': this.toastaService.warning(toastOptions); break;
    }
    // this.toastaService.success(toastOptions);
  }
}
