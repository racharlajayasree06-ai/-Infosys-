# ⚡Agentic AI for Franchise Management System with Performance Monitoring Assistance(Milestone 2)

### Enterprise Multi-Agent Franchise Operations Platform

FranchiseOps AI is an AI-powered franchise operations platform that combines **Large Language Models, Machine Learning agents, analytics, authentication, inventory intelligence, outlet analysis, and workforce insights** into a unified Streamlit application.

The system uses **Qwen2.5-3B-Instruct** as its LLM engine and multiple machine-learning algorithms for workforce attrition, outlet clustering/revenue prediction, and inventory-demand analysis.

---

## 🚀 Key Features

### 🤖 AI Copilot

* AI-powered franchise operations assistant
* Multi-agent reasoning across three operational domains
* Agent-to-agent debate and synthesis
* Uses Qwen2.5-3B-Instruct
* JSON-based structured AI generation
* Persistent chat history

### 👥 Agent 1 — Workforce Intelligence

* Employee attrition prediction
* Multiple classification algorithms
* Model comparison using ROC-AUC and accuracy
* Calibrated machine-learning classifiers
* Workforce risk identification

### 🏬 Agent 2 — Outlet Intelligence

* Outlet clustering using K-Means
* Automatic comparison of different cluster sizes
* Silhouette-score based cluster selection
* Revenue prediction
* Multiple regression algorithms
* Outlet performance analysis

### 📦 Agent 3 — Inventory Intelligence

* Inventory demand prediction
* Stockout risk analysis
* Reorder quantity recommendations
* Inventory risk classification
* Weather-aware operational context
* AI procurement advisory

### 📊 Analytics & Retraining

* ML model performance tracking
* Stored evaluation metrics
* Model retraining workflow
* Algorithm comparison
* Performance monitoring

### 🛡️ Authentication & Security

* JWT-based authentication
* Password hashing with bcrypt
* Password confirmation and validation
* Security-question based recovery
* Email OTP password reset
* Role-based access
* Admin dashboard

### 📡 Notifications

* Alert generation
* Recent notification history
* Email-based OTP functionality
* Operational alerts

---

## 🧠 AI & Machine Learning

### Large Language Model

The application uses:

**Qwen/Qwen2.5-3B-Instruct**

The model is loaded using:

* 4-bit NF4 quantization
* `bitsandbytes`
* FP16 computation
* Automatic device mapping
* SDPA attention when supported
* Hugging Face model caching
* Background model warm-up

This allows the LLM to run efficiently on GPU environments such as a **Tesla T4**.

---

## 🤝 Multi-Agent Architecture

The AI Copilot coordinates three specialized agents:

```text
                    ┌─────────────────────┐
                    │     AI Copilot      │
                    │  Qwen2.5-3B-Instruct│
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │   Agent 1    │ │   Agent 2    │ │   Agent 3    │
        │  Workforce   │ │    Outlet    │ │  Inventory   │
        │  & Attrition │ │  & Revenue   │ │  & Demand    │
        └──────────────┘ └──────────────┘ └──────────────┘
                │              │              │
                └──────────────┼──────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Debate & Synthesis  │
                    │   Final AI Advice   │
                    └─────────────────────┘
```

Each agent provides domain-specific context to the LLM, which combines the information to generate a unified operational recommendation.

---

## 🤖 Machine Learning Models

### Agent 1 — Attrition

The implementation compares:

* Logistic Regression
* Random Forest
* Gradient Boosting
* Support Vector Machine

Models are calibrated using `CalibratedClassifierCV`.

**Evaluation metrics:**

* ROC-AUC
* Accuracy

The best-performing model is saved as:

```text
attrition_lr.joblib
```

---

### Agent 2 — Outlet Intelligence

#### Clustering

K-Means clustering is evaluated with:

```text
K = 3
K = 4
K = 5
```

The best configuration is selected using the **Silhouette Score**.

Saved model:

```text
kmeans_outlets.joblib
```

#### Revenue Prediction

The implementation compares regression models including:

* Random Forest Regressor
* Gradient Boosting Regressor
* Extra Trees Regressor

The selected model is stored as:

```text
revenue_rf.joblib
```

---

### Agent 3 — Inventory

Inventory-demand prediction compares multiple regression algorithms including:

* Random Forest
* Gradient Boosting
* Extra Trees
* Ridge Regression

The best model is stored as:

```text
inventory_demand_gb.joblib
```

---

## 🗂️ Project Structure

```text
FranchiseOps-AI/
│
├── app.py
├── config.py
├── auth.py
├── db.py
├── llm_engine.py
│
├── agent2_franchise.py
├── agent3_franchise.py
├── admin_dash.py
│
├── weather_context.py
├── notifications.py
├── seed_data.py
├── ui_theme.py
│
├── train_m2.py
│
├── models/
│   ├── attrition_lr.joblib
│   ├── kmeans_outlets.joblib
│   ├── revenue_rf.joblib
│   └── inventory_demand_gb.joblib
│
├── data/
│   └── FranchiseOps_AI/
│       └── franchiseops.db
│
└── README.md
```

