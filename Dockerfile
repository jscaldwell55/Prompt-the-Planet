# Build frontend
FROM node:18-alpine as frontend
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Build backend
FROM node:18-alpine as backend
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy frontend build
COPY --from=frontend /app/build ./client/build

# Copy backend
COPY --from=backend /app/ ./server

# Install production dependencies
WORKDIR /app/server
RUN npm install --production

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
