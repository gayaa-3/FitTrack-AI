
<div align="center">

# FitTrack AI 

**Your intelligent partner for a smarter, more effective fitness journey.**

</div>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js Badge"/>
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B8?style=for-the-badge&logo=google&logoColor=white" alt="Gemini Badge"/>
</p>

FitTrack AI is an intelligent fitness workout logger powered by AI helps users track, manage, and visualize their fitness journey. It features AI-generated workout plans based on user goals, custom workout logging, and rich visualizations like progress charts and calendars. Built using modern web technologies to enhance user experience and motivation through data-driven insights. It is a modern web application that leverages the power of Google's Gemini AI to solve a common problem: generic, "one-size-fits-all" workout plans. It provides users with a hyper-personalized, flexible, and engaging fitness experience, moving beyond static templates to create routines that adapt to individual needs and goals.

---
##  Live Demo

You can view the live deployed application here:   
  https://fit-track-ai-tau.vercel.app/

---
##  Key Features

-   **AI-Powered Plan Generation:** Instantly creates detailed workout plans based on user-specific goals, fitness levels, and available equipment.
-   **Full Customization:** Users can easily add or remove exercises from their AI-generated plan, giving them complete control over their routine.
-   **Holistic Guidance:** Each plan includes crucial nutrition and safety tips for a well-rounded and safe fitness journey.
-   **Save & Track:** Users can save their customized plans to their profile to track their progress and history over time.
-   **Sleek UI:** A modern, responsive, and user-friendly interface built with React.

---

## How It Works

1.  **Define Your Profile:** Answer a few simple questions about your fitness goals, experience, and schedule.
2.  **Generate Your Plan:** The Gemini AI instantly creates a tailored workout plan.
3.  **Customize & Conquer:** Review your plan, make any desired changes, save it, and start your journey!

---

## Tech Stack

| Category      | Technology                               |
| ------------- | ---------------------------------------- |
| **Frontend** | React, CSS3, `lucide-react` (for icons)  |
| **Backend** | Node.js, Express.js                      |
| **Database** | MongoDB with Mongoose                    |
| **AI Model** | Google Gemini API                        |

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/fittrack-ai.git](https://github.com/your-username/fittrack-ai.git)
    cd fittrack-ai
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add your environment variables (see below).

3.  **Setup the Frontend:**
    ```bash
    cd frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    # From the /root directory
    npm run start
    ```
    The server will run on `http://localhost:8000` (or your specified port).

2.  **Start the Frontend Development Server:**
    ```bash
    # From the /frontend directory
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

---

### `.env` Configuration

You will need to create a `.env` file in the `backend` directory with the following variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

---

##  Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

   
---

A huge thanks to all the amazing people who have contributed to this project!

<!-- Add more contributors here -->
