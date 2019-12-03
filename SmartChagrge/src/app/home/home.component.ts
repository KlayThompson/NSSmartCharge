import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';

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
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.adjustUI();
    this.configWxJsApi();
  }

  // 1.切换用户按钮2.去充值按钮背景视图3.orderList的loading区域
  scanCode() {
    // this.router.navigate(['/pileInfo', {pileNum: '00000868343040852209'}]);
    if (wx && wx.miniProgram) {
      wx.ready(function () {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: res => {
            const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            if (result) {
              this.router.navigate(['/pileInfo', {pileNum: result}]);
            }
            // alert(result);
          },
        });
      });
    }
  }

  configWxJsApi() {

    const timeInterval = Date.parse(new Date().toString()) / 1000;

    // 1.先获取本地数据
    const tokenTime = localStorage.getItem('access_token_time');
    const token = localStorage.getItem('access_token');
    if (token && (timeInterval - Number(tokenTime) > 7200)) {
      this.loginService.getAccessToken().subscribe(value => {
        console.log(JSON.stringify(value));
        // 存储token以及获取token的时间
        localStorage.setItem('access_token', value.access_token);
        localStorage.setItem('access_token_time', String(timeInterval));
        this.loginService.getJsApiTicket(value.access_token).subscribe(value1 => {
          
        })
      }, () => {
        console.log('');
      });
    } else {
      this.loginService.getJsApiTicket(token).subscribe(value => {
        const ticket = value.ticket;
      });
    }

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx81406d42b4c87662', // 必填，公众号的唯一标识
      timestamp: timeInterval, // 必填，生成签名的时间戳
      nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
      signature: 'signature', // 必填，签名
      jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
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
