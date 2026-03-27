import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Design Memory - Base de composants réutilisables
 * Stocke et indexe les composants pour réutilisation
 */
export class DesignMemory {
  constructor() {
    this.componentsPath = path.join(__dirname, '../../design-memory/components.json');
    this.ensureStorage();
    this.components = this.loadComponents();
    this.initializeDefaultComponents();
  }

  ensureStorage() {
    fs.ensureDirSync(path.dirname(this.componentsPath));
  }

  loadComponents() {
    try {
      if (fs.pathExistsSync(this.componentsPath)) {
        return fs.readJsonSync(this.componentsPath);
      }
    } catch (error) {
      console.warn('⚠️ Could not load components, starting fresh');
    }
    return [];
  }

  saveComponents() {
    fs.writeJsonSync(this.componentsPath, this.components, { spaces: 2 });
  }

  /**
   * Initialise les composants de base (Design System)
   */
  initializeDefaultComponents() {
    const defaultComponents = [
      // Layout Components
      {
        id: uuidv4(),
        name: 'Container',
        type: 'layout',
        category: 'layout',
        description: 'Conteneur principal avec padding et max-width',
        props: [
          { name: 'children', type: 'node', required: true, description: 'Contenu à afficher' },
          { name: 'fluid', type: 'boolean', required: false, description: 'Pleine largeur' },
          { name: 'className', type: 'string', required: false, description: 'Classe CSS supplémentaire' }
        ],
        tags: ['container', 'wrapper', 'layout'],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Grid',
        type: 'layout',
        category: 'layout',
        description: 'Système de grille responsive',
        props: [
          { name: 'children', type: 'node', required: true, description: 'Colonnes à afficher' },
          { name: 'columns', type: 'number', required: false, description: 'Nombre de colonnes', default: 12 },
          { name: 'gap', type: 'number', required: false, description: 'Espacement en px', default: 16 }
        ],
        tags: ['grid', 'flex', 'layout', 'responsive'],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Card',
        type: 'layout',
        category: 'layout',
        description: 'Carte avec bordure et ombre',
        props: [
          { name: 'children', type: 'node', required: true, description: 'Contenu de la carte' },
          { name: 'title', type: 'string', required: false, description: 'Titre de la carte' },
          { name: 'footer', type: 'node', required: false, description: 'Pied de carte' },
          { name: 'hoverable', type: 'boolean', required: false, description: 'Effet au survol' }
        ],
        tags: ['card', 'container', 'box'],
        createdAt: new Date().toISOString()
      },

      // Form Components
      {
        id: uuidv4(),
        name: 'Input',
        type: 'form',
        category: 'input',
        description: 'Champ de saisie texte',
        props: [
          { name: 'value', type: 'string', required: false, description: 'Valeur du champ' },
          { name: 'onChange', type: 'function', required: false, description: 'Callback de changement' },
          { name: 'placeholder', type: 'string', required: false, description: 'Texte indicatif' },
          { name: 'label', type: 'string', required: false, description: 'Label du champ' },
          { name: 'error', type: 'string', required: false, description: 'Message d\'erreur' },
          { name: 'disabled', type: 'boolean', required: false, description: 'Désactivé' }
        ],
        tags: ['input', 'form', 'text', 'field'],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Select',
        type: 'form',
        category: 'input',
        description: 'Liste déroulante',
        props: [
          { name: 'value', type: 'string', required: false, description: 'Valeur sélectionnée' },
          { name: 'onChange', type: 'function', required: false, description: 'Callback de changement' },
          { name: 'options', type: 'array', required: true, description: 'Liste des options' },
          { name: 'label', type: 'string', required: false, description: 'Label du champ' }
        ],
        tags: ['select', 'dropdown', 'form', 'option'],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Button',
        type: 'form',
        category: 'action',
        description: 'Bouton d\'action',
        props: [
          { name: 'children', type: 'node', required: true, description: 'Texte ou contenu du bouton' },
          { name: 'onClick', type: 'function', required: false, description: 'Callback de clic' },
          { name: 'variant', type: 'string', required: false, description: 'primary, secondary, danger', default: 'primary' },
          { name: 'size', type: 'string', required: false, description: 'small, medium, large', default: 'medium' },
          { name: 'disabled', type: 'boolean', required: false, description: 'Désactivé' }
        ],
        tags: ['button', 'action', 'click'],
        createdAt: new Date().toISOString()
      },

      // Display Components
      {
        id: uuidv4(),
        name: 'Calendar',
        type: 'display',
        category: 'data',
        description: 'Composant calendrier interactif',
        props: [
          { name: 'value', type: 'Date', required: false, description: 'Date sélectionnée' },
          { name: 'onChange', type: 'function', required: false, description: 'Callback de changement de date' },
          { name: 'minDate', type: 'Date', required: false, description: 'Date minimale' },
          { name: 'maxDate', type: 'Date', required: false, description: 'Date maximale' },
          { name: 'disabledDates', type: 'array', required: false, description: 'Dates désactivées' }
        ],
        tags: ['calendar', 'date', 'picker', 'schedule'],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Table',
        type: 'display',
        category: 'data',
        description: 'Tableau de données',
        props: [
          { name: 'columns', type: 'array', required: true, description: 'Définition des colonnes' },
          { name: 'data', type: 'array', required: true, description: 'Données à afficher' },
          { name: 'sortable', type: 'boolean', required: false, description: 'Triable' },
          { name: 'onRowClick', type: 'function', required: false, description: 'Callback de clic sur ligne' }
        ],
        tags: ['table', 'data', 'grid', 'list'],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Notification',
        type: 'display',
        category: 'feedback',
        description: 'Notification toast',
        props: [
          { name: 'message', type: 'string', required: true, description: 'Message de notification' },
          { name: 'type', type: 'string', required: false, description: 'success, warning, error, info', default: 'info' },
          { name: 'duration', type: 'number', required: false, description: 'Durée en ms', default: 3000 },
          { name: 'onClose', type: 'function', required: false, description: 'Callback de fermeture' }
        ],
        tags: ['notification', 'toast', 'alert', 'message'],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Badge',
        type: 'display',
        category: 'data',
        description: 'Badge d\'information',
        props: [
          { name: 'children', type: 'node', required: true, description: 'Contenu du badge' },
          { name: 'variant', type: 'string', required: false, description: 'primary, success, warning, danger', default: 'primary' },
          { name: 'size', type: 'string', required: false, description: 'small, medium', default: 'medium' }
        ],
        tags: ['badge', 'tag', 'label'],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Modal',
        type: 'overlay',
        category: 'interaction',
        description: 'Modale interactive',
        props: [
          { name: 'isOpen', type: 'boolean', required: true, description: 'État d\'ouverture' },
          { name: 'onClose', type: 'function', required: true, description: 'Callback de fermeture' },
          { name: 'title', type: 'string', required: false, description: 'Titre de la modale' },
          { name: 'children', type: 'node', required: true, description: 'Contenu de la modale' },
          { name: 'size', type: 'string', required: false, description: 'small, medium, large', default: 'medium' }
        ],
        tags: ['modal', 'dialog', 'popup'],
        createdAt: new Date().toISOString()
      }
    ];

    // Ajouter seulement si vide
    if (this.components.length === 0) {
      this.components = defaultComponents;
      this.saveComponents();
      console.log('✅ Default components initialized');
    }
  }

