# ProfilesMe

### ProfilesMe is a profile builder platform similar to `guns.lol` that allows users to create a single, comprehensive profile link to showcase all their online presence.
![Screenshot from 2024-11-21 21-20-29](https://github.com/user-attachments/assets/f4e917d9-9767-45ea-8e7e-17437ef6804e)


[v.webm](https://github.com/user-attachments/assets/0dba224f-1209-42cb-9a2b-33208ebd6abd)




## Features

- 🔗 One Link for All Destinations
- ✨ Customizable Beautiful Design
- 🚀 Easy Profile Sharing
- Video and Image Adjustable Background

## Tech Stack

### FrontEnd
- React
- Tailwind CSS
- ShadcnUI
- Aceternity UI
- Lucide React
- TypeScript

### BackEnd
- TypeScript
- NodeJS
- Express
- MySQL
- MongoDB
- Google OAuth

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/sadanandmiskin/profilesme.git
```



- Create a `.env` file in `/backend` with:
```bash
DB_HOST=  #Mysql
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
GOOGLE_CLIENT_ID=  #get it from google cloud console
GOOGLE_CLIENT_SECRET=
JWT_SECRET=  # Random String
SESSION_SECRET=  # Random String
FRONTEND_URL=
MONGO=mongodb://mongo:27017   #mongo uri
```


### Using Docker (Recommended)
- First Install docker and docker compose.
- Then:
```bash
cd profilesMe
```
- Run the whole app container
```bash
docker compose up
# Or
# docker-compose up
```

### Or
### Using npm - yarn

### Running Backend-

- Environment Setup
```bash
cd backend
yarn install
```


- Run the server
```bash
npm run Dev
```



### Running the frontend-
2. Install dependencies
```bash
cd frontend
yarn install
```


- Change the backend url in `frontend/src/backendUrl.ts`
- Add the fronend Url in .env file in `/backend`

3. Run the development server
```bash
npm run dev
```

OR

#### Build in production
```bash
npm run build
```
- then serve

```bash
npx serve -s dist -p 5173
```

