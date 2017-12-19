import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ledgerEntries = [
      { id: 1, date: '2017-12-01', description: 'Salary', category: 'Income', debit: 3000, credit: 0},
      { id: 2, date: '2017-12-02', description: 'Lunch', category: 'Food', debit: 0, credit: 15},
    ];
    return {ledgerEntries};
  }
}