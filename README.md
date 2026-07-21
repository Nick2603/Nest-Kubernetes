# Nest-Kubernetes
 
A NestJS + TypeORM + PostgreSQL API for managing users and tickets, built with a CQRS-flavored architecture and shipped with everything needed to run it on Kubernetes — Dockerfile, manifests, ConfigMap/Secret, and an Ingress.
 
## Motivation
 
Most NestJS starter repos stop at "here's a controller and a service." I wanted something that went further: a small but realistic domain (users holding tickets), a clean read/write split at the repository layer, and — since so many backend tutorials hand-wave the "now put it in production" part — a full Kubernetes deployment for the app, its Postgres database, and pgAdmin. I built this as a hands-on way to work through NestJS's CQRS module and Kubernetes fundamentals (Deployments, Services, ConfigMaps, Secrets, Ingress) in one place, rather than learning them from two disconnected tutorials.
 
## 🚀 Quick Start
 
### Run locally
 
```bash
# Install dependencies
npm install
 
# Configure environment (see Usage below for required variables)
cp .env.example .env
 
# Start Postgres however you prefer, then run the app in watch mode
npm run start:dev
```
 
The API listens on `APP_PORT` (default `3000`), with a health check at `GET /`.
 
### Run on Kubernetes
 
```bash
# Apply the manifests in order
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/postgres-deployment.yaml -f k8s/postgres-service.yaml
kubectl apply -f k8s/pgadmin-deployment.yaml -f k8s/pgadmin-service.yaml
kubectl apply -f k8s/app-deployment.yaml -f k8s/app-service.yaml
kubectl apply -f k8s/ingress.yaml
```
 
## 📖 Usage
 
### Environment variables
 
| Variable | Description |
| --- | --- |
| `APP_PORT` | Port the Nest app listens on |
| `DB_HOST` | Postgres host |
| `DB_PORT` | Postgres port |
| `POSTGRES_DB` | Database name |
| `POSTGRES_USER` | Database user |
| `POSTGRES_PASSWORD` | Database password |
| `PGADMIN_DEFAULT_EMAIL` | pgAdmin login email |
| `PGADMIN_DEFAULT_PASSWORD` | pgAdmin login password |
 
All variables are validated on startup with Joi — the app will fail fast with a clear error if one is missing or malformed.
 
### API endpoints
 
**Users**
 
- `GET /users?firstName=&lastName=&isActive=` — list users, with optional filters
- `GET /users/:id` — get a single user (with their tickets)
- `POST /users` — create a user (`firstName`, `lastName`, optional `isActive`)
- `PUT /users/:id` — update a user
- `DELETE /users/:id` — delete a user
**Tickets**
 
- `GET /tickets` — list tickets, sorted by date
- `GET /tickets/:id` — get a single ticket (with its holder, if any)
- `POST /tickets` — create a ticket (`event`, `date`)
- `DELETE /tickets/:id` — delete a ticket
- `PUT /tickets/assign-ticket-to-user` — assign a ticket to a user (`userId`, `ticketId`)
- `PUT /tickets/unassign-ticket-from-user` — remove a ticket's holder (`userId`, `ticketId`)
### Examples
 
Create a user:
 
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Ada", "lastName": "Lovelace"}'
```
 
Assign a ticket to that user:
 
```bash
curl -X PUT http://localhost:3000/tickets/assign-ticket-to-user \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "ticketId": 1}'
```
 
## 🤝 Contributing
 
### Clone the repo
 
```bash
git clone https://github.com/Nick2603/Nest-Kubernetes.git
cd Nest-Kubernetes
```
 
### Install dependencies
 
```bash
npm install
```
 
### Run in watch mode
 
```bash
npm run start:dev
```
 
### Lint and format
 
```bash
npm run lint
npm run format
```
 
### Run the test suite
 
```bash
npm run test
npm run test:e2e
npm run test:cov
```
 
### Submit a pull request
 
If you'd like to contribute, please fork the repository and open a pull request against `main` with a clear description of the change.
