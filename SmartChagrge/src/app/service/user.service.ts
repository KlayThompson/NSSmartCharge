import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Md5} from 'ts-md5';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  getUserInfo(): Observable<UserModel> {
    const uri = `${this.config.uri}/v1/chargingapi/currentUser`;
    return this.http.get<UserModel>(uri, {headers: this.headers});
  }
}
