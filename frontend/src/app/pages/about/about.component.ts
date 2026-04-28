import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="about-section">
      <div class="container">
        <h2 class="about-title">¿Quiénes Somos?</h2>
        <div class="about-cards-grid">
          <div class="about-card" *ngFor="let card of cards" tabindex="0">
            <div class="about-icon">{{ card.icon }}</div>
            <h3 class="about-card-title">{{ card.title }}</h3>
            <p class="about-card-desc">{{ card.desc }}</p>
          </div>
        </div>
        <div class="about-bottom-text">
          <p>
            En <b>Camisetas</b> somos fanáticos del fútbol y la cultura deportiva. Nos dedicamos a ofrecer camisetas originales, réplicas y accesorios para verdaderos hinchas. Nuestro equipo está comprometido con la calidad, la autenticidad y la atención personalizada.
          </p>
          <button class="about-contact-btn" routerLink="/contacto">¡Contáctanos!</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section { padding: 4rem 1.5rem; background: #f8f9fa; min-height: 80vh; }
    .about-title { text-align: center; font-size: 2.5rem; font-weight: 900; color: #3a5ba0; margin-bottom: 3rem; letter-spacing: -1px; }
    .about-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2.5rem;
      margin-bottom: 2.5rem;
    }
    .about-card {
      background: linear-gradient(135deg, #fff 70%, #e3f0ff 100%);
      border-radius: 18px;
      box-shadow: 0 4px 24px rgba(30,51,92,0.08);
      padding: 2.2rem 1.5rem 1.7rem 1.5rem;
      text-align: center;
      transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
      cursor: pointer;
      outline: none;
    }
    .about-card:hover, .about-card:focus {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 8px 32px rgba(30,51,92,0.16);
      background: linear-gradient(135deg, #e3f0ff 60%, #fff 100%);
    }
    .about-icon {
      font-size: 3.2rem;
      margin-bottom: 1.1rem;
      color: #3a5ba0;
      filter: drop-shadow(0 2px 8px #b388ff33);
      transition: color 0.2s;
    }
    .about-card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e335c;
      margin-bottom: 0.7rem;
    }
    .about-card-desc {
      color: #444;
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 0;
    }
    .about-bottom-text {
      max-width: 700px;
      margin: 2.5rem auto 0 auto;
      text-align: center;
    }
    .about-bottom-text p {
      font-size: 1.15rem;
      color: #222;
      margin-bottom: 1.5rem;
    }
    .about-contact-btn {
      background: linear-gradient(135deg, #1e335c, #3a5ba0);
      color: #fff;
      border: none;
      border-radius: 25px;
      padding: 0.8rem 2.2rem;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.3s, box-shadow 0.2s;
      box-shadow: 0 2px 12px #b388ff22;
    }
    .about-contact-btn:hover {
      opacity: 0.85;
      box-shadow: 0 6px 24px #b388ff33;
    }
    @media (max-width: 700px) {
      .about-cards-grid { grid-template-columns: 1fr; }
      .about-section { padding: 2rem 0.5rem; }
    }
  `]
})
export class AboutComponent {
  cards = [
    {
      icon: '⚽',
      title: 'Pasión por el Fútbol',
      desc: 'Vivimos y compartimos la pasión por el fútbol, conectando a hinchas de todo el país con productos auténticos.'
    },
    {
      icon: '🌎',
      title: 'Envíos Nacionales',
      desc: 'Llevamos camisetas y accesorios a cada rincón del país, con envíos rápidos y seguros.'
    },
    {
      icon: '🎁',
      title: 'Ediciones Exclusivas',
      desc: 'Ofrecemos ediciones limitadas y coleccionables para verdaderos fanáticos y coleccionistas.'
    },
    {
      icon: '🤝',
      title: 'Atención Personalizada',
      desc: 'Nuestro equipo brinda soporte real y cercano, resolviendo tus dudas y acompañándote en cada compra.'
    },
    {
      icon: '⭐',
      title: 'Calidad Garantizada',
      desc: 'Revisamos cada producto para asegurar la mejor experiencia y satisfacción en cada pedido.'
    }
  ];
}
