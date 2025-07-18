# 🧠 MindTrack - Mental Health Journaling App

A modern, AI-powered mental health journaling application that helps users track their mood, reflect on their day, and receive personalized insights to support their mental well-being.

## 🌐 Live Demo

**Try the app live:** [https://mindtracker25.netlify.app/](https://mindtracker25.netlify.app/)

## ✨ Features

### 🎯 Core Functionality
- **Mood Tracking**: Select from 5 different mood states (Happy, Neutral, Sad, Angry, Anxious)
- **Journal Entries**: Write and save personal reflections about your day
- **AI-Powered Quotes**: Receive personalized motivational quotes based on your mood and journal content
- **Quote Animation**: Smooth animations when new quotes are generated
- **Entry History**: View all your past journal entries with detailed timestamps

### 🎨 User Experience
- **Professional Design**: Modern, clean interface with gradient backgrounds and card-based layout
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Feedback**: Toast notifications for successful saves and error handling
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Accessibility**: Proper focus management, keyboard navigation, and screen reader support

### 🤖 AI Integration
- **GPT-4 Powered**: Uses OpenAI's GPT-4 model for generating personalized quotes
- **Context-Aware**: Quotes are generated based on your specific mood and journal content
- **Manual Refresh**: Generate new quotes anytime with the "New Quote" button
- **Persistent Storage**: Quotes are saved locally and persist between sessions

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **React Router** - Client-side routing for navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Toastify** - Toast notifications for user feedback

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for storing journal entries
- **Mongoose** - MongoDB object modeling for Node.js
- **OpenAI API** - GPT-4 integration for quote generation

### Development Tools
- **Create React App** - React development environment
- **Nodemon** - Automatic server restart during development
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mental-health-app
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In the server directory, create a .env file
   cd ../server
   cp .env.example .env
   ```

   Add your environment variables to `server/.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/mental-health-app
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=4000
   ```

4. **Start the development servers**
   ```bash
   # Start the backend server (from server directory)
   npm start

   # Start the frontend development server (from client directory)
   cd ../client
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: https://mental-health-app-3xur.onrender.com

## 📱 Usage

### Creating Journal Entries
1. Select your current mood from the dropdown
2. Write about your day in the journal text area
3. Click "Save Entry" to save your reflection
4. A personalized AI quote will be generated based on your mood and content

### Viewing Journal History
1. Navigate to the "Journal" page using the navigation bar
2. View all your past entries with timestamps and mood indicators
3. See entry numbers and word counts for context

### Generating New Quotes
- Quotes are automatically generated when you save a journal entry
- Click "New Quote" to generate a different quote using your last saved entry
- Quotes are personalized based on your mood and journal content

## 🎨 API Endpoints

### Journal Entries
- `GET /api/journals` - Retrieve all journal entries
- `POST /api/journals` - Create a new journal entry

### AI Quotes
- `POST /api/gpt/quote` - Generate a personalized quote based on mood and text

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #1D4ED8)
- **Secondary**: Purple gradient (#8B5CF6 to #7C3AED)
- **Background**: Soft gradient from blue-50 to purple-50
- **Text**: Gray-800 for headings, Gray-700 for body text

### Typography
- **Headings**: Bold, large text with proper hierarchy
- **Body Text**: Readable font with good line height
- **Quotes**: Italic styling for emphasis

### Components
- **Cards**: White background with subtle shadows and rounded corners
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states and validation

## 🔒 Security

- Environment variables for sensitive data (API keys, database URIs)
- CORS configuration for secure cross-origin requests
- Input validation and sanitization
- No sensitive data stored in client-side code

## 🚀 Deployment

### Frontend (Client)
- **Live Demo**: [https://mindtracker25.netlify.app/](https://mindtracker25.netlify.app/)
- Build the production version: `npm run build`
- Deploy to platforms like Vercel, Netlify, or GitHub Pages

### Backend (Server)
- **Live API**: https://mental-health-app-3xur.onrender.com
- Set up environment variables on your hosting platform
- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Ensure MongoDB connection is properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 API
- The React and Node.js communities for excellent documentation
- Tailwind CSS for the amazing utility-first CSS framework

## 📞 Support

If you have any questions or need help with the application, please open an issue in the repository.

---

**Take care of your mental health, one day at a time. 💙**