# Blog Website

A simple blog platform where users can write and publish posts. Each post is stored as a text file on the server.

## Features

* ✍️ Create and publish blog posts
* 📂 Posts are saved as text files in the server
* 📖 Homepage lists all posts
* 🔒 No update or delete functionality (write-only blog)

## Tech Stack

* **Backend:** Node.js, Express.js
* **Storage:** Local file system (text files)
* **Frontend:** EJS, HTML, CSS

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   nodemon index.js
   ```

4. Open in browser:

   ```
   http://localhost:3000
   ```

## Usage

* Go to the "New Post" page to create a blog entry
* Each new post is stored as a `.txt` file on the server
* Homepage shows all available posts

