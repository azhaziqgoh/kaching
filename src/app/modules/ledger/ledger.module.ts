import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerService } from './ledger.service';
import { LedgerComponent } from './ledger.component';
import { LedgerTableComponent } from '../../components/ledger-table/ledger-table.component';

@NgModule({
  imports:    [ CommonModule, ReactiveFormsModule, LedgerRoutingModule ],
  declarations: [ LedgerComponent, LedgerTableComponent ],
  providers: [ LedgerService ]
})
export class LedgerModule { }