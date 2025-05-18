# 🏥 Medical Appointment Viewer

A full-stack application to manage medical appointments, including doctors and their specializations.

---

## 📁 Project Structure

- **Backend:** Django REST Framework API (`medical_backend` project with `appointments` app)
- **Frontend:** Next.js React app (`frontend` folder)

---

## 🚀 Getting Started

### 1. Prerequisites

- Python 3.11+
- Node.js 22+
- PostgreSQL (or preferred database)

---

## ⚙️ Backend Setup (`medical_backend`)

### 2. Clone the Repository
git clone <your-repo-url>
cd medical_backend

3. Create and Activate Virtual Environment

python -m venv venv
# For Linux/Mac:
source venv/bin/activate
# For Windows:
venv\Scripts\activate

4. Install Dependencies
pip install -r requirements.txt

5. Configure Database
Update the database settings in medical_backend/settings.py to match your PostgreSQL configuration.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'medical_db',
        'USER': 'postgres',
        'PASSWORD': 'rahul',
        'HOST': 'localhost',
        'PORT': '5433',
    }
}

6. Apply Migrations
python manage.py migrate

7. Seed Sample Data
python manage.py seed_data

8. Start the Backend Server
python manage.py runserver

The backend API will be available at http://localhost:8000.

Frontend Setup (frontend)
9. Navigate to Frontend Directory
cd ../frontend

10. Install Dependencies
npm install

11. Start the Development Server
npm run dev

Open your browser at http://localhost:3000 to view the app.

API Endpoints
Endpoint	Description
/doctors/	List all doctors
/appointments/	List, filter, create, update, delete appointments

Notes
Ensure the backend server is running before starting the frontend.

You may need to update API base URLs in the frontend's api.js file if you're using a different backend host/port.






