#Development stage 

FROM node:22-alpine as dev

# Set the working directory inside the container
WORKDIR /app

# Copy only the package files first for layer caching (speeds up rebuilds)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Define the command to run the app
CMD ["npm", "run", "dev"]
