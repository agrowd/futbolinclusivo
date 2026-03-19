# 🎨 Estándares de Diseño - Fútbol Inclusivo

Este documento establece los **estándares mínimos de diseño** para garantizar accesibilidad y consistencia visual en todo el sitio.

---

## 📏 Tamaños de Texto Mínimos

### ❌ **NUNCA usar:**
- `text-[9px]` - Demasiado pequeño
- `text-[10px]` - Demasiado pequeño
- `text-[11px]` - Demasiado pequeño
- `text-[12px]` - Usar `text-xs` en su lugar

### ✅ **Usar siempre:**

#### **Badges y Pills (categorías, fechas, estados)**
```jsx
className="px-6 py-2.5 rounded-full font-black text-sm tracking-wider uppercase border-2"
```
- **Tamaño mínimo:** `text-sm` (14px)
- **Padding:** `px-6 py-2.5` o mayor
- **Border:** `border-2` (más visible)
- **Forma:** `rounded-full` (más moderno)

#### **Labels y Subtítulos**
```jsx
className="text-xs font-bold uppercase tracking-wider"
```
- **Tamaño mínimo:** `text-xs` (12px)
- **Nunca menos de 12px**

#### **Botones Principales**
```jsx
className="px-10 py-4 font-black text-sm tracking-wider uppercase"
```
- **Tamaño mínimo:** `text-sm` (14px)
- **Padding mínimo:** `px-10 py-4`
- **Border:** `border-2` para mejor visibilidad

#### **Botones Secundarios**
```jsx
className="px-8 py-3 font-bold text-sm tracking-wider"
```
- **Tamaño mínimo:** `text-sm` (14px)
- **Padding mínimo:** `px-8 py-3`

#### **Texto de Navegación**
```jsx
className="text-sm font-black tracking-wider uppercase"
```
- **Tamaño mínimo:** `text-sm` (14px)

---

## 🎯 Números y Contadores

### **Números de Resultados (Partidos)**
```jsx
<div className="bg-gray-200 px-10 py-5 rounded-2xl font-black text-2xl border-2 border-gray-300">
  <span>2</span>
  <span className="opacity-30">-</span>
  <span>0</span>
</div>
```
- **Tamaño:** `text-2xl` o `text-3xl`
- **Padding:** `px-10 py-5` mínimo
- **Background:** Contraste alto (gray-200 en lugar de gray-100)
- **Border:** `border-2` para mejor definición

### **Contadores (Countdown)**
```jsx
<div className="text-2xl md:text-3xl font-black">00</div>
<div className="text-xs font-black opacity-40">DÍAS</div>
```
- **Números:** `text-2xl` o mayor
- **Labels:** `text-xs` mínimo

---

## 📐 Espaciado

### **Entre Labels e Inputs**
```jsx
<label className="mb-4">Email</label>
<input />
```
- **Margen mínimo:** `mb-4` (16px)

### **Entre Secciones**
```jsx
<section className="py-24 md:py-32 lg:py-40">
```
- **Padding vertical:** `py-24` mínimo en mobile
- **Nunca usar:** `py-48` o mayor (demasiado espacio)

### **Entre Cards**
```jsx
<div className="space-y-10">
```
- **Gap mínimo:** `space-y-10` o `gap-10`

### **Dentro de Cards**
```jsx
<div className="p-6 md:p-8 lg:p-10">
```
- **Padding mínimo:** `p-6` en mobile

---

## 🎨 Contraste y Visibilidad

### **Backgrounds para Números/Badges**
- ✅ **Usar:** `bg-gray-200`, `bg-white`, colores con buen contraste
- ❌ **Evitar:** `bg-gray-100` (poco contraste), `bg-white/5` para texto importante

### **Borders**
- **Mínimo:** `border-2` para elementos interactivos
- **Badges:** `border-2 border-[color]/30`
- **Botones:** `border-2 border-white/30`

### **Opacidad de Texto**
- **Texto principal:** `text-white` (100%)
- **Texto secundario:** `text-white/70` o `text-white/60`
- **Texto terciario:** `text-white/50` (mínimo)
- ❌ **Nunca:** `text-white/40` o menos para texto importante

---

## 🔤 Tracking (Espaciado de Letras)

