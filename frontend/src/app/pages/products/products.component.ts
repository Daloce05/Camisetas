import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="products-page">
      <div class="container">
        <h1 class="page-title">Nuestros Productos</h1>

        <!-- Filters -->
        <div class="filters">
          <input type="text" [(ngModel)]="search" (input)="loadProducts()" placeholder="Buscar productos..." class="search-input">
          <select [(ngModel)]="selectedCategory" (change)="loadProducts()" class="filter-select">
            <option [ngValue]="null">Todas las categorías</option>
            <option *ngFor="let cat of categories" [ngValue]="cat.id">{{ cat.nombre }}</option>
          </select>
        </div>

        <!-- Products Grid -->
        <div class="products-grid" *ngIf="products.length > 0">
          <a *ngFor="let product of products" class="product-card" [routerLink]="['/producto', product.id]">
            <div class="product-img">
              <img *ngIf="product.imagenes && product.imagenes.length" [src]="product.imagenes[0].startsWith('http') ? product.imagenes[0] : 'https://sabina-utf1.onrender.com' + product.imagenes[0]" [alt]="product.nombre">
              <div *ngIf="!product.imagenes || !product.imagenes.length" class="product-placeholder"></div>
              <span class="product-badge" *ngIf="product.destacado">Destacado</span>
            </div>
            <div class="product-info">
              <span class="product-category">{{ product.categoria?.nombre }}</span>
              <h3>{{ product.nombre }}</h3>
              <p class="product-desc">{{ product.descripcion | slice:0:60 }}...</p>
              <div class="product-footer">
                <span class="product-price">
                  {{ product.precio > 0 ? (product.precio | currency:'COP':'symbol':'1.0-0':'es-CO') : 'Consultar' }}
                </span>
                <button class="btn-add" (click)="$event.preventDefault(); contactWhatsApp(product)">Cotizar 💬</button>
              </div>
            </div>
          </a>
        </div>

        <div *ngIf="products.length === 0" class="empty-state">
          <p> No se encontraron productos</p>
        </div>

        <!-- Pagination -->
        <div class="pagination" *ngIf="totalPages > 1">
          <button (click)="goToPage(page - 1)" [disabled]="page <= 1" class="page-btn">&laquo; Anterior</button>
          <span class="page-info">Página {{ page }} de {{ totalPages }}</span>
          <button (click)="goToPage(page + 1)" [disabled]="page >= totalPages" class="page-btn">Siguiente &raquo;</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-page { padding: 2rem 1.5rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    .page-title {
      font-size: 2rem; color: #3a5ba0; margin-bottom: 2rem;
      background: linear-gradient(135deg, #1e335c, #3a5ba0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .filters {
      display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;
    }
    .search-input, .filter-select {
      padding: 0.7rem 1rem;
      background: #ffffff;
      border: 1px solid rgba(179, 136, 255, 0.2);
      border-radius: 10px;
      color: #333;
      font-size: 0.95rem;
    }
    .search-input { flex: 1; min-width: 200px; }
    .search-input::placeholder { color: #aaa; }
    .filter-select { min-width: 200px; }
    .filter-select option { background: #ffffff; }
    .search-input:focus, .filter-select:focus { outline: none; border-color: #b388ff; }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 1.5rem;
    }
    .product-card {
      background: #14244a;
      border: 1px solid #1e335c;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(10, 24, 51, 0.12);
      color: #fff;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(179, 136, 255, 0.12);
    }
    .product-img {
      position: relative;
      height: 200px;
      background: linear-gradient(135deg, rgba(179, 136, 255, 0.08), rgba(255, 128, 171, 0.05));
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .product-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .product-placeholder { font-size: 4rem; }
    .product-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: linear-gradient(135deg, #b388ff, #ff80ab);
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .product-info { padding: 1.2rem; }
    .product-category {
      color: #d3ed05;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .product-info h3 {
      color: #fff;
      margin: 0.3rem 0;
      font-size: 1.05rem;
    }
    .product-desc {
      color: #e0e0e0;
      font-size: 0.85rem;
      margin-bottom: 1rem;
      line-height: 1.4;
    }
    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .product-price {
      font-size: 1.3rem;
      font-weight: 700;
      background: linear-gradient(135deg, #d3ed05 60%, #fff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .btn-add {
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, #b388ff, #ff80ab);
      border: none;
      border-radius: 25px;
      color: white;
      font-size: 0.85rem;
      cursor: pointer;
      transition: opacity 0.3s;
    }
    .btn-add:hover { opacity: 0.85; }
    .empty-state { text-align: center; padding: 4rem; color: #888; font-size: 1.2rem; }
    .pagination {
      display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 2rem; padding: 1rem;
    }
    .page-btn {
      padding: 0.5rem 1.2rem;
      background: rgba(179, 136, 255, 0.08);
      border: 1px solid rgba(179, 136, 255, 0.2);
      border-radius: 8px; color: #555;
      cursor: pointer; transition: all 0.3s;
    }
    .page-btn:hover:not(:disabled) { background: #b388ff; color: white; }
    .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .page-info { color: #888; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 900px) {
      .products-page { padding: 1.5rem 1rem; }
      .products-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
      .page-title { font-size: 1.5rem; margin-bottom: 1.2rem; }
    }
    @media (max-width: 600px) {
      .products-page { padding: 1rem 0.7rem; }
      .filters { flex-direction: column; gap: 0.7rem; }
      .search-input, .filter-select { min-width: 0; width: 100%; }
      .products-grid { grid-template-columns: 1fr 1fr; gap: 0.7rem; }
      .product-img { height: 150px; }
      .product-info { padding: 0.7rem 0.8rem 0.3rem; }
      .product-info h3 { font-size: 0.9rem; }
      .product-info p { display: none; }
      .product-actions { padding: 0.5rem 0.8rem 0.8rem; }
      .price { font-size: 1.05rem; }
      .btn-add { padding: 0.4rem 0.7rem; font-size: 0.78rem; }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  search = '';
  selectedCategory: number | null = null;
  page = 1;
  totalPages = 1;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private whatsappService: WhatsappService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => this.categories = res.data);
    this.route.queryParams.subscribe(params => {
      if (params['categoryId']) this.selectedCategory = +params['categoryId'];
      this.loadProducts();
    });
  }

  loadProducts() {
    const params: any = { page: this.page, limit: 12 };
    if (this.search) params.search = this.search;
    if (this.selectedCategory) params.categoryId = this.selectedCategory;

    this.productService.getProducts(params).subscribe(res => {
      this.products = res.data.products.map((p: any) => {
        // Normalizar tallas
        if (!Array.isArray(p.tallas)) {
          try { p.tallas = JSON.parse(p.tallas); } catch { p.tallas = []; }
        }
        if (!Array.isArray(p.tallas)) p.tallas = [];
        // Normalizar campos críticos
        p.id = typeof p.id === 'number' ? p.id : 0;
        p.nombre = typeof p.nombre === 'string' ? p.nombre : '';
        p.descripcion = typeof p.descripcion === 'string' ? p.descripcion : '';
        if (typeof p.precio === 'string') {
          const parsed = parseFloat(p.precio.replace(/[^\d.]/g, ''));
          p.precio = !isNaN(parsed) ? parsed : 0;
        } else if (typeof p.precio !== 'number') {
          p.precio = 0;
        }
        // p.imagen = typeof p.imagen === 'string' ? p.imagen : null;
        p.categoryId = typeof p.categoryId === 'number' ? p.categoryId : 0;
        p.destacado = typeof p.destacado === 'boolean' ? p.destacado : false;
        p.activo = typeof p.activo === 'boolean' ? p.activo : true;
        p.categoria = p.categoria && typeof p.categoria === 'object' ? p.categoria : { id: 0, nombre: '' };
        p.createdAt = typeof p.createdAt === 'string' ? p.createdAt : '';
        return p;
      });
      this.totalPages = res.data.totalPages;
    });
  }

  goToPage(p: number) {
    this.page = p;
    this.loadProducts();
  }

  hasStock(product: Product): boolean {
    const tallas = Array.isArray(product.tallas) ? product.tallas : [];
    return tallas.some(t => t && typeof t.stock === 'number' && t.stock > 0);
  }

  contactWhatsApp(product: Product) {
    this.whatsappService.sendProductMessage(product);
  }
}
