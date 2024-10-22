# EzyMetrics Backend API

This backend service provides data integrations, reporting, and alerting functionality for the EzyMetrics platform.

## Tech Stack
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Sequelize ORM**

## Setup Instructions

### Clone the repository:
```bash
git clone https://github.com/DevKaranJ/integration-reporting-api
```

### Install dependencies:
```bash
npm install
```

### Create a .env file with the following content:

#### Database Configuration
```env
DB_NAME=ezymetrics
DB_USER=your_user
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

#### Email Configuration
(for testing purpose using MailTrap service)
```env
EMAIL_USER="" # Replace with your Mailtrap username
EMAIL_PASS="" # Replace with your Mailtrap password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
```

### Run the PostgreSQL database locally or use a hosted service.

### Start the server:
```bash
npm start
```

## API Endpoints

### Save CRM Data
- **Endpoint:** `POST /api/data/saveCrmData`
- **Request Body:**
```json
{
  "leads": [
    { "name": "Lead 1", "status": "INTERESTED" },
    { "name": "Lead 2", "status": "NOT_INTERESTED" }
  ]
}
```
- **Description:** Saves a list of leads to the database.

### Save Campaign Data
- **Endpoint:** `POST /api/data/saveCampaignData`
- **Request Body:**
```json
{
  "campaigns": [
    { "campaignName": "Campaign 1", "clicks": 100, "leads": 10 },
    { "campaignName": "Campaign 2", "clicks": 200, "leads": 20 }
  ]
}
```
- **Description:** Saves a list of campaigns to the database.

### Generate PDF Report
- **Endpoint:** `GET /api/reports/pdf-report`
- **Description:** Generates a PDF report summarizing the total leads and campaigns.

### Generate CSV Report
- **Endpoint:** `GET /api/reports/csv-report`
- **Description:** Generates a CSV report containing the names and statuses of leads.

### Trigger Alert
- **Endpoint:** `POST /api/alerts/trigger-alert`
- **Description:** Triggers an email alert if there are leads with the status "INTERESTED".

## Additional Notes
- Make sure your PostgreSQL database is running and properly configured.
- To send email alerts, set up your Mailtrap account and use the provided credentials in the `.env` file.

## Running the Project
After setting everything up:
1. Run PostgreSQL locally or use a cloud database.
2. Run `npm start` to start the backend server.
3. Test your API using Postman or curl.