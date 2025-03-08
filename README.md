# DoIt Task Manager

A modern and responsive task management application built with React, Redux, and modern JavaScript.

## Features

- **User Authentication**: Simple login system with state persistence using localStorage
- **Task Management**: Create, update, and delete tasks with ease
- **Task Prioritization**: Set priorities for tasks (High, Medium, Low)
- **Task Status**: Mark tasks as complete/incomplete
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **API Integration**: Displays weather data relevant to tasks
- **Local Storage**: Persists user data and tasks between sessions

## Technology Stack

- **Frontend**: React (with Hooks)
- **State Management**: Redux (with Redux Toolkit)
- **Routing**: React Router
- **Styling**: CSS (with Grid and Flexbox)
- **Build Tool**: Vite

## Project Structure

```
todo-app/  
│── public/               # Static assets (favicon, etc.)  
│── src/                  # Main source code  
│   ├── components/       # Reusable UI components  
│   │   ├── Sidebar.jsx   # Sidebar navigation  
│   │   ├── TaskList.jsx  # Displays task list  
│   │   ├── TaskItem.jsx  # Single task component  
│   │   ├── TaskInput.jsx # Input field for adding tasks  
│   │   ├── WeatherWidget.jsx # Weather information display  
│   │   ├── TaskDatePicker.js # Date picker for tasks  
│   │   ├── ThemeToggle.jsx # Theme toggle button  
│   ├── pages/            # App views  
│   │   ├── Home.jsx      # Main page with task list  
│   │   ├── Login.jsx     # Login page  
│   ├── store/            # State management  
│   │   ├── store.js      # Global store setup  
│   │   ├── tasksSlice.js # Task state logic  
│   │   ├── authSlice.js  # Authentication state logic  
│   │   ├── weatherSlice.js # Weather data state logic  
│   │   ├── themeSlice.js # Theme state logic  
│   ├── styles/           # CSS files  
│   │   ├── TaskDatePicker.css # Styling for date picker  
│   │   ├── ThemeToggle.css # Styling for theme toggle  
│   ├── App.jsx           # Root component  
│   ├── main.jsx          # Entry point  
│   ├── App.css           # Global styling  
│   ├── index.css         # Main CSS file  
│── index.html            # Main HTML file  
│── vite.config.js        # Vite configuration  
│── package.json          # Dependencies & scripts  
│── README.md             # Project documentation  
```

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v7.x or later)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/doit-task-manager.git
   cd doit-task-manager
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Login

- Username: `demo`
- Password: `password`

## Live Demo

Check out the live demo of the project: [DoIt Task Manager](https://todo-list-seven-sable-52.vercel.app/)

## Build for Production

```
npm run build
```

The build output will be in the `dist` directory.

## Future Enhancements

- Task categories and tags
- Task search and filter
- Dark mode toggle
- Task sharing
- Multiple user accounts with proper backend
- Task reminders and notifications
- Calendar view

