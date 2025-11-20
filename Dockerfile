# Stage 1: Build the React frontend
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build the Quarkus backend
FROM maven:3.9-eclipse-temurin-21 AS server-builder
WORKDIR /app/server
COPY server/pom.xml server/mvnw server/mvnw.cmd ./
COPY server/.mvn ./.mvn
# Download dependencies first to leverage Docker cache
RUN ./mvnw dependency:go-offline
COPY server/src ./src
# Copy the built frontend to the Quarkus static resources folder
COPY --from=client-builder /app/client/dist /app/server/src/main/resources/META-INF/resources
# Package the application
RUN ./mvnw package

# Stage 3: Create the final runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copy the packaged application from the builder stage
COPY --from=server-builder /app/server/target/quarkus-app /app/
EXPOSE 8080
CMD ["java", "-jar", "quarkus-run.jar"]