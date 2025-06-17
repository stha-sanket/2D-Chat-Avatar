from flask import Flask, render_template, request, jsonify
import os
import json
import google.generativeai as genai
from google.generativeai.generative_models import GenerativeModel
from google.generativeai.client import configure

app = Flask(__name__)

# Store API key securely in environment variables
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    GEMINI_API_KEY = 'AIzaSyCCuYhNSAuIU80XvOzHYCyLQgnhcJjOEl0'

# Initialize the Google Generative AI client
configure(api_key=GEMINI_API_KEY)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/gemini', methods=['POST'])
def gemini_api():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    user_text = data.get('text', '')
    if not user_text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        # Generate content using the Gemini model
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(user_text)
        
        # Extract the response text
        ai_response = response.text
        return jsonify({'response': ai_response})
            
    except Exception as e:
        return jsonify({'error': f'API request failed: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
