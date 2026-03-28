# StoryBook IA - Configuration DevOps

Ce dossier contient la configuration pour le déploiement sur Docker Swarm.

## Structure

```
devops/
├── docker-compose.swarm.yml  # Stack Docker Swarm
├── .env                      # Variables d'environnement
└── .env.example              # Exemple de variables d'environnement
```

## Déploiement

### Build des images

```bash
cd devops
docker-compose -f docker-compose.swarm.yml build
```

### Déployer la stack

```bash
docker stack deploy -c docker-compose.swarm.yml storybook-ia
```

### Supprimer la stack

```bash
docker stack rm storybook-ia
```

### Lancer les tests

```bash
docker-compose -f docker-compose.swarm.yml run --rm test
```

## Configuration

### Variables d'environnement

Copiez `.env.example` en `.env` et configurez les variables nécessaires:

- `API_PORT`: Port de l'API (défaut: 3001)
- `FRONTEND_PORT`: Port du frontend (défaut: 3000)
- `TRAEFIK_DOMAIN`: Domaine pour l'application (ex: storybook-ia.methodinfo.fr)

### Services de données

Si vous avez besoin de services de données (MongoDB, PostgreSQL, MinIO), demandez à l'admin les paramètres de connexion et décommentez les variables correspondantes dans `.env`.

## URLs

- **Frontend**: https://`TRAEFIK_DOMAIN`
- **API**: https://`TRAEFIK_DOMAIN`/api/*

## Sécurité

Tous les services sont protégés par:
- **WAF** (Coraza + OWASP CRS)
- **Security headers** (HSTS, X-Frame-Options, etc.)
- **Rate limiting** (100 req/s moyenne, 50 burst)
- **HTTPS** obligatoire (redirection HTTP → HTTPS)

## Health Checks

Les services incluent des health checks pour la surveillance:
- API: `/health` endpoint
- Frontend: Nginx health check