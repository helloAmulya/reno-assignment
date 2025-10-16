# School Portal

A simple web application to manage school information. This project allows users to add new schools and view a list of existing ones.

## Features

- **Add School:** Add a new school with details like name, address, city, state, contact, email, and an image.
- **View Schools:** View a list of all the schools with their information.
- **Modifications:** used an Orm (prisma) for mysql to be more easy and understandable, and used .tsx files for type safety

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [MySQL](https://www.mysql.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm
- MySQL

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd school-project
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your MySQL database connection string:

    ```
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase.
