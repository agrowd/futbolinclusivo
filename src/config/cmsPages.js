/**
 * Definición de campos personalizados para páginas del CMS que tienen estructuras complejas.
 */
export const CMS_PAGE_CONFIGS = {
  "home": {
    fields: [
      { id: "hero_badge", label: "Etiqueta Hero (Pequeña)", type: "text", placeholder: "DESDE 1998" },
      { id: "hero_title", label: "Título Principal (HTML permitido)", type: "text" },
      { id: "hero_subtitle", label: "Subtítulo Hero", type: "textarea" },
      { id: "hero_image", label: "Imagen de Fondo Hero (URL)", type: "text" },
      { id: "action_buttons", label: "Botones de Acción Rápidos", type: "array", 
        itemFields: [
          { id: "label", label: "Texto", type: "text" },
          { id: "desc", label: "Subtexto", type: "text" },
          { id: "href", label: "Link", type: "text" },
          { id: "color", label: "Color de Fondo (Hex)", type: "text" },
          { id: "icon", label: "Icono (Lucide)", type: "text" }
        ]
      }
    ]
  },
  "institucional": {
    fields: [
      { id: "hero_image", label: "Imagen Hero (URL)", type: "text" },
      { id: "hero_label", label: "Etiqueta Hero", type: "text", placeholder: "Institucional" },
      { id: "hero_description", label: "Descripción Hero", type: "textarea" },
      { id: "mission_title", label: "Título Sección Misión", type: "text" },
      { id: "mission_desc", label: "Descripción Misión", type: "textarea" },
      { id: "vision_title", label: "Título Sección Visión", type: "text" },
      { id: "vision_desc", label: "Descripción Visión", type: "textarea" },
      { id: "objective_title", label: "Título Sección Objetivo", type: "text" },
      { id: "objective_desc", label: "Descripción Objetivo", type: "textarea" }
    ]
  },
  "sumate": {
    fields: [
      { id: "hero_title", label: "Título Hero", type: "text" },
      { id: "hero_description", label: "Descripción Hero", type: "textarea" },
      { id: "participation_options", label: "Opciones (Tarjetas)", type: "array", 
        itemFields: [
          { id: "title", label: "Título", type: "text" },
          { id: "description", label: "Descripción", type: "textarea" },
          { id: "icon", label: "Icono", type: "text" },
          { id: "href", label: "Link", type: "text" },
          { id: "color", label: "Color", type: "text" }
        ]
      }
    ]
  },
  "programas": {
    fields: [
      { id: "hero_label", label: "Etiqueta Hero", type: "text" },
      { id: "hero_title", label: "Título Principal", type: "text" },
      { id: "programs_list", label: "Programas", type: "array", 
        itemFields: [
          { id: "title", label: "Nombre", type: "text" },
          { id: "description", label: "Descripción", type: "textarea" },
          { id: "icon", label: "Icono", type: "text" },
          { id: "color", label: "Color", type: "text" }
        ]
      }
    ]
  },
  "canchas": {
    fields: [
      { id: "hero_title", label: "Título Hero", type: "text" },
      { id: "hero_subtitle", label: "Subtítulo Hero", type: "textarea" }
    ]
  },
  "inscripcion": {
    fields: [
      { id: "hero_title", label: "Título Hero", type: "text" },
      { id: "hero_description", label: "Descripción Hero", type: "textarea" },
      { id: "form_notice", label: "Aviso importante", type: "textarea" }
    ]
  }
};
