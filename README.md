# Pokedex

## Features
- Pokedex of Pokemon cards, by ID number
- View existing cards
- User management: authentication
- Catalog management: build your own personal catalog of cards (add/delete cards)
- Fast, intuitive user interface, thanks to the existing pokedex interfaces
- Existing use for retrieving all cards, by version (open source API, on Github, SDK proposal)
- Card statistics on user profile

## Framework
- **Backend** : Node.js with Fastify.js
- **Frontend** : VueJS
- **Linter** : Prettier
- **Others** : SQLite, TCGDex

## Git strategy 
### Git rules
*Github flow*

For branch names
- "fix/issue_name"
- "feature/feature_name"
- "v0.1"

### Code review strategy
- Min 1 review before the merge


## Installation
> ### Manually with node
> In the backend 
> - `cd backend`
> - `npm install`
> - `npm start`
>
> In the frontend 
> - `cd frontend`
> - `npm install`
> - `npm run dev`

> ### With docker
> - For running services
>   - `docker compose -f docker-compose.yml up -build`
>   - If error of node module remove manually your package-lock.json and nodel_modules
> - For stop services
>   - `docker compose -f docker-compose.yml stop`
> - For down or restart services
>   - `docker compose -f docker-compose.yml down`
>   - `docker compose -f docker-compose.yml restart`

## API YAML


