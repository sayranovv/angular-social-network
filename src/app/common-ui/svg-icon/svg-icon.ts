import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  template: `<svg:use [attr.href]="href"></svg:use>`,
})
export class SvgIcon {
  @Input() icon = ''

  get href() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`
  }
}
