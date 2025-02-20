import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

# Initialize known face encodings and names
known_face_encodings = []
known_face_names = []

# Load known faces from the dataset directory
DATASET_PATH = "dataset"
for filename in os.listdir(DATASET_PATH):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        image_path = os.path.join(DATASET_PATH, filename)
        image = face_recognition.load_image_file(image_path)
        encoding = face_recognition.face_encodings(image)
        if encoding:
            known_face_encodings.append(encoding[0])
            known_face_names.append(os.path.splitext(filename)[0])

# Function to mark attendance
def mark_attendance(name):
    with open("attendance.csv", "a") as file:
        now = datetime.now()
        dt_string = now.strftime("%Y-%m-%d %H:%M:%S")
        file.write(f"{name},{dt_string}\n")

@app.route('/api/face/register', methods=['POST'])
def register_face():
    if 'image' not in request.files or 'student_id' not in request.form:
        return jsonify({'error': 'Missing image or student_id'}), 400
    
    image = request.files['image'].read()
    student_id = request.form['student_id']
    
    # Add face registration logic here

@app.route('/api/face/verify', methods=['POST'])
def verify_face():
    if 'image' not in request.files or 'student_id' not in request.form:
        return jsonify({'error': 'Missing image or student_id'}), 400
    
    image = request.files['image'].read()
    student_id = request.form['student_id']
    
    # Add face verification logic here

# Video capture and attendance marking logic
video_capture = cv2.VideoCapture(0)

while True:
    ret, frame = video_capture.read()
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
    
    for face_encoding, face_location in zip(face_encodings, face_locations):
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"
        
        if True in matches:
            first_match_index = matches.index(True)
            name = known_face_names[first_match_index]
            mark_attendance(name)
        
        top, right, bottom, left = face_location
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
    
    cv2.imshow("Attendance System", frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()

if __name__ == '__main__':
    app.run(port=5001)
