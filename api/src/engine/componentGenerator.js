import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { DesignMemory } from '../memory/designMemory.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const designMemory = new DesignMemory();

/**
 * Génère des composants React à partir du modèle UX
 * Architecture "reuse-first": utilise les composants existants de la Design Memory
 */

/**
 * Génère le code d'un composant React
 */
function generateComponentCode(component, uxModel) {
  const { name, props } = component;

  // Props destructuring avec valeurs par défaut
  const propsWithDefaults = props.map(p => {
    if (p.default) {
      return `${p.name} = ${typeof p.default === 'string' ? `'${p.default}'` : p.default}`;
    }
    return p.name;
  });

  const propsString = propsWithDefaults.length > 0 ? `{ ${propsWithDefaults.join(', ')} }` : '{}';

  // Interface JSDoc
  const jsdoc = `/**
 * ${component.description}
 * @param {Object} props - Props du composant
${props.map(p => ` * @param {${p.type}} props.${p.name} - ${p.description}${p.default ? ` (default: ${p.default})` : ''}`).join('\n')}
 */`;

  // Génération du code React
  let componentCode = `import React from 'react';
import './${name}.css';

${jsdoc}
export const ${name} = (${propsString}) => {
`;

  // Logique spécifique par type de composant
  switch (name) {
    case 'Container':
      componentCode += `  const { children, fluid = false, className = '' } = props;
  
  return (
    <div className={\`container \${fluid ? 'fluid' : ''} \${className}\`}>
      {children}
    </div>
  );`;
      break;

    case 'Card':
      componentCode += `  const { children, title, footer, hoverable = false } = props;
  
  return (
    <div className={\`card \${hoverable ? 'hoverable' : ''}\`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );`;
      break;

    case 'Button':
      componentCode += `  const { children, onClick, variant = 'primary', size = 'medium', disabled = false } = props;
  
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );`;
      break;

    case 'Input':
      componentCode += `  const { value, onChange, placeholder, label, error, disabled = false } = props;
  
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type="text"
        className={\`input \${error ? 'error' : ''}\`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );`;
      break;

    case 'Select':
      componentCode += `  const { value, onChange, options, label } = props;
  
  return (
    <div className="select-group">
      {label && <label className="select-label">{label}</label>}
      <select className="select" value={value} onChange={onChange}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );`;
      break;

    case 'Calendar':
      componentCode += `  const { value, onChange, minDate, maxDate, disabledDates = [] } = props;
  
  const handleDateChange = (date) => {
    if (onChange) onChange(new Date(date));
  };
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-nav">&lt;</button>
        <span className="calendar-title">
          {value ? value.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'Mois'}
        </span>
        <button className="calendar-nav">&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div 
            key={i} 
            className={\`calendar-day \${i % 7 === 0 || i % 7 === 6 ? 'weekend' : ''}\`}
            onClick={() => handleDateChange(new Date(2024, 0, i - 2))}
          >
            {i > 2 && i < 33 ? i - 2 : ''}
          </div>
        ))}
      </div>
    </div>
  );`;
      break;

    case 'Table':
      componentCode += `  const { columns, data, sortable = false, onRowClick } = props;
  
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} className={\${sortable ? 'sortable' : ''}\}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr 
            key={rowIndex} 
            className={\${onRowClick ? 'clickable' : ''}\}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map(col => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );`;
      break;

    case 'Notification':
      componentCode += `  const { message, type = 'info', duration = 3000, onClose } = props;
  
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  return (
    <div className={\`notification notification-\${type}\`}>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={onClose}>×</button>
    </div>
  );`;
      break;

    case 'Badge':
      componentCode += `  const { children, variant = 'primary', size = 'medium' } = props;
  
  return (
    <span className={\`badge badge-\${variant} badge-\${size}\`}>
      {children}
    </span>
  );`;
      break;

    case 'Modal':
      componentCode += `  const { isOpen, onClose, title, children, size = 'medium' } = props;
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={\`modal modal-\${size}\`} onClick={e => e.stopPropagation()}>
        {title && <div className="modal-header"><h2>{title}</h2></div>}
        <div className="modal-body">{children}</div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );`;
      break;

    case 'Grid':
      componentCode += `  const { children, columns = 12, gap = 16 } = props;
  
  return (
    <div 
      className="grid"
      style={{ '--grid-columns': columns, '--grid-gap': \`\${gap}px\` }}
    >
      {children}
    </div>
  );`;
      break;

    default:
      componentCode += `  return <div className="${name.toLowerCase()}">{props.children}</div>;`;
  }

  componentCode += `\n};\n\nexport default ${name};\n`;

  return componentCode;
}

