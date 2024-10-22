const express = require('express');
const nodemailer = require('nodemailer');
const Lead = require('../models/Lead');
const router = express.Router();

// Function to send email alerts
const sendEmail = async (subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"EzyMetrics" <no-reply@ezymetrics.com>',
    to: 'a99ce0ba0d-c497d6+1@inbox.mailtrap.io',
    subject,
    text,
  });
};

// Route to trigger alert
router.post('/trigger-alert', async (req, res) => {
  try {
    // Fetch leads with status 'INTERESTED'
    const interestedLeads = await Lead.findAll({ where: { status: 'INTERESTED' } });

    if (interestedLeads.length > 0) {
      // Send email alert if there are interested leads
      await sendEmail('New Interested Leads Alert', `There are ${interestedLeads.length} interested leads.`);
      res.status(200).json({ message: 'Alert sent!' });
    } else {
      res.status(200).json({ message: 'No interested leads at the moment.' });
    }
  } catch (error) {
    console.error('Error sending alert:', error); // Log error for debugging
    res.status(500).json({ error: 'Failed to send alert' });
  }
});

module.exports = router;
