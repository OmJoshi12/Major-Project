from flask import Flask, request, jsonify
import face_recognition
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)

class FaceDetectionService:
    def __init__(self):
        self.known_face_encodings = {}
        self.known_face_names = {}

    def add_face(self, student_id, image_bytes):
        try:
            # Convert bytes to image
            image = Image.open(io.BytesIO(image_bytes))
            # Convert to RGB (face_recognition requires RGB)
            image = image.convert('RGB')
            # Get face encoding
            face_encoding = face_recognition.face_encodings(
                np.array(image))[0]
            self.known_face_encodings[student_id] = face_encoding
            return True
        except Exception as e:
            print(f"Error adding face: {e}")
            return False

    def verify_face(self, student_id, image_bytes):
        try:
            # Convert bytes to image
            image = Image.open(io.BytesIO(image_bytes))
            image = image.convert('RGB')
            # Get face encoding
            face_encoding = face_recognition.face_encodings(
                np.array(image))[0]
            # Compare with stored encoding
            if student_id in self.known_face_encodings:
                match = face_recognition.compare_faces(
                    [self.known_face_encodings[student_id]], 
                    face_encoding
                )[0]
                return bool(match)
            return False
        except Exception as e:
            print(f"Error verifying face: {e}")
            return False

face_service = FaceDetectionService()

@app.route('/api/face/register', methods=['POST'])
def register_face():
    if 'image' not in request.files or 'student_id' not in request.form:
        return jsonify({'error': 'Missing image or student_id'}), 400
    
    image = request.files['image'].read()
    student_id = request.form['student_id']
    
    if face_service.add_face(student_id, image):
        return jsonify({'message': 'Face registered successfully'})
    return jsonify({'error': 'Failed to register face'}), 400

@app.route('/api/face/verify', methods=['POST'])
def verify_face():
    if 'image' not in request.files or 'student_id' not in request.form:
        return jsonify({'error': 'Missing image or student_id'}), 400
    
    image = request.files['image'].read()
    student_id = request.form['student_id']
    
    match = face_service.verify_face(student_id, image)
    return jsonify({'match': match})

if __name__ == '__main__':
    app.run(port=5001) 