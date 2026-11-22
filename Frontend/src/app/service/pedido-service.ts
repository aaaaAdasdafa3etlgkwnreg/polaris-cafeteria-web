import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  /**
   * âœ… Insertar nuevo pedido
   */
  insert(pedido: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pedido/insert`, pedido, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * âœ… Cambiar estado del pedido
   */
  cambioEstado(idPedido: string, estado: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/pedido/estado/${idPedido}`,
      { estado }
    );
  }

  /**
   * âœ… Actualizar un pedido
   */
  update(idPedido: string, pedido: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/pedido/${idPedido}`, pedido);
  }

  /**
   * âœ… Obtener estado actual del pedido
   */
  getEstadoPedido(idPedido: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pedido/estado/${idPedido}`);
  }

  /**
   * âœ… Obtener todos los pedidos
   */
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pedido/getall`);
  }

  /**
   * âœ… CORREGIDO - Obtener detalle del pedido CON ACOMPAÃ‘AMIENTOS
   * CAMBIO: Ahora llama a /pedidoItem/pedido/{idPedido}
   * que devuelve los items con el campo "acompanamientos"
   */
  getDetallePedido(idPedido: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pedidoItem/pedido/${idPedido}`);
  }

  /**
   * âœ… Solicitar cancelaciÃ³n de un pedido
   */
  solicitarCancelacion(idPedido: string, motivoCancelacion: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/pedido/${idPedido}/solicitar-cancelacion`, {
      motivoCancelacion
    });
  }

  /**
   * âœ… Responder a solicitud de cancelaciÃ³n
   */
  responderCancelacion(idPedido: string, aceptar: boolean): Observable<any> {
    return this.http.put(`${this.baseUrl}/pedido/${idPedido}/responder-cancelacion`, {
      aceptar
    });
  }

  /**
   * âœ… Finalizar un pedido
   */
  finalizarPedido(idPedido: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/pedido/finalizar`, { idPedido });
  }
}
