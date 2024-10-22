const express = require('express');
const PDFDocument = require('pdfkit');
const { parse } = require('json2csv');
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');
const router = express.Router();

router.get('/pdf-report', async (req, res) => {
  const leads = await Lead.findAll();
  const campaigns = await Campaign.findAll();

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');

  doc.text('EzyMetrics Report', { align: 'center' });
  doc.text(`Total Leads: ${leads.length}`);
  doc.text(`Total Campaigns: ${campaigns.length}`);

  leads.forEach(lead => doc.text(`Lead: ${lead.name}, Status: ${lead.status}`));
  campaigns.forEach(campaign => doc.text(`Campaign: ${campaign.campaignName}, Clicks: ${campaign.clicks}, Leads: ${campaign.leads}`));

  doc.end();
  doc.pipe(res);
});

router.get('/csv-report', async (req, res) => {
  const leads = await Lead.findAll();
  const csv = parse(leads.map(lead => lead.toJSON()), { fields: ['name', 'status'] });

  res.setHeader('Content-Type', 'text/csv');
  res.attachment('report.csv');
  res.send(csv);
});

module.exports = router;
