import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
     public transactions = [];

    constructor(private storage: Storage) { }

    getTransaction(obj) {
        this.storage.forEach((index, key, value) => {
            if(key != "currentbalance"){
            this.transactions.push(index);
             }
              var object = obj;
            this.storage.length().then((result) => {
                if (Number(value) == result) {
                    console.log(value, result)
                    object.handleMeasurements(this.transactions)
                }
            })
            console.log(this.transactions);
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
    setCurrentBalance(balance){
        this.storage.set("currentbalance", balance);
    }
    getCurrentBalance(){
       return this.storage.get("currentbalance").then((result)=>{
             return result;
        })
    }
}
