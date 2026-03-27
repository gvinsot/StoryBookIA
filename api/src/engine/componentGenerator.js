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

  // Props destructuring
  const propsString = props.length > 0
    ? props.map(p => `${p.name}${p.required ? '' : '='}`).join(', ')
    : '';

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

    case 'Calendar':
      componentCode += `  const { value, onChange, minDate, maxDate, disabledDates = [] } = props;
  
  const handleDateSelect = (date) => {
    if (onChange) onChange(date);
  };
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-prev">&lt;</button>
        <span className="calendar-month">Mois Année</span>
        <button className="calendar-next">&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div 
            key={i} 
            className={\`calendar-day \${i % 7 === 0 || i % 7 === 6 ? 'weekend' : ''}\`}
            onClick={() => handleDateSelect(new Date())}
          >
            {i + 1}
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
        {data.map((row, idx) => (
          <tr 
            key={idx} 
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
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration);
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
      style={{ 
        display: 'grid', 
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
        gap: \`\${gap}px\`
      }}
    >
      {children}
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

    case 'Badge':
      componentCode += `  const { children, variant = 'primary', size = 'medium' } = props;
  
  return (
    <span className={\`badge badge-\${variant} badge-\${size}\`}>
      {children}
    </span>
  );`;
      break;

    default:
      componentCode += `  return (
    <div className="${name.toLowerCase()}">
      {props.children || '${name} Component'}
    </div>
  );`;
  }

  componentCode += '\\n};\\n\\nexport default ${name};\\n';

  return componentCode;
}

/**
 * Génère le CSS d'un composant
 */
