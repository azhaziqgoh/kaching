import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ledgerEntries = [
      { id: 1, date: '2017-12-01', description: 'Salary', category: 'Income', debit: 3000, credit: 0},
      { id: 2, date: '2017-12-02', description: 'Lunch', category: 'Food', debit: 0, credit: 15},
      { id: 3, date: '2017-12-03', description: 'Shopping', category: 'Others', debit: 0, credit: 200},
      { id: 4, date: '2017-12-04', description: 'Movie', category: 'Entertainment', debit: 0, credit: 20}
    ];
    return {ledgerEntries};
  }
}