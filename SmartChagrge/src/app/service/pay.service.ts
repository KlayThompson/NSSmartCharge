import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Md5} from 'ts-md5';
import {Observable} from 'rxjs';
import {PayModel, RechargeDetailModel} from '../model/pay.model';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  headers: HttpHeaders;
  constructor(private http: HttpClient,  @Inject('BASE_CONFIG') private config) {
    const timeInterval = Date.parse(new Date().toString()) / 1000;
    const token = localStorage.getItem('TOKEN');
    const sign = Md5.hashStr(timeInterval + this.config.appKey);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'app-id': this.config.appId,
      'app-sign': sign + `,${timeInterval}`,
      'session-token': token
    });
  }
  // 支付渠道：(1)ALI:支付宝(2)WX:微信(3)YRF:云闪付(目前使用这种)
  rechargeMoney(channelStr: string, rechargeAmountNum: number, rechargeTypeStr: string = 'BALANCE'): Observable<PayModel> {
    const uri = `${this.config.uri}/v1/chargingapi/pay/recharge`;
    return this.http.post<PayModel>(
      uri,
      {channel: channelStr, rechargeAmount: rechargeAmountNum, rechargeType: rechargeTypeStr},
      {headers: this.headers}
      );
  }

  getRechargeOrderByRechargeNum(rechargeNumberStr: string): Observable<RechargeDetailModel> {
    const uri = `${this.config.uri}/v1/chargingapi/pay/recharge/${rechargeNumberStr}`;
    return this.http.post<RechargeDetailModel>(uri, {}, {headers: this.headers});
  }
}
