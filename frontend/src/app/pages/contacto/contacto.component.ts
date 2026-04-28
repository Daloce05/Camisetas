import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="contact-section-dark">
      <div class="contact-container">
        <div class="contact-header-block">
          <span class="contact-label">¿NECESITAS AYUDA?</span>
          <h1 class="contact-main-title">¡Contáctanos!</h1>
          <p class="contact-main-desc">
            Estamos aquí para resolver tus dudas, ayudarte con tu compra o recibir tus sugerencias. Puedes comunicarte con nosotros por WhatsApp, correo electrónico o el medio que prefieras.
          </p>
        </div>
        <div class="contact-cards-grid">
          <div class="contact-card">
            <div class="contact-icon">💬</div>
            <div class="contact-card-title">WhatsApp</div>
            <a class="contact-link" href="https://wa.me/573177239970" target="_blank" rel="noopener">+57 317 723 9970</a>
            <div class="contact-card-desc">Atención rápida y personalizada.</div>
          </div>
          <div class="contact-card">
            <div class="contact-icon">📧</div>
            <div class="contact-card-title">Correo Electrónico</div>
            <a class="contact-link" href="mailto:Distrisportcamisetasdefutbol@gmail.com">Distrisportcamisetasdefutbol&#64;gmail.com</a>
            <div class="contact-card-desc">Respuestas en menos de 24 horas.</div>
          </div>
          <div class="contact-card" *ngIf="false">
            <div class="contact-icon">📘</div>
            <div class="contact-card-title">Facebook</div>
            <a class="contact-link" href="https://lacanchatiendadeportiva.com.co/?srsltid=AfmBOorf_GadhpAejo2PSwFqj8t7f03wi2SwUtoVK2KT01jycBsphPgw" target="_blank" rel="noopener">La Cancha Tienda Deportiva</a>
            <div class="contact-card-desc">Síguenos y contáctanos por Facebook.</div>
          </div>
        </div>
        <div class="contact-bottom-block">
          <div class="contact-bottom-line"></div>
          <div class="contact-bottom-cta">
            <span class="contact-bottom-message">¡Te responderemos lo más pronto posible!</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
        .contact-bottom-message {
          color: #fff !important;
          font-size: 1.35rem;
          font-weight: 500;
          text-shadow: 0 1px 8px #0006;
          display: block;
          margin-top: 1.5rem;
        }
    .contact-section-dark {
      background: #181f2a;
      color: #f2f2f2;
      min-height: 80vh;
      padding: 0;
      width: 100vw;
    }
    .contact-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 3.5rem 1.5rem 2.5rem 1.5rem;
    }
    .contact-header-block {
      margin-bottom: 2.5rem;
      text-align: left;
    }
    .contact-label {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 2px;
      color: #b388ff;
      text-transform: uppercase;
      display: block;
      margin-bottom: 0.7rem;
    }
    .contact-main-title {
      font-size: 2.3rem;
      font-weight: 900;
      color: #ffe066;
      margin-bottom: 1.1rem;
      letter-spacing: -1px;
    }
    .contact-main-desc {
      font-size: 1.18rem;
      color: #e0e0e0;
      max-width: 600px;
    }
    .contact-cards-grid {
      display: flex;
      gap: 2rem;
      margin: 2.5rem 0 2.5rem 0;
      flex-wrap: wrap;
      justify-content: center;
    }
    .contact-card {
      background: #232b3a;
      border-radius: 16px;
      box-shadow: 0 2px 16px #0002;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      min-width: 240px;
      max-width: 320px;
      flex: 1 1 220px;
      margin-bottom: 1rem;
      border-left: 5px solid #ffe066;
      text-align: center;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .contact-card:hover {
      box-shadow: 0 8px 32px #ffe06633;
      transform: translateY(-6px) scale(1.03);
    }
    .contact-icon {
      font-size: 2.7rem;
      margin-bottom: 1.1rem;
      color: #ffe066;
      filter: drop-shadow(0 2px 8px #ffe06633);
    }
    .contact-card-title {
      font-size: 1.18rem;
      font-weight: 700;
      color: #b388ff;
      margin-bottom: 0.5rem;
    }
    .contact-link {
      color: #ffe066;
      font-size: 1.1rem;
      font-weight: 700;
      text-decoration: none;
      display: block;
      margin-bottom: 0.5rem;
      word-break: break-all;
      transition: color 0.2s;
    }
    .contact-link:hover {
      color: #b388ff;
      text-decoration: underline;
    }
    .contact-card-desc {
      color: #e0e0e0;
      font-size: 1.01rem;
    }
    .contact-bottom-block {
      margin-top: 3.5rem;
      text-align: center;
    }
    .contact-bottom-line {
      height: 3px;
      width: 120px;
      background: linear-gradient(90deg, #ffe066 60%, #b388ff 100%);
      margin: 0 auto 1.5rem auto;
      border-radius: 2px;
    }
    .contact-bottom-cta {
      font-size: 1.18rem;
      color: #fff;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
    }
    @media (max-width: 700px) {
      .contact-section-dark { padding: 0.5rem; }
      .contact-container { padding: 2rem 0.2rem 1.5rem 0.2rem; }
      .contact-cards-grid { flex-direction: column; gap: 1.2rem; }
    }
  `]
})
export class ContactoComponent {}
