# ⚗️ Frontend Web APIs Lab

Collection of interactive TypeScript demos to explore modern Web APIs. Ideal for learning and experimenting with frontend development.

## Project Structure

- **1-elements/**: Base components and utilities (tables, panels, custom elements). Includes `.ts` source files and demos.
- **2-webapis/**: Modern Web API demos, organized in subfolders:
  - `1-fullscreen/`: Fullscreen API example
  - `2-clipboard/`: Clipboard API example
  - `3-canvas/`: Canvas 2D example
  - `4-svg/`: SVG example
  - `5-media/`: Media example (audio, video, multimedia)
- **3-timers/**: Timer and chart demos:
  - `1-crono/`: Stopwatch
  - `2-graphic-bars/`: Bar chart
  - `3-graphic-circle/`: Pie chart
  - `4-progress-bar/`: Progress bar
- **public/**: Static files ready to be served in the browser.
  - Mirrors the demo folder structure, with generated `.html` and `.js` files.
  - `index.html`: Main page with quick links to all demos.
- **tsconfig.json**: TypeScript configuration.
- **README.md**: This file.

## Usage

Open `public/index.html` in your browser to access all demos from a central interface.

Some demos may require additional permissions (e.g., camera/microphone access in Media).
