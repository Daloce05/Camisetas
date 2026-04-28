import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="about-section-dark">
      <div class="about-container">
        <div class="about-header-block">
          <span class="about-label">¿QUIÉNES <span class="about-accent">SOMOS</span>?</span>
          <h1 class="about-main-title">Camisetas: Pasión, Calidad y Comunidad</h1>
          <p class="about-main-desc">
            En <b>Camisetas</b> unimos la pasión por el fútbol con la autenticidad y la atención personalizada. Creamos experiencias para hinchas que buscan calidad, historia y cercanía en cada camiseta.
          </p>
        </div>

        <div class="about-mvv-grid">
          <div class="about-mvv-card">
            <div class="about-mvv-title">Nuestro Propósito</div>
            <div class="about-mvv-sub">Por qué vestimos fútbol</div>
            <div class="about-mvv-desc">Cada camiseta cuenta una historia. Queremos que sientas la pasión, la cultura y la comunidad en cada prenda que ofrecemos.</div>
          </div>
          <div class="about-mvv-card">
            <div class="about-mvv-title">Nuestra Misión</div>
            <div class="about-mvv-sub">Inspirar y conectar hinchas</div>
            <div class="about-mvv-desc">Ofrecer productos auténticos y experiencias únicas, conectando a los fanáticos del fútbol con su pasión y sus equipos.</div>
          </div>
          <div class="about-mvv-card">
            <div class="about-mvv-title">Nuestra Visión</div>
            <div class="about-mvv-sub">Ser la referencia en camisetas</div>
            <div class="about-mvv-desc">Convertirnos en la tienda de referencia para hinchas en Colombia, reconocidos por calidad, cercanía y comunidad.</div>
          </div>
        </div>

        <div class="about-values-block">
          <h2 class="about-values-title">Nuestros Valores</h2>
          <div class="about-values-list">
            <div class="about-value-item" *ngFor="let v of valores; let i = index">
              <div class="about-value-icon">{{ v.icon }}</div>
              <div>
                <div class="about-value-name"><span class="about-value-num">{{ (i+1) | number:'2.0' }}</span> {{ v.name }}</div>
                <div class="about-value-desc">{{ v.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="about-bottom-block">
          <div class="about-bottom-line"></div>
          <div class="about-bottom-cta">
            <span>¿Quieres saber más o unirte a la comunidad?</span>
            <button class="about-contact-btn" routerLink="/contacto">¡Contáctanos!</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section-dark {
      background: #181f2a;
      color: #f2f2f2;
      min-height: 100vh;
      padding: 0;
      width: 100vw;
    }
    .about-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 3.5rem 1.5rem 2.5rem 1.5rem;
    }
    .about-header-block {
      margin-bottom: 2.5rem;
      text-align: left;
    }
    .about-label {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 2px;
      color: #b388ff;
      text-transform: uppercase;
      display: block;
      margin-bottom: 0.7rem;
    }
    .about-accent {
      color: #ffe066;
      font-weight: 900;
    }
    .about-main-title {
      font-size: 2.3rem;
      font-weight: 900;
      color: #ffe066;
      margin-bottom: 1.1rem;
      letter-spacing: -1px;
    }
    .about-main-desc {
      font-size: 1.18rem;
      color: #e0e0e0;
      max-width: 700px;
    }
    .about-mvv-grid {
      display: flex;
      gap: 1.5rem;
      margin: 2.5rem 0 2.5rem 0;
      flex-wrap: wrap;
    }
    .about-mvv-card {
      background: #232b3a;
      border-radius: 16px;
      box-shadow: 0 2px 16px #0002;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      flex: 1 1 260px;
      min-width: 240px;
      max-width: 340px;
      margin-bottom: 1rem;
      border-left: 5px solid #ffe066;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .about-mvv-card:hover {
      box-shadow: 0 8px 32px #ffe06633;
      transform: translateY(-6px) scale(1.03);
    }
    .about-mvv-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #ffe066;
      margin-bottom: 0.3rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .about-mvv-sub {
      font-size: 1.05rem;
      color: #b388ff;
      margin-bottom: 0.7rem;
      font-weight: 600;
    }
    .about-mvv-desc {
      color: #e0e0e0;
      font-size: 1.01rem;
    }
    .about-values-block {
      margin: 2.5rem 0 2.5rem 0;
    }
    .about-values-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffe066;
      margin-bottom: 1.5rem;
      letter-spacing: 1px;
    }
    .about-values-list {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .about-value-item {
      display: flex;
      align-items: flex-start;
      gap: 1.2rem;
      background: #232b3a;
      border-radius: 14px;
      padding: 1.2rem 1.2rem 1.2rem 1.2rem;
      box-shadow: 0 2px 12px #0002;
      border-left: 4px solid #b388ff;
      transition: box-shadow 0.2s, border-color 0.2s;
    }
    .about-value-item:hover {
      box-shadow: 0 8px 32px #b388ff33;
      border-color: #ffe066;
    }
    .about-value-icon {
      font-size: 2.2rem;
      color: #ffe066;
      margin-top: 0.1rem;
      filter: drop-shadow(0 2px 8px #ffe06633);
    }
    .about-value-name {
      font-size: 1.08rem;
      font-weight: 700;
      color: #b388ff;
      margin-bottom: 0.2rem;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .about-value-num {
      background: linear-gradient(135deg, #ffe066 60%, #b388ff 100%);
      color: #232b3a;
      border-radius: 50%;
      font-size: 0.95rem;
      font-weight: 900;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5rem;
    }
    .about-value-desc {
      color: #e0e0e0;
      font-size: 1.01rem;
    }
    .about-bottom-block {
      margin-top: 3.5rem;
      text-align: center;
    }
    .about-bottom-line {
      height: 3px;
      width: 120px;
      background: linear-gradient(90deg, #ffe066 60%, #b388ff 100%);
      margin: 0 auto 1.5rem auto;
      border-radius: 2px;
    }
    .about-bottom-cta {
      font-size: 1.18rem;
      color: #fff;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.2rem;
    }
    .about-contact-btn {
      background: linear-gradient(135deg, #ffe066, #b388ff);
      color: #232b3a;
      border: none;
      border-radius: 25px;
      padding: 0.8rem 2.2rem;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.3s, box-shadow 0.2s;
      box-shadow: 0 2px 12px #ffe06622;
    }
    .about-contact-btn:hover {
      opacity: 0.85;
      box-shadow: 0 6px 24px #ffe06633;
    }
    @media (max-width: 900px) {
      .about-mvv-grid { flex-direction: column; }
      .about-mvv-card { max-width: 100%; }
    }
    @media (max-width: 700px) {
      .about-section-dark { padding: 0.5rem; }
      .about-container { padding: 2rem 0.2rem 1.5rem 0.2rem; }
    }
  `]
})
export class AboutComponent {
  valores = [
    {
      icon: '⚽',
      name: 'Pasión',
      desc: 'Vivimos y compartimos la pasión por el fútbol, conectando a hinchas de todo el país.'
    },
    {
      icon: '🎯',
      name: 'Autenticidad',
      desc: 'Solo productos originales y réplicas de calidad, sin imitaciones.'
    },
    {
      icon: '🤝',
      name: 'Cercanía',
      desc: 'Atención personalizada y soporte real en cada compra.'
    },
    {
      icon: '🚚',
      name: 'Compromiso',
      desc: 'Envíos rápidos y seguros a todo el país.'
    },
    {
      icon: '⭐',
      name: 'Excelencia',
      desc: 'Revisamos cada producto para asegurar la mejor experiencia.'
    }
  ];
}
