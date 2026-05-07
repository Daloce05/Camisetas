import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-section">
      <div class="section-header">
        <h1>Gestionar Productos</h1>
        <button (click)="showForm = !showForm; resetForm()" class="btn-new">
          {{ showForm ? 'Cancelar' : '+ Nuevo Producto' }}
        </button>
      </div>

      <!-- Form -->
      <div *ngIf="showForm" class="form-card">
        <h3>{{ editingId ? 'Editar' : 'Nuevo' }} Producto</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" [(ngModel)]="form.nombre" placeholder="Nombre del producto">
          </div>
          <div class="form-group">
            <label>Precio</label>
            <input type="number" [(ngModel)]="form.precio" placeholder="0.00" step="0.01">
          </div>
          <div class="form-group">
            <label>Tallas y stock</label>
            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
              <select [(ngModel)]="tallaInput" style="width: 100px;">
                <option value="">Talla</option>
                <option *ngFor="let t of tallasPredefinidas" [value]="t">{{ t }}</option>
              </select>
              <input type="number" [(ngModel)]="stockInput" placeholder="Stock" style="width: 80px;">
              <button type="button" (click)="addTalla()" [disabled]="!tallaInput || stockInput < 0">Agregar</button>
            </div>
            <div *ngIf="form.tallas.length > 0" style="margin-top: 0.5rem;">
              <span *ngFor="let t of form.tallas; let i = index" style="display: inline-block; background: #f3e8ff; color: #3a5ba0; border-radius: 8px; padding: 0.2rem 0.7rem; margin-right: 0.5rem; margin-bottom: 0.3rem;">
                {{ t.talla }}: {{ t.stock }}
                <button type="button" (click)="removeTalla(i)" style="background: none; border: none; color: #e74c3c; margin-left: 4px; cursor: pointer;">x</button>
              </span>
            </div>
          </div>
          <div class="form-group">
            <label>Categoría</label>
            <select [(ngModel)]="form.categoryId">
              <option [ngValue]="null">Seleccionar...</option>
              <option *ngFor="let cat of categories" [ngValue]="cat.id">{{ cat.nombre }}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea [(ngModel)]="form.descripcion" rows="3" placeholder="Descripción del producto"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Imágenes (máx. 3)</label>
            <input type="file" (change)="onFilesSelected($event)" accept="image/*" multiple>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="form.destacado">
              Producto Destacado
            </label>
          </div>
        </div>
        <div class="error" *ngIf="error">{{ error }}</div>
        <button (click)="save()" class="btn-save">{{ editingId ? 'Actualizar' : 'Crear' }} Producto</button>
      </div>

      <!-- Search -->
      <div class="search-bar">
        <input type="text" [(ngModel)]="search" (input)="loadProducts()" placeholder="Buscar productos...">
      </div>

      <!-- Table -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Tallas/Stock</th>
              <th>Destacado</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of products">
              <td>{{ p.id }}</td>
              <td>{{ p.nombre }}</td>
              <td>{{ p.categoria?.nombre }}</td>
              <td>\${{ p.precio }}</td>
              <td>
                <ng-container *ngIf="p.tallas && p.tallas.length > 0; else noTallas">
                  <span *ngFor="let t of p.tallas" style="display:inline-block; background:#f3e8ff; color:#3a5ba0; border-radius:8px; padding:0.1rem 0.5rem; margin-right:0.3rem; margin-bottom:0.2rem;">
                    {{ t.talla }}: {{ t.stock }}
                  </span>
                </ng-container>
                <ng-template #noTallas><span style="color:#aaa">-</span></ng-template>
              </td>
              <td><span [class]="p.destacado ? 'badge-yes' : 'badge-no'">{{ p.destacado ? 'Sí' : 'No' }}</span></td>
              <td><span [class]="p.activo ? 'badge-yes' : 'badge-no'">{{ p.activo ? 'Sí' : 'No' }}</span></td>
              <td class="actions">
                <button (click)="edit(p)" class="btn-edit">✏️</button>
                <button (click)="delete(p.id)" class="btn-delete">🗑️</button>
                <button (click)="deletePermanent(p.id)" class="btn-delete" title="Eliminar permanentemente">❌</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  providers: [ProductService, CategoryService],
  styles: [`
    .admin-section h1 {
      color: #181818;
      background: none;
    }
    .section-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;
    }
    .btn-new {
      padding: 0.6rem 1.5rem;
      background: linear-gradient(135deg, #b388ff, #ff80ab);
      border: none; border-radius: 10px;
      color: white; cursor: pointer; font-weight: 600;
    }
    .form-card {
      background: #ffffff;
      border: 1px solid rgba(179, 136, 255, 0.12);
      border-radius: 16px; padding: 2rem; margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(179, 136, 255, 0.06);
    }
    .form-card h3 { color: #2d2d3f; margin-bottom: 1.5rem; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-row { display: flex; gap: 1rem; align-items: end; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; color: #666; margin-bottom: 0.3rem; font-size: 0.9rem; }
    .form-group input, .form-group textarea, .form-group select {
      width: 100%; padding: 0.65rem 0.8rem;
      background: #f9f7fc;
      border: 1px solid rgba(179, 136, 255, 0.2);
      border-radius: 8px; color: #333; font-family: inherit;
    }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #b388ff; }
    .form-group select option { background: #ffffff; }
    .checkbox-label {
      display: flex !important; align-items: center; gap: 0.5rem; cursor: pointer; color: #666 !important;
    }
    .error { color: #e74c3c; margin-bottom: 1rem; padding: 0.5rem; background: rgba(231,76,60,0.08); border-radius: 6px; }
    .btn-save {
      padding: 0.7rem 2rem;
      background: linear-gradient(135deg, #b388ff, #ff80ab);
      border: none; border-radius: 10px;
      color: white; cursor: pointer; font-weight: 600;
    }
    .search-bar { margin-bottom: 1.5rem; }
    .search-bar input {
      width: 100%; max-width: 400px; padding: 0.65rem 1rem;
      background: #ffffff;
      border: 1px solid rgba(179, 136, 255, 0.2);
      border-radius: 10px; color: #333;
      box-shadow: 0 1px 4px rgba(179, 136, 255, 0.06);
    }
    .search-bar input:focus { outline: none; border-color: #b388ff; }
    .search-bar input::placeholder { color: #aaa; }
    .table-container { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(179, 136, 255, 0.06); }
    th {
      background: rgba(179, 136, 255, 0.06);
      color: #888; padding: 0.8rem; text-align: left; font-size: 0.85rem;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    td {
      padding: 0.8rem; color: #555; border-bottom: 1px solid rgba(179, 136, 255, 0.06);
      font-size: 0.9rem;
    }
    tr:hover { background: rgba(179, 136, 255, 0.03); }
    .badge-yes { color: #27ae60; background: rgba(46,204,113,0.1); padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.8rem; }
    .badge-no { color: #c0392b; background: rgba(231,76,60,0.1); padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.8rem; }
    .actions { display: flex; gap: 0.5rem; }
    .btn-edit, .btn-delete {
      background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 0.3rem;
    }
    @media (max-width: 768px) {
      .section-header { flex-wrap: wrap; gap: 0.8rem; }
      .section-header h1 { font-size: 1.3rem; }
      .form-grid { grid-template-columns: 1fr; }
      .form-row { flex-direction: column; gap: 0; }
      .search-bar input { max-width: 100%; }
      .btn-new { width: 100%; text-align: center; justify-content: center; }
    }
    @media (max-width: 480px) {
      .form-card { padding: 1.2rem; }
      .admin-section h1 { font-size: 1.2rem; }
    }
  `]
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  showForm = false;
  editingId: number | null = null;
  search = '';
  error = '';
  selectedFiles: File[] = [];
  form = { nombre: '', descripcion: '', precio: 0, tallas: [] as { talla: string; stock: number }[], categoryId: null as number | null, destacado: false };

  // Para gestión de tallas
  tallaInput: string = '';
  stockInput: number = 0;
  tallasPredefinidas: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

  addTalla() {
    if (!this.tallaInput || this.stockInput < 0) return;
    const exists = this.form.tallas.some(t => t.talla === this.tallaInput);
    if (exists) return;
    this.form.tallas.push({ talla: this.tallaInput, stock: this.stockInput });
    this.tallaInput = '';
    this.stockInput = 0;
  }

  removeTalla(index: number) {
    this.form.tallas.splice(index, 1);
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  loadProducts() {
    this.productService.getAdminProducts({ search: this.search }).subscribe((res: any) => {
      this.products = res.data.products;
    });
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = [];
    for (let i = 0; i < Math.min(files.length, 3); i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  resetForm() {
    this.form = { nombre: '', descripcion: '', precio: 0, tallas: [], categoryId: null, destacado: false };
    this.editingId = null;
    this.selectedFiles = [];
    this.error = '';
  }

  save() {
    if (!this.form.nombre || !this.form.categoryId) {
      this.error = 'Nombre y categoría son requeridos.';
      return;
    }

    // Validar tallas: solo objetos válidos { talla, stock }
    let tallas = Array.isArray(this.form.tallas)
      ? this.form.tallas.filter(t => t && typeof t.talla === 'string' && t.talla.length > 0 && typeof t.stock === 'number' && t.stock >= 0)
      : [];

    // Si no hay tallas válidas, advertir
    if (tallas.length === 0) {
      if (!confirm('No se han agregado tallas válidas. ¿Deseas continuar y crear el producto sin tallas?')) return;
    }

    const formData = new FormData();
    formData.append('nombre', this.form.nombre);
    formData.append('descripcion', this.form.descripcion);
    formData.append('precio', this.form.precio.toString());
    formData.append('tallas', JSON.stringify(tallas));
    formData.append('categoryId', this.form.categoryId!.toString());
    formData.append('destacado', this.form.destacado.toString());
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file, idx) => {
        formData.append('imagenes', file);
      });
    }

    const req = this.editingId
      ? this.productService.updateProduct(this.editingId, formData)
      : this.productService.createProduct(formData);

    req.subscribe({
      next: () => { this.showForm = false; this.resetForm(); this.loadProducts(); },
      error: (err: any) => this.error = err.error?.message || 'Error al guardar.'
    });
  }

  edit(product: Product) {
    this.editingId = product.id;
    this.form = {
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      tallas: product.tallas ? [...product.tallas] : [],
      categoryId: product.categoria?.id || null,
      destacado: product.destacado
    };
    this.showForm = true;
    // this.selectedFile = null;
    this.error = '';
  }

  delete(id: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  deletePermanent(id: number) {
    if (confirm('¿Eliminar PERMANENTEMENTE este producto? Esta acción no se puede deshacer.')) {
      this.productService.deleteProductPermanent(id).subscribe(() => this.loadProducts());
    }
  }
}
