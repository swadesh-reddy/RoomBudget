import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  //  @ViewChild('map', { static: false }) mapElement: ElementRef;

    public trasaction: any;
    constructor(private transactionService: TransactionService, public toastController: ToastController) {}
    ngOnInit() {
    }
    handleCollapseBody(event) {
        if (event.target.classList.length < 2) {
            event.target.classList.add('active');
        } else {
            event.target.classList.remove('active')
        }
    }

    onAddForm(data) {
        data.date = Math.floor(Date.now());
        data.transactiontype = 'add';
        console.log(data)
        this.transactionService.setTransaction(data);
        this.addCurrentBalance(data.amount)
        this.transactionService.addTransactionOnline(data).subscribe((data) => {
            console.log(data)
        })
    }

    onSubtracForm(data) {
        data.date = Math.floor(Date.now());
        data.transactiontype = 'subtract';
        console.log(data)
        this.transactionService.setTransaction(data);
        this.subtractCurrentBalance(data.amount);
    }

    subtractCurrentBalance(balance){
        this.transactionService.getCurrentBalance().then((result)=>{
            if (result != undefined) {
                result = result - balance;
                console.log(result);
                this.transactionService.setCurrentBalance(result);
            }
            this.presentToast("transaction added succefully");
        })
    }
    addCurrentBalance(balance) {
        this.transactionService.getCurrentBalance().then((result) => {
            if (result == undefined) { result = 0; }
            result = result + balance;
            console.log(result);
            this.transactionService.setCurrentBalance(result);
            this.presentToast("transaction added succefully");
        })
    }
    async presentToast(custommessage) {
        const toast = await this.toastController.create({
            message: custommessage,
            duration: 2000
        });
        toast.present();
    }
    clearStorage() {
        this.transactionService.clearTransactions();
    }
}
