## Getting Started

First install the node module for this run following command:

```bash
npm i
#or 
yarn
```
## Connecting to Local MongoDB

step 1: If you haven't installed MongoDB, download and install it.

step 2: Ensure your MongoDB service is running. Open a terminal and run:

```bash
mongod
```
step 3: Create a .env file in the root of your project and add your local MongoDB connection string:
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/mydatabase
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
