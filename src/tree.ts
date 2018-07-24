import { Task } from './Task';

export class Tree{

    root:Task=null;

    constructor(){
        this.root = new Task();
    }

    set(object){
        this.root = object;
    }
    
}
