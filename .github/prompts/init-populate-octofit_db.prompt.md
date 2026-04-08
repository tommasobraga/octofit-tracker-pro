---
agent: 'agent'
model: GPT-4.1
description: 'Setup, configure, and populate the octofit_db SQLite database with test data for the Octofit Tracker Django app.'
---

# Environment Setup
- Use the existing Python virtual environment in `octofit-tracker/backend/venv`.
- Do not create a new Python virtual environment.
- Activate with: `source octofit-tracker/backend/venv/bin/activate`
- The Django project is in `octofit-tracker/backend/octofit_tracker`.

# Database Initialization & Population
1. Configure Django in `settings.py` to use SQLite (`octofit_db.sqlite3`).
2. Load `DJANGO_SECRET_KEY` and `DJANGO_DEBUG` from `backend/.env` via `python-dotenv`.
3. Make sure `octofit_tracker` and `rest_framework` are in `INSTALLED_APPS`.
4. Enable CORS in `settings.py` to allow all origins, methods, and headers.
5. Install and configure CORS middleware components.
6. Run `makemigrations` and `migrate` in the Python virtual environment.
7. Populate the database using the Django management command in `octofit-tracker/backend/octofit_tracker/management/commands/populate_db.py`:
   a. help message: 'Populate the octofit_db database with test data'
   b. Use Django ORM for data deletion and insertion
   c. Hash all passwords with `django.contrib.auth.hashers.make_password`
   d. Sample data: superhero users (Team Marvel and Team DC)
8. Verify the database was populated successfully via the REST API endpoints.

# Verification
- After population, verify with `curl` that the REST API endpoints return correct data:
  - `curl http://localhost:8090/api/users/`
  - `curl http://localhost:8090/api/teams/`
  - `curl http://localhost:8090/api/activities/`
  - `curl http://localhost:8090/api/leaderboard/`
  - `curl http://localhost:8090/api/workouts/`