---

## 🛠️ Technologies Used

| Category             | Technologies              |
| -------------------- | ------------------------- |
| Frontend             | Streamlit                 |
| Programming          | Python                    |
| LLM                  | Qwen2.5-3B-Instruct       |
| LLM Framework        | Hugging Face Transformers |
| Quantization         | BitsAndBytes / 4-bit NF4  |
| Machine Learning     | Scikit-learn              |
| Data Processing      | Pandas, NumPy             |
| Database             | SQLite                    |
| Authentication       | JWT, bcrypt               |
| Visualization        | Plotly                    |
| Deployment/Tunneling | ngrok                     |
| Dataset Access       | Kaggle API                |
| Storage              | Google Drive              |
| GPU                  | CUDA / Tesla T4           |

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/FranchiseOps-AI.git
cd FranchiseOps-AI
```

Install the required dependencies:

```bash
pip install -q streamlit pyngrok bcrypt pyjwt pandas numpy scikit-learn joblib transformers accelerate bitsandbytes plotly streamlit-option-menu faker kaggle
```

---

## 🔐 Environment & Secrets

The application reads sensitive configuration from **Google Colab Secrets** or environment variables.

Required/optional secrets include:

```text
HF_TOKEN
KAGGLE_USERNAME
KAGGLE_KEY
NGROK_AUTHTOKEN
EMAIL_ID
EMAIL_PASSWORD
JWT_SECRET_KEY
ADMIN_EMAIL_ID
ADMIN_PASSWORD
```

### Important

Do **not** upload API keys, passwords, tokens, or other secrets to GitHub.

Use environment variables or Google Colab Secrets instead.

---

## ▶️ Running the Application

The notebook creates the application modules and initializes the database.

Initialize the database and seed data:

```python
import db
import seed_data

db.init_db()
seed_data.seed_all()
```

Train the machine-learning agents using:

```bash
python train_m2.py
```

Start the Streamlit application:

```bash
streamlit run app.py --server.port=8501
```

The notebook also supports exposing the application through ngrok:

```text
Streamlit → Port 8501 → ngrok → Public URL
```

---

## 💾 Data & Model Storage

The application supports Google Drive storage in Google Colab:

```text
/content/drive/MyDrive/FranchiseOps_AI/
```

Models are stored under:

```text
models/
```

The SQLite database is stored as:

```text
franchiseops.db
```

Hugging Face and Kaggle caches are maintained to reduce repeated downloads.

---

## 📈 ML Evaluation

The training pipeline automatically compares candidate algorithms and records model metrics in the database.

Classification models are evaluated using:

```text
ROC-AUC
Accuracy
```

Regression models use:

```text
R²
RMSE
```

Clustering uses:

```text
Silhouette Score
```

The best-performing model is selected and persisted using `joblib`.

---

## 🌦️ Weather-Aware Intelligence

The platform includes a weather-context module that can provide city/weather information to support operational decisions.

Weather context can be used by the inventory agent when generating demand and procurement recommendations.

---

## 🔒 Authentication Flow

```text
User
  │
  ▼
Login / Registration
  │
  ▼
JWT Authentication
  │
  ├──► Regular User
  │
  └──► Admin
          │
          ▼
    Admin Dashboard
```

Password recovery supports security questions and email OTP functionality.

---

## 📊 Application Modules

After authentication, users can access:

```text
🤖 AI Copilot
👥 Agent 1: Workforce
🏬 Agent 2: Outlets
📦 Agent 3: Inventory
📊 Analytics & Retrain
🛡️ Admin Dashboard
🚪 Sign Out
```

Admin users additionally receive access to the Admin Dashboard.

---

## 🎯 Project Objective

The objective of FranchiseOps AI is to provide a unified intelligent platform for franchise businesses to make better operational decisions using:

* AI-powered recommendations
* Workforce analytics
* Outlet performance intelligence
* Inventory forecasting
* Machine-learning predictions
* Weather-aware insights
* Multi-agent reasoning
* Centralized analytics

Instead of relying on isolated reports and manual analysis, the platform combines operational data and AI-driven insights into a single interface.

---

## 🔮 Future Enhancements

Potential future improvements include:

* Real-time business data integration
* Advanced forecasting models
* Fine-tuning the LLM on franchise-specific data
* Cloud deployment
* Real-time notification services
* More external data integrations
* Advanced role and permission management
* Model explainability dashboards
* Automated model retraining pipelines

---

## 👨‍💻 Project

**Project:** FranchiseOps AI
**Milestone:** Milestone 2
**Platform:** Enterprise Multi-Agent Franchise Operations
**Primary Language:** Python
**Interface:** Streamlit

---

## ⭐ Acknowledgement

This project integrates open-source technologies including **Qwen, Hugging Face Transformers, Scikit-learn, Streamlit, Pandas, NumPy, SQLite, and related Python libraries**.

