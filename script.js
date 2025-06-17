document.addEventListener('DOMContentLoaded', () => {
    // Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue background
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create avatar group
    const avatar = new THREE.Group();
    scene.add(avatar);
    
    // Head - slightly flattened sphere for a more cartoon look
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffcc99,
        roughness: 0.7,
        metalness: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.scale.y = 1.1; // Slightly taller head
    head.scale.x = 1.05; // Slightly wider head
    avatar.add(head);
    
    // Add hair
    const hairGeometry = new THREE.SphereGeometry(1.05, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const hairMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513, // Brown hair
        roughness: 1,
        metalness: 0
    });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.y = 0.2;
    hair.rotation.x = 0.2;
    avatar.add(hair);
    
    // Eyes - white part
    const eyeGeometry = new THREE.SphereGeometry(0.18, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.1
    });
    
    // Left eye
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.35, 0.25, 0.85);
    avatar.add(leftEye);
    
    // Right eye
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.35, 0.25, 0.85);
    avatar.add(rightEye);
    
    // Pupils
    const pupilGeometry = new THREE.SphereGeometry(0.08, 32, 32);
    const pupilMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4B0082, // Indigo for a friendlier look
        roughness: 0.1,
        metalness: 0.1
    });
    
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(0, 0, 0.1);
    leftEye.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0, 0, 0.1);
    rightEye.add(rightPupil);
    
    // Eyelids
    const eyelidGeometry = new THREE.SphereGeometry(0.19, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const eyelidMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffcc99, // Same as skin
        roughness: 0.7,
        metalness: 0.1
    });
    
    const leftEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
    leftEyelid.rotation.x = Math.PI;
    leftEyelid.position.set(0, 0.09, 0);
    leftEyelid.visible = false; // Only visible when blinking
    leftEye.add(leftEyelid);
    
    const rightEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
    rightEyelid.rotation.x = Math.PI;
    rightEyelid.position.set(0, 0.09, 0);
    rightEyelid.visible = false; // Only visible when blinking
    rightEye.add(rightEyelid);
    
    // Eyebrows
    const eyebrowGeometry = new THREE.BoxGeometry(0.25, 0.05, 0.05);
    const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    
    const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    leftEyebrow.position.set(-0.35, 0.45, 0.85);
    avatar.add(leftEyebrow);
    
    const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    rightEyebrow.position.set(0.35, 0.45, 0.85);
    avatar.add(rightEyebrow);
    
    // Nose
    const noseGeometry = new THREE.ConeGeometry(0.1, 0.2, 32);
    const noseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffbb99, 
        roughness: 0.7,
        metalness: 0.1
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.rotation.x = -Math.PI / 2;
    nose.position.set(0, 0, 1);
    avatar.add(nose);
    
    // Mouth - using a curved shape
    const mouthShape = new THREE.Shape();
    mouthShape.moveTo(-0.2, 0);
    mouthShape.quadraticCurveTo(0, -0.1, 0.2, 0);
    
    const mouthGeometry = new THREE.ShapeGeometry(mouthShape);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.3, 0.9);
    mouth.rotation.x = -0.1;
    avatar.add(mouth);
    
    // Cheeks
    const cheekGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const cheekMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff9999,
        roughness: 0.7,
        metalness: 0.1,
        transparent: true,
        opacity: 0.6
    });
    
    const leftCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    leftCheek.position.set(-0.5, -0.1, 0.7);
    avatar.add(leftCheek);
    
    const rightCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    rightCheek.position.set(0.5, -0.1, 0.7);
    avatar.add(rightCheek);
    
    // Animation states
    let animationState = 'idle';
    let blinkTime = 0;
    
    // Status display
    const statusDisplay = document.getElementById('statusDisplay');
    
    // Speech recognition setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    // Speech synthesis setup
    const synth = window.speechSynthesis;
    
    // Gemini API key and URL
    const GEMINI_API_KEY = 'AIzaSyCCuYhNSAuIU80XvOzHYCyLQgnhcJjOEl0';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash';
    
    // Talk button
    const talkBtn = document.getElementById('talkBtn');
    let isListening = false;
    
    // Start listening for speech
    talkBtn.addEventListener('click', () => {
        if (!isListening) {
            startListening();
        } else {
            stopListening();
        }
    });
    
    function startListening() {
        try {
            recognition.start();
            isListening = true;
            talkBtn.textContent = 'Stop Listening';
            animationState = 'listening';
            updateStatus('Listening...');
        } catch (err) {
            console.error('Error starting speech recognition:', err);
            updateStatus('Error: Could not start listening');
        }
    }
    
    function stopListening() {
        recognition.stop();
        isListening = false;
        talkBtn.textContent = 'Talk to Avatar';
        animationState = 'idle';
        updateStatus('Ready');
    }
    
    // Handle speech recognition results
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        updateStatus(`You said: ${transcript}`);
        console.log('Recognized speech:', transcript);
        
        // Send to Gemini AI
        sendToGemini(transcript);
    };
    
    recognition.onend = () => {
        if (isListening) {
            // If we're still in listening mode but recognition ended, restart it
            recognition.start();
        }
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        updateStatus(`Error: ${event.error}`);
        isListening = false;
        talkBtn.textContent = 'Talk to Avatar';
        animationState = 'idle';
    };
    
    // Send text to Gemini AI
    async function sendToGemini(text) {
        updateStatus('Thinking...');
        animationState = 'idle';
        
        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: text
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Gemini response data:', data); // Debug log
            
            // Extract response text based on the API response structure
            let aiResponse;
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                aiResponse = data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Unexpected API response structure');
            }
            
            updateStatus('Gemini: ' + aiResponse);
            console.log('Gemini response:', aiResponse);
            
            // Speak the response
            speakResponse(aiResponse);
            
        } catch (error) {
            console.error('Error with Gemini API:', error);
            updateStatus('Error communicating with Gemini AI: ' + error.message);
            animationState = 'idle';
        }
    }
    
    // Speak the AI response
    function speakResponse(text) {
        // Stop any ongoing speech
        synth.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        // Get available voices and set a good one if available
        const voices = synth.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.name.includes('Google') && voice.name.includes('Female') && voice.lang.includes('en')
        ) || voices.find(voice => 
            voice.lang.includes('en')
        );
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        // Animation events
        utterance.onstart = () => {
            animationState = 'talking';
            updateStatus('Speaking...');
        };
        
        utterance.onend = () => {
            animationState = 'idle';
            updateStatus('Ready');
        };
        
        utterance.onerror = (e) => {
            console.error('Speech synthesis error:', e);
            animationState = 'idle';
            updateStatus('Error speaking response');
        };
        
        // Start speaking
        synth.speak(utterance);
    }
    
    // Update status display
    function updateStatus(message) {
        statusDisplay.textContent = message;
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Handle different animation states
        switch (animationState) {
            case 'idle':
                // Occasional blinking
                blinkTime += 0.01;
                if (Math.sin(blinkTime) > 0.95) {
                    leftEyelid.visible = true;
                    rightEyelid.visible = true;
                } else {
                    leftEyelid.visible = false;
                    rightEyelid.visible = false;
                }
                
                // Reset mouth to smile
                mouthShape.curves = [];
                mouthShape.moveTo(-0.2, 0);
                mouthShape.quadraticCurveTo(0, -0.1, 0.2, 0);
                mouth.geometry = new THREE.ShapeGeometry(mouthShape);
                
                // Subtle head movement
                avatar.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
                break;
                
            case 'listening':
                // More frequent blinking
                blinkTime += 0.02;
                if (Math.sin(blinkTime) > 0.85) {
                    leftEyelid.visible = true;
                    rightEyelid.visible = true;
                } else {
                    leftEyelid.visible = false;
                    rightEyelid.visible = false;
                }
                
                // Slightly open mouth (curious expression)
                mouthShape.curves = [];
                mouthShape.moveTo(-0.2, 0);
                mouthShape.quadraticCurveTo(0, -0.05 - Math.sin(Date.now() * 0.005) * 0.03, 0.2, 0);
                mouth.geometry = new THREE.ShapeGeometry(mouthShape);
                
                // Eyebrows raise slightly (attentive look)
                leftEyebrow.position.y = 0.45 + Math.sin(Date.now() * 0.003) * 0.02;
                rightEyebrow.position.y = 0.45 + Math.sin(Date.now() * 0.003) * 0.02;
                
                // Head tilting slightly (listening pose)
                avatar.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
                avatar.rotation.y = Math.sin(Date.now() * 0.0015) * 0.15;
                break;
                
            case 'talking':
                // Normal blinking
                blinkTime += 0.01;
                if (Math.sin(blinkTime) > 0.95) {
                    leftEyelid.visible = true;
                    rightEyelid.visible = true;
                } else {
                    leftEyelid.visible = false;
                    rightEyelid.visible = false;
                }
                
                // Animated mouth for talking
                const talkValue = Math.sin(Date.now() * 0.01);
                const openAmount = 0.4 + talkValue * 0.6; // Increased size for wider opening
                mouthShape.curves = [];
                
                // Create a circular mouth opening
                if (talkValue > 0) {
                    mouthShape.absarc(0, 0, openAmount, 0, Math.PI * 2);
                } else {
                    // Default closed mouth smile
                    mouthShape.moveTo(-0.2, 0);
                    mouthShape.quadraticCurveTo(0, -0.1, 0.2, 0);
                }
                
                mouth.geometry = new THREE.ShapeGeometry(mouthShape);
                
                // Subtle eyebrow movement during speech
                leftEyebrow.position.y = 0.45 + Math.sin(Date.now() * 0.008) * 0.03;
                rightEyebrow.position.y = 0.45 + Math.sin(Date.now() * 0.008) * 0.03;
                
                // Head bobbing slightly
                avatar.position.y = Math.sin(Date.now() * 0.005) * 0.05;
                avatar.rotation.z = Math.sin(Date.now() * 0.002) * 0.03;
                break;
        }
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Initialize voices for speech synthesis
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = () => console.log('Voices loaded:', synth.getVoices().length);
    }
});
