import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {ToastService} from '../service/toast.service';
import {
  AmapGeocoderService,
  AmapGeocoderWrapper,
} from 'ngx-amap';


declare var wx: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('mainScreen') elementView: ElementRef;
  scanLeft: string;
  centerLeft: string;
  centerTop: string;
  lng = 0;
  lat = 0;
  private geoPromise: Promise<AmapGeocoderWrapper>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastService,
    private AmapGeocoder: AmapGeocoderService,
    @Inject('BASE_CONFIG') private config
    ) {
    this.geoPromise = AmapGeocoder.of();
  }

  ngOnInit() {
    this.geoPromise
      .then(geocoder => geocoder.getLocation('上海市虹口区花园坊'))
      .then(data => {
        this.lng = data.result.geocodes[0].location.lng;
        this.lat = data.result.geocodes[0].location.lat;
      });
    this.adjustUI();
    this.configWxJsApi();
  }

  scanCode() {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: res => {
        const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        this.toastService.showToast(`结果为${result}`);
        if (result) {
          this.router.navigate(['/pileInfo', {pileNum: result}]);
        }
      },
      fail: fail1 => {
        this.toastService.showToast('失败' + JSON.stringify(fail1), 'error');
      }
    });
  }

  moveToCenter() {
    this.router.navigate(['/pileInfo', {pileNum: '00000868343040852209'}]);
  }

  configWxJsApi() {
    const url = location.href.split('#')[0];
    this.loginService.getSign(url).subscribe(value => {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.config.appId, // 必填，公众号的唯一标识
        timestamp: value.timestamp, // 必填，生成签名的时间戳
        nonceStr: value.noncestr, // 必填，生成签名的随机串
        signature: value.signature, // 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
      });
      const that = this;
      wx.ready( () => {
        that.toastService.showToast('配置成功');
      });
      wx.error( err => {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        this.toastService.showToast(JSON.stringify(err), 'error');
      });
    });
  }

  adjustUI() {
    const viewHeight = this.elementView.nativeElement.offsetHeight;
    const viewWidth = this.elementView.nativeElement.offsetWidth;

    // 扫码按钮位置设置
    const scanLeftNum = (viewWidth - 168) * 0.5;
    this.scanLeft = scanLeftNum + 'px';

    // 设置中心点图标位置
    const centerLeftNum = (viewWidth / 2) - 10;
    this.centerLeft = centerLeftNum + 'px';
    const centerRightNum = (viewHeight / 2) - 35;
    this.centerTop = centerRightNum + 'px';
  }
}
