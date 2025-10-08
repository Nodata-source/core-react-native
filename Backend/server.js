const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pushTokens = [];

app.post('/api/save-token', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  if(token && !pushTokens.includes(token)){
    pushTokens.push(token);
    console.log('Token saved:', token);
  }
  
  res.sendStatus(200);
});

app.post('/api/send-notification', async(req, res) => {
  const messages = pushTokens.map(token => ({
    to: token,
    sound: 'default',
    title: "New Notification",
    body: "This was sent from the backend!",
    data: { someData: 'goes here' },
  }));

  // Send notifications using your preferred method
 try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
    });

    const result = await response.json();
    console.log('Push notification response:', result);
    res.send(result);
  } catch (error) {
    console.error('Error sending push notifications:', error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
