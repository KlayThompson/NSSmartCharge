export class PileInfoModel {
  id: string;
  model: string;
  msg: string;
  name: string;
  pileNo: string;
  power: string;
  siwtchNum: string;
  status: string;
  switches: SwitchItem[] = [];
}

export class SwitchItem {
  status: string;
  switchNo: string;
}

export class SwitchModel {
  select: boolean;
  src: string;
  title: string;
  status: string;
}

export class PileChargingModel {
  completeReason: string;
  duration: 0;
  electricQuantity: 0;
  endTime: string;
  msg: string;
  pileId: 0;
  pileNumber: string;
  recordId: string;
  startTime: string;
  status: string;
  switchNo: 0;
}

export class PileOrderModel {
  electricQuantity: string;
  completeReason: string;
  duration: number;
  endTime: string;
  msg: string;
  pileId: string;
  pileNumber: string;
  recordId: string;
  startTime: string;
  status: string;
  switchNo: string;
}
