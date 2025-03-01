# # Étape 1 : Build l'application Next.js
# FROM node:18-alpine AS builder

# WORKDIR /app

# # Copier les fichiers nécessaires
# COPY package*.json ./ 
# COPY prisma ./prisma
# COPY . . 

# # Installer les dépendances
# RUN npm install --frozen-lockfile

# # Générer Prisma client
# RUN npx prisma generate

# # Construire l’application Next.js
# RUN npm run build

# # Étape 2 : Exécution en mode production
# FROM node:18-alpine AS production

# WORKDIR /app

# # Installer les outils nécessaires pour PostgreSQL et Prisma
# RUN apk add --no-cache postgresql-client bash

# # Copier les fichiers depuis la première étape
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/prisma ./prisma

# # Copier le fichier d’environnement
# COPY .env.production ./.env

# # Définir le port 80 comme port d'écoute
# ENV PORT=80

# # Exposer le port 80
# EXPOSE 80

# # Exécuter Prisma puis démarrer Next.js sur le port 80
# CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]


# Étape 1 : Build l'application Next.js
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./ 
COPY prisma ./prisma
COPY . . 

# Installer les dépendances
RUN npm install --frozen-lockfile

# Générer Prisma client
RUN npx prisma generate

# Construire l’application Next.js
RUN npm run build

# Étape 2 : Exécution en mode production
FROM node:18-alpine AS production

WORKDIR /app

# Installer PostgreSQL client et bash
RUN apk add --no-cache postgresql-client bash

# Définir les arguments pour passer les secrets
ARG DATABASE_URL
ARG JWT_SECRET

# Copier les fichiers
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Générer le fichier .env
RUN echo "DATABASE_URL=${DATABASE_URL}" >> .env
RUN echo "JWT_SECRET=${JWT_SECRET}" >> .env

# Définir le port 80 comme port d'écoute
ENV PORT=80

# Exposer le port 80
EXPOSE 80

# Exécuter Prisma puis démarrer Next.js sur le port 80
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
