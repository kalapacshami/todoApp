import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToDo } from './todo';
import { FormArrayName, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todoApp'

  todos: Array<ToDo> = []
  newToDo : ToDo = new ToDo
  newTag: string=''


  tagOptions:Array<string> = [
    'new', 'urgent', 'pending', 'personal', 'work' 
  ]

  addNewTag(){
    if(this.newTag !==''){
      this.tagOptions.push(this.newTag)
    }
    

    this.newTag=''
  }

  todoTypes: Array<any> = [
    {text: 'primary', value: 'alert-primary'},
    {text: 'danger', value: 'alert-danger'},
    {text: 'warning', value: 'alert-warning'},
    {text: 'success', value: 'alert-success'},
  ]

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


  addNewToDo(){
    this.newToDo.id=(Math.floor(Math.random() * Date.now())).toString()
    this.todos.push(this.newToDo)

    this.newToDo = new ToDo
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
