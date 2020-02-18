import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../../services/users-data.service';
import { History } from '../../models/history.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataStoreService } from '../../services/data-store.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  constructor(public dataList: UsersDataService, public store: DataStoreService) { }
  users: any[];
  todos: any[];
  usersDataStatues: string;
  todosDataStatues: string;
  historyList: History[] = [];
  userNameSelected: string;

  ngOnInit() {
    this.fetchUsersDta();
  }


  fetchUsersDta() {
    this.usersDataStatues = 'loading';
    this.dataList.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.usersDataStatues = 'success';
      },
      error => {
        this.users = this.store.users;
        this.usersDataStatues = 'success';
        // console.log(error);
        // this.usersDataStatues = 'failed';
      }
    );

  }

  getTodos(userId: any) {
    this.todosDataStatues = 'loading';
    this.userNameSelected = this.users.find(user => user.id === parseInt(userId, 2)).name;

    this.dataList.getUserTodosById(userId).subscribe(
      (data: any[]) => {
        this.todos = data;
        this.todosDataStatues = 'success';

      },
      error => {

        this.todos = this.store.todos;
        this.todosDataStatues = 'success';
        // console.log(error);
        // this.todosDataStatues = 'failed';
      }

    );
  }


  // addTodo() {
  // }


  removeTodo(todoId: any) {
    const todo = this.todos.find(c => c.id === (todoId));
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    this.updateHistory('remove', this.userNameSelected, todoId);

  }

  updateTodos(todoId: any) {
    const todo = this.todos.find(c => c.id === (todoId));
    if (todo.completed) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }

    this.updateHistory('update', this.userNameSelected, todoId);
  }

  convertObjectToArray(objectTo) {
    const arr: any[] = [];
    Object.keys(objectTo).map((key) => {
      arr.push({ [key]: objectTo[key] });
    });
    return arr;
  }

  updateHistory(action: string, userName: string, todId: string) {
    let type: string;

    switch (action) {
      case 'remove':
        type = 'danger';
        break;
      case 'add':
        type = 'primary';
        break;
      case 'edit':
        type = 'info';
        break;

      default:
        break;
    }

    const history: History = {
      action,
      userName,
      date: new Date(),
      todId,
      type

    };

    this.historyList.push(history);

  }




}