/**
 * Génère le CSS d'un composant
 */
function generateComponentCSS(component) {
  const name = component.name.toLowerCase();

  const cssTemplates = {
    container: `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.container.fluid {
  max-width: 100%;
}`,

    card: `.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
}

.card-body {
  padding: 16px;
}

.card-footer {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}`,

    button: `.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-small {
  padding: 6px 12px;
  font-size: 14px;
}

.btn-medium {
  padding: 8px 16px;
  font-size: 16px;
}

.btn-large {
  padding: 12px 24px;
  font-size: 18px;
}`,

    input: `.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input.error {
  border-color: #ef4444;
}

.input-error {
  font-size: 12px;
  color: #ef4444;
}`,

    select: `.select-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.select-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  background: white;
  cursor: pointer;
}

.select:focus {
  outline: none;
  border-color: #3b82f6;
}`,

    calendar: `.calendar {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.calendar-nav {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
}

.calendar-title {
  font-weight: 600;
  font-size: 18px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day-header {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  padding: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.calendar-day:hover {
  background: #f3f4f6;
}

.calendar-day.weekend {
  color: #ef4444;
}`,

    table: `.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.table th {
  background: #f9fafb;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  color: #6b7280;
}

.table tbody tr:hover {
  background: #f9fafb;
}

.table tbody tr.clickable {
  cursor: pointer;
}`,

    notification: `.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-info {
  background: #3b82f6;
  color: white;
}

.notification-success {
  background: #10b981;
  color: white;
}

.notification-warning {
  background: #f59e0b;
  color: white;
}

.notification-error {
  background: #ef4444;
  color: white;
}

.notification-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.8;
}

.notification-close:hover {
  opacity: 1;
}`,

    badge: `.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.badge-primary {
  background: #3b82f6;
  color: white;
}

.badge-success {
  background: #10b981;
  color: white;
}

.badge-warning {
  background: #f59e0b;
  color: white;
}

.badge-danger {
  background: #ef4444;
  color: white;
}

.badge-small {
  font-size: 12px;
}

.badge-medium {
  font-size: 14px;
}`,

    modal: `.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalIn 0.3s ease;
}

@keyframes modalIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-small {
  width: 400px;
  max-width: 90vw;
}

.modal-medium {
  width: 600px;
  max-width: 90vw;
}

.modal-large {
  width: 800px;
  max-width: 90vw;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-body {
  padding: 20px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
}

.modal-close:hover {
  color: #374151;
}`,

    grid: `.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 12), 1fr);
  gap: var(--grid-gap, 16px);
}`
  };

  return cssTemplates[name] || `.${name} {
  /* Styles par défaut */
}`;
}

/**
 * Génère toutes les stories pour un composant
 */
