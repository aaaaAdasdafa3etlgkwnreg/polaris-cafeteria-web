package com.epiis.app.dto;

import com.epiis.app.generic.DtoGeneric;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class DtoProducto extends DtoGeneric {
    @JsonProperty("idProducto")
    private String idProducto;

    @JsonProperty("idCategoria")
    private String idCategoria; 

    @JsonProperty("disponible")
    private Boolean disponible;

    @JsonProperty("nombre")
    private String nombre;

    @JsonProperty("precioBase")
    private Double precioBase;

    @JsonProperty("descripcion")
    private String descripcion;

    @JsonProperty("imagenUrl")
    private String imagenUrl;

    // --- ALIASES DE COMPATIBILIDAD CON FRONTEND (snake_case e id) ---

    @JsonProperty("id")
    public String getId() {
        return idProducto;
    }

    @JsonProperty("id")
    public void setId(String id) {
        if (this.idProducto == null) {
            this.idProducto = id;
        }
    }

    @JsonProperty("precio_base")
    public Double getPrecio_base() {
        return precioBase;
    }

    @JsonProperty("precio_base")
    public void setPrecio_base(Double precio_base) {
        if (this.precioBase == null) {
            this.precioBase = precio_base;
        }
    }

    // --- GETTERS Y SETTERS MANUALES ---

    public String getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(String idProducto) {
        this.idProducto = idProducto;
    }

    public String getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(String idCategoria) {
        this.idCategoria = idCategoria;
    }

    public Boolean getDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecioBase() {
        return precioBase;
    }

    public void setPrecioBase(Double precioBase) {
        this.precioBase = precioBase;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
}