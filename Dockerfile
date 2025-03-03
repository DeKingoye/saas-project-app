# Étape 1 : Build l'application Next.js
FROM node:18-alpine AS builder

WORKDIR /app

# Définition des variables d'environnement en argument pour la build
ARG DATABASE_URL
ARG JWT_SECRET

# Copier les fichiers nécessaires
COPY package*.json ./ 
COPY prisma ./prisma
COPY . . 

# Installer les dépendances
RUN npm install --frozen-lockfile

# Définir les variables d’environnement pour la build
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

# Générer Prisma client
RUN npx prisma generate

# Construire l’application Next.js
RUN npm run build

# Étape 2 : Exécution en mode production
FROM node:18-alpine AS production

WORKDIR /app

# Installer PostgreSQL client et bash
RUN apk add --no-cache postgresql-client bash

# Définition des variables d'environnement pour l'exécution
ARG DATABASE_URL
ARG JWT_SECRET
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

# Copier les fichiers
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Définir le port 80 comme port d'écoute
ENV PORT=80

# Exposer le port 80
EXPOSE 80

# Exécuter Prisma puis démarrer Next.js sur le port 80
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
