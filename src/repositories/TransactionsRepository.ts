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
    const income = this.transactions.reduce((total, trans) => {
      if (trans.type === 'income') {
        total += trans.value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, trans) => {
      if (trans.type === 'outcome') {
        total += trans.value;
      }
      return total;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions = [...this.transactions, newTransaction];

    return newTransaction;
  }
}

export default TransactionsRepository;
