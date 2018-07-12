import { DataSource } from '@angular/cdk/collections';

export class UserDataSource extends DataSource<any> {
    source:TaskI[] = [
      {"Task_id": "1", "Task_des": "SomeTask", "Task_priority": 1, "Task_weight": 5, "Task_dependant": "None", "Task_schedule": 1}, {"Task_id": "3", "Task_des": "adsd", "Task_priority": 3, "Task_weight": 4, "Task_dependant": "None", "Task_schedule": 1}, {"Task_id": "5", "Task_des": "asdas test", "Task_priority": 2, "Task_weight": 2, "Task_dependant": "None", "Task_schedule": 2}, {"Task_id": "200", "Task_des": "ads", "Task_priority": 1, "Task_weight": 1, "Task_dependant": "TaskEntry object (3)", "Task_schedule": 1}, {"Task_id": "32", "Task_des": "1", "Task_priority": 1, "Task_weight": 1, "Task_dependant": "TaskEntry object (1)", "Task_schedule": 1}, {"Task_id": "230", "Task_des": "adsa", "Task_priority": 1, "Task_weight": 1, "Task_dependant": "TaskEntry object (1)", "Task_schedule": 1}
    ];
     
    constructor(private taskService: TaskListService;) {
      super();
    }
  
    getList(){
      source:=[];
      this.taskService.getTaskList().subscribe( data => this.source = <TaskI>data['list']); 
      return source;
    }

    connect(): Observable<User[]> {
      // console.log("asdadadas");
      // this.taskService.getTaskList().subscribe( data => this.source = <TaskI>data['list']);
      return this.source;
    }
    disconnect() {}
  }