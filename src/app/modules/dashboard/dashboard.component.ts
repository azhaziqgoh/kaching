import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Ledger } from '../ledger/ledger';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    
    today: string;
    debitCreditChartData: any;
    debitCreditChartConfig: any;
    currentBalance: number;

    constructor(private ds: DashboardService){
        ds.getLedgerEntries().subscribe(res => this.initDebitCreditChart(res));
        this.debitCreditChartData = [];
    }

    ngOnInit(){
        this.calculateDateTime();
    }

    calculateDateTime(){
        let now = new Date(),
            day = this.appendZero(now.getDate()),
            month = this.appendZero(now.getMonth() + 1),
            year = now.getFullYear(),
            hours = this.appendZero(now.getHours()),
            minutes = this.appendZero(now.getMinutes()),
            seconds = this.appendZero(now.getSeconds());

        this.today = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }

    appendZero(number){
        
        let numToStr = number.toString();

        if(numToStr.length == 1){
            numToStr = `0${numToStr}`;
        }

        return numToStr;
    }

    initDebitCreditChart(data:Ledger[]){
        this.debitCreditChartConfig = {
            title: 'Debit vs Credit Chart'
        }

        this.massageData(data);
    }

    massageData(data:Ledger[]){
        
        let debitData = {
            x: 'debit',
            y: 0
        };

        let creditData = {
            x: 'credit',
            y: 0
        }

        for(let i = 0; i < data.length; i++){

            for(let key in data[i]){
                if(key == 'debit'){
                    debitData.y +=  data[i][key] 
                }

                if(key == 'credit'){
                    creditData.y +=  data[i][key] 
                }
            }
        }

        let debitCreditChartDataTemp = [];
        debitCreditChartDataTemp.push(debitData);
        debitCreditChartDataTemp.push(creditData);
        this.debitCreditChartData = debitCreditChartDataTemp;
        this.currentBalance = debitData.y - creditData.y;
    }
}