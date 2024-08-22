# School Management API

This is a Node.js backend application for managing school data. The API allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location. It is built using Express.js, MySQL, TypeScript, and Zod for input validation.

## Features

- **Add School:** Add a new school to the database with name, address, latitude, and longitude.
- **List Schools:** Retrieve a list of all schools sorted by their proximity to a given latitude and longitude.

## Technologies Used

- **Node.js:** JavaScript runtime for building the backend.
- **Express.js:** Web framework for creating RESTful APIs.
- **TypeScript:** Superset of JavaScript that adds static typing.
- **MySQL:** Relational database to store school data.
- **Zod:** TypeScript-first schema declaration and validation library.


## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js** (v14+)
- **MySQL** database
- **TypeScript** globally installed (`npm install -g typescript`)

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/school-management-api.git
    cd school-management-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory and add your environment variables:

    ```plaintext
    DATABASE_URL=mysql://user:password@localhost:3306/schooldb
    ```

4. **Create the database schema:**

    You can define and create the database tables directly from the code. Prisma will handle this automatically. Run the following command:

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Run the application:**

    ```bash
    npm run dev
    ```

    The API should now be running at `http://localhost:3000`.

## API Endpoints

### Add School

- **Endpoint:** `/api/addSchool`
- **Method:** POST
- **Description:** Adds a new school to the database.
- **Request Body:**
    ```json
    {
        "name": "Sample School",
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.0060
    }
    ```
- **Response:**
    ```json
    {
        "message": "School added successfully",
        "schoolId": 1
    }
    ```

### List Schools

- **Endpoint:** `/api/listSchools`
- **Method:** GET
- **Description:** Retrieves a list of schools sorted by proximity to the specified location.
- **Query Parameters:**
    - `latitude`: The latitude of the user's location.
    - `longitude`: The longitude of the user's location.
- **Response:**
    ```json
    [
        {
            "id": 1,
            "name": "Sample School",
            "address": "123 Main St",
            "latitude": 40.7128,
            "longitude": -74.0060,
            "distance": 0.5
        },
        ...
    ]
    ```

## Development

### Project Structure

