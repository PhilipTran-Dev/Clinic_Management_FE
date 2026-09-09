CLINICAL DESIGN SYSTEM SPECIFICATIONDesign Language: Modern Clinical Minimalist & Conversion-Centered Design (CCD)Target Applications: Patient App, Kiosk Terminal, Doctor EHR Portal, Pharmacy Dashboard, Admin Portal1. Core PrinciplesClinical Trust & Hygiene: Visual aesthetics must communicate safety, sterility, and institutional authority. Avoid gaudy multi-color gradients, excessive micro-animations, or harsh drop shadows.Low Cognitive Load: Patients and medical staff operate under stress or time-sensitive workflows. Use card-based modular layouts, generous white space, and clear scanning patterns.Visual Hierarchy & High Contrast: Distinguish primary diagnostic actions from secondary reference data instantly. Strictly adhere to WCAG 2.1 AA contrast ratios for readability across diverse age groups.Context-Driven Data Density:Patient App & Kiosk: Low density, large hit-targets (touch-first), simplified step-by-step guidance.Doctor EHR & Pharmacy: High density, split-screen views, condensed tabular data, keyboard navigation support.2. Design Tokens: Color PaletteBrand Colors (Clinical Trust & Reliability):
- Primary (Clinical Blue):    #0284C7  (Tailwind: sky-600)
- Primary Dark (Deep Trust):  #0369A1  (Tailwind: sky-700)
- Primary Light (Soft Tint):  #E0F2FE  (Tailwind: sky-100)
- Secondary (Medical Teal):   #0D9488  (Tailwind: teal-600)

Accent & Conversion (High-Contrast CTAs):
- Accent (Warm Coral / CTA):  #F97316  (Tailwind: orange-500)
- Accent Hover:               #EA580C  (Tailwind: orange-600)

Neutrals & Surfaces (Clean Slate):
- Background Main:            #F8FAFC  (Tailwind: slate-50)
- Surface / Card:             #FFFFFF  (Pure White)
- Border / Divider:           #E2E8F0  (Tailwind: slate-200)
- Text Primary (Headers):     #0F172A  (Tailwind: slate-900)
- Text Secondary (Body):      #475569  (Tailwind: slate-600)
- Text Muted (Labels/Place):  #94A3B8  (Tailwind: slate-400)

Clinical Status & Triage (FHIR / Priority Levels):
- Priority 1 (Critical/Red):  #DC2626  (Tailwind: red-600)   | Background: #FEF2F2 (red-50)
- Priority 2 (Urgent/Amber):  #D97706  (Tailwind: amber-600) | Background: #FFFBEB (amber-50)
- Priority 3-5 (Routine):     #16A34A  (Tailwind: green-600) | Background: #F0FDF4 (green-50)
- Information / FHIR Sync:    #2563EB  (Tailwind: blue-600)  | Background: #EFF6FF (blue-50)
3. Typography & HierarchyFont Family: Inter, Plus Jakarta Sans, or modern system sans-serif (system-ui, -apple-system, sans-serif).Scale & Weight System:Display (Kiosk Queue / Landing Hero): 32px – 40px | font-bold | tracking-tightHeading 1 (Page Title): 24px | font-bold | leading-tightHeading 2 (Card / Section Header): 18px | font-semibold | leading-normalHeading 3 (Table Header / Form Group): 14px | font-medium | text-slate-700Body Regular (Symptoms, Instructions): 15px – 16px | font-normal | leading-relaxedCaption / Meta (ICD-10, Timestamps, FHIR Tags): 12px – 13px | font-medium | text-slate-5004. Geometry, Elevation & LayoutBorder Radius:Containers, Cards, Modals: rounded-xl (12px) or rounded-2xl (16px).Buttons, Inputs, Selectors: rounded-lg (8px).Status Badges, Priority Pills: rounded-full (9999px).Kiosk Tap Targets: Minimum h-14 / rounded-xl with generous padding.Borders & Dividers:All structural cards require thin explicit borders: border border-slate-200/80.Elevation (Soft Clinical Shadow):Card Default: shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]Card Hover / Flyout Menu: shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]Modal / Drawer Overlay: shadow-2xl5. Specialized Clinical ComponentsAction Controls (Buttons & CTAs)Primary Conversion CTA: Coral #F97316 or Clinical Blue #0284C7, white bold text, px-5 py-2.5, rounded-lg, subtle 10% brightness drop on hover.Secondary Action: Transparent or #F1F5F9 background, #CBD5E1 border, #334155 text.Critical / Emergency Action: Red #DC2626, bold white text.Clinical & Diagnostic CardsStructure: Solid-color medical glyph inside a soft circle background $\rightarrow$ Clinical condition / department name (Bold) $\rightarrow$ Short diagnosis copy $\rightarrow$ Triage badge.Selected / Active State: High-contrast border border-sky-600, subtle background tint bg-sky-50/50.Ambient Audio Indicator (Consultation Recording)Visible during active recording:Persistent fixed bar with pulsating red beacon (animate-pulse).Real-time audio waveform visualizer bars colored in sky-600.Elapsed timer display coupled with an explicit "Stop & Parse SOAP" action button.Clinical Workspace (EHR / SOAP / ICD-10 Parsing)Split-panel interface (50/50 or 60/40 screen ratio):Left Column: Live medical transcript stream with highlighted medical entity tags.Right Column: Tabbed SOAP framework (Subjective, Objective, Assessment, Plan) with inline editable input fields.Suggested ICD-10 Codes: Render as interactive chips with removal triggers (x) and quick search autocomplete.6. Tailwind CSS Preset ConfigurationJavaScript// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        clinical: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        cta: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
        },
        triage: {
          p1: '#DC2626',
          p2: '#D97706',
          p3: '#16A34A',
        }
      },
      borderRadius: {
        clinical: '12px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        elevated: '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
      }
    }
  }
}
7. Frontend Agent Negative Constraints (Anti-Patterns)No Default Dark Mode for Patient, Kiosk, or Pharmacy flows: Clinical operations require a pristine, bright, high-legibility light surface. (EHR can support an optional toggle, but defaults to light).No Zero-Radius Corners or Overly Playful Geometries: Do not use rounded-none or bubble-style rounded-3xl cards. Maintain precise rounded-lg to rounded-xl forms.No Hidden Emergency or Checkout CTAs: Primary conversion actions must never be buried behind hamburger menus or nested accordions.Mandatory AI Disclaimer Badges: Every unreviewed output derived from Whisper or LLMs must display an [AI-Draft] pill badge (amber or violet tint) until explicitly approved by the attending physician.No Serif or Decorative Script Fonts: Use strict geometric Sans-Serif typefaces to prevent misinterpretations of drug names and numerical dosages.