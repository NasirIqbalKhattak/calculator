# Calculator

A professional, fully-functional calculator web application with support for basic arithmetic, matrix operations, and quadratic equation solving. Optimized for both desktop and mobile devices.

## Features

### 1. **Basic Calculator**
- Addition, subtraction, multiplication, division
- Handles division by zero (displays "Undefined")
- Clear (C) and backspace (⌫) buttons
- Real-time display updates

### 2. **Matrix Operations**
- Matrix Addition (A + B)
- Matrix Multiplication (A × B)
- Dimension validation
- Input format: rows separated by newlines, values separated by commas or spaces

### 3. **Quadratic Equation Solver**
- Solves equations of the form: ax² + bx + c = 0
- Displays real roots when discriminant > 0
- Displays repeated root when discriminant = 0
- Displays complex roots when discriminant < 0

## Responsive Design

- **Desktop**: Full-width calculator with optimized layouts
- **Mobile**: Stacked layouts with touch-friendly buttons
- Works seamlessly on phones, tablets, and desktops

## Files

- `index.html` - Main HTML structure
- `style.css` - Professional styling with dark theme
- `script.js` - JavaScript logic for all operations

## How to Use

1. Open `index.html` in a web browser
2. Choose a mode:
   - **Basic**: Standard arithmetic operations
   - **Matrix**: Matrix calculations
   - **Quadratic**: Solve quadratic equations

## Live Demo

Open `index.html` directly in your browser or serve using:

```bash
python -m http.server 8000
# Visit http://localhost:8000
```

## Design

- Dark theme with gradient backgrounds
- Smooth transitions and glassmorphism effects
- Professional color scheme (purple & cyan accents)
- Fully accessible and responsive

---

Created with ❤️ by Nasir Iqbal
