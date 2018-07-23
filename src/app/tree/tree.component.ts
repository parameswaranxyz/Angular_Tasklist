import { Component, OnInit, Injectable } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlattener } from "@angular/material/tree";
import { BehaviorSubject, Observable, of as observableOf } from "rxjs";
import { MatTreeFlatDataSource } from "@angular/material/tree";
import { TaskI } from "../../TaskI";
import { TaskListService } from '../task-list.service';

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
  children: FileNode[];
  filename: string;
  type: TaskI;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean,
    public filename: string,
    public level: number,
    public type: TaskI
  ) {}
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
const MY_TREE_DATA = JSON.stringify({
  Applications: {
    Calendar: 'app',
    Chrome: 'app',
    Webstorm: 'app'
  },
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    material2: {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  },
  Downloads: {
    October: 'pdf',
    November: 'pdf',
    Tutorial: 'html'
  },
  Pictures: {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir'
    },
    Sun: 'png',
    Woods: 'jpg'
  }
});

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */

@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  dataObject:JSON = null;

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor(private taskService:TaskListService) {
    this.initialize();
  }

  initialize() {
    
  //   this.taskService.getTaskListTree().subscribe(data => {
  //     console.log(data['list']);
  //   if(data){
  //       this.dataObject = data['list'];
  //       const data = this.buildFileTree(this.dataObject, 0);
  //       console.log(this.dataObject)
  //   // Notify the change.
  //     this.dataChange.next(data);
  //   }
  //   else{
  //       console.log("Error in response");
  //     }
  // });

    // Parse the string to json object.
    const data = this.buildFileTree(dataObject, 0);
    const dataObject = JSON.parse(MY_TREE_DATA);
    this.dataChange.next(data);
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
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.css"],
  providers: [FileDatabase]
})
export class TreeComponent implements OnInit {
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

  ngOnInit() {}
}
