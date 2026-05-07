import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-container">
      <!-- Overlay for mobile -->
      <div class="sidebar-overlay" [class.active]="menuOpen" (click)="menuOpen = false"></div>

      <!-- Sidebar -->
      <aside class="sidebar" [class.open]="menuOpen">
        <div class="sidebar-header">
          <img src="assets/images/distrisport.png" alt="Camisetas" class="logo-img">
          <span class="logo-text" style="color: #d3ed05 !important;">Camisetas Admin</span>
          <button class="sidebar-close" (click)="menuOpen = false">✕</button>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" style="color: #d3ed05;" (click)="menuOpen = false">
            <span class="nav-icon">📊</span> Dashboard
          </a>
          <a routerLink="/admin/productos" routerLinkActive="active" style="color: #d3ed05;" (click)="menuOpen = false">
            <span class="nav-icon">📦</span> Productos
          </a>
          <a routerLink="/admin/categorias" routerLinkActive="active" style="color: #d3ed05;" (click)="menuOpen = false">
            <span class="nav-icon">🏷️</span> Categorías
          </a>
          <a routerLink="/admin/usuarios" routerLinkActive="active" style="color: #d3ed05;" (click)="menuOpen = false">
            <span class="nav-icon">👥</span> Usuarios
          </a>
          <a routerLink="/admin/configuracion" routerLinkActive="active" style="color: #d3ed05;" (click)="menuOpen = false">
            <span class="nav-icon">⚙️</span> Configuración
          </a>
          <div class="sidebar-divider"></div>
          <a routerLink="/" style="color: #d3ed05;" (click)="menuOpen = false">
            <span class="nav-icon">🏪</span> Ver Tienda
          </a>
          <button class="logout-btn" (click)="logout()" style="color: #d3ed05;">
            <span class="nav-icon">🚪</span> Cerrar Sesión
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="admin-main">
        <header class="admin-header">
          <div class="header-left">
            <button class="hamburger" (click)="menuOpen = !menuOpen" aria-label="Abrir menú">
              <span></span><span></span><span></span>
            </button>
            <h2 style="color: #181818;">Panel de Administración</h2>
          </div>
          <div class="admin-user">
            <span class="admin-user-name" style="color: #181818;">{{ authService.currentUser?.nombre }} {{ authService.currentUser?.apellido }}</span>
            <div class="user-avatar">{{ authService.currentUser?.nombre?.charAt(0) }}</div>
          </div>
        </header>
        <div class="admin-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      min-height: 100vh;
    }
    /* Sidebar */
    .sidebar {
      width: 260px;
      background: #0a1833;
      color: #fff;
      border-right: 1px solid #1e335c;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: 2px 0 10px rgba(10, 24, 51, 0.12);
      transition: transform 0.3s ease;
    }
    .sidebar-header {
      padding: 1.2rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      border-bottom: 1px solid rgba(179, 136, 255, 0.12);
    }
    .logo-img { height: 36px; width: auto; border-radius: 50%; flex-shrink: 0; }
    .logo-text {
      font-size: 1.1rem;
      font-weight: 700;
      color: #d3ed05 !important;
      background: none !important;
      -webkit-background-clip: unset !important;
      -webkit-text-fill-color: unset !important;
      flex: 1;
    }
    .sidebar-close {
      display: none;
      background: none;
      border: none;
      color: #aaa;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      line-height: 1;
    }
    .sidebar-close:hover { color: #fff; }
    .sidebar-nav { padding: 1rem 0; }
    .sidebar-nav a, .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.8rem 1.5rem;
      color: #fff;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.3s;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
    }
    .sidebar-nav a:hover, .sidebar-nav a.active, .logout-btn:hover {
      color: #9c5cff;
      background: rgba(179, 136, 255, 0.08);
      border-right: 3px solid #ff80ab;
    }
    .sidebar-divider {
      height: 1px;
      background: rgba(179, 136, 255, 0.1);
      margin: 0.8rem 1.5rem;
    }
    .nav-icon { font-size: 1.1rem; }
    /* Overlay */
    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    }
    .sidebar-overlay.active { display: block; }
    /* Main */
    .admin-main {
      flex: 1;
      margin-left: 260px;
      background: #f9f7fc;
      min-width: 0;
    }
    .admin-header {
      background: rgba(255, 255, 255, 0.95);
      border-bottom: 1px solid rgba(179, 136, 255, 0.12);
      padding: 0.85rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 4px rgba(179, 136, 255, 0.06);
      gap: 1rem;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      min-width: 0;
    }
    .admin-header h2 {
      font-size: 1.1rem;
      color: #444;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.3rem;
      flex-shrink: 0;
    }
    .hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: #333;
      border-radius: 2px;
    }
    .admin-user {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: #666;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
    .admin-user-name {
      display: none;
    }
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #b388ff, #ff80ab);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      flex-shrink: 0;
    }
    .admin-content {
      padding: 1.5rem;
    }
    /* Desktop: show username */
    @media (min-width: 769px) {
      .admin-user-name { display: inline; }
      .admin-content { padding: 2rem; }
    }
    /* Mobile */
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-260px);
        z-index: 1000;
      }
      .sidebar.open {
        transform: translateX(0);
      }
      .sidebar-close {
        display: block;
      }
      .admin-main {
        margin-left: 0;
      }
      .hamburger {
        display: flex;
      }
      .admin-header {
        padding: 0.85rem 1rem;
      }
      .admin-content {
        padding: 1rem;
      }
    }
  `]
})
export class AdminLayoutComponent {
  menuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.menuOpen = false;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
