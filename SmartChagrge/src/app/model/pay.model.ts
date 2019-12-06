export class PayModel {
  msg: string;
  payUrl: string;
  rechargeNumber: string;
}

export class RechargeDetailModel {
  channel: string;
  msg: string;
  payStatus: number;
  payStatusDesc: string;
  payTime: string;
  rechargeNumber: string;
  rechargeType: string;
  totalAmount: number;
}
