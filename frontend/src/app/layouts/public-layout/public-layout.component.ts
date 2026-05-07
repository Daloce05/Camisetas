import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="logo">
          <img src="assets/images/distrisport.png" alt="Distrisports" class="logo-img" />
          <span class="logo-text">Distrisports</span>
        </a>

        <!-- Hamburger -->
        <button class="hamburger" (click)="toggleMobile()" [class.open]="mobileOpen" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>

        <div class="nav-links" [class.mobile-open]="mobileOpen">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="mobileOpen=false">Inicio</a>
          <a routerLink="/productos" routerLinkActive="active" (click)="mobileOpen=false">Productos</a>
          <a routerLink="/quienes-somos" routerLinkActive="active" (click)="mobileOpen=false">¿Quiénes Somos?</a>
          <a routerLink="/contacto" routerLinkActive="active" (click)="mobileOpen=false">Contacto</a>
          <!-- Auth buttons solo en móvil -->
          <ng-container *ngIf="!authService.isLoggedIn">
            <div class="mobile-auth-divider"></div>
            <a routerLink="/login" class="mobile-auth-btn mobile-auth-outline" (click)="mobileOpen=false">Iniciar Sesión</a>
            <a routerLink="/registro" class="mobile-auth-btn mobile-auth-primary" (click)="mobileOpen=false">Registrarse</a>
          </ng-container>
          <ng-container *ngIf="authService.isLoggedIn">
            <div class="mobile-auth-divider"></div>
            <a routerLink="/admin" *ngIf="authService.isAdmin" class="mobile-auth-btn mobile-auth-admin" (click)="mobileOpen=false">Panel Admin</a>
            <button class="mobile-auth-btn mobile-auth-logout" (click)="logout(); mobileOpen=false">Cerrar Sesión</button>
          </ng-container>
        </div>

        <div class="nav-actions">
                    <a (click)="contactWhatsApp()" class="whatsapp-btn" title="Contáctanos por WhatsApp" style="display:flex;align-items:center;padding:0 4px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <ng-container *ngIf="!authService.isLoggedIn">
            <a routerLink="/login" class="btn-outline">Iniciar Sesión</a>
            <a routerLink="/registro" class="btn-primary">Registrarse</a>
          </ng-container>

          <ng-container *ngIf="authService.isLoggedIn">
            <div class="user-menu">
              <button class="user-btn" (click)="toggleMenu()">
                {{ authService.currentUser?.nombre?.charAt(0) }}{{ authService.currentUser?.apellido?.charAt(0) }}
              </button>
              <div class="dropdown" *ngIf="menuOpen">
                <span class="dropdown-name">{{ authService.currentUser?.nombre }} {{ authService.currentUser?.apellido }}</span>
                <a routerLink="/admin" *ngIf="authService.isAdmin" (click)="menuOpen = false">Panel Admin</a>
                <button (click)="logout()">Cerrar Sesión</button>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div>
            <h3 class="footer-logo"><img src="assets/images/distrisport.png" alt="Distrisports" class="footer-logo-img"></h3>
            <p>Tu tienda de camisetas, réplicas y accesorios para fanáticos del fútbol.</p>
          </div>
          <div>
            <h4>Enlaces</h4>
            <a routerLink="/">Inicio</a>
            <a routerLink="/productos">Productos</a>
          </div>
          <div>
            <h4>Contacto</h4>
            <p>Distrisportcamisetasdefutbol&#64;gmail.com</p>
            <p>3177239970</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Distrisports Ecommerce. Todos los derechos reservados.</p>
          <small>Creado por David Lopez, ingeniero informático.</small>
        </div>
      </div>
      <div class="envio-banner">
        <div class="envio-banner-track">
          <span>ENVIOS GRATIS A PARTIR DE $200.000 COP 🚚 Aplican TyC</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .navbar {
      background: rgba(10, 24, 51, 0.98);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #1e335c;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 1px 8px rgba(10, 24, 51, 0.18);
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }
    .logo-img { height: 38px; width: 38px; border-radius: 50%; object-fit: cover; }
    .logo-text { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.5px; color: #d3ed05; }
    .nav-links {
      display: flex;
      gap: 1.8rem;
      align-items: center;
    }
    .nav-links a {
      color: #d3ed05;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.97rem;
      transition: color 0.2s;
      white-space: nowrap;
    }
    .nav-links a:hover, .nav-links a.active { color: #fff; }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .whatsapp-btn { font-size: 1.4rem; cursor: pointer; transition: transform 0.2s; }
    .whatsapp-btn:hover { transform: scale(1.2); }
    .btn-outline {
      padding: 0.4rem 1rem;
      border: 1px solid #3a5ba0;
      border-radius: 25px;
      color: #d3ed05;
      text-decoration: none;
      font-size: 0.88rem;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .btn-outline:hover { background: #3a5ba0; color: white; }
    .btn-primary {
      padding: 0.4rem 1rem;
      background: linear-gradient(135deg, #1e335c, #3a5ba0);
      border-radius: 25px;
      color: white;
      text-decoration: none;
      font-size: 0.88rem;
      transition: opacity 0.2s;
      white-space: nowrap;
    }
    .btn-primary:hover { opacity: 0.9; }
    /* Mobile auth - hidden on desktop */
    .mobile-auth-divider, .mobile-auth-btn { display: none; }
    /* Hamburger */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      z-index: 1100;
    }
    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: #d3ed05;
      border-radius: 2px;
      transition: all 0.3s;
    }
    .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    /* User menu */
    .user-menu { position: relative; }
    .user-btn {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #b388ff, #ff80ab);
      color: white; border: none; cursor: pointer;
      font-weight: 700; font-size: 0.85rem;
    }
    .dropdown {
      position: absolute; top: 48px; right: 0;
      background: #fff;
      border: 1px solid rgba(179, 136, 255, 0.2);
      border-radius: 12px; padding: 0.5rem 0;
      min-width: 200px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.12);
      z-index: 200;
    }
    .dropdown-name {
      display: block; padding: 0.7rem 1rem;
      color: #9c5cff; font-weight: 600;
      border-bottom: 1px solid rgba(179, 136, 255, 0.12);
    }
    .dropdown a, .dropdown button {
      display: block; width: 100%; padding: 0.7rem 1rem;
      color: #555; text-decoration: none; text-align: left;
      background: none; border: none; cursor: pointer; font-size: 0.9rem;
    }
    .dropdown a:hover, .dropdown button:hover { background: rgba(179, 136, 255, 0.08); color: #9c5cff; }
    /* Main */
    .main-content { min-height: calc(100vh - 64px - 260px); padding-bottom: 44px; }
    /* Footer */
    .footer {
      background: #1e335c; color: #fff;
      border-top: 1px solid rgba(179, 136, 255, 0.12);
      padding: 2.5rem 0 1.5rem;
    }
    .footer-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .footer-logo { display: flex; align-items: center; gap: 0.5rem; }
    .footer-logo-img { height: 30px; width: auto; border-radius: 50%; }
    .footer-grid h3, .footer-grid h4 { color: #fff; margin-bottom: 0.7rem; }
    .footer-grid p { color: #d0d8e8; line-height: 1.6; font-size: 0.92rem; }
    .footer-grid a { display: block; color: #d0d8e8; text-decoration: none; margin-bottom: 0.4rem; font-size: 0.92rem; }
    .footer-grid a:hover { color: #d3ed05; }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 1.2rem; text-align: center; color: #d0d8e8; font-size: 0.85rem;
    }
    .footer-bottom small { display: block; margin-top: 4px; opacity: 0.6; }
    /* Banner */
    .envio-banner {
      width: 100vw !important;
      position: fixed !important;
      left: 0; bottom: 0;
      z-index: 9999 !important;
      background: linear-gradient(90deg, #d3ed05 60%, #3a5ba0 100%);
      color: #1e335c; font-weight: bold; font-size: 1rem;
      overflow: hidden; height: 38px; display: flex; align-items: center;
      box-shadow: 0 -2px 10px rgba(10,24,51,0.08);
      border-top: 2px solid #3a5ba0;
      pointer-events: auto;
    }
    .envio-banner-track {
      display: flex; align-items: center; white-space: nowrap;
      animation: banner-move 18s linear infinite;
      width: max-content; padding-left: 100vw;
    }
    .envio-banner-track span { padding: 0 2rem; letter-spacing: 1px; }
    @keyframes banner-move {
      0% { transform: translateX(0); }
      100% { transform: translateX(-100vw); }
    }
    /* ===== RESPONSIVE ===== */
    @media (max-width: 900px) {
      .nav-links {
        display: none;
        flex-direction: column;
        gap: 0;
        position: fixed;
        top: 64px; left: 0; right: 0;
        background: rgba(10,24,51,0.99);
        border-bottom: 1px solid #1e335c;
        padding: 1rem 0 1.5rem;
        z-index: 999;
      }
      .nav-links.mobile-open { display: flex; }
      .nav-links a {
        padding: 0.9rem 1.5rem;
        font-size: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .hamburger { display: flex; }
      .nav-actions .btn-outline, .nav-actions .btn-primary { display: none; }
      .mobile-auth-divider, .mobile-auth-btn { display: block; }
      .mobile-auth-divider {
        height: 1px;
        background: rgba(255,255,255,0.1);
        margin: 0.5rem 1.5rem;
      }
      .mobile-auth-btn {
        display: block;
        padding: 0.85rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        border: none;
        background: none;
        cursor: pointer;
        width: 100%;
        text-align: left;
      }
      .mobile-auth-outline {
        color: #d3ed05;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .mobile-auth-primary {
        color: #fff;
        background: rgba(58,91,160,0.4);
        border-radius: 0;
      }
      .mobile-auth-admin {
        color: #d3ed05;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .mobile-auth-logout {
        color: #ff80ab;
      }
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    }
    @media (max-width: 600px) {
      .nav-container { padding: 0 1rem; }
      .logo-text { font-size: 1.2rem; }
      .footer-grid { grid-template-columns: 1fr; gap: 1.2rem; }
      .footer { padding: 1.5rem 0 1rem; }
    }
  `]
})
export class PublicLayoutComponent {
  menuOpen = false;
  mobileOpen = false;

  constructor(
    public authService: AuthService,
    private whatsappService: WhatsappService,
    private router: Router
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  contactWhatsApp() {
    this.whatsappService.sendGeneralMessage();
  }

  logout() {
    this.authService.logout();
    this.menuOpen = false;
    this.router.navigate(['/']);
  }
}
