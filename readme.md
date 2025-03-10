# The Field Worker Tracking App
## Capstone Project

## Project Overview
The **Field Worker Tracking App** is designed to help employers monitor and verify the attendance of field workers by leveraging facial biometric authentication and live location tracking. This ensures transparency and prevents false reporting of attendance. The app allows workers to view their daily schedules and mark their attendance at assigned locations with biometric verification and location capture.

## Core Features

### Worker Profile & Authentication:
- Secure login with email and password.
- Face biometric registration and verification for attendance marking.

### Schedule Management:
- Workers can view their assigned appointments and tasks for the day.
- Employers can create and modify schedules for workers.

### Attendance Marking with Verification:
- Workers mark attendance at each appointment location using facial recognition.
- The app captures live GPS location to verify presence at the designated site.
- Timestamped attendance records are maintained.
- After the work ends, the worker must end the appointment and submit their live location.

### Emergency Reporting:
- Workers can send emergency alerts with location to their employers.

### Employer Dashboard:
- Overview of all workers' schedules and attendance records.
- Live tracking of worker locations when they check in.
- Reports on worker attendance, punctuality, and performance.
- Employers have access to all departments and can switch between them using a dropdown menu.
- Department heads have access only to their assigned departments but can switch between them using the dropdown.
- Access to departments is granted via unique codes that allow users to join a department or assign access.
- When selecting a department, employers can see all active field workers with their faces and names displayed.
- Clicking on a worker provides detailed information about them.
- Below, there is a section displaying inactive or absent workers in a slightly grayed-out or transparent view with their name and picture.

### Notifications & Alerts:
- Automated reminders for workers to check in at their scheduled locations.
- Alerts to employers in case of missing or delayed attendance.

### Offline Mode:
- Ability to mark attendance even in low-network areas, syncing once online.

### Worker History & Reports:
- Workers can view their past attendance and completed tasks.
- Employers can generate reports for payroll and performance analysis.

### Multi-Language Support:
- Users can choose their preferred language from a list of supported languages.
- Employers can set default language preferences for their workforce.
- Dynamic text translation for seamless communication.

## Pages in the App:
- **Login/Signup Page** – User authentication and biometric registration.
- **Dashboard (Worker)** – Displays daily schedule, upcoming tasks, and attendance status.
- **Dashboard (Employer)** – Shows worker locations, schedules, and attendance logs.
- **Attendance Check-in Page** – Facial recognition and GPS tracking interface.
- **Schedule Page** – Workers view their assigned locations and tasks.
- **Settings Page** – Profile management, biometric re-registration, notification preferences.
- **Help & Support Page** – FAQ, contact support, troubleshooting guides.

## Conclusion
This app will provide employers with real-time attendance tracking and verification while ensuring field workers have a transparent system to record their schedules. The biometric and location verification features make it a reliable tool for workforce management.

While there are applications that offer a range of features related to GPS tracking and attendance verification, my proposed app's unique combination of comprehensive daily scheduling, biometric verification at multiple points (start and end of appointments), department-based access controls, and multi-language support could provide a more tailored solution for specific organizational needs.

Developing my app with these integrated features could address gaps in the current market offerings, especially for organizations requiring detailed oversight of field operations with robust security and accessibility options.

## Project Timeline

| Day  | Tasks |
|------|----------------------------------------------|
| 1    | Submitting Project Idea + Plan |
| 2    | Lo-Fi Design |
| 3    | Hi-Fi Design |
| 4    | GitHub Project Setup |
| 5    | Task & Milestone Tracking |
| 6    | Backend Initialization - setting up Node and Express backend |
| 7    | User Authentication (Username/Password) Using JWTs |
| 8    | Begin initial design concepts |
| 9    | Database Schema Creation |
| 10   | Database Operations (CRUD) |
| 11   | Implementing Entity Relationships |
| 12   | GET API Development |
| 13   | POST API Development |
| 14   | PUT API Development |
| 15   | DELETE API Development |
| 16   | Deploying Backend Server |
| 17   | Initializing React Frontend |
| 18   | Creating React Components |
| 19   | Deploying Frontend |
| 20   | Implementing File Upload |
| 21   | Third-Party Authentication |
| 22   | Implementing Rate Limiting |
| 23   | Testing with Jest |
| 24   | Dockerizing Application |
| 25   | Open Source Contribution |
| 26   | Increasing Project Usage |
| 27   | Collecting Feedback & Fixing Bugs |
| 28   | Final Submission & Documentation |

This structured timeline helps in completing the project efficiently within the planned 4-week schedule.




## Frontend Deployment Link

https://trackmateapp.netlify.app/
