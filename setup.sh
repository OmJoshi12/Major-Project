mkdir university-management-system
cd university-management-system

# Backend directories
mkdir backend
cd backend
mkdir controllers models routes middleware utils config
touch server.js

# Python AI service directory
mkdir ai-service
cd ai-service
mkdir face_detection
touch app.py requirements.txt

# Frontend directory
cd ..
npx create-react-app frontend 