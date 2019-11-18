import { Injectable } from '@angular/core';
import {ToastaConfig, ToastaService, ToastData, ToastOptions} from '../../../projects/ngx-toasta/src/lib/toasta.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig
  ) {
    this.toastaConfig.theme = 'material';
    this.toastaConfig.position = 'center-center';
    this.toastaConfig.limit = 1;
  }

  showToast(value: string) {
    const toastOptions: ToastOptions = {
      title: value,
      msg: '',
      showClose: false,
      timeout: 3000,
      theme: 'material',
      showDuration: false
    };
    // Add see all possible types in one shot
    this.toastaService.default(toastOptions);
  }
}
