import {Account} from '../../auth/models/account';

export class Transaction {
  constructor(public from: Account,
              public target: Account,
              public amount: number,
              public total: number,
              public date: string) {
  }

  public static fromDto(data: any): Transaction {
    return new Transaction(data.from, data.target, data.amount, data.total,data.date);
  }

  /*public static fromInfoDto(data: any): Transaction {
    return new Transaction(
      (data.owner) ? data.owner.login : void 0,
      (data.owner) ? data.owner.firstname : void 0,
      (data.owner) ? data.owner.lastname : void 0,
      data.accountNr);
  }*/

  toDto(): any {
    return {
      from: this.from,
      target: this.target,
      amount: this.amount,
      total: this.total,
      date: this.date
    };
  }
}
