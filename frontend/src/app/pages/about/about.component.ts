import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="about-section">
      <div class="container">
        <h2 class="about-title">¿Quiénes Somos?</h2>
        <div class="about-content">
          <div class="about-text">
            <p>
              Somos fanáticos del fútbol y la cultura deportiva. En <b>Camisetas</b> nos dedicamos a ofrecer camisetas originales, réplicas y accesorios para verdaderos hinchas. Nuestro equipo está comprometido con la calidad, la autenticidad y la atención personalizada.
            </p>
            <ul class="about-list">
              <li>⚽ Más de 10 años vistiendo a fanáticos</li>
              <li>🌎 Envíos a todo el país</li>
              <li>🎁 Ediciones limitadas y coleccionables</li>
              <li>🤝 Atención cercana y soporte real</li>
            </ul>
            <button class="about-contact-btn" routerLink="/contacto">¡Contáctanos!</button>
          </div>
          <div class="about-gallery">
            <img src="/assets/images/about1.jpg" alt="Equipo Camisetas" class="about-img">
            <img src="/assets/images/about2.jpg" alt="Clientes felices" class="about-img">
            <img src="/assets/images/about3.jpg" alt="Pasión por el fútbol" class="about-img">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section { padding: 4rem 1.5rem; background: #f8f9fa; }
    .about-title { text-align: center; font-size: 2.2rem; font-weight: 800; color: #3a5ba0; margin-bottom: 2.5rem; }
    .about-content { display: flex; flex-wrap: wrap; gap: 2.5rem; align-items: center; justify-content: center; }
    .about-text { flex: 1 1 320px; min-width: 320px; max-width: 500px; }
    .about-text p { font-size: 1.15rem; color: #222; margin-bottom: 1.5rem; }
    .about-list { list-style: none; padding: 0; margin-bottom: 2rem; }
    .about-list li { font-size: 1.05rem; margin-bottom: 0.7rem; display: flex; align-items: center; gap: 0.5rem; }
    .about-contact-btn { background: linear-gradient(135deg, #1e335c, #3a5ba0); color: #fff; border: none; border-radius: 25px; padding: 0.7rem 2rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: opacity 0.3s; }
    .about-contact-btn:hover { opacity: 0.85; }
    .about-gallery { display: flex; flex-direction: column; gap: 1.2rem; flex: 1 1 220px; min-width: 220px; align-items: center; }
    .about-img { width: 220px; height: 140px; object-fit: cover; border-radius: 16px; box-shadow: 0 2px 12px rgba(30,51,92,0.08); border: 2px solid #e0e0e0; }
    @media (max-width: 900px) {
      .about-content { flex-direction: column; align-items: stretch; }
      .about-gallery { flex-direction: row; justify-content: center; }
      .about-img { width: 120px; height: 80px; }
    }
  `]
})
export class AboutComponent {}
