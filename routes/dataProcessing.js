const express = require('express');
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');
const router = express.Router();

router.post('/saveCrmData', async (req, res) => {
  try {
    const leads = req.body.leads;
    await Lead.bulkCreate(leads, { validate: true });
    res.status(201).json({ message: 'CRM data saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

router.post('/saveCampaignData', async (req, res) => {
  try {
    const campaigns = req.body.campaigns;
    await Campaign.bulkCreate(campaigns, { validate: true });
    res.status(201).json({ message: 'Campaign data saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
