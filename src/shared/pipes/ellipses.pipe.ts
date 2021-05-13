import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'ellipses' })
export class EllipsesPipe implements PipeTransform {
  transform(value: string, maxLen = 30) {
    if (!value) return value;

    return value.length <= maxLen
      ? value
      : value.substring(0, maxLen) + '...';
  }
}
