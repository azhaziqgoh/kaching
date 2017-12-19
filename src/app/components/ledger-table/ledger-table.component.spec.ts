import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LedgerTableComponent } from './ledger-table.component';

describe('LedgerTableComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            FormsModule,
            ReactiveFormsModule
        ],
        declarations: [
            LedgerTableComponent
        ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(LedgerTableComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('current active number shoud be -1 initally', async(() => {
    const fixture = TestBed.createComponent(LedgerTableComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.currentActiveIndex).toMatch(/-1/i);
  }));
});
