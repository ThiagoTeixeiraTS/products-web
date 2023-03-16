import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from './../Models/Products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productApiUrl = 'https://localhost:7006/products';
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productApiUrl);
  }

  createProduct(product: Product): Observable<Product> {
    console.log('service');

    return this.http.post<Product>(this.productApiUrl, {
      name: product.name,
      category: product.category,
      price: product.price
    });
  }

  updateProducts(product: Product): Observable<Product> {
    return this.http.put<Product>(this.productApiUrl, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.productApiUrl}?id=${id}`);
  }
}
