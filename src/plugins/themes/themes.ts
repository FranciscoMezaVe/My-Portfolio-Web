import type { ThemeDefinition } from 'vuetify'

export const darkTheme: ThemeDefinition = {
  dark: true, // ¡Importante! Establecemos esto a 'true' para que Vuetify aplique los estilos de tema oscuro.
  colors: {
    // Colores de Material Design mapeados a tu paleta
    background: '#1A2C3A', // Tu BG (Azul oscuro/gris muy oscuro)
    surface: '#1A2C3A', // Las superficies también serán oscuras para un look uniforme.
    // 'surface-bright': '#2A3A4A', // Opcional: una superficie ligeramente más clara si la necesitas
    // 'surface-light': '#2A3A4A', // Opcional: otra superficie ligeramente más clara
    'surface-variant': '#2A3A4A', // Tu Border/Subtle Lines (Gris muy oscuro para separadores)
    'on-background': '#FFFFFF', // El texto que va sobre el 'background' será blanco (Tu Primary Text)
    'on-surface': '#FFFFFF', // El texto que va sobre las 'surface' será blanco (Tu Primary Text)
    'on-surface-variant': '#B0B0B0', // Texto o iconos sobre surface-variant (Tu Secondary Text/Icons)

    primary: '#3F7F8F', // Tu Accent (Azul verdoso/cian oscuro)
    'primary-darken-1': '#2C6A7B', // Una versión más oscura para hover/active si lo necesitas
    'on-primary': '#FFFFFF', // El texto que va sobre el color 'primary' será blanco

    secondary: '#B0B0B0', // Tu Secondary (Gris claro, para elementos secundarios o texto secundario)
    'secondary-darken-1': '#909090', // Una versión más oscura para hover/active
    'on-secondary': '#1A2C3A', // Texto que va sobre el color 'secondary' (si es claro)

    // Colores de estado (mantengo los estándar de Material Design para consistencia,
    // a menos que especifiques lo contrario)
    error: '#CF6679', // Color de error para tema oscuro de Material Design
    info: '#2196F3',
    success: '#81C784', // Color de éxito para tema oscuro de Material Design
    warning: '#FB8C00',
  },
  variables: {
    // Variables para opacidades y bordes.
    // Ajustaremos el color del borde para que sea tu gris muy oscuro.
    'border-color': '#2A3A4A', // Tu Border/Subtle Lines
    'border-opacity': 0.12, // Puedes ajustar la opacidad si el borde es demasiado sutil o prominente.

    // Opacidades de texto y elementos para tema oscuro
    'high-emphasis-opacity': 0.87, // Texto principal
    'medium-emphasis-opacity': 0.6, // Texto secundario
    'disabled-opacity': 0.38, // Elementos deshabilitados

    // Opacidades de interacción
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,

    // Colores para elementos de código y teclado
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#2A3A4A', // Fondo de código oscuro
    'theme-on-code': '#B0B0B0', // Texto de código claro (tu Secondary)
  },
}
