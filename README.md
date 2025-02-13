
# HaMadrich: Shooting Training Management System

**HaMadrich** is a state-of-the-art platform designed to enhance the training experience for soldiers, security forces, and commanders. It provides access to professional resources, customizable shooting ranges, medical training materials, and skill development tools, all within a centralized and intuitive system.

---

## 💡 Project Overview

### Purpose
- **Centralization**:Consolidate scattered professional content from platforms like YouTube, Telegram, and WhatsApp into one accessible system.
- **Efficiency**: Enable streamlined management of training materials and schedules.
- **Accessibility**: Provide a comprehensive solution for training in remote or instructor-free scenarios.
- **Enhanced Training**: Allow users to manage and execute training effectively, ensuring professional-quality results.

### Goals:
1. **Improve User Experience**:
   - Simplified interface for practicing and managing shooting training.
2. **Centralized Professional Content**:
   - Easy access to content tailored to specific weapons, optics, and first aid requirements.
   - Professional contents for skill enhancement.

---

## 🌟 Key Features

### User Capabilities
- **Access Professional Content**: Browse professional contents and medical training materials.
- **Target Downloads**: Download various target templates for shooting practice.
- **User-Friendly Registration**: Register easily with email or Google authentication.

### Admin Capabilities
- **Content Management**:
  - Add, edit, or remove shooting drills.
  - Create and manage customized shooting drills.
- **Role-Based Access**: Admins have advanced privileges for system management.

### Security:
- **Authentication using **JSON Web Tokens (JWT)**.
- **Two-step verification via email for enhanced security.**

### Integration Highlights
- **Google Drive**: Store and manage high-quality visuals and project assets.
- **Google API**: Seamless integration for various services and functionalities.
- **PostgreSQL Database**: Efficiently store and organize data for users, training topics, professional contents.
- **Modern Design**: Built with Tailwind CSS and shadcn.ui for a clean and responsive user interface.
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
- Can register and log in to the system, view professional content to improve knowledge, access medical content.
- Can download any target from the target database to choose from according to the shooting range.
- Access to the shooting range database according to the type of weapon and type of exercise.
2. **System Administrator**:
- Can register and log in to the system, view professional content to improve knowledge, access medical content.
- Can download any target from the target database to choose from according to the shooting drills.
- Access to the shooting range database according to the type of weapon and type of exercise.
- Ability to create custom shooting drills.
- Can delete and add shooting drills, hide them.
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
   cd hamadrich-app
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
   - Choose a hosting platform such as [Vercel](https://vercel.com/) (optimized for Next.js).
   - Ensure the PostgreSQL database is hosted on a production-ready service.

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

We welcome contributions to improve **HaMadrich**! To get started:
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

## 📣 Support

For inquiries, feedback, or support, please contact the development team:
- **Liel Maoz**
- **Igal Rubin**
- **Re'em Mor**
- **Itay Hatan**
- **Ilay Arugi**
- **Ayala Or**

---

We’re excited to see **HaMadrich** revolutionize shooting training and skill development!