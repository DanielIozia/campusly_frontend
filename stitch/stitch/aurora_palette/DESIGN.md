# Design System Strategy: The Vibrant Academic Pulse

## 1. Overview & Creative North Star
This design system is built to capture the friction and energy of university life—the intersection of academic prestige and social spontaneity. Our Creative North Star is **"The Digital Curator."** 

We move away from the rigid, boxed-in layouts of traditional social platforms. Instead, we embrace an editorial perspective: high-contrast typography, intentional asymmetry, and "floating" content blocks. By utilizing overlapping elements and varying surface depths, the UI feels less like a database and more like a living campus magazine. We prioritize breathing room (whitespace) and kinetic energy through subtle gradients and ultra-rounded forms.

## 2. Color & Surface Architecture
The palette is rooted in deep, intellectual violets and high-energy corals. We leverage the Material 3 tonal system to create a sophisticated environment where color defines function.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning or containment. Structural separation must be achieved through:
*   **Tonal Shifts:** Placing a `surface-container-low` card against a `surface` background.
*   **Soft Voids:** Utilizing the Spacing Scale to create natural gutters between content.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack of semi-transparent materials.
*   **Base Layer:** `surface` (#f8f5ff) serves as the canvas.
*   **Sectioning:** Use `surface-container` (#e9e6f4) to group related content blocks.
*   **Primary Focus:** Use `surface-container-lowest` (#ffffff) for the highest-priority cards to create a "lifted" effect.
*   **Glass & Gradient Rule:** For navigation bars or floating action buttons, use a 70% opacity version of the `surface` color paired with a `backdrop-filter: blur(20px)`. Main CTAs should utilize a linear gradient transitioning from `primary` (#5843d0) to `primary-container` (#9f92ff) at a 135-degree angle.

## 3. Typography: The Editorial Voice
We use typography as a structural element, not just for legibility.

*   **Display & Headlines (Epilogue):** These are our "Expressive" tokens. Use `display-lg` and `headline-lg` with tight letter-spacing (-0.02em) to create a bold, authoritative presence. Headlines should often stand alone with significant padding to emphasize their importance.
*   **Body & Labels (Plus Jakarta Sans):** Our "Functional" tokens. These provide a clean, modern contrast to the expressive headlines. `body-lg` is the standard for social posts, ensuring high readability during long-form reading.
*   **Hierarchy Tip:** Pair a `display-sm` headline with a `label-md` uppercase subtitle to create a "magazine-style" header.

## 4. Elevation & Depth
In this design system, depth is a product of light and tone, not heavy shadows.

*   **The Layering Principle:** Hierarchy is achieved by stacking surface tiers. A `surface-container-highest` element should never sit directly on a `surface` base; it must transition through a `low` or `mid` tier to feel natural.
*   **Ambient Shadows:** If a floating element requires a shadow (e.g., a Modal or FAB), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(88, 67, 208, 0.08)`. The shadow color must be a tint of the `primary` or `on-surface` color, never pure black.
*   **The "Ghost Border" Fallback:** For accessibility in edge cases where two surfaces of similar tone meet, use a "Ghost Border": `outline-variant` (#aeacb7) at 15% opacity.

## 5. Signature Components

### The "Anonymous" Identity Card
*   **Visuals:** Utilizes a `primary-dim` background with a subtle "noise" texture. 
*   **Iconography:** Features a stylized 'eye' icon. 
*   **Style:** The container should use a `backdrop-blur` if overlaying imagery, emphasizing the "hidden" nature of the user.

### The "Erasmus" Global Badge
*   **Visuals:** Uses the `tertiary` (#6c5a00) and `tertiary-container` (#ffd709) tokens.
*   **Style:** A pill-shaped badge with a gold-to-yellow gradient. 
*   **Iconography:** A world icon rendered in `on-tertiary-container` (#5b4b00).

### Buttons & Inputs
*   **Primary Button:** Ultra-rounded (Corner Radius: `full`). Background is the signature Primary-to-Container gradient. Text is `on-primary`.
*   **Input Fields:** Use `surface-container-low`. On focus, the container transitions to `surface-container-highest` with a 1px "Ghost Border" of `primary` at 40% opacity.
*   **Cards:** Corner radius must be `md` (1.5rem) or `lg` (2rem). No dividers. Content is separated by `body-sm` metadata or generous vertical spacing.

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., 24px left, 32px right) for editorial layouts to create visual interest.
*   **Do** allow images to "break the grid" and bleed to the edge of the screen or overlap into the next section.
*   **Do** use `vibrant` accent colors (`secondary` / #af2525) sparingly for high-impact notifications or alerts.

### Don't
*   **Don't** use 100% opaque black (#000000) for text. Always use `on-surface` (#2e2e37) to maintain a premium, soft-contrast feel.
*   **Don't** use a corner radius smaller than 16px (`DEFAULT`) for any main container. We are a "soft" and "friendly" system.
*   **Don't** use traditional dividers (`<hr>`). If you cannot separate content with space or tone, re-evaluate the information architecture.