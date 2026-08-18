"use strict";
import Joi from "joi";

export const VehiculoBodyValidation = Joi.object({
  patente: Joi.string()
    .min(6)
    .max(6)
    .pattern(/^[A-Z]{4}[0-9]{2}$/ || /^[A-Z]{2}[0-9]{4}$/ || /^[A-Z]{3}[0-9]{2}$/ || /^[A-Z]{3}[0-9]{3}$/)
    .messages({
      "string.empty": "La patente no puede estar vacía.",
      "string.min": "La patente debe tener 6 caracteres.",
      "string.max": "La patente debe tener 6 caracteres.",
      "string.pattern.base": "La patente solo puede contener letras y numeros",
    }),
  modelo: Joi.string()
    .min(3)
    .max(250)
    .messages({
      "string.empty": "El modelo no puede estar vacío.",
      "string.min": "El modelo debe tener como mínimo 3 caracteres.",
      "string.max": "El modelo debe tener como máximo 250 caracteres.",
    })
    .custom(domainEmailValidator, "Validación dominio email"),
  color: Joi.string()
    .min(1)
    .max(50)
    .messages({
      "string.empty": "El modelo no puede estar vacío.",
      "string.min": "El modelo debe tener como mínimo 3 caracteres.",
      "string.max": "El modelo debe tener como máximo 250 caracteres.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
