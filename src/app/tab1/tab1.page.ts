import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { TransactionService } from '../transaction.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
    public transactions = [];
    public currentbalance: Number;
    public greetings: any;
    constructor(private transactionService: TransactionService, private dateService:DateService) { }
    ngOnInit() {
        this.getAllTransactions();
        this.getCurrentBalance();
        this.greetings = this.dateService.getGreetings()
    }

    getAllTransactions() {
        this.transactionService.getTransaction(this);
    }
    handleMeasurements(transactions) {
        this.transactions = transactions;
        console.log( this.transactions)
        for (var transaction in this.transactions) {
            this.transactions[transaction].date = this.dateService.getDateFormat(this.transactions[transaction].date);
            console.log(this.transactions[transaction].date)
        }
        this.transactions = this.transactions.reverse();

    }
   
    getCurrentBalance(){
        this.transactionService.getCurrentBalance().then((result)=>{
            console.log(result);
            this.currentbalance = result;
        })
    }
  
}
