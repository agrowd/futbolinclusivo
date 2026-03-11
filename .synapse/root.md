# Fútbol Inclusivo — Root Map

## Proyecto
Plataforma web para la **Liga de Fútbol Inclusiva** de la Asociación Civil Andar.

## Stack
- **Frontend:** Next.js 14 (App Router) + React 18 + Tailwind CSS v4
- **Backend:** Next.js API Routes
- **Database:** MongoDB (Mongoose)
- **Font:** Atkinson Hyperlegible
- **Icons:** Lucide React

## Arquitectura
```
src/
├── app/                    # Pages (App Router)
│   ├── layout.js          # Root layout (font, header, footer)
│   ├── page.js            # Homepage
│   ├── nosotros/          # About page
│   ├── contacto/          # Contact page
│   ├── novedades/         # News page
│   ├── inscripcion/       # Multi-step tournament form
│   ├── canchas/           # Court rental calendar
│   └── api/               # API routes
│       ├── inscripcion/   # POST tournament registration
│       └── reservas/      # POST reservation + GET availability
├── components/
│   └── layout/            # Header, Footer, SkipLink
└── lib/
    ├── mongodb.js         # DB connection singleton
    └── schemas/           # Mongoose schemas (Team, Player, Reservation)
```

## Módulos Funcionales
1. **Inscripción a Torneos** — Formulario multi-step (3 pasos) con ARIA
2. **Alquiler de Canchas** — Calendario interactivo con prevención de overbooking
3. **Páginas informativas** — Nosotros, Contacto, Novedades

## Estado: MVP funcional
