<!-- this is a Fundrev assignment having frontend and backend -->

# Fundrev Assignment

## Frontend

### Technologies Used
- React
- Axios
- Material UI
- Bootstrap

### Features
- Login and Register


## Backend

### Technologies Used
- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)

### Features
- Login and Register
- JWT Authentication
- CRUD operations


## Database

### Tables

#### users
- user_id (Primary Key): Unique integer identifier for each user.
- username (Unique): User's chosen username for login.
- password: Securely hashed password value.
- user_type: Indicates user role ('investor' or 'startup').

#### startups
- startup_id (Primary Key): Unique integer identifier for each startup.
- company_name: The official name of the startup.
- business_description: Text description of the startup's business.
- revenue: Startup's revenue (e.g., decimal value for currency).
- user_id (Foreign Key): Links the startup to its creator's user account.


#### sales_data
- sales_data_id (Primary Key): Unique integer identifier for each sales record.
- startup_id (Foreign Key): Links the sales record to the corresponding startup.
- sales_amount: Value of the sale (e.g., decimal value for currency).
- sales_date: Date the sale occurred.


#### investor_interests
- interest_id (Primary Key): Unique integer identifier for each interest record.
- investor_id (Foreign Key): Identifies the interested investor.
- startup_id (Foreign Key): Identifies the startup the investor is interested in.
- is_approved (Boolean): Tracks whether the startup has approved the investor's interest (default: False).

### Relationships
- One-to-One: Each startup in the startups table is created by a single user in the users table.
- One-to-Many: A startup (startups) can have multiple sales records (sales_data).
- Many-to-Many: Investors (users) can express interest in multiple startups (startups), and a startup can be of interest to multiple investors. This is managed through the investor_interests table.


<!-- setup to get started-->

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/shilu143/Fundrev.git
    ```

2. Install NPM packages for both frontend and backend:

    ```sh
    cd Fundrev/app
    npm install
    cd ../backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following environment variables:
    ```env
    JWT_SECRET=your_secret_key
    PORT=5000
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ```

4. Create a PostgreSQL database with the name specified in the `.env` file.

5. Run the backend server:
    ```sh
    cd backend
    npm start
    ```

6. Run the frontend server:
    ```sh
    cd app
    npm start
    ```

7. Access the application at `http://localhost:3000/` in your browser.



