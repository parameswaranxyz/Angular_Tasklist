
export class Task{

    Task_id:string = null;
    Task_des:string = null;
    Task_priority:number = 1;
    Task_weight:number = 1;
    Task_dependant:string = null;
    Task_schedule:number = 1;
    Task_created_on:any;
    children:Task[];

    constructor(){}
}
