---

# Franchise Analytics & Management Portal

## Milestone 1 – User Authentication & Security

Milestone 1 focuses on building a secure user authentication system for the **Franchise Analytics & Management Portal**. The application allows users to create accounts, log in securely, recover forgotten passwords, and access a protected analytics dashboard. Security mechanisms such as password hashing, JWT-based session management, and secure credential storage were implemented to protect user information.

---

# Features Implemented

* ✅ User Login with email and password
* ✅ User Registration (Signup)
* ✅ Password strength validation
* ✅ Unique username and email validation
* ✅ Security Question–based password recovery
* ✅ JWT (JSON Web Token) session management
* ✅ Password hashing using bcrypt
* ✅ SQLite database integration
* ✅ Interactive Analytics Dashboard
* ✅ Responsive UI using Streamlit
* ✅ Secure storage of sensitive keys using Google Colab Secrets
* ✅ Public deployment using ngrok

---

# Tech Stack

| Technology           | Purpose                                                          |
| -------------------- | ---------------------------------------------------------------- |
| Python               | Backend Logic                                                    |
| Streamlit            | Web Application UI                                               |
| SQLite               | User Database                                                    |
| JWT (PyJWT)          | Secure Session Management                                        |
| bcrypt               | Password Hashing                                                 |
| ngrok                | Public URL for the Streamlit Application                         |
| Google Colab         | Development Environment                                          |
| Google Colab Secrets | Secure storage of JWT Secret, Gmail credentials, and ngrok token |

---

# Security Features

* Passwords are securely hashed using **bcrypt** before storage.
* JWT tokens are generated after successful authentication to manage user sessions securely.
* Password validation requires:

  * Minimum 8 characters
  * At least one uppercase letter
  * At least one lowercase letter
  * At least one number
  * At least one special character
* Sensitive credentials are stored using **Google Colab Secrets** instead of hardcoding them.

---

# Google Colab Secrets

Create the following secrets before running the application:

| Secret Name       | Description                                    |
| ----------------- | ---------------------------------------------- |
| `JWT_SECRET`      | Secret key used to sign and verify JWT tokens  |
| `EMAIL_ADDRESS`   | Gmail account used to send OTP emails          |
| `EMAIL_PASSWORD`  | Gmail App Password (16-character App Password) |
| `NGROK_AUTHTOKEN` | ngrok authentication token                     |

---

# How to Run the Notebook

1. Open the notebook in **Google Colab**.
2. Add the required secrets in **Colab → Secrets**:

   * `JWT_SECRET`
   * `EMAIL_ADDRESS`
   * `EMAIL_PASSWORD`
   * `NGROK_AUTHTOKEN`
3. Install all required Python libraries.
4. Run all notebook cells.
5. The notebook will automatically:

   * Start the Streamlit application.
   * Create a secure ngrok tunnel.
   * Generate a public URL for accessing the application.
6. Open the generated ngrok URL in a web browser to use the portal.

---

# JWT Authentication Flow

1. User logs in with valid credentials.
2. Password is verified using bcrypt.
3. A JWT token is generated after successful authentication.
4. The token is stored in the user's session.
5. Protected pages are accessible only while the JWT token remains valid.

---

# ngrok Integration

The application uses **ngrok** to expose the local Streamlit server to the internet. After execution, ngrok generates a secure public URL that allows users to access the application remotely without deploying it to a cloud server.

---

# Future Enhancements

* Gmail OTP verification for Forgot Password
* Role-Based Access Control (RBAC)
* Franchise analytics reports
* Email verification during registration
* Database migration to MySQL/PostgreSQL
* Cloud deployment (AWS/Azure/GCP)

This format is suitable for a GitHub repository and clearly explains what Milestone 1 covers, the technologies used, how security is implemented, and how someone can run your project.
