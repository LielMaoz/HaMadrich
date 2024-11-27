# Shooting Training Management System

The **Shooting Training Management System** is a professional web application designed to modernize and centralize shooting training for military and security forces. Built with cutting-edge technologies, the platform enables users to efficiently manage training schedules, access professional shooting and first aid content, and adapt training to dynamic conditions such as weather. This system eliminates the need for scattered resources and provides an all-in-one solution tailored to operational needs, even without the physical presence of an instructor.

---

## 💡 Project Overview

### Purpose:
- **Centralization**: Consolidate scattered professional content from platforms like YouTube, Telegram, and WhatsApp into one accessible system.
- **Enhanced Training**: Allow users to manage and execute training effectively, ensuring professional-quality results.
- **Accessibility**: Provide a comprehensive solution for training in remote or instructor-free scenarios.

### Goals:
1. **Improve User Experience**:
   - Simplified interface for building and managing shooting training schedules.
   - Features such as weather-based training adjustments using real-time data.
2. **Centralized Professional Content**:
   - Easy access to content tailored to specific weapons, optics, and first aid requirements.
   - Curated training videos for skill enhancement.

---

## 🌟 Features

### Core Functionality:
1. **User Management**:
   - Registration and login with two-step verification for secure access.
   - Role-based permissions for regular users and administrators.

2. **Professional Content**:
   - Training plans tailored to weapon types and optics.
   - Access to detailed shooting range logistics, safety highlights, and first aid materials.
   - Curated video content integrated via YouTube Data API.

3. **Training Management**:
   - Create, view, and edit training schedules.
   - Weather-based training adjustments using OpenWeatherMap API.
   - Downloadable targets in PDF format for practice.

4. **Reviews and Feedback**:
   - Users can rate instructors and provide feedback on training sessions.
   - Optional admin feedback system for suggestions and comments.

### Security:
- Authentication using **JSON Web Tokens (JWT)**.
- Two-step verification via email for enhanced security.
- Role-based access to segregate user capabilities.

### Integration:
- **OpenWeatherMap API**: Adjust training schedules to current weather conditions.
- **YouTube Data API**: Display professional training videos from trusted sources.

---

## 🛠️ Technology Stack

### Frontend:
- **Framework**: [Next.js](https://nextjs.org/) for dynamic rendering and client-server integration.
- **UI**: Responsive and intuitive interface designed for seamless user interaction.

### Backend:
- **Database**: [MongoDB](https://www.mongodb.com/) for scalable and efficient data management.
- **Authentication**: JWT for secure user sessions.

### External APIs:
- **OpenWeatherMap**: Real-time weather updates for training adaptation.
- **YouTube Data API**: Video integration for professional content display.

### Tools:
- **Version Control**: [Git](https://git-scm.com/) for project collaboration.
- **Testing**: [Postman](https://www.postman.com/) for API validation.

---

## 🔑 User Roles

1. **Regular User**:
   - Register and log in to access training materials.
   - Manage personal training schedules and content.
   - Watch curated professional videos and download practice targets.
2. **Administrator**:
   - Full system control, including user and content management.
   - Moderate feedback and ensure the quality of training materials.

---

## 📂 Implementation Details

### Database Schema:
1. **Users**:
   - `id`, `name`, `email`, `password`, `role`.
2. **Trainings**:
   - `id`, `title`, `description`.
3. **Instructors**:
   - `id`, `name`, `bio`.
4. **Reviews**:
   - `id`, `user_id`, `training_id`, `rating`, `comment`.

### API Routes:
1. **User API**:
   - `POST /api/register`: Register a new user.
   - `POST /api/login`: Authenticate a user.
   - `GET /api/profile`: Retrieve user profile details.
2. **Training API**:
   - `GET /api/trainings`: Fetch a list of all training plans.
   - `POST /api/trainings`: Add a new training plan.
3. **Reviews API**:
   - `POST /api/reviews`: Submit a review.
   - `GET /api/trainings/:id/reviews`: Get reviews for a specific training session.

### Security Features:
- Role-based access ensures regular users and administrators have appropriate permissions.
- Secure JWT authentication for data protection and session integrity.

### External Integration:
1. **OpenWeatherMap API**:
   - Fetches real-time weather data for temperature, humidity, and wind speed.
   - Example Usage: Adjust training plans dynamically.
2. **YouTube Data API**:
   - Retrieves professional video content based on user queries.
   - Example Usage: Show curated shooting training videos.

---

## 🚀 Getting Started

### Prerequisites:
- **Node.js** installed.
- A running **MongoDB** instance.

### Installation Steps:
1. Clone the repository:
   ```bash
   git clone <repository-url>
### 2. Navigate to the Project Directory:
   ```bash
   cd shooting-training-management
   ```

### Install Project Dependencies:
   ```bash
   npm install
   ```

### Configure Environment Variables:
1. Create a `.env` file in the project root directory.
2. Add the following environment variables:
   ```plaintext
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   OPENWEATHER_API_KEY=<your-openweathermap-api-key>
   YOUTUBE_API_KEY=<your-youtube-api-key>
   ```
   Replace placeholders with your actual API keys and MongoDB connection details.

### Run the Development Server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

### Test API Routes:
- Use a tool like **Postman** or **Insomnia** to test the API endpoints.
- Example endpoints:
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Log in with existing credentials.
  - `GET /api/trainings`: Fetch a list of training sessions.

### Build for Production (Optional):
   ```bash
   npm run build
   ```
   This command optimizes the app for deployment by generating a production-ready build.

### Start the Production Server (After Building):
   ```bash
   npm start
   ```

---

## 🧪 Testing

### Manual Testing:
- Use **Postman** to verify the functionality of each API endpoint.
- Test user flows such as registration, login, and training management via the front end.

### Automated Testing:
- Future plans include implementing unit tests for API routes and components using testing libraries like **Jest**.

---

## 📈 Future Enhancements

### Planned Features:
1. **Enhanced Training Analytics**:
   - Track user progress and provide insights into completed training sessions.
2. **Push Notifications**:
   - Notify users about upcoming training schedules or content updates.
3. **Offline Mode**:
   - Enable access to downloaded resources and training content without an internet connection.
4. **Multi-language Support**:
   - Expand accessibility by providing content in multiple languages.

---

## 🖥️ Deployment

### Steps to Deploy the Application:

1. **Set Up a Production Environment**:
   - Choose a cloud provider such as **[Vercel](https://vercel.com/)** (recommended for Next.js) or **[Heroku](https://www.heroku.com/)**.

2. **Configure Environment Variables**:
   - Add all required API keys and secrets to the cloud provider's environment variable settings.

3. **Deploy the App**:
   - If using **Vercel**:
     ```bash
     vercel
     ```
   - If using another provider, follow their specific deployment steps.

4. **Verify the Deployment**:
   - Access your live app via the provided URL.

---

## 📣 Support

If you encounter issues or have questions about the project, feel free to reach out to the project owners:
## 📣 Support

If you encounter issues or have questions about the project, feel free to reach out to the project owners:
- **Liel Maoz**
- **Igal Rubin**
- **Re'em Mor**
- **Itay Hatan**
- **Ilay Arugi**
- **Ayala Or**

---

## 🌟 Contribute

Contributions to the project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Submit a pull request for review.

---

## 📖 Documentation

Detailed documentation for the project’s APIs and features can be found in the `/docs` directory. This includes:
- API specifications.
- Database schema.
- Integration guidelines for external APIs.

---

## 📜 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this project as long as you include proper attribution.

For more details, see the [LICENSE](LICENSE) file.
