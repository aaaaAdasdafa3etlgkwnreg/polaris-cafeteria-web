import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private baseUrl = 'http://localhost:8080/producto';

  constructor(private httpClient: HttpClient) {}

  // ðŸ”¹ Obtener productos por categorÃ­a
  public getByCategoria(idCategoria: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/categoria/${idCategoria}`);
  }

  // ðŸ”¹ Obtener todos los productos
  public getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getall`);
  }

  // ðŸ”¹ Insertar producto con imagen
  public crearProductoConImagen(producto: any, imagen: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('producto', new Blob([JSON.stringify(producto)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.httpClient.post<any>(`${this.baseUrl}/con-imagen`, formData);
  }

  // ðŸ”¹ Actualizar producto e imagen (Multipart/form-data)
  public actualizarProducto(producto: any, imagen: File | null): Observable<any> {
    const formData = new FormData();

    // Convertimos el objeto producto en un Blob JSON compatible con @RequestPart en Spring Boot
    formData.append('producto', new Blob([JSON.stringify(producto)], {
      type: 'application/json'
    }));

    // Si hay una imagen seleccionada, la agregamos al FormData
    if (imagen) {
      formData.append('imagen', imagen);
    }

    // Utiliza PUT apuntando a /update
    return this.httpClient.put<any>(`${this.baseUrl}/update`, formData);
  }

  // ðŸ”¹ Eliminar producto
  public eliminarProducto(idProducto: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${idProducto}`);
  }
}
