import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pile-detail',
  templateUrl: './pile-detail.component.html',
  styleUrls: ['./pile-detail.component.css']
})
export class PileDetailComponent implements OnInit {

  pileNum = '00000868343040852209';
  select1 = false;
  select2 = false;
  submitDisable = false;
  plugList = [
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 1,
      status: '空闲中'
    },
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 2,
      status: '空闲中'
    },
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 3,
      status: '空闲中'
    },
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 4,
      status: '空闲中'
    },
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 5,
      status: '空闲中'
    },
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 6,
      status: '空闲中'
    },
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 7,
      status: '空闲中'
    },
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 8,
      status: '空闲中'
    },
    {
      select: false,
      src: '../../assets/plug_green.png',
      title: 9,
      status: '空闲中'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

  selectSwitch(item: any) {
    console.log(item);
  }

}
