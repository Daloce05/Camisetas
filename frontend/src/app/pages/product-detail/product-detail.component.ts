
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
            <ng-container *ngIf="product.imagenes && product.imagenes.length > 0; else noImgs">
              <div class="carousel">
                <button class="carousel-btn" (click)="prevImg()" [disabled]="currentImgIndex === 0">‹</button>
                <div class="img-zoom-wrapper" (click)="openLightbox()">
                  <img [src]="getImgUrl(product.imagenes[currentImgIndex])" [alt]="product.nombre" class="carousel-img">
                  <div class="zoom-icon">🔍</div>
                </div>
                <button class="carousel-btn" (click)="nextImg()" [disabled]="currentImgIndex === product.imagenes.length - 1">›</button>
              </div>
              <div class="carousel-dots">
                <span *ngFor="let img of product.imagenes; let i = index"
                      [class.active]="i === currentImgIndex"
                      (click)="goToImg(i)"></span>
              </div>
            </ng-container>
            <ng-template #noImgs>
              <div class="placeholder">⭐</div>
            </ng-template>
          </div>
          <div class="detail-info">
            <span class="category-tag">{{ product.categoria?.nombre }}</span>
            <h1>{{ product.nombre }}</h1>
            <ng-container *ngIf="product.descuento && product.descuento > 0; else sinDescuentoDetail">
              <p class="price-original-detail">Antes: <span>{{ product.precio | currency:'COP':'symbol':'1.0-0':'es-CO' }}</span></p>
              <span class="discount-badge-detail">-{{ product.descuento }}% OFF</span>
              <p class="price" style="margin-bottom: 0.5rem;">Ahora: {{ (product.precio * (1 - product.descuento / 100)) | currency:'COP':'symbol':'1.0-0':'es-CO' }}</p>
            </ng-container>
            <ng-template #sinDescuentoDetail>
              <p class="price" style="margin-bottom: 0.5rem;">{{ product.precio | currency:'COP':'symbol':'1.0-0':'es-CO' }}</p>
            </ng-template>
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

    <!-- Lightbox -->
    <div class="lightbox-overlay" *ngIf="lightboxOpen" (click)="onOverlayClick($event)" (wheel)="onWheel($event)">
      <button class="lightbox-close" (click)="closeLightbox()">✕</button>
      <button class="lightbox-nav lightbox-prev" (click)="$event.stopPropagation(); prevImg(); resetZoom()" [disabled]="currentImgIndex === 0">‹</button>
      <div class="lightbox-img-container"
           [style.transform]="'scale(' + zoomLevel + ') translate(' + panX + 'px,' + panY + 'px)'"
           [style.cursor]="zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'"
           (mousedown)="onMouseDown($event)"
           (mousemove)="onMouseMove($event)"
           (mouseup)="onMouseUp()"
           (mouseleave)="onMouseUp()"
           (click)="onImgClick($event)"
           (touchstart)="onTouchStart($event)"
           (touchmove)="onTouchMove($event)"
           (touchend)="onTouchEnd($event)">
        <img [src]="getImgUrl(product!.imagenes[currentImgIndex])" [alt]="product!.nombre" class="lightbox-img" draggable="false">
      </div>
      <button class="lightbox-nav lightbox-next" (click)="$event.stopPropagation(); nextImg(); resetZoom()" [disabled]="currentImgIndex === product!.imagenes.length - 1">›</button>
      <div class="lightbox-zoom-controls" (click)="$event.stopPropagation()">
        <button (click)="zoomIn()">+</button>
        <span>{{ (zoomLevel * 100) | number:'1.0-0' }}%</span>
        <button (click)="zoomOut()">−</button>
        <button (click)="resetZoom()" *ngIf="zoomLevel !== 1">↺</button>
      </div>
      <div class="lightbox-dots">
        <span *ngFor="let img of product!.imagenes; let i = index"
              [class.active]="i === currentImgIndex"
              (click)="$event.stopPropagation(); goToImg(i); resetZoom()"></span>
      </div>
    </div>
  `,
  styles: [`
    .detail-page { padding: 2rem 1.5rem; }
    .container { max-width: 960px; margin: 0 auto; }
    .back-link {
      color: #3a5ba0; text-decoration: none; font-size: 0.95rem;
      display: inline-block; margin-bottom: 1.5rem; font-weight: 600;
    }
    .back-link:hover { color: #1e335c; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: flex-start; }
    .detail-img {
      border-radius: 16px; overflow: hidden;
      background: transparent;
      display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 360px;
      padding: 0;
    }
    .carousel { display: flex; align-items: center; justify-content: center; gap: 0.8rem; width: 100%; }
    .img-zoom-wrapper {
      position: relative; cursor: zoom-in; display: inline-flex;
      border-radius: 10px; overflow: hidden;
    }
    .img-zoom-wrapper:hover .zoom-icon { opacity: 1; }
    .zoom-icon {
      position: absolute; bottom: 10px; right: 10px;
      background: rgba(0,0,0,0.55); color: #fff; border-radius: 50%;
      width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; opacity: 0; transition: opacity 0.2s; pointer-events: none;
    }
    .carousel-img { width: 320px; height: 320px; object-fit: cover; border-radius: 10px; display: block; }
    .carousel-btn { background: #fff; border: 1px solid #b388ff; border-radius: 50%; width: 36px; height: 36px; font-size: 1.5rem; color: #3a5ba0; cursor: pointer; transition: background 0.2s; }
    .carousel-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .carousel-dots { display: flex; gap: 6px; justify-content: center; margin-top: 8px; }
    .carousel-dots span { width: 10px; height: 10px; border-radius: 50%; background: #ccc; cursor: pointer; display: inline-block; }
    .carousel-dots .active { background: #3a5ba0; }
    .placeholder { font-size: 6rem; }
    .category-tag {
      color: #181818; font-size: 0.85rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 1px;
    }
    .detail-info h1 { color: #2d2d3f; font-size: 1.8rem; margin: 0.5rem 0; }
    .price {
      font-size: 2rem; font-weight: 700; margin: 0.3rem 0;
      color: #181818;
    }
    .price-original-detail { color: #888; font-size: 1.1rem; margin: 0.2rem 0; text-decoration: line-through; }
    .price-original-detail span { text-decoration: line-through; }
    .discount-badge-detail { display: inline-block; background: #e74c3c; color: #fff; font-size: 0.9rem; font-weight: 700; border-radius: 8px; padding: 0.2rem 0.8rem; margin-bottom: 0.3rem; }
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

    /* Lightbox */
    .lightbox-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.92);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .lightbox-img-container {
      display: flex; align-items: center; justify-content: center;
      transform-origin: center center;
      transition: transform 0.08s ease;
      will-change: transform;
      max-width: 90vw; max-height: 88vh;
    }
    .lightbox-img {
      max-width: 90vw; max-height: 88vh;
      object-fit: contain; border-radius: 8px;
      box-shadow: 0 8px 48px #000a;
      user-select: none; pointer-events: none;
      display: block;
    }
    .lightbox-zoom-controls {
      position: fixed; bottom: 3.5rem; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 0.5rem; z-index: 10001;
      background: rgba(0,0,0,0.55); border-radius: 20px; padding: 0.35rem 1rem;
    }
    .lightbox-zoom-controls button {
      background: rgba(255,255,255,0.15); border: none; color: #fff;
      font-size: 1.2rem; width: 32px; height: 32px; border-radius: 50%;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .lightbox-zoom-controls button:hover { background: rgba(255,255,255,0.3); }
    .lightbox-zoom-controls span { color: #fff; font-size: 0.85rem; min-width: 42px; text-align: center; }
    .lightbox-close {
      position: fixed; top: 1.2rem; right: 1.5rem;
      background: rgba(255,255,255,0.15); border: none; color: #fff;
      font-size: 1.8rem; width: 44px; height: 44px; border-radius: 50%;
      cursor: pointer; z-index: 10000; display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .lightbox-close:hover { background: rgba(255,255,255,0.3); }
    .lightbox-nav {
      position: fixed; top: 50%; transform: translateY(-50%);
      background: rgba(255,255,255,0.15); border: none; color: #fff;
      font-size: 2.5rem; width: 52px; height: 52px; border-radius: 50%;
      cursor: pointer; z-index: 10000; display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .lightbox-nav:hover { background: rgba(255,255,255,0.28); }
    .lightbox-nav:disabled { opacity: 0.25; cursor: not-allowed; }
    .lightbox-prev { left: 1.2rem; }
    .lightbox-next { right: 1.2rem; }
    .lightbox-dots {
      position: fixed; bottom: 1.2rem; left: 50%; transform: translateX(-50%);
      display: flex; gap: 8px; z-index: 10000;
    }
    .lightbox-dots span {
      width: 10px; height: 10px; border-radius: 50%;
      background: rgba(255,255,255,0.4); cursor: pointer; display: inline-block;
      transition: background 0.2s;
    }
    .lightbox-dots span.active { background: #fff; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 900px) {
      .detail-page { padding: 1.5rem 1rem; }
      .detail-grid { grid-template-columns: 1fr; gap: 1.5rem; }
      .detail-img { min-height: 260px; border-radius: 12px; }
      .carousel-img { width: 100%; max-width: 340px; height: auto; max-height: 300px; }
      .img-zoom-wrapper { width: 100%; max-width: 340px; }
    }
    @media (max-width: 600px) {
      .detail-page { padding: 1rem 0.5rem; }
      .detail-grid { gap: 1rem; }
      .detail-img { min-height: 200px; border-radius: 8px; padding: 0.5rem; }
      .carousel-img { width: 100%; max-width: 100%; max-height: 240px; }
      .img-zoom-wrapper { width: 100%; max-width: 100%; }
      .detail-info h1 { font-size: 1.3rem; }
      .price { font-size: 1.5rem; }
      .btn-add-lg { font-size: 0.95rem; padding: 0.8rem; }
      .container { padding: 0 0.2rem; }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  selectedTalla: string = '';
  quantity: number = 1;
  currentImgIndex: number = 0;
  lightboxOpen: boolean = false;

  // Zoom & pan
  zoomLevel = 1;
  panX = 0;
  panY = 0;
  isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private panStartX = 0;
  private panStartY = 0;
  // Pinch
  private lastPinchDist = 0;

  openLightbox() { this.lightboxOpen = true; this.resetZoom(); }
  closeLightbox() { this.lightboxOpen = false; this.resetZoom(); }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('lightbox-overlay')) this.closeLightbox();
  }

  resetZoom() { this.zoomLevel = 1; this.panX = 0; this.panY = 0; }
  zoomIn() { this.zoomLevel = Math.min(this.zoomLevel + 0.5, 5); }
  zoomOut() { this.zoomLevel = Math.max(this.zoomLevel - 0.5, 1); if (this.zoomLevel === 1) { this.panX = 0; this.panY = 0; } }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.25 : -0.25;
    this.zoomLevel = Math.min(Math.max(this.zoomLevel + delta, 1), 5);
    if (this.zoomLevel === 1) { this.panX = 0; this.panY = 0; }
  }

  onImgClick(e: MouseEvent) {
    e.stopPropagation();
    if (!this.isDragging) {
      if (this.zoomLevel === 1) this.zoomLevel = 2;
      else this.resetZoom();
    }
  }

  onMouseDown(e: MouseEvent) {
    if (this.zoomLevel <= 1) return;
    e.preventDefault();
    this.isDragging = true;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.panStartX = this.panX;
    this.panStartY = this.panY;
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    this.panX = this.panStartX + (e.clientX - this.dragStartX) / this.zoomLevel;
    this.panY = this.panStartY + (e.clientY - this.dragStartY) / this.zoomLevel;
  }

  onMouseUp() { this.isDragging = false; }

  onTouchStart(e: TouchEvent) {
    if (e.touches.length === 2) {
      this.lastPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else if (e.touches.length === 1 && this.zoomLevel > 1) {
      this.isDragging = true;
      this.dragStartX = e.touches[0].clientX;
      this.dragStartY = e.touches[0].clientY;
      this.panStartX = this.panX;
      this.panStartY = this.panY;
    }
  }

  onTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = dist / this.lastPinchDist;
      this.zoomLevel = Math.min(Math.max(this.zoomLevel * scale, 1), 5);
      this.lastPinchDist = dist;
      if (this.zoomLevel === 1) { this.panX = 0; this.panY = 0; }
    } else if (e.touches.length === 1 && this.isDragging) {
      this.panX = this.panStartX + (e.touches[0].clientX - this.dragStartX) / this.zoomLevel;
      this.panY = this.panStartY + (e.touches[0].clientY - this.dragStartY) / this.zoomLevel;
    }
  }

  onTouchEnd() { this.isDragging = false; }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private whatsappService: WhatsappService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.productService.getProduct(id).subscribe(res => {
      this.product = res.data;
      // Normalizar tallas a array siempre
    });
  }

  getImgUrl(img: string): string {
    return img.startsWith('http') ? img : 'https://sabina-utf1.onrender.com' + img;
  }
  prevImg() {
    if (this.currentImgIndex > 0) this.currentImgIndex--;
  }
  nextImg() {
    if (this.product && this.product.imagenes && this.currentImgIndex < this.product.imagenes.length - 1) this.currentImgIndex++;
  }
  goToImg(i: number) {
    this.currentImgIndex = i;
  }

  hasStock(): boolean {
    const tallas = Array.isArray(this.product?.tallas) ? this.product.tallas : [];
    if (tallas.length === 0) return false;
    if (!this.selectedTalla) {
      // Si no seleccionó talla, hay stock si alguna talla tiene stock
      return tallas.some(t => t && typeof t.stock === 'number' && t.stock > 0);
    }
    const t = tallas.find(t => t && t.talla === this.selectedTalla);
    return !!t && typeof t.stock === 'number' && t.stock > 0;
  }

  incrementQty() {
    let max = 99;
    if (this.selectedTalla) {
      const t = Array.isArray(this.product.tallas) ? this.product.tallas.find(t => t.talla === this.selectedTalla) : undefined;
      if (t) max = t.stock;
    } else if (Array.isArray(this.product.tallas) && this.product.tallas.length > 0) {
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
