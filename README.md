# Project 2 - BackEnd

#### Prof. Adriano Rivolli

The project aims to apply the concepts and topics discussed in class, using the indicated technologies to create a REST API with authentication, CRUDs, and custom business logic.

---

## Features

### Authentication and User Management (30%)

1. **User registration**: A route that allows user registration with personal data and credentials (username and password).
2. **Administration**: One or more administrator users with privileges to modify, delete users, and create new administrators.
3. **Login and Authentication**: A login route that generates a JWT token for accessing protected routes.
4. **Admin management**: Routes for creating and removing administrators by an administrator.
5. **Data modification**: Users can modify their personal data, and administrators can modify any user's data.

### CRUD System (30%)

- Implementation of complete CRUD operations for 3 or 4 entities (depending on whether the project is individual or in pairs).
- The entities have one-to-many or many-to-many relationships, according to the proposed theme.
- Insertion, update, and deletion operations are restricted to authenticated users.
- Pagination implementation in listings with the parameters `limit` (5, 10, or 30 items) and `page` (starting point of the query).
- Data validation and personalized error or success messages.

### Business Logic, Installer, and Documentation (40%)

- Implementation of a special operation that performs custom business logic, which may include insertion, complex queries, or data processing.
- **GET /install/** route that initializes the database, creates tables or collections, and inserts initial data (at least 5 records per table/collection).
- **GET /docs** route that provides API documentation generated with Swagger.

---

## Technologies Used

- **Framework**: [Express](https://expressjs.com/)
- **Database**: Relational (SQlite with Sequelize)
- **Authentication**: JWT (JSON Web Token)
- **Documentation**: Swagger

---

## Directory Structure

The project architecture follows best practices, ensuring modularity and scalability. Below is the basic project structure:

```bash
/src
  /controllers
  /models
  /routes
  /services
  /config
  /database
.env
README.md
