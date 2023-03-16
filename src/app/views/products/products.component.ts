import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ProductDialogComponent } from 'src/app/shared/product-dialog/product-dialog.component';
import Product from './../../Models/Products';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>

  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'category', 'actions']


  constructor(public dialog: MatDialog,
    public productService: ProductService
  ) {
    this.productService.getProducts()
      .subscribe(data => {
        console.log(data),
          this.products = data
      })
  } ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ;



  //FormsModule
  openDialog(product: Product | null) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '260px',
      data: product != null ? product : { name: "", price: 0, category: '', id: '' }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) {
        if (this.products.map(p => p.id).includes(result.id)) {
          this.productService.updateProducts(result)
            .subscribe(data => {
              console.log(data);

              const index = this.products.findIndex(p => p.id === data.id);
              this.products[index] = data;

              this.table.renderRows();
            })
        }
        else {
          console.log('entrou no create');
          this.productService.createProduct(result)
            .subscribe(data => {
              console.log(data);
              this.products.push(data)
              this.table.renderRows();
            })
        }
      }
    });
  }


  updateProduct(product: Product) {
    this.openDialog(product);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(() => {
        this.products = this.products.filter(p => p.id != id)
      });
  }
}
