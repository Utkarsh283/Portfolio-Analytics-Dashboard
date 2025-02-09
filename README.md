
# Portfolio Analytics Dashboard
## Backend Repo
[https://github.com/Utkarsh283/Portfolio-Backend](https://github.com/Utkarsh283/Portfolio-Backend)

## Overview
The **Portfolio Analytics Dashboard** is a web application designed to provide insightful financial data visualizations and fintech metrics. Built using **React, Node.js, Express, and Tailwind CSS**, the dashboard integrates dynamic financial charts and analytics while ensuring a seamless user experience. The backend is hosted on **Vercel**, and the frontend is deployed on **GitHub Pages**.

## Features
- **Interactive Financial Data Visualizations**: Utilizes `react-chartjs-2` to present financial metrics in an engaging manner.
- **Real-time Data Processing**: Implements API-based communication to retrieve and display portfolio insights dynamically.
- **Asynchronous Data Handling**: Efficiently manages data loading and ensures smooth user interaction.
- **Date Range Validation**: Provides accurate financial trend analysis within user-defined time frames.
- **Intuitive UI/UX**: Designed with **Tailwind CSS** for a responsive and modern interface.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Chart.js (`react-chartjs-2`)
- **Backend**: Node.js, Express
- **Deployment**: 
  - **Frontend**: GitHub Pages
  - **Backend**: Vercel

## Installation & Setup
### Prerequisites
Ensure you have **Node.js** and **npm** installed on your system.

### Clone the Repositories

### Setting Up the Backend
```sh
cd backend
npm install
npm start
```
Ensure the backend server is running at `http://localhost:5000`.

### Setting Up the Frontend
```sh
cd frontend
npm install
npm start
```

Open `http://localhost:3000` in your browser to access the dashboard.

## Challenges & Solutions
- **Asynchronous Data Loading**: Used React's state management and `useEffect` to handle data fetching efficiently.
- **Financial Metric Formatting**: Implemented proper formatting techniques to ensure data accuracy and readability.
- **Date Range Validation**: Applied form validation and logic to maintain consistency in financial analysis.

## Deployment
- **Frontend** is hosted on **GitHub Pages**.
- **Backend** is deployed on **Vercel** to ensure fast and reliable API responses.



