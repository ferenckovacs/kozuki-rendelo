import {Component} from '@angular/core'
import { ButtonsModule } from 'ng2-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   lemeztipusok=[
     {"nev":"Trapézlemez 20mm","t_hossz":1115,"h_hossz":1056},
     {"nev":"Trapézlemez 40mm","t_hossz":1055,"h_hossz":960},
     {"nev":"Cserépmintás","t_hossz":1055,"h_hossz":960},
     ];
   
   ar=[
     {"vastagsag":"0.4", "ear":1350},
     {"vastagsag":"0.5", "ear":1600},
     {"vastagsag":"fa", "ear":1790}
   ];

   vastagsag=["Válasszon!","0.4","0.5"];

   szinek={"ral":[
                {"nev":"Válasszon!","tipus":"ral","szin":{'background': 'white', 'color': 'black'}},
                {"nev":"RAL 3000","tipus":"ral", "szin":{'background': '#AB1F1C', 'color': 'white'}},
                {"nev":"RAL 3009","tipus":"ral", "szin":{'background': '#5E2121', 'color': 'white'}},
                {"nev":"RAL 3011","tipus":"ral", "szin":{'background': '#781417', 'color': 'white'}},
                {"nev":"RAL 6002","tipus":"ral", "szin":{'background': '#265721', 'color': 'white'}},
                {"nev":"RAL 7016","tipus":"ral", "szin":{'background': '#262E38', 'color': 'white'}},
                {"nev":"RAL 8004","tipus":"ral", "szin":{'background': '#85382B', 'color': 'white'}},
                {"nev":"RAL 9002","tipus":"ral", "szin":{'background': '#FCFCF0'}},
              ],
         "fa":[
                {"nev":"Dió","tipus":"fa", "szin":{'background': '#AF804F', 'color': 'white'}},
                {"nev":"Vörösfenyő","tipus":"fa", "szin":{'background': '#E55137', 'color': 'white'}},
                {"nev":"Fenyő","tipus":"fa", "szin":{'background': '#E29000', 'color': 'white'}},
                {"nev":"Mahagóni","tipus":"fa", "szin":{'background': '#75151E', 'color': 'white'}}
             ],
   };


   rowcounter = 0;
   rendeles: Order[];
   lemezosszesennet = 0;
   lemezosszesenbr = 0;

   constructor(){
     this.rendeles = [];
     for (var i = 1; i<5; i++){
        this.rendeles.push(new Order(i,'true','Válasszon!',['Válasszon!'],'Válasszon!','Válasszon!',[{'background': 'white', 'color': 'black'}],0,0,0,0,0,0));
        this.rowcounter = i;
     }
   };

    vastagsagValtozas(id,event){
      if(event == '0.4'){
        this.rendeles[id].net = this.ar[0].ear;
        this.rendeles[id].meret = event;
        this.ujraszamol('','','');
      }
      if(event == '0.5'){
        this.rendeles[id].net = this.ar[1].ear;
        this.rendeles[id].meret = event;
        this.ujraszamol('','','');
      }
      for(var i=0; i<this.szinek.fa.length; i++){
        if (this.szinek.fa[i].nev == this.rendeles[id].szin)
          this.rendeles[id].net = this.ar[2].ear;
          this.rendeles[id].meret = event;
          break;
      }
      
   };

   colorPrice(id,event) {
     var bennevan = false;
     this.rendeles [id].vastagsag = [];
     this.rendeles[id].szin = event;
     for (var i=0; i<this.szinek.ral.length; i++){
        if ( this.szinek.ral[i].nev == event){
            bennevan = true;
        } 
     }
     if (bennevan){
       this.rendeles[id].vastagsag = this.vastagsag;
       for (var i=0; i<this.szinek.ral.length;i++){
           if(this.szinek.ral[i].nev == event){
                this.rendeles[id].style = this.szinek.ral[i].szin;
           }   
       }
     } else {
        for (var i=0; i<this.szinek.fa.length;i++){
           if(this.szinek.fa[i].nev == event){
                this.rendeles[id].style = this.szinek.fa[i].szin;
           }   
       }
       this.rendeles[id].vastagsag.push(this.vastagsag[0]);
       this.rendeles[id].vastagsag.push(this.vastagsag[1]);
       this.rendeles[id].meret=this.rendeles[id].vastagsag[1];
     }
     this.vastagsagValtozas(id,this.rendeles[id].meret);
     this.ujraszamol('','','');
   };

   ujraszamol(id,newValue,type){
    this.lemezosszesennet=0;
    this.lemezosszesenbr = 0;
    for (var item of this.rendeles)
        {
            if(item.id == id && type=="db") item.db = newValue.target.value;
            if(item.id == id && type=='hossz') item.hossz = newValue.target.value;
            item.m2=item.db*(item.hossz/1000)*1.25;
            item.nar=Math.round(item.m2*item.net);
            item.bar=Math.round(item.nar*1.27);
            this.lemezosszesennet += item.nar;
            
        }
    this.lemezosszesenbr = Math.round(this.lemezosszesennet*1.27);
   }; 

   addRow(){
      this.rowcounter++;
      this.rendeles.push(new Order(this.rowcounter,'true','Válasszon!',['Válasszon!'],'Válasszon!','Válasszon!',[{'background': 'white', 'color': 'black'}],0,0,0,0,0,0));
   };

   teszt(id,event){
     this.rendeles[id-1].vastagsag = event;
   }
}

export class Order {
  constructor(public id: number,
              public csavar: string,
              public tipus: string,
              public vastagsag: string[],
              public meret: string,
              public szin: string,
              public style: {},
              public hossz: number,
              public db: number,
              public net: number,
              public m2: number,
              public nar: number,
              public bar: number
          
              ) { }
}
