import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PileOrderModel} from '../../model/pile.model';

@Component({
  selector: 'app-pile-history-detail',
  templateUrl: './pile-history-detail.component.html',
  styleUrls: ['./pile-history-detail.component.css']
})
export class PileHistoryDetailComponent implements OnInit {

  detail: PileOrderModel;
  addMeter = '10';
  duration = 10;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap => this.detail = JSON.parse(pmap.get('orderDetail')));
  }

}
