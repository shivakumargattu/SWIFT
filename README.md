# Front-End Internship Assignment - Dashboard Application

## Overview
This React application implements a dashboard with comments management and user profile features as per the internship assignment requirements. The app fetches data from JSONPlaceholder APIs and provides pagination, sorting, searching, and data persistence functionalities.

## Features Implemented

### Comments Dashboard
- Fetches and displays 500 comments from JSONPlaceholder API
- Custom pagination implementation with page sizes: 10, 50, 100
- Sorting functionality for Post ID, Name, and Email columns
  - Cycle through no sort → ascending → descending
  - Only one column sorted at a time
- Search functionality across name, email, and comment fields
- State persistence (search term, sort config, pagination) on page refresh

### Profile Screen
- Displays first user from JSONPlaceholder users API
- Non-editable profile view
- Navigation back to dashboard

### Technical Implementation
- React with functional components and hooks
- React Router for navigation
- Custom pagination logic without external libraries
- LocalStorage for state persistence
- Responsive design
- Cross-browser compatible (Chrome, Firefox, Edge)

Live URL:
  ![image](https://github.com/user-attachments/assets/8d8d96da-15ed-4ddc-a518-48f341d76c0d)

 ![image](https://github.com/user-attachments/assets/f623e4a5-8b87-4a83-8bcc-5161c1976241)


## Installation

1. Clone the repository:
   ```bash
   git clone url https://github.com/shivakumargattu/SWIFT   
