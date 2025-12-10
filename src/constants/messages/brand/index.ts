// src/constants/messages/brand.ts
export const BRAND_MESSAGES = {
  CREATED_SUCCESS: "La marca se ha creado correctamente",
  UPDATED_SUCCESS: "La marca se ha actualizado correctamente",
  DELETED_SUCCESS: "La marca se ha eliminado correctamente",
  LIST_SUCCESS: "Las marcas se han obtenido correctamente",
  DETAIL_SUCCESS: "La marca se ha obtenido correctamente",

  NOT_FOUND: "La marca no existe",
  ALREADY_EXISTS: "Ya existe una marca con este nombre",
  DUPLICATED_NAME: "El nombre de la marca ya existe",

  HAS_PRODUCTS:
    "La marca no puede ser eliminada porque tiene productos asociados",

  FORBIDDEN: "No tienes permiso para realizar esta acción",
} as const;
