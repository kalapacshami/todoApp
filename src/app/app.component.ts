import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToDo } from './todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todoApp'

  todos: Array<ToDo> = []

  constructor(){
    this.fetchData()
  }

  counter(): number{
    return this.todos.length
  }

  countercolor(): string{
    if(this.todos.length > 10 ){
      return 'badge-danger'
    }
    else if (this.todos.length > 5){
      return 'badge-warning'
    }
    else{
      return 'badge-success'
    }
  }

  stlyeBinding(todoItem: ToDo) :string{
    return todoItem.type
  }

  deleteToDo(toDoItem : ToDo){
    let index = this.todos.findIndex(x=> x.id === toDoItem.id)
    this.todos.splice(index,1)
  }
  async fetchData(){
    const url='https://gist.githubusercontent.com/siposm/86860e30a000a5dca4b0855f7644bcf2/raw/39c5c3947ee5469532bd7d6ddea6b54e58acd3c0/todos.json'
    let objects = (await(await fetch(url)).json()).todos

    objects.map((x: any) =>{
      let t = new ToDo()
      t.id = x.id
      t.text = x.text
      t.type = x.type
      t.tags = x.tags
      this.todos.push(t)
    })

    console.log(this.todos)
  }




}
