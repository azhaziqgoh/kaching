import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'ledger', loadChildren: './modules/ledger/ledger.module#LedgerModule' },
	{ path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
	{ path: '', redirectTo: '/ledger', pathMatch: 'full'}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  	exports: [ RouterModule ]
})

export class AppRoutingModule {}