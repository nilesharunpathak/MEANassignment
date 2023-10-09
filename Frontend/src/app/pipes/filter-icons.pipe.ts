import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterIcons'
})
export class FilterIconsPipe implements PipeTransform {

    transform(combinedData: any[], searchTerm: string): any[] {
      if (!combinedData || !searchTerm) {
        return combinedData;
      }
  
      searchTerm = searchTerm.toLowerCase();
      return combinedData.filter((combinedData) => {
        // Make sure icon.name is defined before calling includes
        if (combinedData.exchange_id) {
          return combinedData.exchange_id.toLowerCase().includes(searchTerm);
        }
        return false;
      });
    }
  }