function generateComponentCSS(component) {
  const name = component.name;
  
  const cssMap = {
    Container: `
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.container.fluid {
  max-width: 100%;
}
`,
    Card: `
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 8px 0;
}

.card.hoverable {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card.hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.card-body {
  color: #333;
}

.card-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}
`,
    Button: `
.btn {
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
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

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn-small {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-medium {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-large {
  padding: 12px 24px;
  font-size: 16px;
}
`,
    Input: `
.input-group {
  margin: 8px 0;
}

.input-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
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
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #ef4444;
}
`,
    Calendar: `
.calendar {
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

.calendar-header button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
}

.calendar-month {
  font-weight: 600;
  font-size: 16px;
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
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}

.calendar-day:hover {
  background: #f3f4f6;
}

.calendar-day.weekend {
  color: #ef4444;
}
`,
    Table: `
.table {
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
  color: #374151;
}

.table tbody tr:hover {
  background: #f9fafb;
}

.table tbody tr.clickable {
  cursor: pointer;
}

.table tbody tr.clickable:hover {
  background: #f3f4f6;
}
`,
    Notification: `
.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  font-size: 20px;
  cursor: pointer;
  opacity: 0.8;
}

.notification-close:hover {
  opacity: 1;
}
`,
    Modal: `
.modal-overlay {
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
  max-height: 90vh;
  overflow: auto;
  position: relative;
}

.modal-small {
  width: 400px;
}

.modal-medium {
  width: 600px;
}

.modal-large {
  width: 800px;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
}

.modal-body {
  padding: 24px;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
}

.modal-close:hover {
  color: #374151;
}
`,
    Grid: `
.grid {
  display: grid;
  gap: 16px;
}
`,
    Select: `
.select-group {
  margin: 8px 0;
}

.select-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;
}

.select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
`,
    Badge: `
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 12px;
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
  padding: 1px 6px;
  font-size: 10px;
}

.badge-medium {
  padding: 2px 8px;
  font-size: 12px;
}
`
  };

  return cssMap[name] || `
.${name.toLowerCase()} {
  /* Styles par défaut */
}
`;
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
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour ${name}
 */
export const Default: Story = {
  args: {
`;

  // Générer les args par défaut
  props.forEach(prop => {
    if (prop.name === 'children') {
      stories += `    children: 'Contenu de ${name}',\n`;
    } else if (prop.default) {
      stories += `    ${prop.name}: ${typeof prop.default === 'string' ? `'${prop.default}'` : prop.default},\n`;
    } else if (prop.type === 'string') {
      stories += `    ${prop.name}: 'Valeur par défaut',\n`;
    } else if (prop.type === 'boolean') {
      stories += `    ${prop.name}: false,\n`;
    } else if (prop.type === 'number') {
      stories += `    ${prop.name}: 0,\n`;
    } else if (prop.type === 'function') {
      stories += `    ${prop.name}: () => console.log('${prop.name}'),\n`;
    } else if (prop.type === 'array') {
      stories += `    ${prop.name}: [],\n`;
    } else if (prop.type === 'node') {
      stories += `    ${prop.name}: null,\n`;
    } else {
      stories += `    ${prop.name}: undefined,\n`;
    }
  });

  stories += `  },
};

/**
 * Variantes pour ${name}
 */
`;

  // Générer des variantes selon le composant
  if (name === 'Button') {
    stories += `
export const Primary: Story = {
  args: {
    children: 'Bouton Primaire',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Bouton Secondaire',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Bouton Désactivé',
    variant: 'primary',
    disabled: true,
  },
};
`;
  } else if (name === 'Card') {
    stories += `
export const WithTitle: Story = {
  args: {
    children: 'Contenu de la carte',
    title: 'Titre de la carte',
  },
};

export const WithFooter: Story = {
  args: {
    children: 'Contenu de la carte',
    title: 'Titre de la carte',
    footer: <Button>Action</Button>,
  },
};

export const Hoverable: Story = {
  args: {
    children: 'Carte survolvable',
    hoverable: true,
  },
};
`;
  } else if (name === 'Notification') {
    stories += `
export const Info: Story = {
  args: {
    message: 'Information',
    type: 'info',
    duration: 0,
  },
};

export const Success: Story = {
  args: {
    message: 'Opération réussie !',
    type: 'success',
    duration: 0,
  },
};

export const Warning: Story = {
  args: {
    message: 'Attention : vérifiez vos données',
    type: 'warning',
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    message: 'Une erreur est survenue',
    type: 'error',
    duration: 0,
  },
};
`;
  } else if (name === 'Modal') {
    stories += `
export const Small: Story = {
  args: {
    isOpen: true,
    title: 'Modale petite',
    size: 'small',
    children: 'Contenu de la modale',
    onClose: () => console.log('close'),
  },
};

export const Medium: Story = {
  args: {
    isOpen: true,
    title: 'Modale moyenne',
    size: 'medium',
    children: 'Contenu de la modale',
    onClose: () => console.log('close'),
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    title: 'Modale grande',
    size: 'large',
    children: 'Contenu de la modale',
    onClose: () => console.log('close'),
  },
};
`;
  } else if (name === 'Badge') {
    stories += `
export const Primary: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Succès',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Attention',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Erreur',
    variant: 'danger',
  },
};
`;
  }

  return stories;
}

/**
 * Génère tous les composants nécessaires
 */
export function generateComponents(uxModel) {
  const components = [];
  const componentNames = uxModel.componentRequirements.map(req => req.name);
  
  for (const componentName of componentNames) {
    // Rechercher dans la Design Memory
    const existingComponents = designMemory.searchComponents(componentName);
    
    if (existingComponents.length > 0) {
      // Utiliser le composant existant
      const component = existingComponents[0];
      const code = generateComponentCode(component, uxModel);
      const css = generateComponentCSS(component);
      const stories = generateStories(component, uxModel);
      
      components.push({
        ...component,
        code,
        css,
        stories,
        reused: true
      });
      
      console.log(`♻️ Reused component: ${componentName}`);
    } else {
      // Créer un nouveau composant
      const newComponent = {
        id: crypto.randomUUID(),
        name: componentName,
        type: 'custom',
        category: 'generated',
        description: `Composant généré pour ${uxModel.name}`,
        props: [
          { name: 'children', type: 'node', required: false, description: 'Contenu' }
        ],
        tags: [componentName.toLowerCase(), 'generated'],
        code: generateComponentCode({ name: componentName, props: [{ name: 'children', type: 'node', required: false }] }, uxModel),
        css: generateComponentCSS({ name: componentName }),
        stories: generateStories({ name: componentName, props: [{ name: 'children', type: 'node', required: false }] }, uxModel),
        reused: false
      };
      
      components.push(newComponent);
      console.log(`✨ Created new component: ${componentName}`);
    }
  }
  
  return components;
}

export default generateComponents;