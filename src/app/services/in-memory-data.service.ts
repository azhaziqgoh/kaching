import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ledgerEntries = [
      { id: 1, date: '01/12/2017', description: 'Salary', category: 'Income', debit: 3000, credit: 0},
      { id: 2, date: '02/12/2017', description: 'Lunch', category: 'Food', debit: 0, credit: 15},
    ];
    return {ledgerEntries};
  }
}