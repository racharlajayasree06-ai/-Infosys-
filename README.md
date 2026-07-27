# FranchiseOps AI — Intelligent Franchise Operations Platform

A full-stack, multi-tenant franchise intelligence and operations platform designed for managing Indian outlet chains, predicting setup costs with Machine Learning, evaluating weather-impacted footfall, and deploying multi-agent AI assistants.

---

## 🌟 Key Features

### 🔐 1. Secure Authentication & Role Management (`AuthPortal`)
- **Multi-Role Access Control**: Support for **System Admin**, **Regional Director**, and **Outlet Franchisee** profiles.
- **Security Protections**: Login failure tracking with exponential lockout countdown timer (5 failed attempts trigger lock).
- **Two-Factor OTP Verification**: Interactive 6-digit OTP request & verification flow with a 30-second resend cooldown timer.
- **Password Strength Evaluator**: Real-time password health check (uppercase, digits, special characters).

### 🤖 2. Interactive AI Operations Copilot (`AICopilot`)
- **Multi-Agent Telemetry Assistant**: Get instant answers on setup costs, staffing allocations, weather mitigation strategies, and sales forecasts.
- **Streaming Response Generator**: Realistic streaming text delivery with quick prompt shortcut pills.
- **Utilities**: One-click response copying and chat history clearing.

### 📊 3. Machine Learning Setup Pricing Calculator (`MLPricingCalculator`)
- **XGBoost Setup Cost Predictor**: Establishes setup capital requirements based on square footage, city tier (Tier-1 Metro, Tier-2 Urban, Tier-3 Emerging), employee headcount, and monthly rent.
- **Cost Distribution Breakdown**: Itemized insights into interior fit-outs, kitchen/POS equipment, working capital reserves, and brand license fees.
- **ROI Payback Horizon**: Calculates projected payback timeline in months along with model confidence scoring.

### 🧠 4. LLM Test Lab (`LLMTestLabView`)
- **Prompt Engineering Workspace**: Test and evaluate prompts against model architectures.
- **Hyperparameter Tuning**: Adjust Temperature, Top-P, Top-K, and Max Token constraints.
- **Performance Logs**: Compare latency, token generation speed, and response accuracy across test cases.

### 🌤️ 5. Weather Telemetry & Footfall Simulation (`WeatherDemoView`)
- **Environmental Footfall Forecasting**: Real-time telemetry modeling rain, monsoon precipitation, and extreme temperature impacts on walk-in vs. delivery order volume across Indian metros.
- **Actionable Operations Playbooks**: Automated shift recommendations for dispatch and packaging staff during weather disruptions.

### 📍 6. Unsupervised Store Tiering (`KMeansView`)
- **K-Means Clustering Analysis**: Categorizes outlets into Tier 1 High Revenue, Tier 2 Growing Urban, and Tier 3 Emerging Hubs using multi-dimensional spatial clustering.
- **Interactive Visualizations**: Scatter graphs and revenue-per-sqft benchmarks.

### ⚙️ 7. System Administration & Audit (`AdminPanelView`)
- **User Directory Management**: View, filter, edit roles, reset passwords, or lock user accounts.
- **System Audit Logs**: Real-time timestamped event logs capturing authentication attempts, configuration changes, and operational alerts.
- **Platform Telemetry**: Database connectivity, API endpoint health, and server uptime monitoring.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion (Framer Motion)
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **AI / LLM Integration**: `@google/genai` (Google Gemini API SDK)
- **Server Framework**: Express.js with Vite Middleware mode

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun**

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd franchise-ops-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and set your optional API keys:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── AICopilot.tsx            # Multi-agent AI assistant
│   │   ├── MLPricingCalculator.tsx  # XGBoost setup pricing calculator
│   │   ├── AuthPortal.tsx           # Login, signup, 2FA OTP & lockouts
│   │   ├── Sidebar.tsx              # Main navigation menu
│   │   └── views/
│   │       ├── HomeView.tsx         # Dashboard overview
│   │       ├── LLMTestLabView.tsx   # LLM prompt playground
│   │       ├── WeatherDemoView.tsx  # Weather & footfall impact telemetry
│   │       ├── KMeansView.tsx       # K-Means outlet clustering
│   │       └── AdminPanelView.tsx   # Admin user & system management
│   ├── data/
│   │   └── mockData.ts              # Seeded store telemetry & analytics data
│   ├── utils/
│   │   └── authUtils.ts             # Auth utilities, local storage & password checks
│   ├── types.ts                     # Shared TypeScript interfaces
│   ├── App.tsx                      # Main app orchestrator
│   └── main.tsx                     # React DOM entry point
├── metadata.json                    # Application metadata
├── package.json                     # Dependencies and scripts
└── vite.config.ts                   # Vite configuration
```

---

## 🔐 Default Admin Credentials

To log into the system for administrative testing:
- **Username**: `admin`
- **Password**: `Admin123!`
- **Role**: System Administrator

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
