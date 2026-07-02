# APEXRoutine 🚀

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.5-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

APEXRoutine is a full-stack executive routine management engine and automation workspace. Featuring a premium dark-themed interface, the application bridges a decoupled React user interface with a robust Spring Boot REST API and a MySQL relational data layer. It includes autonomous background workers that handle routine reset operations dynamically on a scheduling cycle.

---

## 🛠️ Tech Stack & Systems Architecture

### **Backend Framework & Services**
* **Core Runtime Engine:** Java SE & Spring Boot (v3.2.5)
* **Data Persistence:** Spring Data JPA with Hibernate Object-Relational Mapping (ORM)
* **Relational Database:** MySQL Server
* **Background Automation:** Spring Scheduling Service Engine (`@EnableScheduling`)

### **Frontend Client Interface**
* **Library Framework:** React.js
* **Build System:** Vite (Configured with automated asset paths for optimized monolithic production delivery)
* **UI & Styling:** Premium responsive layout with custom cross-browser styling configurations

---

## 💎 Core Engineering Features

* **Unified Monolithic Deployment:** A streamlined Maven packaging pipeline that builds frontend bundles and serves them directly as static assets from the Spring web container.
* **Fail-Safe Data Access Layer:** Explicit Hibernate Query Language (`@Query`) structures mapping entity profiles, eliminating JPA naming convention syntax mismatch errors during compilation.
* **Automated Clock Engine:** Built-in cron task scheduling (`0 0 0 * * ?`) that executes task management and lifecycle logic automatically at midnight.
* **Relational Database Integrity:** Complete structural mapping linking Users, Routines, and daily Routine Activities across database tables.

---

## 📂 Project Tree

```text
ApexRoutine/
├── frontend/                     # React Single Page Application (Vite context)
│   ├── src/
│   │   ├── components/           # UI Elements & Form Inputs
│   │   ├── pages/                # Main Dashboard Views
│   │   ├── App.jsx               # Client Routing & Shell Layout
│   │   └── main.jsx              # React DOM Mounting Engine
│   ├── index.html                # Vite Core Document Template
│   └── vite.config.js            # Build Distribution Target Mappings
├── src/main/                     # Spring Boot Source Application Layers
│   ├── java/com/apex/routine/
│   │   ├── controller/           # REST APIs (Authentication, Routines)
│   │   ├── model/                # JPA Relational Entities (User, Routine, Activity)
│   │   ├── repository/           # HQL Explicit Database Mappings
│   │   ├── service/              # Scheduling Services & Business Logic
│   │   └── ApexRoutineApplication.java # Primary Boot Entry Application
│   └── resources/
│       ├── static/               # Target Directory for Bundled UI Production Assets
│       └── application.yml       # Configuration Setup (Database Profiles, Port Configurations)
└── pom.xml                       # Central Maven Dependency Engine Model
