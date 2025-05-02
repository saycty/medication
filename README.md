# Patient Dashboard (Take-Home Challenge)

This is a full-stack prototype for the **Patient Dashboard** as part of the Full Stack Engineer assessment. It features user authentication, a dashboard overview, weight progress tracking, and medication shipment information — powered by mock data.

---

##  Features

- **Secure User Authentication** with email and password (JWT-based)
- **Dashboard Overview** with user welcome and summary
- **Weight Progress Page**
  - View weight history (mock)
  - BMI calculation and progress tracking
- **Medication Page**
  - View past and upcoming medication shipments (mock)
- Responsive and clean UI design using React + Tailwind +shadcn

---

##  Figma Designs

You can preview the UI design and UX structure in the Figma link below:
[View Figma Designs](https://www.figma.com/file/your-figma-link-here)  
*https://www.figma.com/design/yK9do2A5ila8KYgLoQ6ct6/Untitled?node-id=9-120&t=nlikXplBQhLw7YoS-1*

---

## System Design (Summary)

- **Frontend**: React.js (with React Router, Context API, Tailwind CSS)
- **Backend**: Node.js with Express
- **Authentication**: JWT with access + refresh tokens, secure cookies
- **Mock Data**: Used for weight entries and medication details
- **API Style**: RESTful
- **Database**: only for auth and user data its used mongo.
- **Security**: Token-based auth, HTTP-only cookies
- ideally these weight and other data which are at this moment hardcoded in frontned as mock data can be passed or read
from the backend apis, which ideally should be stored somewhere in DB or in redis for caching.
---

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/medication.git
cd medication
cd frontend
npm run dev
```
Run Backend (in a separate terminal)
```bash
cd backend 
npm start
```

## ENV variable:
```bash
MONGO_URL=" "
SECRET_KEY=" "
REFRESH_SECRET_KEY=" "
PORT=5000
```
