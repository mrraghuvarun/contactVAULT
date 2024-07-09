const { StreamChat } = require('stream-chat');
const client = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

exports.getStreamToken = async (req, res) => {
  const { userId, username } = req.body;

  if (!userId || !username) {
    console.error('User ID or Username is missing from request body');
    return res.status(400).json({ error: 'User ID and Username are required' });
  }

  try {
    console.log(`Creating token for user ID: ${userId}, Username: ${username}`);

    // Ensure user exists on Stream server with server-side API key
    await client.upsertUser({
      id: userId,
      name: username,
      role: 'admin', // Temporarily assigning the 'admin' role for testing
    });

    const token = client.createToken(userId);
    console.log(`Token created successfully for user ID: ${userId}`);
    res.json({ token });
  } catch (error) {
    console.error('Error creating Stream token:', error);
    res.status(500).json({ error: 'Failed to create Stream token' });
  }
};
