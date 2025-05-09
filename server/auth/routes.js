const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const { Octokit } = require('@octokit/rest');
const jwt = require('jsonwebtoken');
const config = require('./config');

const router = express.Router();
const googleClient = new OAuth2Client(config.google.clientId, config.google.clientSecret, config.google.callbackUrl);
const octokit = new Octokit();

// Google OAuth
router.get('/google', (req, res) => {
  const authUrl = googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  res.redirect(authUrl);
});

router.get('/callback/google', async (req, res) => {
  try {
    const { tokens } = await googleClient.getToken(req.query.code);
    googleClient.setCredentials(tokens);
    
    const { data: profile } = await googleClient.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });

    const token = jwt.sign({
      id: profile.sub,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: 'google'
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.redirect(`${process.env.AUTH0_BASE_URL}/?token=${token}`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${process.env.AUTH0_BASE_URL}/auth/error`);
  }
});

// GitHub OAuth
router.get('/github', (req, res) => {
  const scope = ['user:email', 'read:user'];
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&scope=${scope.join('+')}`;
  res.redirect(authUrl);
});

router.get('/callback/github', async (req, res) => {
  try {
    const { data: accessToken } = await octokit.request('POST /login/oauth/access_token', {
      client_id: config.github.clientId,
      client_secret: config.github.clientSecret,
      code: req.query.code,
    });

    const { data: profile } = await octokit.request('GET /user', {
      headers: {
        authorization: `token ${accessToken.access_token}`,
      },
    });

    const emails = await octokit.request('GET /user/emails', {
      headers: {
        authorization: `token ${accessToken.access_token}`,
      },
    });

    const primaryEmail = emails.data.find(email => email.primary)?.email;

    const token = jwt.sign({
      id: profile.id.toString(),
      email: primaryEmail,
      name: profile.name || profile.login,
      picture: profile.avatar_url,
      provider: 'github'
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.redirect(`${process.env.AUTH0_BASE_URL}/?token=${token}`);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.redirect(`${process.env.AUTH0_BASE_URL}/auth/error`);
  }
});

module.exports = router;
