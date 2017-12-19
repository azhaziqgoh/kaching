import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Ledger } from '../../modules/ledger/ledger';
import { makeDecorator } from '@angular/core/src/util/decorators';

@Component({
    selector: 'ledger-table',
    templateUrl: 'ledger-table.component.html',
    styleUrls: ['ledger-table.component.scss']
})

export class LedgerTableComponent implements OnInit {

    @Input('ledgerData') ledgerEntries: Ledger[];
    
    @Output() addData = new EventEmitter<Ledger>();
    @Output() updateData = new EventEmitter<Ledger>();
    @Output() deleteData = new EventEmitter<Ledger>();

    newLedgerEntryForm: FormGroup

    editLedgerEntryForm: FormGroup

    constructor(private fb: FormBuilder){
        this.createLedgerEntryForm('new');
    }

    ngOnInit(){}

    createLedgerEntryForm(type:string){

        switch (type){
            case 'new':
                this.newLedgerEntryForm = this.fb.group({
                    date: '',
                    description: '',
                    category: '',
                    debit: '',
                    credit: '',
                    balance: '',
                });
            case 'edit':
                this.editLedgerEntryForm = this.fb.group({
                    date: '',
                    description: '',
                    category: '',
                    debit: '',
                    credit: '',
                    balance: ''
                });
        }
    }

    addLedgerEntry(){
        this.addData.emit(this.newLedgerEntryForm.value);
        this.resetLedgerEntry('new')
    }

    updateLedgerEntry(){}

    editLedgerEntry(le:Ledger){

    }

    deleteLedgerEntry(le:Ledger){
        this.deleteData.emit(le);
    }

    resetLedgerEntry(type:string){
        switch (type){
            case 'new':
                this.newLedgerEntryForm.reset({
                    date: '',
                    description: '',
                    category: '',
                    debit: '',
                    credit: '',
                    balance: '',
                });
            case 'edit':
                this.editLedgerEntryForm.reset({
                    date: '',
                    description: '',
                    category: '',
                    debit: '',
                    credit: '',
                    balance: '',
                });
        }
    }
}