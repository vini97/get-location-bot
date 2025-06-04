# Project: Get Location Bot

This tutorial will guide an absolute beginner through setting up, running locally, and deploying a web application that simulates a payment receipt, captures the user's geolocation, and sends notifications via Telegram.

> **ATTENTION:**
> Use this knowledge with care and responsibility.

### ✨ Tech Stack
* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript) for server-side rendering.
* **Security:** Environment variables with `dotenv` to protect API keys.
* **APIs:** Telegram Bot API, Browser Geolocation API.
* **Deployment:** Optimized for PaaS platforms like Render.com.

---

## 🚀 Part 1: Local Environment Setup

Let's prepare your machine to run the project.

### 1. Prerequisites

Before you begin, make sure you have **Node.js** and **Git** installed.

* **Node.js (v16 or higher):** [Download and install from the official website](https://nodejs.org/). `npm` (node package manager) will be installed alongside it.
* **Git:** [Download and install from the official website](https://git-scm.com/).

To check your installations, open your terminal and run:
   ```bash
   node -v
   git --version
   ```

You should see the version numbers for each.

### 2. Clone and Install the Project

1.  **Clone the repository:** Choose a folder on your computer and run the command: 
    
   ```bash
   git clone https://URL_OF_YOUR_REPOSITORY_ON_GITHUB.git
   ```
 
2.  **Navigate to the project directory:** 
       
   ```bash
   cd project-folder-name
   ```
    
3.  **Install dependencies:** `npm` will read the `package.json` file and download everything the project needs. 
    
```bash
npm install
```
    
### 3\. Configuring Environment Variables (Secrets) 🔐

We **NEVER** put secret tokens or keys directly in our code. We use a `.env` file for local security.

1.  In the project root, you will find a file named `.env.example`. This is a template.
2.  Create a copy of this file and rename it to `.env`. 
    
   ```bash
   # On Linux/macOS
   cp .env.example .env

   # On Windows
   copy .env.example .env
   ```
    
3.  Open the new `.env` file with your code editor and fill it with your own secret keys: 
    
  ```bash
  # .env file
  # Replace the values with your actual data obtained fromTelegram
  TELEGRAM_BOT_TOKEN=YOUR_TOKEN_HERE_FROM_BOTFATHER
  TELEGRAM_CHAT_ID=YOUR_CHAT_ID_HERE_FROM_TELEGRAM
  ```
    
4.  **IMPORTANT:** The project's `.gitignore` file is already configured to ignore the `.env` file, ensuring your secrets are never committed to GitHub.

### 4\. Getting Your Telegram Keys

To fill out your `.env` file, follow these steps:

1.  **BOT TOKEN:** In Telegram, search for and start a conversation with **@BotFather**. Send the `/newbot` command, follow the instructions, and make a note of the **token** provided.
2.  **CHAT ID:**
    *   **For a private chat:** Send a message to your bot and then access the URL `https://api.telegram.org/botYOUR_TOKEN_HERE/getUpdates`. The `chat.id` will be a **positive** number.
    *   **For a group chat:** Add your bot to the group, send a message there, and then access the same URL. The `chat.id` will be a **negative** number.

---

## 💻 Part 2: Running the Application Locally

With everything configured, starting the server is simple.

1.  In your terminal, inside the project folder, run the command:
    
    ```bash
    npm start
    ```
    
    _This command executes the_ `_start_` _script defined in_ `_package.json_`_, which in turn runs_ `_node server.js_`_._
    
2.  After seeing the confirmation message in the terminal (e.g., "Server running on port 8088"), open your web browser.
3.  Navigate to the following address: [http://localhost:8088]

The receipt page will be displayed. At the same time, your location will be captured and sent to your Telegram bot.

---

## ☁️ Part 3: Deploying to the Cloud with Render.com

Let's get your application online so anyone can access it. We will use **render.com**, which has an excellent free tier for this type of project.

### 1\. Preparing the Code for Deployment

1.  **Dynamic Port:** Our `server.js` is already configured to use the port provided by the production environment (`process.env.PORT`), which is essential for deployment.
2.  **Push to GitHub:** Make sure all your changes are saved and pushed to your GitHub repository. 
        
    ```bash
    git add .
    git commit -m "Prepare for deployment to Render"
    git push
    ```
    

### 2\. Setting up on Render.com

1.  Create a free account at [**Render.com**](https://render.com/), connecting your GitHub account to streamline the process.
2.  On the Dashboard, click **"New +"** and select **"Web Service"**.
3.  Connect your GitHub account and select this project's repository.
4.  Configure the service details:
    *   **Name:** Give your application a unique name (e.g., `my-digital-receipt`).
    *   **Region:** You can leave the default.
    *   **Runtime:** `Node`.
    *   **Build Command:** `npm install`.
    *   **Start Command:** `npm start`.
    *   **Plan:** Ensure the **Free** plan is selected.
5.  Click **"Create Web Service"**.

### 3\. Configuring Secrets on Render

Render cannot access your local `.env` file. You need to configure the environment variables securely on the platform.

1.  After creating the service, go to your application's dashboard on Render and click the **"Environment"** tab.
2.  In the "Environment Variables" section, click **"Add Environment Variable"** and add your keys, one by one:
    *   **Key:** `TELEGRAM_BOT_TOKEN`, **Value:** `PASTE_YOUR_SECRET_TOKEN_HERE`
    *   **Key:** `TELEGRAM_CHAT_ID`, **Value:** `PASTE_YOUR_CHAT_ID_HERE`

Render will save these variables securely and restart your application.

### 4\. Accessing Your Application Online

Wait a few moments for the build and deployment process to complete. Render will provide a public URL at the top of the dashboard (e.g., `https://my-digital-receipt.onrender.com`).

**Congratulations!** 🚀 Your full-stack Node.js application is now live, secure, and accessible from anywhere in the world.