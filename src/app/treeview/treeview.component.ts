import { Component, OnInit } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Injectable } from "@angular/core";
import { TaskListService } from '../task-list.service';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { BehaviorSubject, Observable, of as observableOf } from "rxjs";

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean,
    public filename: string,
    public level: number,
    public type: any
  ) {}
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
// const TREE_DATA = JSON.stringify({
//   Task_id: "None",
//   Task_des: "",
//   Task_priority: "1",
//   Task_weight: "1",
//   Task_dependant: "None",
//   Task_dependant_id: "None",
//   Task_create: "None",
//   children: [
//     {
//       Task_id: "2",
//       Task_des: "dsadnasina",
//       Task_priority: "1",
//       Task_weight: "1",
//       Task_dependant: "None",
//       Task_dependant_id: "None",
//       Task_create: "2018-07-20 07:46:14.876368+00:00",
//       children: [
//         {
//           Task_id: "11",
//           Task_des: "check",
//           Task_priority: "1",
//           Task_weight: "1",
//           Task_dependant: "TaskEntry object (2)",
//           Task_dependant_id: "2",
//           Task_create: "2018-07-22 19:23:18.845614+00:00",
//           children: []
//         }
//       ]
//     },
//     {
//       Task_id: "4",
//       Task_des: "Task A",
//       Task_priority: "1",
//       Task_weight: "1",
//       Task_dependant: "None",
//       Task_dependant_id: "None",
//       Task_create: "2018-07-22 17:07:38.180790+00:00",
//       children: [
//         {
//           Task_id: "5",
//           Task_des: "TaskB",
//           Task_priority: "1",
//           Task_weight: "1",
//           Task_dependant: "TaskEntry object (4)",
//           Task_dependant_id: "4",
//           Task_create: "2018-07-22 17:07:52.857980+00:00",
//           children: [
//             {
//               Task_id: "6",
//               Task_des: "Taskc",
//               Task_priority: "1",
//               Task_weight: "1",
//               Task_dependant: "TaskEntry object (5)",
//               Task_dependant_id: "5",
//               Task_create: "2018-07-22 17:08:12.935603+00:00",
//               children: [
//                 {
//                   Task_id: "7",
//                   Task_des: "Task D",
//                   Task_priority: "1",
//                   Task_weight: "1",
//                   Task_dependant: "TaskEntry object (6)",
//                   Task_dependant_id: "6",
//                   Task_create: "2018-07-22 17:08:38.587325+00:00",
//                   children: []
//                 }
//               ]
//             },
//             {
//               Task_id: "8",
//               Task_des: "Task 1",
//               Task_priority: "1",
//               Task_weight: "1",
//               Task_dependant: "TaskEntry object (5)",
//               Task_dependant_id: "5",
//               Task_create: "2018-07-22 17:08:54.666120+00:00",
//               children: []
//             },
//             {
//               Task_id: "9",
//               Task_des: "Task 2",
//               Task_priority: "1",
//               Task_weight: "1",
//               Task_dependant: "TaskEntry object (5)",
//               Task_dependant_id: "5",
//               Task_create: "2018-07-22 17:09:18.497849+00:00",
//               children: [
//                 {
//                   Task_id: "10",
//                   Task_des: "Task 3",
//                   Task_priority: "1",
//                   Task_weight: "1",
//                   Task_dependant: "TaskEntry object (9)",
//                   Task_dependant_id: "9",
//                   Task_create: "2018-07-22 17:09:37.744749+00:00",
//                   children: []
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// });

@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  dataObject;
  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor(private taskService:TaskListService) {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    // const dataObject = JSON.parse(TREE_DATA);

    this.taskService.getTaskListTree().subscribe(data => {
        console.log(data['list']);
        this.dataObject = JSON.parse(JSON.stringify(data['list']));
        console.log(this.dataObject);
        const data = this.buildFileTree(this.dataObject, 0);
        this.dataChange.next(data);

    //     if(data['list'] != ""){
    //         console.log(data['list']);
    //         // this.dataObject = data['list'];
    //         dataObject = data['list'];
    //         const data = this.buildFileTree(dataObject, 0);
    //         console.log(dataObject)
    //     // Notify the change.
    //       this.dataChange.next(data);
    //       // const data = this.buildFileTree(dataObject, 0);

    // // Notify the change.
    //       // this.dataChange.next(data);
    //     }
    //     else{
    //         console.log("Error in response");
    //       }
      });

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === "object") {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: "app-treeview",
  templateUrl: "./treeview.component.html",
  styleUrls: ["./treeview.component.css"],
  providers: [FileDatabase]
})
export class TreeviewComponent {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;

  constructor(database: FileDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );
    this.treeControl = new FlatTreeControl<FileFlatNode>(
      this._getLevel,
      this._isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    database.dataChange.subscribe(data => (this.dataSource.data = data));
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type);
  };

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> =>
    observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;
}
