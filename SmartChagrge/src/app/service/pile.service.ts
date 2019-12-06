import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Md5} from 'ts-md5';
import { Observable } from 'rxjs';
import {PileChargingModel, PileInfoModel, PileOrderListModel, PileOrderModel} from '../model/pile.model';

@Injectable({
  providedIn: 'root'
})
export class PileService {

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

  getPileInfo(pileNum: string): Observable<PileInfoModel> {

    const uri = `${this.config.uri}/v1/chargingapi/pile?pileNo=${pileNum}`;

    return this.http.get<PileInfoModel>(uri, {headers: this.headers});
  }

  startCharging(pileId: string, switchNo: string, duration: number): Observable<PileChargingModel> {
    const uri = `${this.config.uri}/v1/chargingapi/pile/record`;
    return this.http.post<PileChargingModel>(uri, {pileId, switchNo, duration}, {headers: this.headers});
  }

  getChargingInfo(recordId: string): Observable<PileOrderModel> {
    const uri = `${this.config.uri}/v1/chargingapi/pile/record/${recordId}`;
    return this.http.get<PileOrderModel>(uri, {headers: this.headers});
  }

  getPileChargeRocord(currentPage: number): Observable<PileOrderListModel> {
    const uri = `${this.config.uri}/v1/chargingapi/pile/record/recent?currentPage=${currentPage}`;
    return this.http.get<PileOrderListModel>(uri, {headers: this.headers});
  }
}
