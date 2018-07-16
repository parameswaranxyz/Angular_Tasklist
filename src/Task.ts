
export class Task{

    Task_id:string = null;
    Task_des:string = null;
    Task_priority:number = 0;
    Task_weight:number = 0;
    Task_dependant:string = null;
    Task_schedule:number = 0;
    Task_create:string = null;

    constructor(
    Task_id:string,
    Task_des:string,
    Task_priority:number,
    Task_weight:number,
    Task_dependant:string,
    Task_schedule:number,
    ){}

    // public static getTask(data):Array<Task>{

    //     console.log(data)
    //     return data 
    //     // [{'Task_id': '57', 'Task_des': 'das', 'Task_priority': 2, 'Task_weight': 5, 'Task_dependant': 'None', 'Task_schedule': 2}, {'Task_id': '5', 'Task_des': 'das', 'Task_priority': 2, 'Task_weight': 5, 'Task_dependant': 'None', 'Task_schedule': 2}, {'Task_id': '57w', 'Task_des': 'parames', 'Task_priority': 2, 'Task_weight': 5, 'Task_dependant': 'None', 'Task_schedule': 2}, {'Task_id': '57s', 'Task_des': 'das', 'Task_priority': 2, 'Task_weight': 5, 'Task_dependant': 'None', 'Task_schedule': 2}, {'Task_id': '57a', 'Task_des': 'cgf', 'Task_priority': 2, 'Task_weight': 5, 'Task_dependant': 'None', 'Task_schedule': 2}, {'Task_id': '5s1', 'Task_des': 'das', 'Task_priority': 1, 'Task_weight': 1, 'Task_dependant': 'TaskEntry object (57s)', 'Task_schedule': 1}, {'Task_id': '1', 'Task_des': 'dasdas', 'Task_priority': 1, 'Task_weight': 2, 'Task_dependant': 'TaskEntry object (5)', 'Task_schedule': 1}]
        
    //     // return data.map(Tas=> new Task(Tas.Task_id,Tas.Task_des,Tas.Task_priority,Tas.Task_weight,Tas.Task_dependant,Tas.Task_schedule));
    // }

}
