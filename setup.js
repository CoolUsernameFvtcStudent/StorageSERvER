const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');





function setupEverything() {



    
// const REQUIRED_DIRS = ['permanent_uploads'];
// const REQUIRED_FILES = {
//   'users.txt': '# Email:PasswordHash:Salt:BackgroundColor:IsAdmin\n',
//   'blacklist.txt': '# IP Address List\n# One per line\n',
//   'whitelist.txt': '# IP Address List\n# One per line\n'
// };

const DEPENDENCIES = [
  'express@4',
  'mime-types',
  'cookie-parser',
  'sanitize-filename',
  'multer',
  'nodemailer',
];

const DEV_DEPENDENCIES = ['nodemon'];

function runCommand(cmd) {
  console.log(`Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

// function ensureDirs() {
//   REQUIRED_DIRS.forEach(dir => {
//     if (!fs.existsSync(dir)) {
//       console.log(`Creating directory: ${dir}`);
//       fs.mkdirSync(dir, { recursive: true });
//     } else {
//       console.log(`Directory exists: ${dir}`);
//     }
//   });
// }

// function ensureFiles() {
//   Object.entries(REQUIRED_FILES).forEach(([file, content]) => {
//     if (!fs.existsSync(file)) {
//       console.log(`Creating file: ${file}`);
//       fs.writeFileSync(file, content, 'utf8');
//     } else {
//       console.log(`File exists: ${file}`);
//     }
//   });
// }

function startfilesetup() {
  try {
    // Step 1: Initialize npm if needed
    if (!fs.existsSync('package.json')) {
      runCommand('npm init -y');
    } else {
      console.log('package.json already exists');
    }

    // Step 2: Install dependencies
    runCommand('npm install ' + DEPENDENCIES.join(' '));
    runCommand('npm install --save-dev ' + DEV_DEPENDENCIES.join(' '));

    // Step 3: Make sure directories and files exist
    // ensureDirs();
    // ensureFiles();

    console.log('\n✅ Setup complete! You can now run your server with:\n  node server.js');
    console.log('▶️ Or use nodemon for live reloads:\n  npx nodemon server.js');
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}





const htmlone = `
<!DOCTYPE html>
<html>
<head>
    <title>Secure File Upload</title>
    <style>
        :root {
            --primary: #6a5acd;
            --primary-light: #9370db;
            --secondary: #ffb6c1;
            --success: #77dd77;
            --error: #ff6961;
            --text: #333;
            --light: #f8f9fa;
            --border: #dee2e6;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            color: var(--text);
            transition: background-color 0.5s;
        }
        
        .container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
            overflow: hidden;
            z-index: 10;
        }
        
        .header {
            background: var(--primary);
            color: white;
            padding: 25px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 1.8rem;
            margin-bottom: 5px;
        }
        
        .header p {
            opacity: 0.8;
        }
        
        .content {
            padding: 25px;
        }
        
        .form-container {
            display: none;
        }
        
        .active-form {
            display: block;
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
        }
        
        input {
            width: 100%;
            padding: 14px;
            border: 2px solid var(--border);
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        input:focus {
            border-color: var(--primary);
            outline: none;
            box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2);
        }
        
        button {
            background: var(--primary);
            color: white;
            border: none;
            padding: 14px;
            width: 100%;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        button:hover {
            background: var(--primary-light);
        }
        
        button:disabled {
            background: #cccccc;
            cursor: not-allowed;
        }
        
        .btn-secondary {
            background: var(--secondary);
        }
        
        .btn-secondary:hover {
            background: #ffa7b5;
        }
        
        .btn-logout {
            background: var(--error);
            margin-top: 15px;
        }
        
        .btn-logout:hover {
            background: #ff5252;
        }
        
        .toggle-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        
        .toggle-link {
            color: var(--primary);
            cursor: pointer;
            font-weight: 600;
        }
        
        .toggle-link:hover {
            text-decoration: underline;
        }
        
        #result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            white-space: pre-line;
        }
        
        .success {
            background: rgba(119, 221, 119, 0.2);
            color: #28a745;
        }
        
        .error {
            background: rgba(255, 105, 97, 0.2);
            color: #dc3545;
        }
        
        .user-info {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border);
        }
        
        .user-info span {
            font-weight: 600;
            color: var(--primary);
        }
        
        .upload-icon {
            display: block;
            font-size: 3rem;
            text-align: center;
            color: var(--primary);
            margin-bottom: 15px;
        }
        
        .file-input {
            padding: 12px;
            border: 2px dashed var(--border);
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .file-input:hover {
            border-color: var(--primary);
            background: rgba(106, 90, 205, 0.05);
        }
        
        .hidden {
            display: none;
        }
        
        .color-picker {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .color-preview {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            border: 1px solid #ccc;
        }
        
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 300px;
            z-index: 1000;
        }
        
        .toast {
            padding: 12px 20px;
            margin-bottom: 10px;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s, fadeOut 0.5s 2.7s;
            display: flex;
            align-items: center;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .progress-container {
            margin: 15px 0;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-bar {
            height: 100%;
            background: var(--primary);
            width: 0%;
            transition: width 0.3s;
        }
        
        .timer {
            text-align: center;
            margin-top: 10px;
            font-size: 0.9rem;
            color: #6c757d;
        }
        
        .upload-list {
            margin-top: 15px;
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 10px;
        }
        
        .upload-item {
            padding: 5px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
        }
        
        .upload-item:last-child {
            border-bottom: none;
        }
        
        .explorer-link {
            display: block;
            text-align: center;
            margin-top: 15px;
            color: var(--primary);
            font-weight: 600;
            text-decoration: none;
        }
        
        .admin-badge {
            background: #ffc107;
            color: #000;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 0.8rem;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <!-- Toast notifications container -->
    <div class="toast-container" id="toastContainer"></div>

    <div class="container">
        <div class="header">
            <h1>Secure File Upload</h1>
            <p>Upload and scan your files safely</p>
        </div>
        
        <div class="content">
            <!-- Auth forms (initially hidden) -->
            <div id="authForms">
                <div id="loginForm" class="form-container">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" placeholder="you@example.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" placeholder="Your password" required>
                    </div>
                    
                    <button id="loginBtn">Login</button>
                    
                    <div class="toggle-links">
                        <div class="toggle-link" id="showSignup">Create account</div>
                    </div>
                </div>
                
                <div id="signupForm" class="form-container">
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" placeholder="you@example.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="signupPassword">Password (min 8 characters)</label>
                        <input type="password" id="signupPassword" placeholder="Create a password" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="signupConfirm">Confirm Password</label>
                        <input type="password" id="signupConfirm" placeholder="Confirm your password" required>
                    </div>
                    
                    <div class="color-picker">
                        <div class="color-preview" id="colorPreview"></div>
                        <input type="color" id="bgColor" value="#f5f7fa">
                    </div>
                    
                    <button id="signupBtn">Create Account</button>
                    
                    <div class="toggle-links">
                        <div class="toggle-link" id="showLogin">Back to login</div>
                    </div>
                </div>
            </div>
            
            <!-- Upload form (shown after login) -->
            <div id="uploadForm" class="form-container">
                <div class="user-info">
                    Welcome, <span id="userEmail"></span><span id="adminBadge" class="admin-badge hidden">Admin</span>
                </div>
                
                <div class="color-picker">
                    <div class="color-preview" id="currentColorPreview"></div>
                    <input type="color" id="currentBgColor">
                    <button id="updateBgBtn" style="margin-left:10px;width:auto">Update</button>
                </div>
                
                <div class="upload-icon">📁</div>
                
                <div class="form-group">
                    <label>Select Files (Max 20):</label>
                    <div class="file-input" id="fileDropArea">
                        <p>Drag & drop your files here</p>
                        <p>or</p>
                        <input type="file" id="fileInput" class="hidden" multiple>
                        <button class="btn-secondary" id="browseBtn">Browse Files</button>
                    </div>
                </div>
                
                <div id="fileList" class="upload-list hidden"></div>
                
                <div class="progress-container hidden" id="progressContainer">
                    <div class="progress-bar" id="progressBar"></div>
                </div>
                
                <div class="timer hidden" id="timer">Elapsed: 0s</div>
                
                <button id="uploadBtn">Upload and Scan</button>
                <button id="logoutBtn" class="btn-logout">Logout</button>
                
                <a href="/explorer.html" class="explorer-link">Browse Uploaded Files</a>
                
                <div id="result"></div>
            </div>
        </div>
    </div>

    <script>
        // DOM elements
        const authForms = document.getElementById('authForms');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const uploadForm = document.getElementById('uploadForm');
        const showLoginLink = document.getElementById('showLogin');
        const showSignupLink = document.getElementById('showSignup');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const uploadBtn = document.getElementById('uploadBtn');
        const updateBgBtn = document.getElementById('updateBgBtn');
        const fileInput = document.getElementById('fileInput');
        const browseBtn = document.getElementById('browseBtn');
        const fileDropArea = document.getElementById('fileDropArea');
        const resultDiv = document.getElementById('result');
        const userEmailSpan = document.getElementById('userEmail');
        const adminBadge = document.getElementById('adminBadge');
        const fileList = document.getElementById('fileList');
        const progressBar = document.getElementById('progressBar');
        const progressContainer = document.getElementById('progressContainer');
        const timerEl = document.getElementById('timer');
        const colorPreview = document.getElementById('colorPreview');
        const bgColorInput = document.getElementById('bgColor');
        const currentColorPreview = document.getElementById('currentColorPreview');
        const currentBgColorInput = document.getElementById('currentBgColor');
        const toastContainer = document.getElementById('toastContainer');
        
        // State variables
        let uploadStartTime = 0;
        let uploadTimer = null;
        let uploadInProgress = false;
        let eventSource = null;
        
        // Show form functions
        function showForm(form) {
            document.querySelectorAll('.form-container').forEach(el => {
                el.classList.remove('active-form');
            });
            form.classList.add('active-form');
        }
        
        // Update background color
        function updateBackgroundColor(color) {
            document.body.style.backgroundColor = color;
            localStorage.setItem('bgColor', color);
        }
        
        // Show toast notification
        function showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = \`toast \${type}\`;
            toast.textContent = message;
            toastContainer.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
        
        // Start upload timer
        function startUploadTimer() {
            uploadStartTime = Date.now();
            clearInterval(uploadTimer);
            
            uploadTimer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - uploadStartTime) / 1000);
                timerEl.textContent = \`Elapsed: \${elapsed}s\`;
            }, 1000);
        }
        
        // Stop upload timer
        function stopUploadTimer() {
            clearInterval(uploadTimer);
            timerEl.textContent = '';
        }
        
        // Show selected files
        function showSelectedFiles(files) {
            fileList.innerHTML = '';
            fileList.classList.remove('hidden');
            
            for (let i = 0; i < files.length; i++) {
                const fileItem = document.createElement('div');
                fileItem.className = 'upload-item';
                fileItem.innerHTML = \`
                    <span>\${files[i].name}</span>
                    <span>\${formatFileSize(files[i].size)}</span>
                \`;
                fileList.appendChild(fileItem);
            }
        }
        
        // Format file size
        function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
            return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
        }
        
        // Prevent navigation during upload
        function setupNavigationProtection() {
            window.addEventListener('beforeunload', beforeUnloadHandler);
            logoutBtn.disabled = true;
            uploadInProgress = true;
        }
        
        function removeNavigationProtection() {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            logoutBtn.disabled = false;
            uploadInProgress = false;
        }
        
        function beforeUnloadHandler(e) {
            if (uploadInProgress) {
                e.preventDefault();
                e.returnValue = 'File upload in progress. Are you sure you want to leave?';
                return e.returnValue;
            }
        }

        // Check authentication state
        async function checkAuth() {
            try {
                const response = await fetch('/check-auth');
                const data = await response.json();
                
                if (data.loggedIn) {
                    // User is logged in - show upload form
                    authForms.style.display = 'none';
                    uploadForm.style.display = 'block';
                    userEmailSpan.textContent = data.email;
                    
                    // Show admin badge if admin
                    if (data.isAdmin) {
                        adminBadge.classList.remove('hidden');
                    } else {
                        adminBadge.classList.add('hidden');
                    }
                    
                    // Set background color
                    const savedColor = data.bgColor || localStorage.getItem('bgColor') || '#f5f7fa';
                    updateBackgroundColor(savedColor);
                    currentColorPreview.style.backgroundColor = savedColor;
                    currentBgColorInput.value = savedColor;
                } else {
                    // User is not logged in - show auth forms
                    authForms.style.display = 'block';
                    uploadForm.style.display = 'none';
                    showForm(loginForm);
                    
                    // Set default background
                    const savedColor = localStorage.getItem('bgColor') || '#f5f7fa';
                    updateBackgroundColor(savedColor);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                // Default to showing login form if error occurs
                authForms.style.display = 'block';
                uploadForm.style.display = 'none';
                showForm(loginForm);
            }
        }
        
        // Setup SSE for real-time notifications
        function setupSSE() {
            if (eventSource) eventSource.close();
            
            eventSource = new EventSource('/events');
            
            eventSource.addEventListener('upload-start', (e) => {
                const data = JSON.parse(e.data);
                showToast(\`\${data.user} is uploading: \${data.filename}\`);
            });
            
            eventSource.addEventListener('upload-complete', (e) => {
                const data = JSON.parse(e.data);
                showToast(\`\${data.user} uploaded: \${data.filename}\`, 'success');
            });
        }

        // Event Listeners
        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(signupForm);
        });

        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(loginForm);
        });
        
        browseBtn.addEventListener('click', () => fileInput.click());
        
        fileDropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileDropArea.style.borderColor = '#6a5acd';
            fileDropArea.style.backgroundColor = 'rgba(106, 90, 205, 0.1)';
        });
        
        fileDropArea.addEventListener('dragleave', () => {
            fileDropArea.style.borderColor = '#dee2e6';
            fileDropArea.style.backgroundColor = '';
        });
        
        fileDropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileDropArea.style.borderColor = '#dee2e6';
            fileDropArea.style.backgroundColor = '';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                fileDropArea.querySelector('p').textContent = \`Selected: \${e.dataTransfer.files.length} file(s)\`;
                showSelectedFiles(Array.from(e.dataTransfer.files));
            }
        });
        
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                fileDropArea.querySelector('p').textContent = \`Selected: \${fileInput.files.length} file(s)\`;
                showSelectedFiles(Array.from(fileInput.files));
            }
        });
        
        bgColorInput.addEventListener('input', () => {
            colorPreview.style.backgroundColor = bgColorInput.value;
        });
        
        currentBgColorInput.addEventListener('input', () => {
            currentColorPreview.style.backgroundColor = currentBgColorInput.value;
        });
        
        updateBgBtn.addEventListener('click', async () => {
            try {
                await fetch('/update-bg', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bgColor: currentBgColorInput.value })
                });
                
                updateBackgroundColor(currentBgColorInput.value);
                showToast('Background updated!', 'success');
            } catch (error) {
                showToast('Failed to update background', 'error');
            }
        });

        // Login handler
        loginBtn.addEventListener('click', async () => {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    await checkAuth();
                    resultDiv.textContent = '';
                    setupSSE();
                } else {
                    resultDiv.textContent = \`❌ \${data.error}\`;
                    resultDiv.className = 'result error';
                }
            } catch (error) {
                resultDiv.textContent = \`Network error: \${error.message}\`;
                resultDiv.className = 'result error';
            }
        });

        // Signup handler
        signupBtn.addEventListener('click', async () => {
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;
            const bgColor = bgColorInput.value;
            
            if (password !== confirm) {
                resultDiv.textContent = '❌ Passwords do not match';
                resultDiv.className = 'result error';
                return;
            }
            
            if (password.length < 8) {
                resultDiv.textContent = '❌ Password must be at least 8 characters';
                resultDiv.className = 'result error';
                return;
            }
            
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, bgColor })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    await checkAuth();
                    resultDiv.textContent = '';
                    setupSSE();
                } else {
                    resultDiv.textContent = \`❌ \${data.error}\`;
                    resultDiv.className = 'result error';
                }
            } catch (error) {
                resultDiv.textContent = \`Network error: \${error.message}\`;
                resultDiv.className = 'result error';
            }
        });

        // Logout handler
        logoutBtn.addEventListener('click', async () => {
            try {
                await fetch('/logout');
                await checkAuth();
                resultDiv.textContent = '';
                if (eventSource) eventSource.close();
            } catch (error) {
                resultDiv.textContent = \`Error: \${error.message}\`;
                resultDiv.className = 'result error';
            }
        });

        // Upload handler
        uploadBtn.addEventListener('click', async () => {
            if (!fileInput.files.length) {
                resultDiv.textContent = 'Please select files';
                resultDiv.className = 'result error';
                return;
            }
            
            if (fileInput.files.length > 20) {
                resultDiv.textContent = 'Maximum 20 files allowed';
                resultDiv.className = 'result error';
                return;
            }
            
            resultDiv.textContent = '';
            progressBar.style.width = '0%';
            progressContainer.classList.remove('hidden');
            timerEl.classList.remove('hidden');
            startUploadTimer();
            setupNavigationProtection();
            
            try {
                const formData = new FormData();
                const filenames = [];
                
                // Add files to formData
                for (let i = 0; i < fileInput.files.length; i++) {
                    formData.append('files', fileInput.files[i]);
                    filenames.push(fileInput.files[i].name);
                }
                
                // Add filenames for SSE notifications
                formData.append('filenames', JSON.stringify(filenames));
                
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/upload');
                
                // Track upload progress
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percent = (e.loaded / e.total) * 100;
                        progressBar.style.width = \`\${percent}%\`;
                    }
                });
                
                xhr.addEventListener('load', () => {
                    stopUploadTimer();
                    removeNavigationProtection();
                    
                    try {
                        const data = JSON.parse(xhr.responseText);
                        
                        if (xhr.status >= 200 && xhr.status < 300) {
                            let resultHTML = '';
                            
                            data.results.forEach(file => {
                                if (file.status === 'success') {
                                    const fileUrl = \`\${window.location.origin}\${file.path}\`;
                                    resultHTML += \`
                                        <div class="success">
                                            ✅ \${file.originalName} uploaded successfully<br>
                                            Download: <a href="\${fileUrl}" target="_blank">\${file.storedName}</a>
                                        </div>
                                    \`;
                                } else {
                                    resultHTML += \`
                                        <div class="error">
                                            ❌ \${file.originalName}: \${file.error}
                                        </div>
                                    \`;
                                }
                            });
                            
                            resultDiv.innerHTML = resultHTML;
                        } else {
                            resultDiv.textContent = \`❌ Error: \${data.error}\`;
                            resultDiv.className = 'result error';
                        }
                    } catch (error) {
                        resultDiv.textContent = \`Processing error: \${error.message}\`;
                        resultDiv.className = 'result error';
                    }
                });
                
                xhr.addEventListener('error', () => {
                    stopUploadTimer();
                    removeNavigationProtection();
                    resultDiv.textContent = 'Network error during upload';
                    resultDiv.className = 'result error';
                });
                
                xhr.send(formData);
            } catch (error) {
                stopUploadTimer();
                removeNavigationProtection();
                resultDiv.textContent = \`Error: \${error.message}\`;
                resultDiv.className = 'result error';
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', async () => {
            // Hide all forms initially
            authForms.style.display = 'none';
            uploadForm.style.display = 'none';
            
            // Initialize color picker
            colorPreview.style.backgroundColor = bgColorInput.value;
            
            // Check auth status and show appropriate form
            await checkAuth();
            
            // Setup SSE if logged in
            if (document.getElementById('userEmail').textContent) {
                setupSSE();
            }
        });
    </script>
</body>
</html>
`;

const htmltwo = `
<!DOCTYPE html>
<html>
<head>
    <title>File Explorer</title>
    <style>
        :root {
            --primary: #6a5acd;
            --light: #f8f9fa;
            --dark: #343a40;
            --border: #dee2e6;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            color: #333;
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        header {
            background: var(--primary);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        h1 {
            font-size: 1.5rem;
        }
        
        .breadcrumb {
            padding: 15px 20px;
            background: var(--light);
            border-bottom: 1px solid var(--border);
            font-size: 0.9rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }
        
        .breadcrumb a {
            color: var(--primary);
            text-decoration: none;
            cursor: pointer;
            margin: 0 5px;
        }
        
        .breadcrumb span {
            color: #6c757d;
        }
        
        .file-list {
            padding: 20px;
        }
        
        .file-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid var(--border);
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .file-item:hover {
            background-color: #f8f9fa;
        }
        
        .file-icon {
            margin-right: 15px;
            font-size: 1.5rem;
            width: 40px;
            text-align: center;
        }
        
        .file-name {
            flex: 1;
        }
        
        .file-size {
            color: #6c757d;
            font-size: 0.9rem;
            min-width: 100px;
            text-align: right;
        }
        
        .logout-button {
            background: #dc3545;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .logout-button:hover {
            background: #bd2130;
        }
        
        .loading {
            padding: 20px;
            text-align: center;
            color: #6c757d;
        }
        
        .error {
            padding: 20px;
            color: #dc3545;
        }
        
        .admin-controls {
            padding: 10px 20px;
            background: #fff3cd;
            border-bottom: 1px solid #ffeeba;
            display: flex;
            gap: 10px;
        }
        
        .admin-controls button {
            padding: 5px 10px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
        
        .delete-btn {
            background: #dc3545;
            color: white;
        }
        
        .upload-btn {
            background: #28a745;
            color: white;
        }
        
        .admin-badge {
            background: #ffc107;
            color: #000;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 0.8rem;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>File Explorer</h1>
            <div>
                <span id="userEmail"></span>
                <span id="adminBadge" class="admin-badge hidden">Admin</span>
                <button class="logout-button" id="logoutBtn">Logout</button>
            </div>
        </header>
        
        <!--
        <div id="adminControls" class="admin-controls hidden">
            <button class="delete-btn" id="deleteBtn">Delete Selected</button>
            <input type="file" id="adminFileInput" class="hidden" multiple>
            <button class="upload-btn" id="uploadBtn">Upload Files</button>
        </div>
        -->

        <div class="breadcrumb" id="breadcrumb">
            <a data-path="/">Root</a>
        </div>
        
        <div class="file-list" id="fileList">
            <div class="loading">Loading...</div>
        </div>
    </div>

    <script>
        const fileList = document.getElementById('fileList');
        const breadcrumb = document.getElementById('breadcrumb');
        const logoutBtn = document.getElementById('logoutBtn');
        const adminControls = document.getElementById('adminControls');
        const deleteBtn = document.getElementById('deleteBtn');
        const uploadBtn = document.getElementById('uploadBtn');
        //const adminFileInput = document.getElementById('adminFileInput');
        const userEmailSpan = document.getElementById('userEmail');
        const adminBadge = document.getElementById('adminBadge');
        let currentPath = '/';
        let isAdmin = false;
        let selectedFile = null;

        // Check authentication and admin status
        async function checkAuth() {
            try {
                const response = await fetch('/check-auth');
                const data = await response.json();
                
                if (data.loggedIn) {
                    userEmailSpan.textContent = data.email;
                    isAdmin = data.isAdmin || false;
                    
                    // if (isAdmin) {
                    //     adminControls.classList.remove('hidden');
                    //     adminBadge.classList.remove('hidden');
                    // } else {
                    //     adminControls.classList.add('hidden');
                    //     adminBadge.classList.add('hidden');
                    // }
                    
                    return true;
                } else {
                    window.location.href = '/';
                    return false;
                }
            } catch (error) {
                console.error('Auth check error:', error);
                return false;
            }
        }

        // Format file size
        function formatFileSize(bytes) {
            if (bytes === undefined || bytes === null) return '-';
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
            return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
        }

        // Load directory contents
        //let thisHere = path;
        async function loadDirectory(path) {

            console.log(path);

            try {
                fileList.innerHTML = '<div class="loading">Loading...</div>';
                
                if (path === "/") {
                    console.log("true");
                    path = "";
                }
                else {
                    console.log("false");
                }


                const encodedPath = path ? \`?path=\${path}\` : '?path';
                const response = await fetch(\`/api/list\${encodedPath}\`);

                const data = await response.json();
                
                if (response.ok) {
                    renderFiles(data, path);
                    updateBreadcrumb(path);
                    currentPath = path;
                } else {
                    fileList.innerHTML = \`<div class="error">Error: \${data.error || 'Unknown error'}</div>\`;
                }
            } catch (error) {
                fileList.innerHTML = \`<div class="error">Error: \${error.message}</div>\`;
            }
        }

        // Render files and directories
        function renderFiles(files, path) {
            fileList.innerHTML = '';
            selectedFile = null;
            
            // Add "go up" link if not at root
            if (path !== '') {
                const parentPath = path.split('/').slice(0, -1).join('/') || '/';
                const upItem = document.createElement('div');
                upItem.className = 'file-item';
                upItem.innerHTML = \`
                    <div class="file-icon">📁</div>
                    <div class="file-name">.. (Parent Directory)</div>
                    <div class="file-size">-</div>
                \`;
                upItem.addEventListener('click', () => loadDirectory(parentPath));
                fileList.appendChild(upItem);
            }
            
            // Add directories first
            files
                .filter(file => file.type === 'directory')
                .forEach(file => {
                    const item = document.createElement('div');
                    item.className = 'file-item';
                    item.innerHTML = \`
                        <div class="file-icon">📁</div>
                        <div class="file-name">\${file.name}</div>
                        <div class="file-size">-</div>
                    \`;
                    item.addEventListener('click', () => {
                        loadDirectory(file.path),
                        console.log(file.path),
                        console.log('Clicked directory file:', file);
                });
                    if (isAdmin) {
                        item.addEventListener('contextmenu', (e) => {
                            e.preventDefault();
                            selectFile(file);
                        });
                    }
                    fileList.appendChild(item);
                });
            
            // Then add files
            files
                .filter(file => file.type === 'file')
                .forEach(file => {
                    const item = document.createElement('div');
                    item.className = 'file-item';
                    item.innerHTML = \`
                        <div class="file-icon">📄</div>
                        <div class="file-name">\${file.name}</div>
                        <div class="file-size">\${formatFileSize(file.size)}</div>
                    \`;
                    item.addEventListener('click', () => {
                        const { pathleft, pathlast } = splitPath(path);
                     const fullPath = \`\${pathlast}/\${file.name}\`.replace(/\\/+/g, '/');
                     console.log(fullPath)
                     window.open(fullPath, '_blank');
                    });
                    if (isAdmin) {
                        item.addEventListener('contextmenu', (e) => {
                            e.preventDefault();
                            selectFile(file);
                        });
                    }
                    fileList.appendChild(item);
                });
            
            // Show message if empty
            if (fileList.children.length === 0) {
                fileList.innerHTML = '<div class="loading">This directory is empty</div>';
            }
        }

        // Select file for admin operations
        function selectFile(file) {
            // Clear previous selection
            document.querySelectorAll('.file-item').forEach(item => {
                item.style.backgroundColor = '';
            });
            
            // Highlight selected file
            if (file) {
                const items = document.querySelectorAll('.file-item');
                for (let item of items) {
                    if (item.querySelector('.file-name').textContent === file.name) {
                        item.style.backgroundColor = '#e2e2e2';
                        selectedFile = file;
                        break;
                    }
                }
            } else {
                selectedFile = null;
            }
        }

        function splitPath(path) {
        const pathParts = path.split(/[/\\\\]+/); // Split on both / and \\
        const pathlast = pathParts.pop(); // Remove and save the last part
        const pathleft = pathParts.join("\\\\"); // Rejoin the rest with backslashes

        return { pathleft, pathlast };
        }

        // Update breadcrumb navigation
        function updateBreadcrumb(path) {
            breadcrumb.innerHTML = '<a data-path="/">Root</a>';
            
            if (path === '') return;
            
            const parts = path.split('/').filter(p => p);
            let current = '';
            
            parts.forEach((part, index) => {
                current += \`\${part}/\`;
                const span = document.createElement('span');
                span.textContent = '›';
                breadcrumb.appendChild(span);
                
                const link = document.createElement('a');
                link.textContent = part;
                link.dataset.path = current;
                link.addEventListener('click', () => {
                    const { pathleft, pathlast } = splitPath(inputPath);
                    loadDirectory(pathleft);
            });
                breadcrumb.appendChild(link);
            });
        }

        // Delete selected file
        async function deleteSelected() {
            if (!selectedFile || !isAdmin) return;
            
            try {
                const response = await fetch('/api/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: selectedFile.path })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert('File deleted successfully');
                    loadDirectory(currentPath);
                } else {
                    alert(\`Error: \${data.error}\`);
                }
            } catch (error) {
                alert(\`Error: \${error.message}\`);
            }
        }

        // Upload files
        async function uploadFiles() {
            if (!isAdmin) return;
            
            adminFileInput.click();
        }

        // Handle file selection for upload
        // adminFileInput.addEventListener('change', async () => {
        //     if (!adminFileInput.files.length || !isAdmin) return;
            
        //     const formData = new FormData();
        //     for (let i = 0; i < adminFileInput.files.length; i++) {
        //         formData.append('files', adminFileInput.files[i]);
        //     }
            
        //     try {
        //         const response = await fetch('/upload', {
        //             method: 'POST',
        //             body: formData
        //         });
                
        //         const data = await response.json();
                
        //         if (response.ok) {
        //             alert('Files uploaded successfully');
        //             loadDirectory(currentPath);
        //         } else {
        //             alert(\`Error: \${data.error}\`);
        //         }
        //     } catch (error) {
        //         alert(\`Error: \${error.message}\`);
        //     }
        // });

        // Logout handler
        logoutBtn.addEventListener('click', async () => {
            try {
                await fetch('/logout');
                window.location.href = '/';
            } catch (error) {
                alert('Logout failed: ' + error.message);
            }
        });

        // Admin control handlers
        // deleteBtn.addEventListener('click', deleteSelected);
        // uploadBtn.addEventListener('click', uploadFiles);

        // Initialize
        document.addEventListener('DOMContentLoaded', async () => {
            // Check auth first
            const isAuthenticated = await checkAuth();
            if (isAuthenticated) {
                // Load root directory
                await loadDirectory('/');
            }
        });
    </script>
</body>
</html>
`;

const jsone = `
// JS One
const express = require('express');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const mime = require('mime-types');
const handleUpload = require('./uploadHandler');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const readline = require('readline');

const app = express();
const ROOT = fs.realpathSync(path.resolve(__dirname));
const PERMANENT_UPLOADS_DIR = path.join(__dirname, 'permanent_uploads');
const USERS_FILE = path.join(__dirname, 'users.txt');
const BLACKLIST_FILE = path.join(__dirname, 'blacklist.txt');
const WHITELIST_FILE = path.join(__dirname, 'whitelist.txt');

// Create required directories and files
[PERMANENT_UPLOADS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

[BLACKLIST_FILE, WHITELIST_FILE, USERS_FILE].forEach(file => {
    if (!fs.existsSync(file)) {
        let content = '# IP Address List\\n# One per line\\n';
        if (file === USERS_FILE) content = '# Email:PasswordHash:Salt:BackgroundColor:IsAdmin:Verified\\n';
        fs.writeFileSync(file, content, 'utf8');
    }
});

// Configuration
let IP_FILTER_MODE = 1;
let EXPLORER_ENABLED = true;
let PORT = 3000;

try {
  const rawConfig = fs.readFileSync('answers.json', 'utf-8');
  const {
    IP_FILTER_MODE: mode = 1,
    EXPLORER_ENABLED: explorer = true,
    PORT: port = 3000,
  } = JSON.parse(rawConfig);

  IP_FILTER_MODE = mode;
  EXPLORER_ENABLED = explorer;
  PORT = port;

  console.log("🔧 Config Loaded:");
  console.log("IP_FILTER_MODE:", IP_FILTER_MODE);
  console.log("EXPLORER_ENABLED:", EXPLORER_ENABLED);
  console.log("PORT:", PORT);
} catch (err) {
  console.warn("⚠️ Could not load config, using defaults.");
}

// Mailjet configuration
let mailjetConfig = {
  apiKey: '',
  apiSecret: '',
  senderEmail: ''
};

// Verification tokens storage
const verificationTokens = new Map();
const sessions = {};
const clients = new Map();
let clientId = 0;

// Trust proxy headers
app.set('trust proxy', true);

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10gb' }));
app.use(express.json());

// Improved IP extraction
function getClientIp(req) {
    const headersToCheck = [
        'x-forwarded-for',
        'cf-connecting-ip',
        'x-real-ip',
        'x-client-ip'
    ];

    for (const header of headersToCheck) {
        const value = req.headers[header];
        if (value) {
            const ips = value.split(',').map(ip => ip.trim());
            return convertIPv4MappedToIPv4(ips[0]);
        }
    }
    
    return convertIPv4MappedToIPv4(req.socket?.remoteAddress) || 'unknown';
}

function convertIPv4MappedToIPv4(ip) {
    if (!ip) return ip;
    if (ip.startsWith('::ffff:')) return ip.substring(7);
    if (ip === '::1') return '127.0.0.1';
    return ip;
}

// IP Filter Middleware
app.use((req, res, next) => {
    const clientIp = getClientIp(req);
    console.log(\`Incoming request from IP: \${clientIp}\`);

    const listFile = IP_FILTER_MODE === 1 ? BLACKLIST_FILE : WHITELIST_FILE;
    const ipList = fs.readFileSync(listFile, 'utf8')
        .split('\\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .map(ip => ip.trim());

    if (IP_FILTER_MODE === 1) {
        if (ipList.includes(clientIp)) {
            console.log(\`Blocked blacklisted IP: \${clientIp}\`);
            return res.status(403).send('Access denied');
        }
    } else {
        if (!ipList.includes(clientIp)) {
            console.log(\`Blocked non-whitelisted IP: \${clientIp}\`);
            return res.status(403).send('Access denied');
        }
    }

    next();
});

// Security middleware
app.use((req, res, next) => {
    if (req.path.includes('..')) {
        return res.status(403).send('Path traversal detected');
    }
    next();
});

// Session management
function generateSessionToken() {
    return crypto.randomBytes(32).toString('hex');
}

function createSession(email, bgColor = '', isAdmin = false) {
    const token = generateSessionToken();
    sessions[token] = {
        email,
        bgColor,
        isAdmin,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };
    return token;
}

function verifySession(token) {
    if (!token || !sessions[token]) return null;
    const session = sessions[token];
    if (Date.now() > session.expiresAt) {
        delete sessions[token];
        return null;
    }
    return session;
}

// Password hashing
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\.[^\\s@]+$/;
    return re.test(email);
}

// Mailjet credential prompt
function promptForMailjetCredentials() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    console.log('\\n=== Mailjet Configuration Required ===');
    rl.question('Enter your Mailjet API Key: ', (apiKey) => {
      mailjetConfig.apiKey = apiKey;
      rl.question('Enter your Mailjet API Secret: ', (apiSecret) => {
        mailjetConfig.apiSecret = apiSecret;
        rl.question('Enter sender email address (verified in Mailjet): ', (senderEmail) => {
          mailjetConfig.senderEmail = senderEmail;
          console.log('Mailjet credentials stored temporarily\\n');
          rl.close();
          resolve();
        });
      });
    });
  });
}

// Send verification email
async function sendVerificationEmail(email, verificationToken, protocol, host) {
  if (!mailjetConfig.apiKey || !mailjetConfig.apiSecret) {
    throw new Error('Mailjet credentials not configured');
  }

  const verificationLink = \`\${protocol}://\${host}/verify?token=\${verificationToken}&email=\${encodeURIComponent(email)}\`;
  
  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(\`\${mailjetConfig.apiKey}:\${mailjetConfig.apiSecret}\`).toString('base64')
    },
    body: JSON.stringify({
      Messages: [{
        From: {
          Email: mailjetConfig.senderEmail,
          Name: 'Verification Service'
        },
        To: [{
          Email: email,
          Name: email.split('@')[0]
        }],
        Subject: 'Verify Your Email Address',
        TextPart: \`Please verify your email by clicking this link: \${verificationLink}\`,
        HTMLPart: \`<p>Please verify your email by clicking this link: <a href="\${verificationLink}">Verify Email</a></p>\`
      }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(\`Mailjet error: \${error.Messages[0].Errors[0].ErrorMessage}\`);
  }
}

// SSE for real-time notifications
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    
    const id = clientId++;
    clients.set(id, res);
    
    req.on('close', () => {
        clients.delete(id);
    });
});

function sendEventToAll(type, data) {
    const event = \`event: \${type}\\ndata: \${JSON.stringify(data)}\\n\\n\`;
    clients.forEach(client => client.write(event));
}

// Middleware to check explorer access
function checkExplorerAccess(req, res, next) {
    if (!EXPLORER_ENABLED) {
        return res.status(403).send('File explorer is disabled');
    }
    next();
}

// Middleware to require admin
function requireAdmin(req, res, next) {
    const token = req.cookies.session_token;
    const session = verifySession(token);
    
    if (!session || !session.isAdmin) {
        return res.status(403).send('Admin access required');
    }
    next();
}

// Auth middleware for protected routes
function requireAuth(req, res, next) {
    const token = req.cookies.session_token;
    const session = verifySession(token);
    
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    req.userEmail = session;
    next();
}

// User routes
app.post('/signup', async (req, res) => {
    const { email, password, bgColor = '' } = req.body;
    const clientIp = getClientIp(req);
    
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    const users = fs.readFileSync(USERS_FILE, 'utf8').split('\\n');
    const emailExists = users.some(line => {
      const parts = line.split(':');
      return parts[0] === email && parts[5] === 'true';
    });
    
    if (emailExists) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    // Check for pending verification
    const isPending = Array.from(verificationTokens.values()).some(
      tokenData => tokenData.email === email && tokenData.expires > Date.now()
    );
    
    if (isPending) {
        return res.status(400).json({ error: 'Verification already pending. Check your email.' });
    }
    
    // Create user record but mark as unverified
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hashPassword(password, salt);
    const isAdmin = users.filter(line => line.trim() && !line.startsWith('#')).length === 0;
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    
    // Store token temporarily
    verificationTokens.set(verificationToken, {
        email,
        hashedPassword,
        salt,
        bgColor,
        isAdmin,
        expires
    });
    
    try {
        await sendVerificationEmail(email, verificationToken, req.protocol, req.get('host'));
        res.json({ message: 'Verification email sent. Please check your email to complete registration.' });
    } catch (error) {
        console.error('Email sending failed:', error);
        verificationTokens.delete(verificationToken);
        res.status(500).json({ error: 'Failed to send verification email' });
    }
});

// Email verification endpoint
app.get('/verify', (req, res) => {
    const { token, email } = req.query;
    
    if (!token || !email) {
        return res.status(400).send('Missing verification parameters');
    }
    
    const tokenData = verificationTokens.get(token);
    
    // Validate token
    if (!tokenData || tokenData.email !== email) {
        return res.status(400).send('Invalid verification token');
    }
    
    if (Date.now() > tokenData.expires) {
        verificationTokens.delete(token);
        return res.status(400).send('Verification token has expired');
    }
    
    // Check if user already exists
    const users = fs.readFileSync(USERS_FILE, 'utf8').split('\\n');
    const userExists = users.some(line => {
        const parts = line.split(':');
        return parts[0] === email && parts[5] === 'true';
    });
    
    if (userExists) {
        verificationTokens.delete(token);
        return res.status(400).send('Email already verified');
    }
    
    // Add user to permanent storage
    const userRecord = \`\${email}:\${tokenData.hashedPassword}:\${tokenData.salt}:\${tokenData.bgColor}:\${tokenData.isAdmin}:true\\n\`;
    fs.appendFileSync(USERS_FILE, userRecord, 'utf8');
    
    // Create session
    const sessionToken = createSession(email, tokenData.bgColor, tokenData.isAdmin);
    res.cookie('session_token', sessionToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    });
    
    verificationTokens.delete(token);
    res.redirect('/?verification=success');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const clientIp = getClientIp(req);
    
    const users = fs.readFileSync(USERS_FILE, 'utf8').split('\\n');
    const userLine = users.find(line => line.startsWith(\`\${email}:\`));
    
    if (!userLine) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const parts = userLine.split(':');
    
    // Check if email is verified
    if (parts[5] !== 'true') {
        return res.status(401).json({ error: 'Email not verified. Please check your email for verification instructions.' });
    }
    
    const storedHash = parts[1];
    const salt = parts[2];
    const bgColor = parts[3] || '';
    const isAdmin = parts[4] === 'true';
    
    const hashedPassword = hashPassword(password, salt);
    
    if (hashedPassword !== storedHash) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = createSession(email, bgColor, isAdmin);
    res.cookie('session_token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    });
    
    res.json({ message: 'Login successful', bgColor, isAdmin });
});

app.post('/update-bg', (req, res) => {
    const { bgColor } = req.body;
    const token = req.cookies.session_token;
    const session = verifySession(token);
    
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (sessions[token]) {
        sessions[token].bgColor = bgColor;
    }
    
    // Update user file
    const users = fs.readFileSync(USERS_FILE, 'utf8').split('\\n');
    const updatedUsers = users.map(line => {
        if (line.startsWith(\`\${session.email}:\`)) {
            const parts = line.split(':');
            return \`\${parts[0]}:\${parts[1]}:\${parts[2]}:\${bgColor}:\${parts[4]}:\${parts[5]}\`;
        }
        return line;
    });
    
    fs.writeFileSync(USERS_FILE, updatedUsers.join('\\n'), 'utf8');
    
    res.json({ message: 'Background updated' });
});

app.get('/logout', (req, res) => {
    const token = req.cookies.session_token;
    if (token && sessions[token]) {
        delete sessions[token];
    }
    res.clearCookie('session_token');
    res.json({ message: 'Logged out successfully' });
});

app.get('/check-auth', (req, res) => {
    const token = req.cookies.session_token;
    const session = verifySession(token);
    res.json({ 
        loggedIn: !!session, 
        email: session?.email,
        bgColor: session?.bgColor || '',
        isAdmin: session?.isAdmin || false
    });
});

// Protected routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// File explorer route
app.get('/explorer.html', checkExplorerAccess, (req, res) => {
    res.sendFile(path.join(__dirname, 'explorer.html'));
});

app.post('/upload', requireAuth, (req, res) => {
    // Notify all clients about upload start
    if (req.body.filenames) {
        req.body.filenames.forEach(filename => {
            sendEventToAll('upload-start', {
                filename,
                user: req.userEmail.email
            });
        });
    }
    
    handleUpload(req, res, () => {
        // After upload completes, notify about completion
        if (req.uploadedFiles) {
            req.uploadedFiles.forEach(file => {
                sendEventToAll('upload-complete', {
                    filename: file.originalname,
                    user: req.userEmail.email,
                    storedName: file.filename
                });
            });
        }
    });
});

// Directory listing for explorer
app.get('/api/list', checkExplorerAccess, async (req, res) => {
    let dirPath = req.query.path || ROOT;
    
    try {
        // Normalize path and prevent directory traversal
        dirPath = path.normalize(dirPath);
        if (!dirPath.startsWith(ROOT)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const files = await fsp.readdir(dirPath, { withFileTypes: true });
        const result = await Promise.all(files.map(async dirent => {
            const filePath = path.join(dirPath, dirent.name);
            const stats = await fsp.stat(filePath);
            
            return {
                name: dirent.name,
                type: dirent.isDirectory() ? 'directory' : 'file',
                path: filePath,
                size: stats.isFile() ? stats.size : null
            };
        }));

        res.json(result);
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.status(404).json({ error: 'Directory not found' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

// Admin-only file operations
app.post('/api/delete', requireAdmin, checkExplorerAccess, async (req, res) => {
    const { path: filePath } = req.body;
    
    try {
        // Validate path is within root directory
        const fullPath = path.normalize(path.join(ROOT, filePath));
        if (!fullPath.startsWith(ROOT)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        await fsp.unlink(fullPath);
        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// File serving route
app.get('/*', async (req, res) => {
    try {
        const parts = req.path.split('/').filter(Boolean);
        if (parts.length < 2) return res.sendStatus(404);

        const baseFolder = parts[0];
        const baseFolderPath = path.join(ROOT, baseFolder);
        const filePath = path.join(ROOT, ...parts);

        try {
            const baseStats = await fsp.stat(baseFolderPath);
            if (!baseStats.isDirectory()) return res.sendStatus(404);

            const fileStats = await fsp.stat(filePath);
            if (!fileStats.isFile()) return res.sendStatus(404);
        } catch (err) {
            if (err.code === 'ENOENT') return res.sendStatus(404);
            if (err.code === 'EACCES') return res.sendStatus(403);
            throw err;
        }

        res.set({
            'Cache-Control': 'public, max-age=3600',
            'X-Content-Type-Options': 'nosniff'
        });
        
        const mimeType = mime.lookup(filePath) || 'application/octet-stream';
        res.type(mimeType);
        res.sendFile(filePath);
    } catch (err) {
        console.error(\`Server error: \${err.message}\`);
        if (!res.headersSent) res.sendStatus(500);
    }
});

// Start server after getting credentials
promptForMailjetCredentials().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(\`Server running: http://localhost:\${PORT}\`);
        console.log(\`IP filtering mode: \${IP_FILTER_MODE === 1 ? 'BLACKLIST' : 'WHITELIST'}\`);
        console.log(\`Trusting proxy headers: \${app.get('trust proxy')}\`);
        console.log(\`Explorer enabled: \${EXPLORER_ENABLED}\`);
        console.log('Mailjet sender:', mailjetConfig.senderEmail);
    });
});
`;

const jstwo = `
// JS Two
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');
const sanitize = require('sanitize-filename');

// File paths
const PERMANENT_UPLOADS_DIR = path.join(__dirname, 'permanent_uploads');
const TEMP_DIR = path.join(os.tmpdir(), 'temp_uploads');
const LOG_FILE = path.join(__dirname, 'Log.txt');

// Create directories and log file
[PERMANENT_UPLOADS_DIR, TEMP_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});
if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, 'Timestamp,IP Address,Username,Original Filename,Stored Filename,Status\\n', 'utf8');
}

// IP handling
function getClientIp(req) {
    const headersToCheck = [
        'x-forwarded-for',
        'cf-connecting-ip',
        'x-real-ip',
        'x-client-ip'
    ];

    for (const header of headersToCheck) {
        const value = req.headers[header];
        if (value) {
            const ips = value.split(',').map(ip => ip.trim());
            return convertIPv4MappedToIPv4(ips[0]);
        }
    }
    
    return convertIPv4MappedToIPv4(req.socket?.remoteAddress) || 'unknown';
}

function convertIPv4MappedToIPv4(ip) {
    if (!ip) return ip;
    if (ip.startsWith('::ffff:')) return ip.substring(7);
    if (ip === '::1') return '127.0.0.1';
    return ip;
}

// Logging
function logEvent(ip, userName, originalName, storedName, status) {
    const timestamp = new Date().toISOString();
    const logEntry = \`\${timestamp},\${ip},\${userName},"\${originalName}","\${storedName || 'N/A'}",\${status}\\n\`;
    fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
    console.log(\`[Upload] \${status} - IP: \${ip}, User: \${userName}\`);
}

// File handling
function formatFilename(userName, originalName) {
    const cleanName = sanitize(userName).replace(/[^a-zA-Z]/g, '');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const ext = path.extname(originalName).toLowerCase();
    const base = path.basename(originalName, ext)
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_-]/g, '');
    return \`\${cleanName}_\${timestamp}_\${base}\${ext}\`;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, TEMP_DIR),
    filename: (req, file, cb) => {
        const userName = req.userEmail.email;
        cb(null, formatFilename(userName, file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { 
        fileSize: 10 * 1024 * 1024 * 1024,
        files: 20 // Max 20 files
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.mp4'];
        if (!allowedExts.includes(ext)) {
            logEvent(getClientIp(req), req.userEmail.email, file.originalname, null, 'REJECTED: Invalid file type');
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    }
}).array('files', 20); // Handle multiple files

function scanFile(filePath) {
    return new Promise((resolve) => {
        if (process.platform === 'win32') {
            const cmd = \`"\${path.join(process.env.ProgramFiles, 'Windows Defender', 'MpCmdRun.exe')}" -Scan -ScanType 3 -File "\${filePath}"\`;
            exec(cmd, (error) => {
                resolve(error?.code === 2 ? 'malware' : 'clean');
            });
        } else {
            exec(\`clamscan --no-summary "\${filePath}"\`, (error, stdout) => {
                resolve(error || stdout.includes('Infected files: 1') ? 'malware' : 'clean');
            });
        }
    });
}

async function handleUpload(req, res, next) {
    const clientIp = getClientIp(req);
    const userName = req.userEmail.email;
    req.uploadedFiles = [];

    try {
        await new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) {
                    logEvent(clientIp, userName, 'Multiple files', null, \`ERROR: \${err.message}\`);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        if (!req.files || req.files.length === 0) {
            logEvent(clientIp, userName, 'Multiple files', null, 'CANCELLED: No files uploaded');
            return res.status(400).json({ error: 'No files uploaded' });
        }

        // Process each file
        const results = [];
        for (const file of req.files) {
            const originalFileName = file.originalname;
            const scanResult = await scanFile(file.path);
            
            if (scanResult === 'malware') {
                fs.unlinkSync(file.path);
                logEvent(clientIp, userName, originalFileName, null, 'REJECTED: Malware detected');
                results.push({
                    originalName: originalFileName,
                    status: 'rejected',
                    error: 'Malware detected'
                });
                continue;
            }

            const finalFilename = file.filename;
            const finalPath = path.join(PERMANENT_UPLOADS_DIR, finalFilename);
            fs.renameSync(file.path, finalPath);

            logEvent(clientIp, userName, originalFileName, finalFilename, 'SUCCESS: File saved');
            results.push({
                originalName: originalFileName,
                storedName: finalFilename,
                path: finalPath.replace(__dirname, ''),
                status: 'success'
            });
        }

        req.uploadedFiles = results;
        res.json({ 
            message: 'Files processed',
            results,
            ip: clientIp
        });

        // Call next to trigger completion notification
        if (next) next();

    } catch (error) {
        // Clean up any uploaded files
        if (req.files) {
            req.files.forEach(file => {
                if (file.path && fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
        }
        
        logEvent(clientIp, userName, 'Multiple files', null, \`ERROR: \${error.message}\`);
        res.status(500).json({ 
            error: error.message,
            ip: clientIp
        });
    }
}

module.exports = handleUpload;
`;

const jsthree = `
// JS Three
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

async function askSettings() {
  const rawFilter = await askQuestion("Select IP Filter Mode (1 = blacklist, 0 = whitelist): ");
  const IP_FILTER_MODE = parseInt(rawFilter) === 1 ? 1 : 0;

  const rawExplorer = await askQuestion("Enable file explorer? (true/false/1/0): ");
  const EXPLORER_ENABLED = ['true', '1'].includes(rawExplorer.toLowerCase());

  const rawPort = await askQuestion("Enter the port number to forward on (e.g., 3000): ");
  const PORT = parseInt(rawPort) || 6601;

  const answers = {
    IP_FILTER_MODE,
    EXPLORER_ENABLED,
    PORT,
  };

  fs.writeFileSync('answers.json', JSON.stringify(answers, null, 2));
  console.log("✅ Answers saved to answers.json");

  rl.close();
} 

askSettings();
`;



// 📂 Target directory (same as this script)
const targetDir = __dirname;

// 📝 File creation
fs.writeFileSync(path.join(targetDir, 'index.html'), htmlone.trim(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'explorer.html'), htmltwo.trim(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'server.js'), jsone.trim(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'uploadHandler.js'), jstwo.trim(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'config.js'), jsthree.trim(), 'utf8');

console.log("✅ All files created successfully in:", targetDir);

const os = require('os');

const platform = os.platform(); // 'win32', 'linux', 'darwin', etc.
const arch = os.arch();         // 'x64', 'arm', etc.

console.log(`Your OS is: ${platform}`);
console.log(`Architecture: ${arch}`);


function commandExists(cmd) {
    try {
        execSync(`which ${cmd}`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

function tryCommand(cmd, description) {
    try {
        console.log(`\n➡️ ${description}...`);
        execSync(cmd, { stdio: 'inherit' });
        return true;
    } catch (err) {
        console.error(`❌ Failed: ${description}`);
        return false;
    }
}

function installOnMacOS() {
    console.log("You're on macOS.");

    if (!commandExists('clamscan')) {
        if (!commandExists('brew')) {
            console.warn("🚫 Homebrew is not installed.");
            console.log(`To install Homebrew, run this command manually:\n\n/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n`);
            console.log("After that, re-run this script.");
            return;
        }

        if (tryCommand('brew install clamav', 'Installing ClamAV via Homebrew')) {
            tryCommand('sudo freshclam', 'Updating virus database');
        } else {
            console.log("⚠️ If Homebrew install failed, try installing ClamAV manually from https://www.clamav.net/downloads");
        }
    } else {
        console.log("✅ ClamAV is already installed.");
    }
}

function installOnLinux() {
    console.log("You're on Linux.");

    if (commandExists('clamscan')) {
        console.log("✅ ClamAV is already installed.");
        return;
    }

    let installed = false;

    // Try apt (Debian, Ubuntu, etc.)
    if (commandExists('apt')) {
        installed = tryCommand('sudo apt update && sudo apt install clamav clamav-daemon -y', 'Installing ClamAV via APT');
    }

    // Try dnf (Fedora, RHEL, etc.)
    if (!installed && commandExists('dnf')) {
        installed = tryCommand('sudo dnf install clamav clamav-update -y', 'Installing ClamAV via DNF');
    }

    // Try pacman (Arch Linux)
    if (!installed && commandExists('pacman')) {
        installed = tryCommand('sudo pacman -Sy clamav --noconfirm', 'Installing ClamAV via Pacman');
    }

    // Try apk (Alpine Linux)
    if (!installed && commandExists('apk')) {
        installed = tryCommand('sudo apk add clamav', 'Installing ClamAV via APK');
    }

    if (installed) {
        tryCommand('sudo freshclam', 'Updating virus database');
    } else {
        console.log("❗ Could not detect a compatible package manager or failed to install ClamAV.");
        console.log("🔗 You can download and install it manually from: https://www.clamav.net/downloads");
    }
}

function installClamAV() {
    switch (platform) {
        case 'win32':
            console.log("You're on Windows! ✅ No installation needed — using Windows Defender.");
            break;

        case 'darwin':
            installOnMacOS();
            break;

        case 'linux':
            installOnLinux();
            break;

        default:
            console.log("❓ Unknown OS platform. Please install ClamAV manually.");
    }
}



installClamAV();



startfilesetup();
}



function main() {
  try {
    setupEverything(); // Run your setup steps here
    console.log("✅ Setup finished successfully.");
  } catch (err) {
    console.error("❌ Setup failed:", err.message);
  } finally {
    // Always run this, even if setup failed
    runConfigAndServer();
  }
}

function runConfigAndServer() {
  try {
    console.log("🚀 Launching Config...");
    execSync('node config.js', { stdio: 'inherit' });
    console.log("✅ Config finished successfully.");
  } catch (err) {
    console.error("❌ Config failed:", err.message);
  } finally {
    try {
      console.log("🚀 Launching Server...");
      execSync('npx nodemon server.js', { stdio: 'inherit' });
    } catch (launchErr) {
      console.error("❌ Failed to start server:", launchErr.message);
    }
  }
}

main();
