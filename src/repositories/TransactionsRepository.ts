import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, transaction) => {
      return transaction.type === 'income'
        ? accumulator + transaction.value
        : accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator, transaction) => {
      return transaction.type === 'outcome'
        ? accumulator + transaction.value
        : accumulator;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
