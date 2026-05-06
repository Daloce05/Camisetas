
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Carousel -->
    <section class="hero">
      <!-- Slides -->
      <div class="hero-slides">
        <div *ngFor="let img of heroImages; let i = index"
             class="hero-slide"
             [class.active]="i === heroIndex">
          <img [src]="img" alt="Distrisports header" class="hero-slide-img">
        </div>
      </div>
      <div class="hero-overlay"></div>
      <!-- Content -->
      <div class="hero-content">
        <h1 class="hero-title">¡Vive la Pasión del <span class="highlight">Fútbol</span>!</h1>
        <p class="hero-desc">Camisetas originales, réplicas y accesorios para verdaderos fanáticos del fútbol.</p>
        <div class="hero-buttons">
          <a routerLink="/productos" class="btn-primary-lg">Ver Camisetas</a>
          <a routerLink="/productos" [queryParams]="{destacado: true}" class="btn-outline-lg">Destacadas</a>
        </div>
      </div>
      <!-- Controles del carrusel -->
      <button class="hero-arrow hero-prev" (click)="prevHero()" aria-label="Anterior">&#8249;</button>
      <button class="hero-arrow hero-next" (click)="nextHero()" aria-label="Siguiente">&#8250;</button>
      <div class="hero-dots">
        <span *ngFor="let img of heroImages; let i = index"
              class="hero-dot"
              [class.active]="i === heroIndex"
              (click)="goHero(i)"></span>
      </div>
    </section>


    <!-- Featured Products -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Camisetas Destacadas</h2>
        <div class="products-grid" *ngIf="featuredProducts.length > 0">
          <div *ngFor="let product of featuredProducts" class="product-card">
            <div class="product-img">
              <img *ngIf="product.imagenes && product.imagenes.length" [src]="product.imagenes[0].startsWith('http') ? product.imagenes[0] : 'https://sabina-utf1.onrender.com' + product.imagenes[0]" [alt]="product.nombre">
              <div *ngIf="!product.imagenes || !product.imagenes.length" class="product-placeholder">🍄</div>
              <span class="product-badge" *ngIf="product.destacado">Destacado</span>
            </div>
            <div class="product-info">
              <span class="product-category">{{ product.categoria?.nombre }}</span>
              <h3>{{ product.nombre }}</h3>
              <p class="product-desc">{{ product.descripcion | slice:0:60 }}...</p>
              <div class="product-footer">
                <span class="product-price">{{ product.precio | currency:'COP':'symbol':'1.0-0':'es-CO' }}</span>
                <button class="btn-add" (click)="contactWhatsApp(product)">Cotizar 💬</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Logos Decorativos de Equipos -->
    <section class="logos-equipos-section">
      <div class="logos-equipos-container">
        <img src="assets/images/WhatsApp Image 2026-04-28 at 2.58.58 PM.jpeg" alt="Equipo 1" class="logo-equipo" />
        <img src="assets/images/WhatsApp Image 2026-04-28 at 2.58.58 PM (1).jpeg" alt="Equipo 2" class="logo-equipo" />
        <img src="assets/images/WhatsApp Image 2026-04-28 at 2.58.58 PM (2).jpeg" alt="Equipo 3" class="logo-equipo" />
        <img src="assets/images/WhatsApp Image 2026-04-28 at 2.58.58 PM (3).jpeg" alt="Equipo 4" class="logo-equipo" />
      </div>
    </section>

    <!-- Why Us -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">¿Por Qué Elegirnos?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚽</div>
            <h3>100% Originales</h3>
            <p>Solo vendemos camisetas originales y réplicas de la mejor calidad.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>Envío Rápido</h3>
            <p>Envíos a todo el país con empaque seguro para tus camisetas.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⭐</div>
            <h3>Calidad Garantizada</h3>
            <p>Revisamos cada camiseta para asegurar la mejor experiencia.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎁</div>
            <h3>Ediciones Especiales</h3>
            <p>Encuentra camisetas únicas y ediciones limitadas para tu colección.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
        .hero .highlight {
          color: #fff !important;
        }
        .section-title {
          color: #181818 !important;
        }
    /* Forzar color blanco y negrita en el hero */
    :host ::ng-deep .hero-title,
    .hero .hero-title,
    .hero-title {
      color: #fff !important;
      font-weight: 900 !important;
      text-shadow: 0 2px 12px rgba(0,0,0,0.45) !important;
    }
    :host ::ng-deep .hero-desc,
    .hero .hero-desc,
    .hero-desc {
      color: #fff !important;
      font-weight: 800 !important;
      text-shadow: 0 2px 8px rgba(0,0,0,0.35) !important;
    }
    /* Evitar que .hero p sobreescriba el color */
    .hero p.hero-desc {
      color: #fff !important;
    }
    .hero {
      position: relative;
      height: 88vh;
      min-height: 520px;
      max-height: 820px;
      overflow: hidden;
      color: #fff;
      display: flex;
      align-items: center;
    }
    /* Slides */
    .hero-slides {
      position: absolute;
      inset: 0;
      z-index: 1;
    }
    .hero-slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.9s ease;
    }
    .hero-slide.active { opacity: 1; }
    .hero-slide-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      filter: brightness(0.52);
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: linear-gradient(90deg, rgba(10,24,51,0.75) 0%, rgba(10,24,51,0.35) 60%, transparent 100%);
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 3;
      max-width: 640px;
      padding: 0 2rem 0 4rem;
      text-align: left;
    }
    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
    /* Flechas */
    .hero-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      background: rgba(255,255,255,0.15);
      border: 2px solid rgba(255,255,255,0.35);
      color: #fff;
      font-size: 2.2rem;
      line-height: 1;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    .hero-arrow:hover { background: rgba(255,255,255,0.28); transform: translateY(-50%) scale(1.08); }
    .hero-prev { left: 1.5rem; }
    .hero-next { right: 1.5rem; }
    /* Dots */
    .hero-dots {
      position: absolute;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      gap: 10px;
    }
    .hero-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.45);
      cursor: pointer;
      transition: background 0.3s, transform 0.3s;
      border: 2px solid rgba(255,255,255,0.6);
    }
    .hero-dot.active {
      background: #d3ed05;
      border-color: #d3ed05;
      transform: scale(1.3);
    }
    .btn-primary-lg {
      padding: 0.8rem 2rem;
      background: linear-gradient(135deg, #1e335c, #3a5ba0);
      border-radius: 30px;
      color: white;
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .btn-primary-lg:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(30, 51, 92, 0.3);
    }
    .btn-outline-lg {
      padding: 0.8rem 2rem;
      border: 2px solid #3a5ba0;
      border-radius: 30px;
      color: #3a5ba0;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    }
    .btn-outline-lg:hover {
      background: #3a5ba0;
      color: white;
    }
    /* Removed decoration circles */

    .section {
      padding: 3.5rem 1.5rem;
    }
    .section-dark {
      background: rgba(10, 24, 51, 0.7);
      color: #fff;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .section-title {
      text-align: center;
      font-size: 1.8rem;
      font-weight: 700;
      color: #1e335c !important;
      margin-bottom: 2rem;
    }
    .text-center { text-align: center; }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .category-card {
      background: #14244a;
      border: 1px solid #1e335c;
      border-radius: 16px;
      padding: 2rem 1.5rem;
      text-decoration: none;
      text-align: center;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(10, 24, 51, 0.12);
      color: #fff;
    }
    .category-card:hover {
      transform: translateY(-5px);
      border-color: #b388ff;
      box-shadow: 0 10px 30px rgba(179, 136, 255, 0.12);
    }
    .category-icon {
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
    }
    .category-card h3 {
      color: #fff;
      margin-bottom: 0.5rem;
    }
    .category-card p {
      color: #e0e0e0;
      font-size: 0.85rem;
      line-height: 1.5;
    }

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

    .logos-equipos-section {
      width: 100%;
      background: none;
      margin: 0;
      padding: 0 0 2.5rem 0;
      display: flex;
      justify-content: center;
    }
    .logos-equipos-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2.5rem 0 2.5rem 0;
      flex-wrap: nowrap;
      max-width: 1100px;
      margin: 0 auto;
      width: 100%;
      gap: 0;
    }
    .logo-equipo {
      width: 120px;
      height: 120px;
      min-width: 120px;
      min-height: 120px;
      max-width: 120px;
      max-height: 120px;
      border-radius: 50%;
      box-shadow: 0 2px 12px #0002;
      background: #fff;
      object-fit: cover;
      padding: 0.5rem;
      margin: 0;
      display: block;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .logo-equipo:hover {
      transform: scale(1.08) rotate(-2deg);
      box-shadow: 0 8px 32px #b388ff33;
    }
    @media (max-width: 900px) {
      .logos-equipos-container {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
      }
      .logo-equipo {
        width: 80px;
        height: 80px;
        min-width: 80px;
        min-height: 80px;
        max-width: 80px;
        max-height: 80px;
      }
    }
    .logos-equipos-section {
      width: 100%;
      background: none;
      margin: 0;
      padding: 0 0 2.5rem 0;
      display: flex;
      justify-content: center;
    }
    .logos-equipos-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 1.5rem 0 0.5rem 0;
      flex-wrap: wrap;
      max-width: 1100px;
      margin: 0 auto;
      width: 100%;
      gap: 0;
    }
    .logo-equipo {
      height: 70px;
      width: auto;
      border-radius: 16px;
      box-shadow: 0 2px 12px #0002;
      background: #fff;
      object-fit: contain;
      padding: 0.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .logo-equipo:hover {
      transform: scale(1.08) rotate(-2deg);
      box-shadow: 0 8px 32px #b388ff33;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .feature-card {
      text-align: center;
      padding: 2rem;
      background: #ffffff;
      border: 1px solid rgba(179, 136, 255, 0.1);
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(179, 136, 255, 0.06);
    }
    .feature-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .feature-card h3 { color: #2d2d3f; margin-bottom: 0.5rem; }
    .feature-card p { color: #888; font-size: 0.9rem; line-height: 1.5; }

    /* ===== RESPONSIVE HOME ===== */
    @media (max-width: 900px) {
      .hero { height: 70vh; min-height: 420px; }
      .hero-content { padding: 0 1rem 0 1.5rem; max-width: 100%; }
      .hero-arrow { width: 40px; height: 40px; font-size: 1.6rem; }
      .hero-prev { left: 0.5rem; }
      .hero-next { right: 0.5rem; }
      .section { padding: 2.5rem 1rem; }
      .section-title { font-size: 1.5rem; margin-bottom: 1.5rem; }
      .products-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
      .features-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
      .feature-card { padding: 1.5rem 1rem; }
    }
    @media (max-width: 600px) {
      .hero { height: 60vh; min-height: 360px; }
      .hero-content { padding: 0 0.8rem; }
      .hero-title { font-size: 1.5rem !important; }
      .hero-desc { font-size: 0.95rem !important; }
      .btn-primary-lg, .btn-outline-lg { padding: 0.65rem 1.1rem; font-size: 0.88rem; }
      .hero-arrow { display: none; }
      .products-grid { grid-template-columns: 1fr 1fr; gap: 0.8rem; }
      .product-img { height: 150px; }
      .product-info { padding: 0.8rem; }
      .product-info h3 { font-size: 0.9rem; }
      .product-desc { display: none; }
      .product-price { font-size: 1.05rem; }
      .features-grid { grid-template-columns: 1fr; gap: 0.8rem; }
      .logos-equipos-container { gap: 1rem; padding: 1rem 0; }
      .logo-equipo { height: 55px; }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  categories: Category[] = [];

  heroImages = [
    'assets/images/imagen header 1.jpg',
    'assets/images/imagen header 2.jpg',
    'assets/images/imagen header 3.jpg',
    'assets/images/imagen header 4.jpg',
    'assets/images/imagen header 5.jpg',
  ];
  heroIndex = 0;
  private heroTimer: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private whatsappService: WhatsappService
  ) {}

  ngOnInit() {
    this.startHeroTimer();
      this.productService.getProducts({ destacado: true, limit: 4 }).subscribe(res => {
        this.featuredProducts = res.data.products.map(p => {
          let precioNum: number = 0;
          if (typeof p.precio === 'number') {
            precioNum = p.precio;
          } else if (typeof p.precio === 'string') {
            const precioStr = p.precio as string;
            if (precioStr.trim() !== '' && !isNaN(Number(precioStr))) {
              precioNum = Number(precioStr);
            }
          }
          return {
            ...p,
            precio: (typeof precioNum === 'number' && !isNaN(precioNum)) ? precioNum : 0
          };
        });
      });
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.data;
    });
  }

  startHeroTimer() {
    this.heroTimer = setInterval(() => {
      this.heroIndex = (this.heroIndex + 1) % this.heroImages.length;
    }, 4500);
  }

  ngOnDestroy() {
    if (this.heroTimer) clearInterval(this.heroTimer);
  }

  prevHero() {
    this.heroIndex = (this.heroIndex - 1 + this.heroImages.length) % this.heroImages.length;
    this.resetHeroTimer();
  }

  nextHero() {
    this.heroIndex = (this.heroIndex + 1) % this.heroImages.length;
    this.resetHeroTimer();
  }

  goHero(i: number) {
    this.heroIndex = i;
    this.resetHeroTimer();
  }

  resetHeroTimer() {
    if (this.heroTimer) clearInterval(this.heroTimer);
    this.startHeroTimer();
  }

  contactWhatsApp(product: Product) {
    this.whatsappService.sendProductMessage(product);
  }
}
