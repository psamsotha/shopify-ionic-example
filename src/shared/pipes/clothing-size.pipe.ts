import { Pipe, PipeTransform } from '@angular/core';


const SIZE_MAP = {
  'x-small': 'XS',
  'small': 'S',
  'medium': 'M',
  'large': 'L',
  'x-large': 'XL',
  'xx-large': 'XXL',
  'xxx-large': 'XXXL',
  'xxxx-large': 'XXXXL'
};


@Pipe({ name: 'clothingSize' })
export class ClothingSizePipe implements PipeTransform {

  /**
   * Check map. If not in there, check if value is present,
   * if not return 'One Size';
   */
  transform(value: string) {
    if (!(typeof value === 'string')) {
      return value;
    } else {
      return SIZE_MAP[value.toLowerCase()]
          ? SIZE_MAP[value.toLowerCase()]
          : value === 'Default Title'
              ? 'One Size'
              : value;
    }
  }
}
