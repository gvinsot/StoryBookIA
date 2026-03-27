import _ from 'lodash';

/**
 * Moteur de transformation Pitch → Modèle UX
 * Analyse un pitch produit non structuré et génère un modèle UX structuré
 */

/**
 * Analyse le pitch et extrait les entités clés
 */
function analyzePitch(pitch) {
  const lowerPitch = pitch.toLowerCase();
  
  // Mots-clés par catégorie
  const keywords = {
    features: {
      calendar: ['calendrier', 'agenda', 'schedule', 'date', 'planning'],
      filters: ['filtre', 'filter', 'tri', 'search', 'recherche'],
      notifications: ['notification', 'alert', 'message', 'avis'],
      dashboard: ['dashboard', 'tableau de bord', 'stats', 'statistiques', 'analytics'],
      booking: ['réservation', 'booking', 'reserve', 'reservation', 'book'],
      admin: ['admin', 'administration', 'gestion', 'management'],
      users: ['utilisateur', 'user', 'member', 'membre'],
      reports: ['rapport', 'report', 'export', 'pdf'],
      realtime: ['temps réel', 'realtime', 'live', 'en direct']
    },
    entities: {
      room: ['salle', 'room', 'espace'],
      event: ['événement', 'event', 'réunion', 'meeting', 'appointment'],
      project: ['projet', 'project'],
      task: ['tâche', 'task', 'task', 'mission'],
      document: ['document', 'fichier', 'file']
    },
    actions: {
      create: ['créer', 'create', 'ajouter', 'add', 'nouveau'],
      edit: ['modifier', 'edit', 'update', 'changer', 'mettre à jour'],
      delete: ['supprimer', 'delete', 'retirer', 'remove'],
      view: ['voir', 'view', 'afficher', 'display'],
      share: ['partager', 'share', 'collaborer']
    }
  };

  const detected = {
    features: [],
    entities: [],
    actions: [],
    roles: []
  };

  // Détecter les features
  for (const [feature, words] of Object.entries(keywords.features)) {
    if (words.some(word => lowerPitch.includes(word))) {
      detected.features.push(feature);
    }
  }

  // Détecter les entités
  for (const [entity, words] of Object.entries(keywords.entities)) {
    if (words.some(word => lowerPitch.includes(word))) {
      detected.entities.push(entity);
    }
  }

  // Détecter les actions
  for (const [action, words] of Object.entries(keywords.actions)) {
    if (words.some(word => lowerPitch.includes(word))) {
      detected.actions.push(action);
    }
  }

  // Détecter les rôles
  if (lowerPitch.includes('admin') || lowerPitch.includes('gestion')) {
    detected.roles.push('admin');
  }
  if (lowerPitch.includes('utilisateur') || lowerPitch.includes('user') || lowerPitch.includes('membre')) {
    detected.roles.push('user');
  }
  if (detected.roles.length === 0) {
    detected.roles.push('user'); // Default
  }

  return detected;
}

/**
 * Génère les pages UX basées sur les features détectées
 */
function generatePages(detected) {
  const pages = [];

  // Dashboard est presque toujours présent
  if (detected.features.includes('dashboard') || detected.features.includes('booking')) {
    pages.push({
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      description: 'Vue d\'ensemble et statistiques',
      components: ['Container', 'Grid', 'Card', 'Table'],
      features: ['stats', 'overview']
    });
  }

  // Pages basées sur les entités
  if (detected.entities.includes('room') || detected.entities.includes('event')) {
    pages.push({
      id: 'calendar',
      name: 'Calendrier',
      path: '/calendar',
      description: 'Vue calendrier des réservations/événements',
      components: ['Calendar', 'Modal', 'Card', 'Button'],
      features: ['calendar_view', 'booking']
    });

    pages.push({
      id: 'list',
      name: 'Liste',
      path: '/list',
      description: 'Liste des éléments avec filtres',
      components: ['Table', 'Input', 'Select', 'Badge'],
      features: ['list_view', 'filters']
    });
  }

  // Admin panel si détecté
  if (detected.roles.includes('admin')) {
    pages.push({
      id: 'admin',
      name: 'Admin Panel',
      path: '/admin',
      description: 'Administration et configuration',
      components: ['Table', 'Modal', 'Input', 'Button', 'Card'],
      features: ['user_management', 'settings'],
      requiresAuth: 'admin'
    });
  }

  // Notifications
  if (detected.features.includes('notifications')) {
    pages.push({
      id: 'notifications',
      name: 'Notifications',
      path: '/notifications',
      description: 'Historique des notifications',
      components: ['Notification', 'Card', 'Badge'],
      features: ['notifications_list']
    });
  }

  // Si aucune page n'a été générée, créer une page générique
  if (pages.length === 0) {
    pages.push({
      id: 'home',
      name: 'Accueil',
      path: '/',
      description: 'Page d\'accueil',
      components: ['Container', 'Card', 'Button'],
      features: ['landing']
    });
  }

  return pages;
}

/**
 * Génère les composants nécessaires pour chaque page
 */
function generateComponentRequirements(pages, detected) {
  const requirements = new Set();

  // Composants de base toujours nécessaires
  requirements.add('Container');
  requirements.add('Button');

  // Ajouter les composants par page
  for (const page of pages) {
    page.components.forEach(comp => requirements.add(comp));
  }

  // Ajouter des composants spécifiques selon les features
  if (detected.features.includes('filters') || detected.features.includes('search')) {
    requirements.add('Input');
    requirements.add('Select');
  }

  if (detected.features.includes('notifications')) {
    requirements.add('Notification');
  }

  if (detected.features.includes('calendar')) {
    requirements.add('Calendar');
  }

  return Array.from(requirements).map(name => ({
    name,
    required: true
  }));
}

/**
 * Transforme un pitch en modèle UX structuré
 */
export function transformPitchToUX(pitch) {
  console.log('🔍 Analyzing pitch...');
  
  const analysis = analyzePitch(pitch);
  console.log('📊 Analysis:', analysis);

  const pages = generatePages(analysis);
  console.log('📄 Generated pages:', pages.length);

  const componentRequirements = generateComponentRequirements(pages, analysis);
  console.log('🧩 Component requirements:', componentRequirements.length);

  const uxModel = {
    id: crypto.randomUUID(),
    name: extractAppName(pitch),
    description: pitch,
    createdAt: new Date().toISOString(),
    analysis,
    pages,
    componentRequirements,
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#6366f1',
      borderRadius: '8px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  };

  console.log('✅ UX Model generated');
  return uxModel;
}

/**
 * Extrait un nom d'application du pitch
 */
function extractAppName(pitch) {
  // Essayer d'extraire un nom simple
  const words = pitch.split(' ').filter(w => w.length > 2 && w.length < 15);
  return words.slice(0, 3).join(' ') || 'Generated App';
}

export default transformPitchToUX;