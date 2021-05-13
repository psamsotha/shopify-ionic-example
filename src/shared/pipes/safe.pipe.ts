import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {

  constructor(private dom: DomSanitizer) {}

  transform(value: string, type: string) {
    switch (type) {
      case 'html':
        return this.dom.bypassSecurityTrustHtml(value);
      case 'style':
        return this.dom.bypassSecurityTrustStyle(value);
      case 'script':
        return this.dom.bypassSecurityTrustScript(value);
      case 'url':
        return this.dom.bypassSecurityTrustUrl(value);
      case 'resource':
        return this.dom.bypassSecurityTrustResourceUrl(value);
      default:
        return value;
    }
  }
}
