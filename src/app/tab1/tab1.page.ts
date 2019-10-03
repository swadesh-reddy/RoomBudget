import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { TransactionService } from '../transaction.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    public transactions = [];
    constructor(private transactionService: TransactionService) { }
    ngOnInit() {
        this.getAllTransactions();
    }
    getAllTransactions() {
        this.transactionService.getTransaction(this);
    }
    handleMeasurements(transactions) {
        this.transactions = transactions;
        for (var transaction in this.transactions) {
            this.transactions[transaction].date =  this.getDateFormat(this.transactions[transaction].date);
        }
    }
    clearStorage() {
        this.transactionService.clearTransactions();
    }
    getDateFormat(timestamp) {
        var time;
        var currentTimeStamp = Math.floor(Date.now());
        var currentyear = new Date(currentTimeStamp).getFullYear();
        var currentMonth = new Date(currentTimeStamp).getMonth();
        var currentDay = new Date(currentTimeStamp).getDay();
        var currentHour = new Date(currentTimeStamp).getHours();
        if (new Date(timestamp).getHours() == currentHour) {
            time = new Date(timestamp).getMinutes() + " min ago";
        } else {
            time = new Date(timestamp).getHours();
        }
        return time;
    }
}