### **Reemplazar valores personalizados:**
- ❌ `tracking-[2px]` → ✅ `tracking-wider`
- ❌ `tracking-[3px]` → ✅ `tracking-wider`
- ❌ `tracking-[4px]` → ✅ `tracking-widest`
- ❌ `tracking-[5px]` → ✅ `tracking-widest`

### **Usar clases estándar:**
- `tracking-tight` - Para títulos grandes
- `tracking-normal` - Para texto normal
- `tracking-wide` - Para subtítulos
- `tracking-wider` - Para badges y botones
- `tracking-widest` - Para labels muy espaciados

---

## 📱 Responsive

### **Tamaños de Texto Responsive**
```jsx
// ✅ CORRECTO
className="text-sm md:text-base"
className="text-base md:text-lg"
className="text-xl md:text-2xl lg:text-3xl"

// ❌ INCORRECTO
className="text-[10px] md:text-[12px]"
className="text-[11px] md:text-[14px]"
```

### **Padding Responsive**
```jsx
// ✅ CORRECTO
className="px-6 py-2.5 md:px-8 md:py-3"
className="p-6 md:p-8 lg:p-10"

// ❌ INCORRECTO
className="p-4 md:p-14 lg:p-16" // Salto muy grande
```

---

## 🎯 Checklist para Nuevos Componentes

Antes de crear un nuevo componente, verifica:

- [ ] ¿Todos los textos son `text-xs` o mayores?
- [ ] ¿Los badges usan `text-sm` y `rounded-full`?
- [ ] ¿Los botones tienen padding mínimo `px-8 py-3`?
- [ ] ¿Los números importantes son `text-2xl` o mayores?
- [ ] ¿Los borders son `border-2` para elementos importantes?
- [ ] ¿El contraste de texto es suficiente (min `text-white/50`)?
- [ ] ¿El espaciado entre elementos es consistente?
- [ ] ¿Se usan clases de Tailwind estándar en lugar de valores custom?

---

## 🚫 Anti-Patrones (NO HACER)

### ❌ **Textos muy pequeños**
```jsx
// MAL
<span className="text-[9px]">LABEL</span>
<span className="text-[10px]">LABEL</span>
```

### ❌ **Padding insuficiente en botones**
```jsx
// MAL
<button className="px-4 py-2 text-[11px]">CLICK</button>
```

### ❌ **Números sin contraste**
```jsx
// MAL
<div className="bg-gray-100 p-4 text-xl">2 - 0</div>
```

### ❌ **Badges sin border**
```jsx
// MAL
<div className="bg-[#36b37e]/10 px-4 py-1.5 text-[10px]">TAG</div>
```

### ❌ **Tracking custom innecesario**
```jsx
// MAL
<span className="tracking-[3px]">TEXT</span>
// BIEN
<span className="tracking-wider">TEXT</span>
```

---

## ✅ Ejemplos Correctos

### **Badge Estándar**
```jsx
<div className="inline-flex items-center gap-3 bg-[#36b37e]/10 text-[#36b37e] px-6 py-2.5 rounded-full font-black text-sm tracking-wider uppercase border-2 border-[#36b37e]/30">
  <Icon size={16} />
  CATEGORÍA
</div>
```

### **Botón Principal**
```jsx
<button className="bg-[#36b37e] text-white px-10 py-4 rounded-2xl font-black text-sm tracking-wider uppercase border-2 border-white/30 hover:bg-[#2da372] transition-all">
  ACCIÓN
</button>
```

### **Número de Resultado**
```jsx
<div className="bg-gray-200 px-10 py-5 rounded-2xl font-black text-2xl border-2 border-gray-300 shadow-inner">
  <span>2</span>
  <span className="opacity-30 mx-2">-</span>
  <span>0</span>
</div>
```

### **Label de Formulario**
```jsx
<label className="block text-white/80 text-sm font-bold uppercase tracking-wider mb-4">
  Email
</label>
```

---

## 📝 Notas Importantes

1. **Accesibilidad primero:** Todos los tamaños deben cumplir WCAG AA (mínimo 12px para texto normal)
2. **Consistencia:** Usar las mismas clases para elementos similares
3. **Responsive:** Siempre considerar mobile, tablet y desktop
4. **Contraste:** Verificar que el texto sea legible en todos los fondos
5. **Espaciado:** Dar aire a los elementos, evitar que se vean apretados

---

**Última actualización:** Marzo 2026
**Versión:** 1.0