function generateStories(component, uxModel) {
  const { name, props } = component;

  let stories = `import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta = {
  title: 'Components/${name}',
  component: ${name},
  tags: ['autodocs'],
  argTypes: {
${props.map(p => `    ${p.name}: { control: '${p.type === 'boolean' ? 'boolean' : p.type === 'function' ? 'action' : 'text'}' }`).join(',\n')}
  },
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour ${name}
 */
export const Default: Story = {
  args: {
${props.filter(p => p.default).map(p => `    ${p.name}: ${typeof p.default === 'string' ? `'${p.default}'` : p.default},`).join('\n')}
  },
};

/**
 * Story avec tous les props
 */
export const AllProps: Story = {
  args: {
${props.map(p => `    ${p.name}: ${p.type === 'boolean' ? 'true' : p.type === 'function' ? '() => console.log("test")' : p.type === 'array' ? '[]' : p.type === 'node' ? '<div>Content</div>' : `'${p.name} value'`},`).join(',\n')}
  },
};
`;

  // Stories spécifiques par composant
  switch (name) {
    case 'Button':
      stories += `
/**
 * Bouton primaire
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Bouton secondaire
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Bouton désactivé
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
`;
      break;

    case 'Input':
      stories += `
/**
 * Input avec label
 */
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

/**
 * Input avec erreur
 */
export const WithError: Story = {
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

/**
 * Input désactivé
 */
export const Disabled: Story = {
  args: {
    label: 'Read Only Field',
    value: 'Cannot edit this',
    disabled: true,
  },
};
`;
      break;

    case 'Card':
      stories += `
/**
 * Carte simple
 */
export const Simple: Story = {
  args: {
    children: 'Card content goes here',
  },
};

/**
 * Carte avec titre
 */
export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'Card content with a title above it',
  },
};

/**
 * Carte avec footer
 */
export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: 'Main card content',
    footer: <Button>Action</Button>
  },
};
`;
      break;

    case 'Notification':
      stories += `
/**
 * Notification info
 */
export const Info: Story = {
  args: {
    message: 'This is an informational message',
    type: 'info',
  },
};

/**
 * Notification succès
 */
export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
  },
};

/**
 * Notification erreur
 */
export const Error: Story = {
  args: {
    message: 'An error occurred. Please try again.',
    type: 'error',
  },
};
`;
      break;
  }

  stories += `\nexport default meta;\n`;
  return stories;
}

/**
 * Génère tous les composants nécessaires
 */
export function generateComponents(uxModel) {
  console.log('🧩 Generating components...');
  
  const components = [];
  const componentNames = uxModel.componentRequirements.map(req => req.name);
  
  for (const componentName of componentNames) {
    // Chercher dans la Design Memory
    const existingComponent = designMemory.searchComponents(componentName)[0];
    
    if (existingComponent) {
      console.log(`  ♻️ Reusing existing component: ${componentName}`);
      components.push({
        ...existingComponent,
        generated: true,
        code: generateComponentCode(existingComponent, uxModel),
        css: generateComponentCSS(existingComponent),
        stories: generateStories(existingComponent, uxModel)
      });
    } else {
      console.log(`  🆕 Creating new component: ${componentName}`);
      // Créer un composant générique
      const newComponent = {
        id: crypto.randomUUID(),
        name: componentName,
        type: 'custom',
        category: 'custom',
        description: `Composant ${componentName} généré automatiquement`,
        props: [{ name: 'children', type: 'node', required: false, description: 'Contenu' }],
        tags: [componentName.toLowerCase(), 'generated'],
        createdAt: new Date().toISOString(),
        generated: true,
        code: generateComponentCode({ name: componentName, props: [{ name: 'children', type: 'node', required: false, description: 'Contenu' }] }, uxModel),
        css: `.${componentName.toLowerCase()} { /* Styles personnalisées */ }`,
        stories: generateStories({ name: componentName, props: [{ name: 'children', type: 'node', required: false, description: 'Contenu' }] }, uxModel)
      };
      
      // Enregistrer dans la Design Memory pour réutilisation future
      designMemory.registerComponent({
        name: componentName,
        type: 'custom',
        props: newComponent.props,
        description: newComponent.description,
        category: 'custom'
      });
      
      components.push(newComponent);
    }
  }
  
  console.log(`✅ Generated ${components.length} components`);
  return components;
}

export default generateComponents;