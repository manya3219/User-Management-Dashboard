# User-Management-Dashboard


**Step 1: Create a New React Project**


npx create-react-app user-management-dashboard


cd user-management-dashboard

**Step 2: Install Dependencies**


npm install


npm install axios


npm install -D tailwindcss


npx tailwindcss init


**Set Up Tailwind CSS Configuration**


module.exports = {


  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  
  theme: {

  
    extend: {},

    
  },

  
  plugins: [],

  
};


**Add Tailwind CSS Directives into index.css**


@tailwind base;


@tailwind components;


@tailwind utilities;



**Step 3:Start the project**


npm run start

