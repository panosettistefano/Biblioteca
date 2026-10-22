# Biblioteca di Stefano

A web-based library management application built with **JavaScript, Node.js, Express, Bootstrap and MockAPI**. The project allows users to manage a collection of books through CRUD operations, filter titles by genre, and generate useful library statistics.

The application was developed as a practical exercise in frontend-backend communication, REST API integration, DOM manipulation, and event-driven programming.

---

## Features

- **Book Management** — Add, edit, and delete books from the collection.
- **Dynamic Book Listing** — Retrieve and display books from the API.
- **Genre Filtering** — Automatically populate the genre filter based on the available books.
- **Library Statistics** — Calculate the total number of books, total pages, publication periods, and the most recently published book.
- **Interactive Interface** — Use Bootstrap components and modals to organize the main actions.
- **REST API Integration** — Communicate with MockAPI to retrieve and manage book data.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Application logic, DOM manipulation, and event handling |
| Node.js | JavaScript runtime |
| Express | Server-side application and API routing |
| MockAPI | Remote API and book data management |
| Bootstrap | Responsive layout and UI components |
| HTML5 & CSS3 | Page structure and styling |

---

## Project Structure

```text
LibreriaStefano/
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── screenshot&link/
│   └── Screenshots and MockAPI references
├── package.json
├── server.js
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js
- npm
- A configured MockAPI endpoint for the books resource

### Installation

1. Clone the repository:

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd LibreriaStefano
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure the MockAPI endpoint in the appropriate application file, using your own API URL.

4. Start the server using the command defined in `package.json`. For example, if the project uses `server.js` directly:

   ```bash
   node server.js
   ```

5. Open the local address exposed by the server in your browser.

---

## How It Works

The application is organized into three main parts:

**1. Backend — `server.js`**

Sets up the Node.js server with Express and prepares the application for API operations.

**2. Frontend — `public/`**

The HTML defines the interface, Bootstrap provides the main layout and modal components, and CSS handles additional styling. JavaScript connects interface elements to their respective events and operations.

**3. Data Layer — MockAPI**

Book data is retrieved from and managed through the configured MockAPI resource. The frontend uses this data to render the collection, apply filters, and calculate statistics.

---

## Library Statistics

The statistics section provides an overview of the collection, including:

- Total number of books
- Total number of pages
- Distribution across three historical publication periods
- Most recently published book

Statistics are calculated in JavaScript from the available book data and can be refreshed through the interface.

---

## What I Learned

This project helped me practise:

- Structuring a small web application with separate frontend and backend files
- Working with API endpoints and remote data
- Implementing CRUD operations
- Connecting UI elements to JavaScript event handlers
- Dynamically generating filter options from API data
- Processing collections and calculating statistics
- Building interfaces with Bootstrap while keeping custom CSS lightweight

---

##  Author

**Stefano Panosetti**

[LinkedIn](https://www.linkedin.com/in/stefano-panosetti-51b65b1b0) · [Portfolio](https://panosettistefano.github.io/portfolio/)

---

*Built as a hands-on project to explore web development, API integration, and data-driven interfaces.*
