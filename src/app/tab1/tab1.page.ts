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
    public currentbalance:Number;
    constructor(private transactionService: TransactionService, private dateFormat:DateService) { }
    ngOnInit() {
        this.getAllTransactions();
        this.getCurrentBalance();
    }
    getAllTransactions() {
        this.transactionService.getTransaction(this);
    }
    handleMeasurements(transactions) {
        this.transactions = transactions;
        console.log( this.transactions)
        for (var transaction in this.transactions) {
            console.log(this.transactions[transaction].date)
            this.transactions[transaction].date =  this.dateFormat.getDateFormat(this.transactions[transaction].date);
            this.transactions = this.transactions.reverse();
        }
    }
    clearStorage() {
        this.transactionService.clearTransactions();
    }
    getCurrentBalance(){
        this.transactionService.getCurrentBalance().then((result)=>{
            console.log(result);
            this.currentbalance = result;
        })
    }
  
}
