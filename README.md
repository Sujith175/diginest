# React Media Manager

## About

A React-based application for managing media items, including adding, editing, and displaying media such as images and videos.

---

## Features

- Add Media: Upload images or link videos with titles and descriptions.
- Edit Media: Modify details for existing media items.
- Validation: Ensure all fields are correctly filled before submission.
- Context API: Manage state globally for the app.
- File Preview: Preview uploaded images before adding them.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-repo/react-media-manager.git
cd react-media-manager
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

---

## Setting Up React with Vite

To install and configure a React project using Vite, follow these steps:

### Step 1: Install Vite

```bash
npm create vite@latest my-react-app --template react
```

Replace `my-react-app` with your desired project name.

### Step 2: Navigate to Project Directory

```bash
cd my-react-app
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

---

## Usage

1. Start the development server with `npm run dev`.
2. Open your browser and navigate to `http://localhost:3000`.
3. Add or edit media items using the provided UI.

---

## File Structure

```
├── src
│   ├── components
│   │   ├── AddModal.jsx
│   │   ├── EditModal.jsx
│   │   └── MediaManagement.jsx
|   |   |__ Sidebar.jsx
│   ├── context
│   │   └── MediaContext.jsx
│   ├── App.jsx
│   └── main.jsx
└── public
    └── index.html
```

---

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

---

## License

This project is licensed under the MIT License.
