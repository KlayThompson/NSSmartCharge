import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  oneChoose = true;
  twoChoose = false;
  threeChoose = false;
  fourChoose = false;
  fiveChoose = false;
  selectMoney = 99;
  inputMoney: number;
  constructor() {
  }

  ngOnInit() {
  }

  chooseRechargeMoney(money: number) {

    if (money === 99) {
      this.oneChoose = true;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = 99;
    } else if (money === 199) {
      this.oneChoose = false;
      this.twoChoose = true;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = 199;
    } else if (money === 299) {
      this.oneChoose = false;
      this.twoChoose = false;
      this.threeChoose = true;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = 299;
    } else if (money === 599) {
      this.oneChoose = false;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = true;
      this.fiveChoose = false;
      this.selectMoney = 599;
    } else if (money === 350) {
      this.oneChoose = false;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = true;
      this.selectMoney = 350;
    }
  }

  change(value: string) {
    if (!value || value === '') {
      this.oneChoose = true;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = 99;
      return;
    } else {
      this.oneChoose = false;
      this.twoChoose = false;
      this.threeChoose = false;
      this.fourChoose = false;
      this.fiveChoose = false;
      this.selectMoney = Number(value);
    }
  }
}
