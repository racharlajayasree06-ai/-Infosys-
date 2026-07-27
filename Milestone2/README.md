# 🚀 FranchiseOps AI – Intelligent Franchise Operations Platform (Milestone 2)

> **Milestone 2 Submission**

FranchiseOps AI is the **Milestone 2** implementation of a multi-tenant franchise intelligence and operations platform designed for managing Indian franchise outlet chains. This milestone focuses on secure authentication, AI-powered operations assistance, machine learning-based setup cost prediction, weather-driven business intelligence, clustering analytics, and an administrative dashboard for franchise management.

---

## 📌 Milestone 2 Highlights

This milestone includes:

- ✅ Secure Authentication & Role-Based Access Control
- ✅ Registration with Confirm Password Validation
- ✅ Password Strength Checker
- ✅ Login Lockout Protection after Multiple Failed Attempts
- ✅ OTP Verification with 30-Second Resend Cooldown
- ✅ AI Operations Copilot
- ✅ Machine Learning Setup Cost Predictor
- ✅ LLM Test Lab
- ✅ Weather & Footfall Simulation
- ✅ K-Means Store Tier Clustering
- ✅ Admin Dashboard
- ✅ User Management
- ✅ Audit Logs & System Monitoring

---# 🚀 FranchiseOps AI – Intelligent Franchise Operations Platform

FranchiseOps AI is a multi-tenant franchise intelligence and operations platform designed to help manage Indian franchise outlet chains. The platform combines Machine Learning, AI-powered assistants, analytics dashboards, and weather-based business intelligence to support smarter operational decisions.

---

# 🌟 Features

## 🔐 Secure Authentication & Role Management
- Multi-role login system
  - System Admin
  - Regional Director
  - Outlet Franchisee
- Secure registration with Confirm Password validation
- Password strength checker
- Login attempt tracking
- Automatic account lock after multiple failed login attempts
- OTP verification with 30-second resend cooldown
- Role-based access control

---

## 🤖 AI Operations Copilot
- AI-powered franchise operations assistant
- Instant answers for:
  - Setup cost estimation
  - Staffing recommendations
  - Sales forecasting
  - Weather impact analysis
- Streaming AI responses
- Copy responses with one click
- Clear chat history

---

## 📊 Machine Learning Pricing Calculator
Predict franchise setup costs using Machine Learning based on:

- Outlet size
- City Tier
- Monthly rent
- Employee count

### Includes
- Estimated setup investment
- Cost breakdown
- ROI payback period
- Model confidence score

---

## 🧠 LLM Test Lab
Experiment with different LLM settings.

Features include:
- Prompt testing
- Temperature control
- Top-P
- Top-K
- Max Tokens
- Performance comparison
- Latency measurement

---

## 🌤️ Weather & Footfall Simulation
Analyze how weather affects franchise operations.

Supports:
- Rainfall impact
- Heatwave impact
- Delivery vs Walk-in prediction
- Staff planning recommendations
- Operational playbooks

---

## 📍 Store Tier Analysis (K-Means Clustering)

Cluster franchise outlets into:

- Tier 1 – High Revenue
- Tier 2 – Growing Urban
- Tier 3 – Emerging Markets

Visualizations include:
- Scatter plots
- Revenue comparisons
- Store performance analytics

---

## ⚙️ Admin Dashboard

Admin panel provides:

- User Management
- Add/Delete Users
- Lock/Unlock Accounts
- Reset Passwords
- Role Management
- Audit Logs
- System Health Monitoring
- API Status
- Database Status
- Server Uptime

---

# 🛠 Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Python 3.10+
- Streamlit

### Database
- SQLite3

### Machine Learning
- Pandas
- NumPy
- Scikit-Learn

### Visualization
- Plotly Express

### AI Integration
- Google Gemini API
- @google/genai

---

# 📂 Project Structure

```
FranchiseOps-AI/
│
├── app.py
├── database.py
├── franchise_ops.db
├── requirements.txt
├── google_colab_run.ipynb
│
├── src/
│   ├── components/
│   │   ├── AuthPortal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AICopilot.tsx
│   │   ├── MLPricingCalculator.tsx
│   │   └── views/
│   │       ├── HomeView.tsx
│   │       ├── LLMTestLabView.tsx
│   │       ├── WeatherDemoView.tsx
│   │       ├── KMeansView.tsx
│   │       └── AdminPanelView.tsx
│   │
│   ├── data/
│   ├── utils/
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
│
├── metadata.json
├── package.json
└── vite.config.ts
```

---

# 🚀 Installation

## Prerequisites

- Python 3.10+
- Node.js 18+

---

## Streamlit Application

Install dependencies

```bash
pip install -r requirements.txt
```

Initialize database

```bash
python database.py
```

Run the application

```bash
streamlit run app.py
```

Open

```
http://localhost:8501
```

---

## React Application

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# ☁️ Run in Google Colab

### Install Node.js

```python
!curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
!apt-get install -y nodejs
```

### Install Cloudflared

```python
!wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
!dpkg -i cloudflared-linux-amd64.deb
```

### Clone Repository

```python
!git clone https://github.com/YOUR_USERNAME/franchise-ops-ai.git
%cd franchise-ops-ai
```

### Install Dependencies

```python
!npm install
```

### Run Application

```python
import subprocess
import time

process = subprocess.Popen(["npm", "run", "dev"])
time.sleep(5)

!cloudflared tunnel --url http://localhost:3000
```

Cloudflare will generate a public HTTPS URL that can be shared for testing.

---

# 🔐 Default Admin Login

| Username | Password | Role |
|----------|----------|------|
| admin | Admin123! | System Administrator |

---

# 📈 Core Modules

- Authentication System
- Admin Dashboard
- AI Copilot
- Machine Learning Pricing Calculator
- Weather Intelligence
- LLM Test Lab
- K-Means Clustering
- Audit Logs
- User Management
- Analytics Dashboard

---

# 🎯 Future Enhancements

- Email OTP Integration
- JWT Authentication
- PostgreSQL Support
- Docker Deployment
- Cloud Hosting
- Mobile Responsive Dashboard
- Multi-language Support
- Real-time Notifications
- AI Recommendation Engine

---

# 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Developed By

**R. Jayasree**

B.Tech (Computer Science & Information Technology)

AI | Machine Learning | Data Analytics | Full Stack Development
