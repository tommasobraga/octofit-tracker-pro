# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project locally

**Backend** (Django REST API — port 8090):
```bash
cd backend
python manage.py runserver 8090
```

**Frontend** (React — port 3000):
```bash
cd frontend
npm start
```

**Reset and repopulate the database:**
```bash
cd backend
python manage.py populate_db
```

> Port 8000 is blocked by the OS on this machine. Always use 8090 for the backend.

> The servers do **not** start automatically on reboot — both commands above must be run manually each session (in separate terminals).

> Modifying `frontend/.env` requires restarting `npm start` — env vars are injected at build time. To kill the process on Windows use PowerShell: `Stop-Process -Id <PID> -Force`

## Architecture

**Two-tier app: Django REST API + React SPA.**

- `backend/` — Django 4.1 project. Settings live in `backend/octofit_tracker/settings.py` (not `backend/settings.py`, which is a legacy stub). The app module is `octofit_tracker/`.
- `frontend/` — Create React App with soft azure theme.

### Backend

Pure REST API, all endpoints under `/api/` via DRF `DefaultRouter`:

| Endpoint | Model |
|---|---|
| `/api/users/` | `OctoFitUser` |
| `/api/teams/` | `Team` (includes nested `members` array) |
| `/api/activities/` | `Activity` (FK → OctoFitUser) |
| `/api/leaderboard/` | `Leaderboard` (FK → OctoFitUser) |
| `/api/workouts/` | `Workout` |

**Database**: SQLite (`backend/octofit_db.sqlite3`).

**Models note**: `Team.members` is a standard Django `ManyToManyField` → `OctoFitUser`. All serializers expose `id` as a string (`SerializerMethodField` returning `str(obj.pk)`). Passwords are stored hashed via `make_password()`.

**Environment**: sensitive settings are loaded from `backend/.env` (gitignored) via `python-dotenv`. Copy `backend/.env.example` to `backend/.env` and fill in the values. Required variables: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`.

CORS is fully open (`CORS_ALLOW_ALL_ORIGINS = True`) — no auth required.

### Frontend

**Shared abstractions** (never duplicate fetch logic):
- `src/hooks/useFetch.js` — single hook for all data fetching; takes an endpoint name, returns `{ data, loading, error }`
- `src/components/ui/PageShell.js` — handles loading spinner, error display, and page title
- `src/components/ui/DataTable.js` — generic table; takes `columns` (array of `{ label, render(row, index) }`) and `rows`

Each page component (Users, Teams, Activities, Leaderboard) is ~15 lines: call `useFetch`, define `COLUMNS`, render `<PageShell> + <DataTable>`. Workouts uses a card grid instead of a table (long description text).

**API base URL** is configured in `frontend/.env` as `REACT_APP_API_BASE_URL=http://localhost:8090`. To change the backend host/port, edit only that file.

### Data population

`backend/octofit_tracker/management/commands/populate_db.py` seeds: 10 superhero users (5 Marvel + 5 DC), 2 teams, 10 activities, 10 leaderboard entries, 8 workouts.
