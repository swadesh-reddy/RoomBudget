import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { TransactionService } from '../transaction.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    constructor(private transactionService: TransactionService) { }
    ngOnInit() {
        this.getAllTransactions();
    }
    getAllTransactions() {
        this.transactionService.getTransaction();
    }
    clearStorage() {
        this.transactionService.clearTransactions();
    }
}
