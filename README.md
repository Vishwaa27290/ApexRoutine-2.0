# BMI_Calculator ⚖️

A clean, web-based Body Mass Index (BMI) tracking application built to provide instantaneous health metric analytics. This project showcases a complete full-stack workflow automated via a robust continuous integration and automated configuration deployment pipeline.

---

## 🛠️ Tech Stack & DevOps Infrastructure

* **Application Core:** Java / Web web-tier engine
* **Build Automation:** Maven (Project Object Model lifecycle management)
* **Continuous Integration (CI):** Jenkins (Automated build pipelines tracking version control triggers)
* **Configuration Management & Deployment (CD):** Ansible (Playbooks targeting system environment configuration and direct build artifact provisioning)

---

## 💎 Key Features

* **Instant Metrics Calculation:** Computes standard BMI values based on real-time user inputs.
* **Automated Integration Pipeline:** Every push triggers a headless Jenkins verification build to run automated unit tests.
* **Idempotent Deployments:** Uses Ansible automation playbooks to perfectly structure host target setups, ensuring environment consistency.

---

## 🚀 DevOps Lifecycle & Local Setup

### **1. Core CI Pipeline (Jenkins)**
The project contains target configurations mapping build webhooks to an active Jenkins automation server. On code push:
1. Dependencies are resolved via Maven.
2. Test suites are compiled and run locally.
3. The verified build artifact (`.war`/`.jar`) is packaged for deployment staging.

### **2. Automated Environment Provisioning (Ansible)**
Deployments are fully handled via automation playbooks. Run the setup script to instantly configure target nodes and deploy the calculator artifact:
```bash
ansible-playbook -i inventory/hosts deploy-calculator.yml

