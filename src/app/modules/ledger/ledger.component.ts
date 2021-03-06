import { Component, OnInit, Input } from '@angular/core';
import { Ledger } from './ledger';
import { LedgerService } from './ledger.service';
import { parse } from 'querystring';

@Component({
    selector: 'ledger',
    templateUrl: 'ledger.component.html',
    styleUrls: ['ledger.component.scss']
})

export class LedgerComponent implements OnInit {
    ledgerEntries: Ledger[];
    today: string;

    constructor(private ledgerService: LedgerService) { 
        this.ledgerEntries = [];
    }

    ngOnInit(){
        this.calculateDateTime();
        this.getLedgerEntries();
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

    getLedgerEntries():void {
        this.ledgerService.getLedgerEntries().subscribe(le => this.ledgerEntries = le);
    }

    addLedgerEntries(le:any):void {
        
        if(le.credit == ''){
            le.credit = 0;
        } else {
            le.credit = parseInt(le.credit);
        }

        if(le.debit == ''){
            le.debit = 0;
        } else {
            le.debit = parseInt(le.debit);
        }
        
        this.ledgerService.addLedgerEntry(le).subscribe(res => this.getLedgerEntries());
    }

    updateLedgerEntries(le:any):void {

        if(le.credit == ''){
            le.credit = 0;
        } else {
            le.credit = parseInt(le.credit);
        }

        if(le.debit == ''){
            le.debit = 0;
        } else {
            le.debit = parseInt(le.debit);
        }
        
        this.ledgerService.updateLedgerEntry(le).subscribe(res => this.getLedgerEntries());
    }

    deleteLedgerEntries(le:Ledger):void{
        this.ledgerService.deleteLedgerEntry(le.id).subscribe(res => this.getLedgerEntries());
    }
}