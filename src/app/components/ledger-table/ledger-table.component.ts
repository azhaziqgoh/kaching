import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    currentActiveIndex: number

    constructor(private fb: FormBuilder){
        this.createLedgerEntryForm();
        this.currentActiveIndex = -1;
    }

    ngOnInit(){}

    createLedgerEntryForm(){

        this.newLedgerEntryForm = this.fb.group({
            date: ['', Validators.required ],
            description: ['', Validators.required ],
            category: ['', Validators.required ],
            debit: ['', Validators.pattern(/^[0-9]*$/) ],
            credit: ['', Validators.pattern(/^[0-9]*$/) ]
        });
        
        this.editLedgerEntryForm = this.fb.group({
            id: '',
            date: '',
            description: '',
            category: '',
            debit: '',
            credit: ''
        });
    }

    addLedgerEntry(){
        this.currentActiveIndex = -1;
           
        this.addData.emit(this.newLedgerEntryForm.value);
        this.resetLedgerEntry('new');
    }

    updateLedgerEntry(){
        this.currentActiveIndex = -1;
        this.updateData.emit(this.editLedgerEntryForm.value);
        this.resetLedgerEntry('edit');
    }

    editLedgerEntry(le:Ledger,idx:number){
        this.currentActiveIndex = idx;

        this.editLedgerEntryForm.setValue({
            id: le.id,
            date: le.date,
            description: le.description,
            category: le.category,
            debit: le.debit,
            credit: le.credit
        });
    }

    deleteLedgerEntry(le:Ledger){
        this.deleteData.emit(le);
    }

    cancelLedgerEntry(){
        this.currentActiveIndex = -1;
    }

    resetLedgerEntry(type:string){
        switch (type){
            case 'new':
                this.newLedgerEntryForm.reset({
                    date: '',
                    description: '',
                    category: '',
                    debit: '',
                    credit: ''
                });
            case 'edit':
                this.editLedgerEntryForm.reset({
                    date: '',
                    description: '',
                    category: '',
                    debit: '',
                    credit: ''
                });
        }
    }
}