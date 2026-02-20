# Use lightweight image
FROM node:24-alpine

WORKDIR /APP    

# Copy only package files first (better caching)
COPY package*.json ./

# Install only production deps
RUN npm install --production

# Copy rest of app
COPY . .

# Expose port (Render will override internally)
EXPOSE 8004

# Start app
CMD ["npm", "start"]



