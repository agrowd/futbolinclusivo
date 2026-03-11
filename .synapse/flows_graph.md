# Flujos de Datos

## Inscripción a Torneos
```
Usuario → [Step 1: Team Data] → [Step 2: Player Roster (dynamic)] → [Step 3: Medical Upload/Presencial]
  → POST /api/inscripcion (FormData)
    → Mongoose Team.create() (players embebidos)
    → File upload to /public/uploads (si digital)
    → Response {success, teamId}
```

## Alquiler de Canchas
```
Usuario → Selecciona cancha → Selecciona fecha en calendario
  → GET /api/reservas/disponibilidad?courtId=X&date=Y
    → Muestra slots disponibles/reservados
  → Selecciona slot → Completa datos de contacto
  → POST /api/reservas
    → findOne check (overbooking) + Mongoose create()
    → Compound unique index fallback (code 11000)
    → Response {success, reservationId}
```
