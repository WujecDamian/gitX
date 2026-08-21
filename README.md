# GitX

GitX is a small social app for developers. Users can share posts, follow other users, and join groups. Real-time chat is still being worked on.

## Live Demo

[View the live demo](https://gitx-wujec.netlify.app)

## Screenshots

Screenshots will be added here soon.

![Home feed screenshot](https://placehold.co/1000x600?text=Home+feed+screenshot)

![Group chat screenshot](https://placehold.co/1000x600?text=Group+chat+screenshot)

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- Socket.IO (currently in progress)
- Passport with GitHub login

### Other

- PostgreSQL
- Prisma
- Redis for sessions

## Features

- GitHub login
- Create and view posts
- Like, comment on, and bookmark posts
- Follow other users
- Explore users and posts
- Create and join groups
- Chat pages (real-time messaging is still in progress)
- User and group profiles

## How to Run It Locally

You will need Node.js, PostgreSQL, and Redis installed.

1. Clone the project and install the dependencies:

	```bash
	git clone <your-repository-url>
	cd gitX
	npm install
	```

2. Create a `.env` file in the project root. Add your PostgreSQL connection and GitHub OAuth values:

	```env
	DIRECT_URL="your-postgresql-connection-string"
	GITHUB_CLIENT_ID="your-github-client-id"
	GITHUB_CLIENT_SECRET="your-github-client-secret"
	GITHUB_CALLBACK_URL="http://localhost:3000/api/auth/github/callback"
	SESSION_SECRET="a-local-session-secret"
	FRONTEND_URL="http://localhost:5173"
	```

3. Start Redis in another terminal:

	```bash
	redis-server
	```

4. Create the database tables and generate the Prisma client:

	```bash
	npx prisma migrate dev
	npx prisma generate
	```

5. Add some test data to the database:

	```bash
	npx tsx prisma/seed.ts
	```

6. Start the frontend and backend together:

	```bash
	npm run dev
	```

7. Open `http://localhost:5173` in your browser.

## What I Learned / Challenges I Faced

One challenge has been getting sessions and real-time chat to work together. The backend uses Redis to keep login sessions, while Socket.IO needs the correct server and CORS setup. I have not finished this part yet, so chat is still a work in progress. I am currently learning how to connect the Socket.IO server to the frontend correctly without breaking the normal API requests.

I also learned more about designing Prisma relations for likes, comments, groups, and messages. Some of the relations took a few migrations to get right.

## Future Improvements

- Add better error messages and loading states
- Add Recruiter page where he can see and pick from prospects
- Make it more tailored for linkedin like site (now it's simple X copy)
- Add image uploading instead of only image URLs
- Finish real-time direct messages and group chats
- Add notifications for follows, likes, and messages
- Add tests
- Improve the mobile layout

Thanks for checking out GitX. This is a learning project, and I am still improving it as I learn more.