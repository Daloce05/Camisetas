
import { Component, OnInit } from '@angular/core';
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
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg-logo"></div>
      <div class="hero-content">
        <h1 class="hero-title">¡Vive la Pasión del <span class="highlight">Fútbol</span>!</h1>
        <p class="hero-desc">Camisetas originales, réplicas y accesorios para verdaderos fanáticos del fútbol.</p>
        <div class="hero-buttons">
          <a routerLink="/productos" class="btn-primary-lg">Ver Camisetas</a>
          <a routerLink="/productos" [queryParams]="{destacado: true}" class="btn-outline-lg">Destacadas</a>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="circle c1"></div>
        <div class="circle c2"></div>
        <div class="circle c3"></div>
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
      padding: 6rem 1.5rem;
      text-align: center;
      overflow: hidden;
      background: none;
      color: #fff;
    }
    .hero-bg-logo {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: url('/assets/images/distrisport.png') center center no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
      opacity: 0.13;
      filter: brightness(0.3) grayscale(1);
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 700px;
      margin: 0 auto;
    }
    .hero-title, .hero-desc {
      color: #fff !important;
      text-shadow: 0 2px 16px rgba(0,0,0,0.7), 0 1px 0 #000;
    }
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 700px;
      margin: 0 auto;
    }
    .product-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: linear-gradient(135deg, #1e335c, #3a5ba0);
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .hero p {
      color: #666;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
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
    .hero-decoration {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.06;
    }
    .c1 { width: 400px; height: 400px; background: #b388ff; top: -100px; right: -100px; }
    .c2 { width: 300px; height: 300px; background: #ff80ab; bottom: -50px; left: -80px; }
    .c3 { width: 200px; height: 200px; background: #b388ff; top: 50%; left: 60%; }

    .section {
      padding: 4rem 1.5rem;
    }
    .section-dark {
      background: rgba(10, 24, 51, 0.7);
      color: #fff;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-title {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      color: #f2f2f2;
      margin-bottom: 2.5rem;
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
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private whatsappService: WhatsappService
  ) {}

  ngOnInit() {
    this.productService.getProducts({ destacado: true, limit: 4 }).subscribe(res => {
      this.featuredProducts = res.data.products;
    });
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.data;
    });
  }

  contactWhatsApp(product: Product) {
    this.whatsappService.sendProductMessage(product);
  }
}
