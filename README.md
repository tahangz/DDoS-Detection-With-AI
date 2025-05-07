# 🛡️ DDoS Detection with AI

An end-to-end system for real-time detection of Distributed Denial of Service (DDoS) attacks using machine learning. Built using a **Random Forest classifier**, a **Django REST API**, and a **React dashboard frontend**. The model is trained on the CICDDoS2019 dataset and detects multiple DDoS types with over 99% accuracy.

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Attack Types Detected](#attack-types-detected)
- [Tech Stack](#tech-stack)
- [Dataset](#dataset)
- [Machine Learning Pipeline](#machine-learning-pipeline)
- [Backend API](#backend-api)
- [Frontend Dashboard](#frontend-dashboard)
- [Installation & Setup](#installation--setup)
- [Results](#results)
- [Contributors](#contributors)

---

## 🚀 Project Overview

DDoS attacks flood servers with traffic, disrupting services and causing financial and reputational damage. This project uses supervised machine learning (Random Forest) to classify traffic as benign or malicious in real-time, integrating a scalable API and interactive UI for visualization.

---

## 🧠 Attack Types Detected

- SYN Flood
- UDP Flood
- UDPLag
- MSSQL Flood
- LDAP Flood
- NetBIOS Flood
- Portmap Flood

---

## 🛠 Tech Stack

| Component        | Technology            |
|------------------|------------------------|
| ML Model         | Random Forest (scikit-learn) |
| Data Processing  | pandas, numpy, sklearn |
| Backend API      | Django + Django REST Framework |
| Frontend UI      | React + Axios + Chart.js |
| Deployment       | Localhost (Docker support planned) |

---

## 📂 Dataset

We use the **CICDDoS2019** dataset from the Canadian Institute for Cybersecurity.

- Multiclass DDoS traffic (7 attack types + Benign)
- Over 150K labeled flow records
- Protocols: TCP, UDP, ICMP, etc.

---

## 🧪 Machine Learning Pipeline

### 1. Preprocessing
- Removed duplicates and unbalanced test classes
- Label harmonization and encoding
- Feature selection based on correlation and variance

### 2. Scaling
- MinMaxScaler applied to numerical features

### 3. Model
- **Random Forest** with 100 estimators
- Achieved:
  - Accuracy: `99.34%`
  - F1 Score: `99.33%`
  - ROC AUC (OvR): `99.27%`

---

## 🔌 Backend API

Implemented using Django REST Framework.

**Endpoint**: `POST /api/predict/`

**Payload**:
```json
{
  "feature1": value,
  "feature2": value,
  ...
}
