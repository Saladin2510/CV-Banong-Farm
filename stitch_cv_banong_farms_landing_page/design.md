# UI/UX Technical Specification: CV Banong Farms Ajibarang (User Landing Page)
## 1. Project Overview
A premium, highly interactive, and visually driven landing page for an agribusiness. The core objective is to showcase farm products, enable WhatsApp ordering, and provide AI chatbot assistance.
**CRITICAL RULE:** Keep text content to an absolute minimum. Rely on visual hierarchy, imagery, and UI elements to convey information.
## 2. Design System & Variables
### Typography
*   **Primary Font:** `Inter`, sans-serif (Import from Google Fonts).
*   **Weights:** Regular (400) for body, Medium (500) for buttons/badges, Bold (700) for Headings.
### Color Palette (60-30-10 Rule)
*   **60% Dominant (Backgrounds):** 
    *   `#FFFFFF` (Clean White) for main backgrounds.
    *   `#F8FAFC` (Very Light Gray) for alternating section backgrounds (if needed).
*   **30% Secondary (Brand/Contrast):** 
    *   `#1E3A5F` (Deep Navy Blue) for Navbar, Footer, Headings, and primary text.
*   **10% Accent (Highlights/Calls to Action):** 
    *   `#FFD700` (Vibrant Yellow) for primary buttons, stock badges, and highlights.
*   **Success Action (Specific for WhatsApp):**
    *   `#25D366` (WhatsApp Green) exclusively for the order buttons on product cards.
### UI Components Style
*   **Border Radius:** `8px` to `12px` (rounded-lg or rounded-xl) for modern feel.
*   **Shadows:** Soft, diffused drop-shadows. `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`.
---
## 3. Section Architecture & Code Instructions
### A. Sticky Navbar
*   **Layout:** Flexbox, `justify-between`, `items-center`.
*   **Behavior:** Sticky top, `z-index: 50`. Transparent background at the top, transitioning to solid White (`#FFFFFF`) with a subtle shadow when scrolling down.
*   **Elements:** 
    *   Left: Logo image + "CV Banong Farms" (Navy Blue, Bold).
    *   Center: Minimal navigation links (Katalog, Lokasi, Kontak).
    *   Right: Accent Yellow button ("Hubungi Kami").
### B. Premium Hero Banner
*   **Visual:** Full-width background image slider (using high-quality farm imagery with a dark overlay `bg-black/40` for text readability).
*   **Shape/Mask (CRITICAL):** The bottom of the hero section MUST have a sweeping, curved/diagonal slice that transitions smoothly into the white background of the next section. (Instruction for AI: Use CSS `clip-path: ellipse(150% 100% at 50% 0%)` or an SVG shape divider at the bottom).
*   **Content:** Maximum 2 lines of text. 
    *   Heading: `CV Banong Farms` (Yellow) + `Hadirkan Kesegaran` (White).
    *   Button: Navy Blue pill-shaped button ("Jelajahi Produk").
### C. Interactive Product Catalog (Grid)
*   **Layout:** CSS Grid (e.g., `grid-cols-1 md:grid-cols-3 lg:grid-cols-4`). Gap: `24px`.
*   **Card Design:** 
    *   Background: White. Border-radius: `12px`.
    *   **Animation (CRITICAL):** Must have smooth 3D hover effects. Instruction: `transition: transform 0.3s ease, box-shadow 0.3s ease;`. On hover: `transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);`.
*   **Card Content (Minimal Text):**
    *   Top: Product Image (cover, fixed height).
    *   Middle: Product Title (Bold, Navy Blue), Price (`Rp`), Dynamic Stock Badge (Small yellow or green pill, e.g., "Sisa 5").
    *   Bottom: Full-width button with WhatsApp icon and text "Pesan via WA" (WhatsApp Green color).
### D. AI Chatbot Widget (Mascot)
*   **Position:** Fixed, Bottom-Right corner (`bottom-6 right-6`), `z-index: 100`.
*   **Visual:** Do NOT use a generic chat icon. Use an image of a cute, professional 2D Mascot (Chicken/Bird matching the logo). 
*   **UI:** Add a small red notification dot (e.g., "1") on the top right of the mascot to encourage clicks. Add a subtle floating animation (`@keyframes float`).
### E. Informative Footer
*   **Background:** Solid Navy Blue (`#1E3A5F`). Text: White/Light Gray.
*   **Layout:** 3 or 4 Columns.
*   **Elements:**
    *   Col 1: Logo and very brief taglines.
    *   Col 2: Quick Links.
    *   Col 3: Contact Info (Icons + Text for Phone, Email).
    *   Col 4: Google Maps Embed (iframe) displaying "Ajibarang, Banyumas". Border-radius on the iframe for a polished look.
## 4. Development Constraints
*   Ensure absolute responsiveness (Mobile, Tablet, Desktop).
*   Use standard, semantic HTML5 tags.
*   If using Tailwind CSS, rely on utility classes for hover effects and grid layouts.
*   Do not add long placeholder paragraphs (Lorem Ipsum). Keep placeholder text to one short sentence maximum per section.
```eof