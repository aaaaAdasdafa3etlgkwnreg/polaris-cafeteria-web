import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private items: any[] = [];

  /**
   * âœ… AGREGAR PRODUCTO AL CARRITO CON TOPPINGS Y SALSAS
   */
  agregar(producto: any) {
    console.log('ðŸ“¥ CarritoService.agregar() - Producto recibido:', producto);

    // âœ… Normalizar toppings y salsas (pueden ser strings o objetos)
    const salsas = this.normalizarAcompanamientos(producto.salsas || []);
    const toppings = this.normalizarAcompanamientos(producto.toppings || []);

    console.log('  â†’ Toppings normalizados:', toppings);
    console.log('  â†’ Salsas normalizadas:', salsas);

    // âœ… Buscar si existe el mismo producto CON los mismos acompaÃ±amientos
    const index = this.items.findIndex(
      p =>
        p.idProducto === producto.idProducto &&
        JSON.stringify(p.salsas || []) === JSON.stringify(salsas) &&
        JSON.stringify(p.toppings || []) === JSON.stringify(toppings)
    );

    // âœ… Si existe, aumentar cantidad. Si no, agregar nuevo item
    if (index >= 0) {
      this.items[index].cantidad++;
      console.log('âœ… Cantidad aumentada para producto:', producto.idProducto);
    } else {
      this.items.push({
        ...producto,
        salsas: salsas,
        toppings: toppings,
        cantidad: 1
      });
      console.log('âœ… Nuevo producto agregado al carrito');
    }

    console.log('ðŸ›’ Carrito actualizado:', this.items);
  }

  /**
   * âœ… NORMALIZAR ACOMPAÃ‘AMIENTOS
   * Convierte objetos con {id, nombre} en solo strings con nombres
   */
  private normalizarAcompanamientos(arr: any[]): string[] {
    if (!arr || arr.length === 0) {
      return [];
    }

    return arr.map(item => {
      // Si es string, retorna como estÃ¡
      if (typeof item === 'string') {
        return item;
      }
      // Si es objeto, extrae el nombre
      return item.nombre || item.name || String(item);
    });
  }

  /**
   * âœ… OBTENER ITEMS DEL CARRITO
   */
  obtenerItems() {
    return this.items;
  }

  /**
   * âœ… AUMENTAR CANTIDAD
   */
  aumentar(index: number) {
    if (index >= 0 && index < this.items.length) {
      this.items[index].cantidad++;
    }
  }

  /**
   * âœ… DISMINUIR CANTIDAD
   */
  disminuir(index: number) {
    if (index >= 0 && index < this.items.length) {
      if (this.items[index].cantidad > 1) {
        this.items[index].cantidad--;
      }
    }
  }

  /**
   * âœ… ELIMINAR ITEM
   */
  eliminar(index: number) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  /**
   * âœ… LIMPIAR CARRITO
   */
  limpiar() {
    this.items = [];
  }

  /**
   * âœ… CALCULAR TOTAL
   */
  total() {
    return this.items.reduce(
      (sum, item) => sum + (item.precioBase * item.cantidad),
      0
    );
  }
}
