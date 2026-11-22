import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * âœ… SERVICIO CLIENTE - Gestiona autenticaciÃ³n de CLIENTES (DNI)
 * NO confundir con LoginService que es para EMPLEADOS
 */
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/auth';

  // âœ… Keys para sessionStorage (CLIENTE)
  private readonly CLIENT_TOKEN_KEY = 'cliente_token';
  private readonly CLIENT_ID_KEY = 'cliente_idCliente';
  private readonly CLIENT_NOMBRES_KEY = 'cliente_nombres';
  private readonly CLIENT_DNI_KEY = 'cliente_dni';

  constructor(private http: HttpClient) {}

  /**
   * âœ… RENIEC: Verifica DNI en RENIEC
   */
  registroDni(dni: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro-dni`, { dni });
  }

  /**
   * âœ… EMAIL: EnvÃ­a cÃ³digo OTP por email
   */
  enviarCodigoEmail(dni: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-codigo-email`, { dni, email });
  }

  /**
   * âœ… EMAIL: Confirma OTP y crea cuenta
   */
  confirmarOtp(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirmar-otp`, datos);
  }

  /**
   * âœ… LOGIN: Autentica cliente con DNI + ContraseÃ±a
   */
  loginCliente(dni: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-cliente`, { dni, password });
  }

  /**
   * âœ… Recuperar contraseÃ±a - Paso 1: Enviar cÃ³digo email
   */
  solicitudRecuperacionPassword(dni: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitud-recuperacion-password`, { dni, email });
  }

  /**
   * âœ… Recuperar contraseÃ±a - Paso 2: Confirmar cÃ³digo y cambiar contraseÃ±a
   */
  confirmarRecuperacionPassword(dni: string, email: string, codigo: string, passwordNueva: string, passwordConfirm: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirmar-recuperacion-password`, {
      dni,
      email,
      codigo,
      passwordNueva,
      passwordConfirm
    });
  }

  /**
   * âœ… Guardar token en sessionStorage
   */
  setTokenCliente(token: string): void {
    sessionStorage.setItem(this.CLIENT_TOKEN_KEY, token);
  }

  /**
   * âœ… Obtener token
   */
  getTokenCliente(): string | null {
    return sessionStorage.getItem(this.CLIENT_TOKEN_KEY);
  }

  /**
   * âœ… Guardar datos completos del cliente
   */
  setClienteDatos(idCliente: string, nombres: string, dni: string): void {
    sessionStorage.setItem(this.CLIENT_ID_KEY, idCliente);
    sessionStorage.setItem(this.CLIENT_NOMBRES_KEY, nombres);
    sessionStorage.setItem(this.CLIENT_DNI_KEY, dni);
  }

  /**
   * âœ… Obtener ID cliente
   */
  getIdCliente(): string | null {
    return sessionStorage.getItem(this.CLIENT_ID_KEY);
  }

  /**
   * âœ… Obtener nombres del cliente
   */
  getNombres(): string | null {
    return sessionStorage.getItem(this.CLIENT_NOMBRES_KEY);
  }

  /**
   * âœ… Obtener DNI cliente
   */
  getDni(): string | null {
    return sessionStorage.getItem(this.CLIENT_DNI_KEY);
  }

  /**
   * âœ… Verificar si cliente estÃ¡ logueado
   */
  isClienteLogueado(): boolean {
    return !!this.getTokenCliente();
  }

  /**
   * âœ… Logout cliente
   */
  logoutCliente(): void {
    // Limpiar sessionStorage
    sessionStorage.removeItem(this.CLIENT_TOKEN_KEY);
    sessionStorage.removeItem(this.CLIENT_ID_KEY);
    sessionStorage.removeItem(this.CLIENT_NOMBRES_KEY);
    sessionStorage.removeItem(this.CLIENT_DNI_KEY);
    sessionStorage.removeItem('idPedido');
    sessionStorage.removeItem('pedidos_listo_notificados');
    
    // Limpiar localStorage
    localStorage.removeItem('carrito');
    localStorage.removeItem('idPedido');
  }
}
