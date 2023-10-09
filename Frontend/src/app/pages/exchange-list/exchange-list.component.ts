import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-exchange-list',
  templateUrl: './exchange-list.component.html',
  styleUrls: ['./exchange-list.component.scss']
})
export class ExchangeListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getExchanges();
    this.getExchangesIcon();
   setTimeout(() => {
     this.combineData();
   }, 600);

  }

  exchanges: any[] = [];
  exchangData: any;
  exchangesIcons: any;
  exchangeIcon:any;
  combinedData: any=[];
  searchTerm: string = '';

  insertExchangeData(){
    this.apiService.insertExchanges().subscribe((data: any) => {
      this.exchanges = data;
      alert("Inserted successfully!")
      console.log("this.exchange", this.exchanges)
    });
  }

  insertExchangeIcon(){
    this.apiService.insertExchangeIcon().subscribe((data: any) => {
      this.exchangesIcons = data;
      console.log("this.exchange", data)
    });
  }

  insertToDB(){
    this.insertExchangeData();
    this.insertExchangeIcon();   
 
  }

 getExchanges(){
    this.apiService.fetchExchanges().subscribe((data: any) => {
      this.exchangData = data;
      console.log("this.exchange", this.exchangData)
    });
  }

  getExchangesIcon(){
    this.apiService.fetchExchangesIcon().subscribe((data: any) => {
      this.exchangeIcon = data;
      console.log("exchange Icon", this.exchangeIcon)
    });
  }

  combineData(){
    this.combinedData = this.exchangData.map((item1 : any) => {
      const matchingItem = this.exchangeIcon.find((item2 : any)=> item2.exchange_id === item1.exchange_id);
      return {
        exchange_id: item1.exchange_id,
        volume_1day_usd: item1.volume_1day_usd/1000000000,
        url: matchingItem ? matchingItem.url : null,
      };
    });
    console.log("combinedData", this.combinedData)
  }


}
