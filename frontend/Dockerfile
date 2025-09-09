# ---- Build Stage ----
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --silent

# Copy rest of the frontend code
COPY . .

# Build optimized production files
RUN npm run build


# ---- Run Stage ----
FROM nginx:alpine

# Copy React build files into nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy a default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (React will be served here)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
