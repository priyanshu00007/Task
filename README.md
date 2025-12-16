# Practical Task - React User Management System

This is a single-page React application developed as a practical task. It allows users to manage City names and User details using a 3-step process. The application persists data using the browser's **LocalStorage**, so data remains available even after refreshing the page.

## 📋 Features

* **Step 1: City Management**
    * Add city names to a database.
* **Step 2: User Registration**
    * Add user details: Name, Salary, Mobile Number.
    * **Dynamic City Dropdown:** Select cities added in Step 1.
    * **Image Upload:** Upload profile pictures (supports Base64 conversion and size validation).
* **Step 3: Data Management**
    * View all users in a tabular format.
    * **Edit Functionality:** Loads user data back into the form for updates.
    * **Delete Functionality:** Removes users from the list.
* **Data Persistence:** All data (Cities and Users) is saved to LocalStorage.
* **Zero Dependencies:** Uses standard CSS and React (no external UI libraries like Bootstrap or Tailwind required).

## 🚀 How to Run the Project

### Prerequisites
* Node.js installed on your machine.

### Installation Steps

1.  **Create a new React App** (if you haven't already):
    ```bash
    npx create-react-app practical-task
    cd practical-task
    ```

2.  **Add the Code:**
    * Open `src/App.js`.
    * Delete the existing code.
    * Paste the provided `App.js` code into the file.

3.  **Run the Application:**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📖 Usage Guide

1.  **Step 1:** Enter a city name (e.g., "New York", "London") and click **Submit Button**. You must add at least one city before adding a user.
2.  **Step 2:** Fill in the User details.
    * Select the city you just added from the dropdown.
    * Upload a small profile picture.
    * Click **Submit Button**.
3.  **Step 3:** Scroll down to the table.
    * Click the **Arrow (➝)** under the **Edit** column to modify a user.
    * Click the **Arrow (➝)** under the **Delete** column to remove a user.

## 🛠️ Technologies Used

* **React.js** (Functional Components & Hooks: `useState`, `useEffect`)
* **CSS-in-JS** (Styled via template literals for simplicity)
* **LocalStorage API** (For data storage)
* **FileReader API** (For handling image uploads)

## ⚠️ Notes

* **Image Size:** To prevent LocalStorage from getting full, image uploads are restricted to small file sizes (approx 500KB).
* **Browser Storage:** If you clear your browser cache/cookies, the data will be lost.

---
*Created by Priyanshu*
