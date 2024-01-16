import { MatPaginatorIntl } from "@angular/material/paginator";

export function customPaginator() {
  
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Productos por página:';
  customPaginatorIntl.nextPageLabel = 'Próxima página';
  customPaginatorIntl.previousPageLabel = 'Página previa';
  customPaginatorIntl.firstPageLabel = 'Primera página';
  customPaginatorIntl.lastPageLabel = 'Última página';
  
  return customPaginatorIntl;
  
}