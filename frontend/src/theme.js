/**
 * StoryBookIA Design System - Professional Theme
 * 
 * This file contains all design tokens for the application.
 * All colors, typography, spacing, and other design values are defined here.
 * 
 * Color Palette (Professional Blue/Gray Theme):
 * - Primary: Deep blue for brand identity
 * - Secondary: Purple for accents and highlights
 * - Neutral: Gray scale for text and backgrounds
 * - Success/Error/Warning: Semantic colors for feedback
 * 
 * Accessibility: All text/background combinations meet WCAG AA (4.5:1 contrast)
 */

export const theme = {
  colors: {
    // Primary colors - Professional blue
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Secondary colors - Purple accent
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
    },
    
    // Neutral/Gray scale
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
    },
    
    // Success/Error/Warning colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
    },
    
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
    },
  },
  
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    },
    
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '5rem',
  },
  
  // Icon sizes (NEW - centralized icon sizing)
  iconSizes: {
    sm: '1.5rem',      // 24px
    md: '2rem',        // 32px
    lg: '3rem',        // 48px
    xl: '4rem',        // 64px
    '2xl': '5rem',     // 80px
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },
  
  zIndex: {
    dropdown: '1000',
    sticky: '1100',
    fixed: '1200',
    modalBackdrop: '1300',
    modal: '1400',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  
  // Icon sizing system
  icon: {
    // Base icon sizes (increased from 48px to 64px for better visibility)
    xs: '24px',
    sm: '32px',
    md: '48px',
    lg: '64px',
    xl: '80px',
    // Mobile minimum size for accessibility
    mobileMin: '36px',
    // Default icon size for feature cards and main UI
    default: '64px',
  },
};

// CSS Variables for use in stylesheets
export const cssVariables = `
:root {
  /* Primary Colors */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --primary-800: #1e40af;
  --primary-900: #1e3a8a;
  
  /* Secondary Colors */
  --secondary-50: #faf5ff;
  --secondary-100: #f3e8ff;
  --secondary-500: #a855f7;
  --secondary-600: #9333ea;
  --secondary-700: #7e22ce;
  --secondary-800: #6b21a8;
  --secondary-900: #581c87;
  
  /* Neutral/Gray */
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-500: #6b7280;

  /* Icon Sizes (NEW - centralized icon sizing) */
  --icon-sm: 1.5rem;      /* 24px */
  --icon-md: 2rem;       /* 32px */
  --icon-lg: 3rem;       /* 48px */
  --icon-xl: 4rem;       /* 64px */
  --icon-2xl: 5rem;      /* 80px */
  --icon-display: 6rem;  /* 96px */
  
  /* Icon Container Sizes (for rounded background) */
  --icon-container-sm: 4.5rem;   /* 72px */
  --icon-container-md: 6rem;     /* 96px */
  --icon-container-lg: 8rem;     /* 128px */
  
  /* Typography */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 4rem;
  --text-7xl: 5rem;
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 5rem;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  
  /* Touch targets */
  --touch-target-min: 44px;
  --touch-target-recommended: 48px;
  
  /* Icon Sizing System */
  --icon-xs: 24px;
  --icon-sm: 32px;
  --icon-md: 48px;
  --icon-lg: 64px;
  --icon-xl: 80px;
  --icon-mobile-min: 36px;
  --icon-default: 64px;
  
  /* Icon Colors - Harmonized with theme */
  --icon-primary: var(--primary-600);
  --icon-secondary: var(--secondary-600);
  --icon-success: var(--success-500);
  --icon-warning: var(--warning-500);
  --icon-error: var(--error-500);
  --icon-muted: var(--neutral-400);
}
`;

export default theme;