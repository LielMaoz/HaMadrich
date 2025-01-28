
# HaMadrih: Shooting Training Management System

**HaMadrih** is a state-of-the-art platform designed to enhance the training experience for soldiers, security forces, and commanders. It provides access to professional resources, customizable shooting ranges, medical training materials, and skill development tools, all within a centralized and intuitive system.

---

## 💡 Project Overview

### Purpose
- **Centralization**:Consolidate scattered professional content from platforms like YouTube, Telegram, and WhatsApp into one accessible system.
- **Efficiency**: Enable streamlined management of training materials and schedules.
- **Accessibility**: Provide a comprehensive solution for training in remote or instructor-free scenarios.
- **Enhanced Training**: Allow users to manage and execute training effectively, ensuring professional-quality results.

### Goals:
1. **Improve User Experience**:
   - Simplified interface for building and managing shooting training schedules.
   - Features such as weather-based training adjustments using real-time data.
2. **Centralized Professional Content**:
   - Easy access to content tailored to specific weapons, optics, and first aid requirements.
   - Curated training videos for skill enhancement.

---

## 🌟 Key Features

### User Capabilities
- **Access Professional Content**: Browse curated shooting and medical training materials.
- **Target Downloads**: Explore and download various target templates for shooting practice.
- **User-Friendly Registration**: Register easily with email or Google authentication.

### Admin Capabilities
- **Content Management**:
  - Add, edit, or remove shooting ranges and training materials.
  - Create and manage customized shooting range layouts.
- **Role-Based Access**: Admins have advanced privileges for system management.

### Security:
- **Authentication using **JSON Web Tokens (JWT)**.
- **Two-step verification via email for enhanced security.**

### Integration Highlights
- **Google Drive**: Store and manage high-quality visuals and project assets.
- **Google API**: Seamless integration for various services and functionalities.
- **PostgreSQL Database**: Efficiently store and organize data for users, training topics, and targets.
- **Modern Design**: Built with Tailwind CSS for a clean and responsive user interface.
- **Cutting-Edge Frameworks**: Developed with Next.js and React for dynamic and interactive experiences.


---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) for server-side rendering and optimized performance.
- **UI Design**: Tailwind CSS for modern, responsive, and visually appealing designs.
- **Component Library**:shadcn.ui for pre-built, customizable UI components.
- **TypeScript**:Ensuring type safety and improved code maintainability.


### Backend
- **Database**: PostgreSQL for robust and scalable data storage.
- **Integration**: Seamless connection with Google Drive for asset management.
- **Authentication**: JWT for secure user sessions.


### Tools:
- **Project Management**: [Trello](https://trello.com/) for task organization and tracking.
- **Version Control**: [GitHub](https://github.com/) for version control and repository management.


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

### Database Schema
- **Users**:
  - Attributes: `id`, `name`, `email`, `password`, `role` (user/admin).
- **Shooting Ranges**:
  - Attributes: `id`, `title`, `description`, `customized_options`.
- **Targets**:
  - Attributes: `id`, `title`, `file_url`.
- **Medical Content**:
  - Attributes: `id`, `title`, `description`, `resources`.

### API Endpoints
- **User Management**:
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Authenticate existing users.
- **Shooting Ranges**:
  - `GET /api/ranges`: Fetch available shooting ranges.
  - `POST /api/ranges`: Add new shooting ranges (admin only).
- **Targets**:
  - `GET /api/targets`: Retrieve downloadable target templates.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** installed.
- **PostgreSQL** database instance.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd hamadrih-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```plaintext
   DATABASE_URL=<your-postgresql-connection-string>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application at `http://localhost:3000`.

---

## 📦 Deployment

### Deployment Steps
1. **Prepare the Production Environment**:
   - Choose a hosting platform such as [Vercel](https://vercel.com/) (optimized for Next.js) or [Heroku](https://www.heroku.com/).
   - Ensure the PostgreSQL database is hosted on a production-ready service like AWS RDS or Google Cloud SQL.

2. **Configure Environment Variables**:
   - Add your production database credentials, Google API keys, and other sensitive configurations to the hosting platform.

3. **Build the Application**:
   ```bash
   npm run build
   ```

4. **Deploy**:
   - For Vercel:
     ```bash
     vercel deploy
     ```
   - For other platforms, follow their deployment guides.

5. **Verify Deployment**:
   - Access the live application through the provided URL and test all functionalities.

---

## 📈 Future Roadmap

### Upcoming Enhancements
1. **Analytics Dashboard**: Provide insights into user activity and training progress.
2. **Offline Mode**: Enable access to resources without an internet connection.
3. **Multi-Language Support**: Expand accessibility for global users.
4. **Mobile Application**: Develop iOS and Android versions for on-the-go access.
5. **OpenWeatherMap API**: Adjust training schedules to current weather conditions.
6. **YouTube Data API**: Display professional training videos from trusted sources.
---

## 🤝 Contributing

We welcome contributions to improve **HaMadrih**! To get started:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request for review.

---

## 📜 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute the code with proper attribution.

---

## 📣 Support

For inquiries, feedback, or support, please contact the development team:
- **Liel Maoz**
- **Igal Rubin**
- **Re'em Mor**
- **Itay Hatan**
- **Ilay Arugi**
- **Ayala Or**

Alternatively, you can reach us via email at **support@hamadrih.com**.

---

We’re excited to see **HaMadrih** revolutionize shooting training and skill development!
