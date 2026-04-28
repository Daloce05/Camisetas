
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { Product, TallaStock } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="detail-page" *ngIf="product">
      <div class="container">
        <a routerLink="/productos" class="back-link">&larr; Volver a productos</a>
        <div class="detail-grid">
          <div class="detail-img">
            <img *ngIf="product.imagen" [src]="product.imagen.startsWith('http') ? product.imagen : 'https://sabina-utf1.onrender.com' + product.imagen" [alt]="product.nombre">
            <div *ngIf="!product.imagen" class="placeholder">🍄</div>
          </div>
          <div class="detail-info">
            <span class="category-tag">{{ product.categoria?.nombre }}</span>
            <h1>{{ product.nombre }}</h1>
            <p class="price" style="margin-bottom: 0.5rem;">{{ product.precio | currency:'COP':'symbol':'1.0-0':'es-CO' }}</p>
            <p class="description">{{ product.descripcion }}</p>
            <div class="stock-info">
              <ng-container *ngIf="product.tallas && product.tallas.length > 0; else noTallas">
                <span *ngFor="let t of product.tallas" [class]="t.stock > 0 ? 'in-stock' : 'out-stock'" style="margin-right: 0.5rem;">
                  {{ t.talla }}: {{ t.stock > 0 ? t.stock + ' disponibles' : 'Sin stock' }}
                </span>
              </ng-container>
              <ng-template #noTallas>
                <span class="out-stock">Sin stock</span>
              </ng-template>
            </div>
            <div *ngIf="product.tallas && product.tallas.length > 0" class="form-group" style="margin-bottom: 1rem;">
              <label style="font-weight: 600;">Talla (opcional):</label>
              <select [(ngModel)]="selectedTalla" style="margin-left: 0.5rem; min-width: 80px;">
                <option value="">Seleccionar</option>
                <option *ngFor="let t of product.tallas" [ngValue]="t.talla" [disabled]="t.stock === 0">{{ t.talla }}</option>
              </select>
            </div>
            <div class="quantity-row">
              <button (click)="decrementQty()" class="qty-btn">-</button>
              <span class="qty">{{ quantity }}</span>
              <button (click)="incrementQty()" class="qty-btn">+</button>
            </div>
            <button class="btn-add-lg" (click)="contactWhatsApp()" [disabled]="!hasStock()">
              {{ hasStock() ? 'Cotizar por WhatsApp 💬' : 'Sin Stock' }}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-page { padding: 2rem 1.5rem; }
    .container { max-width: 1000px; margin: 0 auto; }
    .back-link {
      color: #9c5cff; text-decoration: none; font-size: 0.95rem;
      display: inline-block; margin-bottom: 2rem;
    }
    .back-link:hover { color: #ff80ab; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
    .detail-img {
      border-radius: 16px; overflow: hidden;
      background: linear-gradient(135deg, #1e335c 0%, #3a5ba0 100%);
      display: flex; align-items: center; justify-content: center; min-height: 400px;
    }
    .detail-img img { width: 100%; height: 100%; object-fit: cover; }
    .placeholder { font-size: 6rem; }
    .category-tag {
      color: #181818; font-size: 0.85rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 1px;
    }
    .detail-info h1 { color: #2d2d3f; font-size: 1.8rem; margin: 0.5rem 0; }
    .price {
      font-size: 2rem; font-weight: 700; margin: 0.5rem 0;
      color: #181818;
    }
    .description { color: #666; line-height: 1.7; margin: 1rem 0; }
    .stock-info { margin: 1rem 0; }
    .in-stock { color: #2ecc71; }
    .out-stock { color: #e74c3c; }
    .quantity-row {
      display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0;
    }
    .qty-btn {
      width: 40px; height: 40px;
      border-radius: 50%;
      border: 1px solid rgba(179, 136, 255, 0.2);
      background: rgba(179, 136, 255, 0.06);
      color: #555; font-size: 1.2rem;
      cursor: pointer;
    }
    .qty-btn:hover { background: rgba(179, 136, 255, 0.12); }
    .qty { color: #333; font-size: 1.2rem; font-weight: 600; min-width: 30px; text-align: center; }
    .btn-add-lg {
      width: 100%; padding: 1rem;
      background: linear-gradient(135deg, #1e335c, #3a5ba0);
      border: none; border-radius: 12px;
      color: white; font-size: 1.1rem; font-weight: 600;
      cursor: pointer; transition: opacity 0.3s;
    }
    .btn-add-lg:hover { opacity: 0.9; }
    .btn-add-lg:disabled { opacity: 0.4; cursor: not-allowed; }
  `]
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  selectedTalla: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private whatsappService: WhatsappService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.productService.getProduct(id).subscribe(res => {
      this.product = res.data;
    });
  }

  hasStock(): boolean {
    if (!this.product?.tallas || this.product.tallas.length === 0) return false;
    if (!this.selectedTalla) {
      // Si no seleccionó talla, hay stock si alguna talla tiene stock
      return this.product.tallas.some(t => t.stock > 0);
    }
    const t = this.product.tallas.find(t => t.talla === this.selectedTalla);
    return !!t && t.stock > 0;
  }

  incrementQty() {
    let max = 99;
    if (this.selectedTalla) {
      const t = this.product.tallas.find(t => t.talla === this.selectedTalla);
      if (t) max = t.stock;
    } else if (this.product.tallas && this.product.tallas.length > 0) {
      max = Math.max(...this.product.tallas.map(t => t.stock));
    }
    if (this.quantity < max) this.quantity++;
  }

  decrementQty() {
    if (this.quantity > 1) this.quantity--;
  }

  contactWhatsApp() {
    this.whatsappService.sendProductMessage(this.product, this.quantity);
  }
}
