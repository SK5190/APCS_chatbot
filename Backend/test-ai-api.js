/**
 * Test script: calls POST /api/test-ai to verify the AI model is working.
 * Requires: Backend running (npm start in Backend), and GEMINI_API_KEY in .env
 */

const http = require('http');

const payload = JSON.stringify({
  message: 'Reply with exactly: "AI is working!" and nothing else.'
});

const req = http.request(
  {
    hostname: 'localhost',
    port: 3000,
    path: '/api/test-ai',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  },
  (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.success && json.response) {
          console.log('✅ AI model is working.');
          console.log('   Request:', json.message);
          console.log('   Response:', json.response);
        } else {
          console.log('❌ AI test failed:', json.error || json);
          if (json.hint) console.log('   Hint:', json.hint);
        }
      } catch (e) {
        console.log('❌ Unexpected response:', data);
      }
      process.exit(res.statusCode === 200 && data.includes('"success":true') ? 0 : 1);
    });
  }
);

req.on('error', (err) => {
  console.error('❌ Request failed:', err.message);
  console.log('   Make sure the backend is running: cd Backend && node server.js');
  process.exit(1);
});

req.setTimeout(15000, () => {
  req.destroy();
  console.error('❌ Request timeout (15s). Check your API key and network.');
  process.exit(1);
});

req.write(payload);
req.end();