  /**
   * Recherche des composants par requête textuelle ou type
   */
  searchComponents(query, type = null) {
    let results = this.components;

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(comp => {
        const matchName = comp.name.toLowerCase().includes(lowerQuery);
        const matchDesc = comp.description.toLowerCase().includes(lowerQuery);
        const matchTags = comp.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        return matchName || matchDesc || matchTags;
      });
    }

    if (type) {
      results = results.filter(comp => comp.type === type || comp.category === type);
    }

    return results;
  }

  /**
   * Récupère tous les composants
   */
  getAllComponents() {
    return this.components;
  }

  /**
   * Récupère un composant par ID
   */
  getComponentById(id) {
    return this.components.find(c => c.id === id);
  }

  /**
   * Récupère des composants par tags
   */
  getComponentsByTags(tags) {
    return this.components.filter(comp =>
      tags.some(tag => comp.tags.includes(tag))
    );
  }

  /**
   * Enregistre un nouveau composant
   */
  registerComponent({ name, type, props, description, category, tags = [] }) {
    // Vérifier si existe déjà
    const exists = this.components.find(c => c.name === name);
    if (exists) {
      return { ...exists, existing: true };
    }

    const component = {
      id: uuidv4(),
      name,
      type,
      category: category || 'general',
      description: description || '',
      props: props || [],
      tags: [...tags, name.toLowerCase()],
      createdAt: new Date().toISOString()
    };

    this.components.push(component);
    this.saveComponents();

    return { ...component, existing: false };
  }

  /**
   * Trouve les composants les plus pertinents pour un besoin
   */
  findBestMatches(requirements) {
    const { type, tags, props } = requirements;
    let candidates = this.components;

    if (type) {
      candidates = candidates.filter(c => c.type === type || c.category === type);
    }

    if (tags && tags.length > 0) {
      candidates = candidates.filter(c =>
        tags.some(tag => c.tags.includes(tag))
      );
    }

    // Score de pertinence
    return candidates.map(comp => {
      let score = 0;
      if (props) {
        const matchingProps = props.filter(p =>
          comp.props.some(cp => cp.name === p)
        );
        score += matchingProps.length * 2;
      }
      return { component: comp, score };
    }).sort((a, b) => b.score - a.score);
  }
}