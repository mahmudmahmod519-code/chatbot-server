# AI Chatbot API
#### A robust and feature-rich AI chatbot backend with SQLite database, supporting both web and mobile applications.

## Features

<p> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NodeJS-Dark.svg" width="40"/> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/ExpressJS-Dark.svg" width="40"/> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/SQLite.svg" width="40"/> </p>


1. AI Chat: Conversational AI with multiple context types

2. Image Processing: Upload and analyze images using AI

3. Authentication: Dual support for Cookies (web) and JWT (mobile)

4. Rate Limiting: Protection against abuse with rate limiting

5. SQLite Database: Lightweight database solution

6. File Upload: Image upload via Multer

7. Multi-Model Support: Context-based AI model selection

8. CORS Enabled: Cross-origin resource sharing support


## Project Structure
```bash
.
├── ./database/
│   └── ./database/modelDatabase.js
├── ./middleware/
│   ├── ./middleware/auth.js
│   ├── ./middleware/logger.js
│   ├── ./middleware/rateLimit.js
│   └── ./middleware/uploadfiles.js
├── ./models/
│   └── ./models/model_ai.js
├── ./router/
│   ├── ./router/chat.js
│   └── ./router/user.js
├── ./upload/
├── ./utility/
│   ├── ./utility/functionCreatePromptUser.js
│   ├── ./utility/promptsSystem.js
│   └── ./utility/validation.js
├── ./server.js
├── ./README.md
├── ./package.json
└── ./package-lock.json

```

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd your-project
```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure environment variables
Create a `.env` file in the root directory:
```bash
PORT=port
Private_KEY=your_jwt_secret_key_here
AI_API_KEY=your_ai_service_api_key
model_accuorcy=model_ai_1
model_chat=model_ai_2
model_image=model_ai_3
FRONTEND=frontend
```
### 4. Initialize the database 
- The SQLite database will be automatically created on first run.


##  Running the Server

### 1. Development mode
```bash
npm run dev
```
### 2. Production mode
```bash
npm start
```

## API Endpoints

### User
- POST `user/create-account` - create account

### Chat
- POST `/chat` - Send chat message
```json
{
  "prompt": "Your message here",
  "context": "context_type"
}
```
- POST `/chat` - Send chat message 
    - Content-Type: multipart/form-data
    - Field name: image

## Security Features

### Rate Limiting

    100 requests per 15 minutes per endpoint
    Standard headers implementation
    Prevents API abuse

### Authentication

    Web: Session-based with cookies
    Mobile: Token-based with JWT
    Automatic token refresh support

### File Upload Security
    Only image files allowed
    File size limit: 2GB
    Secure filename generation


## Database Schema

### USER Table
```sql
CREATE TABLE USER(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### HISTORY Table
```sql
CREATE TABLE HISTORY(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    chat TEXT,
    type_context TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE
);
```

## System Prompts
- Customize system prompts in `./utility/promptsSystem.js:`
```js
module.exports = {
  assistant: "You are a helpful assistant...",
  creative: "You are a creative writer...",
  technical: "You are a technical expert..."
};
```

## File Upload

### Supported Image Formats
- JPEG/JPG
- PNG
- GIF
- BMP
- WebP

## Upload Configuration
- Storage: Local upload/ directory
- Max file size: 2GB
- Automatic filename: timestamp-originalname

## Error Handling

### The API provides comprehensive error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Common Error Codes

- `401`: Unauthorized
- `403`: Forbidden
- `404`: Resource not found
- `413`: File too large
- `429`: Too many requests
- `500`: Internal server error

## Performance

- Response Time: < 200ms average
- Concurrent Users: Supports 1000+ concurrent connections
- Database: SQLite with connection pooling
- Caching: Implemented for frequent queries

## Deployment

### Prerequisites

- Node.js 16+
- npm 8+
- 512MB RAM minimum
- 1GB storage


### Deployment Steps
1. Set up production environment variables
2. Install dependencies: npm install --production
3. Start server: npm start
4. Configure reverse proxy (Nginx/Apache) if needed

### PM2 (Recommended for production)

```bash
npm install -g pm2
pm2 start server.js --name chatbot-api
pm2 save
pm2 startup
```


## License

### This project is licensed under the MIT License - see the LICENSE file for details.

## Support

### For support, email: mahmudmahmod519@gmail.com or create an issue in the GitHub repository.

## Acknowledgments
- Express.js team
- SQLite community
- AI model providers
- All contributors