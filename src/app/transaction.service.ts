import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
     public transactions = [];
    token: any;
    constructor(private storage: Storage, private auth: AuthService, private http: HttpClient) { }

    getTransaction(obj) {
        this.storage.forEach((index, key, value) => {
            if(key != "currentbalance"){
            this.transactions.push(index);
             }
              var object = obj;
            this.storage.length().then((result) => {
                if (Number(value) == result) {
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
    getCurrentBalance() {
        return this.storage.get("currentbalance").then((result) => {
              return result;
        });
    }

    addTransactionOnline(data) {
        this.token = this.auth.loadToken();
        const headers = this.auth._headers.append('Authorization', 'Bearer ' + this.token);
        headers.set('Content-Type', 'multipart/form-data');
        return this.http.post(this.auth.url + '/uploadTransaction', data, { headers: headers });

    }

    getTransactionsOnline() {
        this.token = this.auth.loadToken();
        const headers = this.auth._headers.append('Authorization', 'Bearer ' + this.token);
        headers.set('Content-Type', 'multipart/form-data');
        return this.http.post(this.auth.url + '/getTransactions', { headers: headers });

    }
}
