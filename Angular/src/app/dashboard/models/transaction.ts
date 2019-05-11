import {Account} from '../../auth/models/account';

export class Transaction {
  constructor(public from: Account,
              public target: Account,
              public amount: number,
              public total: number,
              public date: string) {
  }

  public static fromDto(data: any): Transaction {
    const arr = data.date.match(/^(\d{4})-(\d{1,2})-(\d{1,2}).*/);
    const date = `${arr[3]}.${arr[2]}.${arr[1]}`;
    console.log(arr);
    return new Transaction(
      data.from,
      data.target,
      data.amount,
      data.total,
      date,
    );
  }

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
