import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Md5} from 'ts-md5';
import {LoginModel, SmsCodeModel} from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders;
  constructor(private http: HttpClient,  @Inject('BASE_CONFIG') private config) {
    const timeInterval = Date.parse(new Date().toString()) / 1000;

    const sign = Md5.hashStr(timeInterval + this.config.appKey);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'app-id': this.config.appId,
      'app-sign': sign + `,${timeInterval}`,
    });
  }

  sendVerityCode(phoneNum: string): Observable<SmsCodeModel> {
    const uri = `${this.config.uri}/v1/chargingapi/requestLoginSmsCode`;
    return this.http.post<SmsCodeModel>(uri, {phoneNumber: phoneNum}, {headers: this.headers});
  }

  login(phoneNum: string, vCode: string): Observable<LoginModel> {
    const uri = `${this.config.uri}/v1/chargingapi/usersByMobilePhone`;
    return this.http.post<LoginModel>(uri, {phoneNumber: phoneNum, smsCode: vCode}, {headers: this.headers});
  }

  getAccessToken(): Observable <any> {
    const uri = `/cgi-bin/token?grant_type=client_credential&appid=${this.config.wxAppId}&secret=${this.config.wxAppSecret}`;
    return this.http.get(uri, {headers: this.headers});
  }

  getJsApiTicket(token: string): Observable<any> {
    const  uri = `/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
    return this.http.get(uri);
  }
}
