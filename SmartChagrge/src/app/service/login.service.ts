import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseModel} from '../model/base.model';
import {Md5} from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders;
  constructor(private http: HttpClient,  @Inject('BASE_CONFIG') private config) {
    const timeInterval = Date.parse(new Date().toString()) / 1000;

    const sign = Md5.hashStr(timeInterval + this.config.appkey);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'app-id': this.config.appid,
      'app-sign': sign + `,${timeInterval}`,
    });
  }

  sendVerityCode(phoneNum: string): Observable<BaseModel> {
    const uri = `${this.config.uri}/v1/chargingapi/requestLoginSmsCode`;
    return this.http.post<BaseModel>(uri, {phoneNumber: phoneNum}, {headers: this.headers});
  }

  login(phoneNum: string, vCode: string): Observable<BaseModel> {
    const uri = `${this.config.uri}/v1/chargingapi/usersByMobilePhone`;
    return this.http.post<BaseModel>(uri, {phoneNumber: phoneNum, smsCode: vCode}, {headers: this.headers});
  }
}
