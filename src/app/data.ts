import { Injectable } from '@angular/core';

@Injectable()
export class Data {

    private storage: any;

    public constructor() { }

    public setData(data){
        this.storage = data;
    }

    public getData(){
        if(this.storage === undefined)
            return "Empty";
        return this.storage;
    }

    public resetData(){
        this.storage="Empty";
    }
}