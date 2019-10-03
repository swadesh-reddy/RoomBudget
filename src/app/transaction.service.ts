import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

    constructor(private storage: Storage) { }

    getTransaction() {
        var values;
        this.storage.forEach((index, key, value) => {
            console.log(index, key);
        });
    }
    setTransaction(transaction) {
        this.storage.length().then((length) => {
            console.log(length)
            let transactionindex = "transaction" + length + 1;
            this.storage.set(transactionindex, transaction);
       });
    }
    clearTransactions() {
        this.storage.clear();
    }
}
