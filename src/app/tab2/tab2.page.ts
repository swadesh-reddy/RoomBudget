import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from '../transaction.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  //  @ViewChild('map', { static: false }) mapElement: ElementRef;

    public trasaction: any;
    constructor(private transactionService: TransactionService) {}
    ngOnInit() {
    }
    handleCollapseBody(event) {
        console.log(event.target.classList)
        if (event.target.classList.length < 2) {
            event.target.classList.add('active');
        } else {
            event.target.classList.remove('active')
        }
    }

    onSubmit(data) {
        data.date = Math.floor(Date.now());
        console.log(data)
        this.transactionService.setTransaction(data);
        this.setCurrentBalance(data.amount)
    }
    setCurrentBalance(balance){
        this.transactionService.getCurrentBalance().then((result)=>{
            console.log(result);
            if(result == undefined){result=0;}
            result = result + balance;
            this.transactionService.setCurrentBalance(result);
        })
    }
}
