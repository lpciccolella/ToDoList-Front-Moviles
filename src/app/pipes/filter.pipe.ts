import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks: any[], task: string, column: string): any[] {

    if (task === '') {
      return tasks;
    }

    task = task.toLowerCase();

    return tasks.filter(t => {
      return t[column].toLowerCase().includes(task);
    });
  }

}
