import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionInterface {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: CreateTransactionInterface): Transaction {
    if (!title || !value || !type) {
      throw Error('The attributes title, value and type are required.');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw Error('Insufficent funds.');
    }

    return this.transactionsRepository.create(
      new Transaction({ title, value, type }),
    );
  }
}

export default CreateTransactionService;
