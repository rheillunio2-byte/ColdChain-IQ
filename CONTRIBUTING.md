

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&height=180&color=0:0F172A,45:0E7490,100:2563EB&text=Contributing&fontColor=FFFFFF&fontSize=52&fontAlignY=50&animation=fadeIn&stroke=67E8F9&strokeWidth=2" width="100%" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=16&duration=3000&pause=1000&color=67E8F9&center=true&vCenter=true&width=600&lines=Better+monitoring+starts+with+collaboration.;Every+contribution+helps+keep+shipments+safe." alt="Typing SVG" />

**Thank you for your interest in contributing to ColdChain IQ!**

</div>

---

## 📌 Introduction

ColdChain IQ is a cold-chain monitoring project focused on shipment visibility, temperature and humidity monitoring, risk assessment, and IoT integration.

We welcome contributions from developers, students, designers, and anyone interested in improving the project.

This guide explains how to contribute, report issues, suggest improvements, and submit changes.

---

## 🌟 Ways to Contribute

There are several ways to help improve ColdChain IQ:

- **Bug Reports:** Identify and report errors or unexpected behavior.
- **Feature Suggestions:** Recommend useful features and improvements.
- **Frontend Development:** Improve dashboard components, layouts, and responsiveness.
- **Backend Development:** Improve API endpoints, data processing, and risk assessment.
- **IoT Integration:** Help improve ESP32 firmware, sensor communication, and MQTT functionality.
- **Documentation:** Improve setup instructions, explanations, and project documentation.
- **UI/UX Design:** Suggest improvements to usability, accessibility, and visual presentation.
- **Testing:** Help identify problems and verify functionality.

---

## 🚀 Getting Started

Before contributing, make sure you have:

- A GitHub account.
- Git installed on your computer.
- Visual Studio Code or another code editor.
- Node.js 18 or newer.
- Python 3.10 or newer.

For optional hardware and infrastructure contributions, you may also need Docker Desktop, Arduino IDE, and compatible ESP32 sensors.

### 1. Fork the Repository

Fork the ColdChain IQ repository to your own GitHub account.

### 2. Clone Your Fork

Open your terminal:

```bash
git clone https://github.com/YOUR-USERNAME/ColdChain-IQ.git
```

Navigate to the project directory:

```bash
cd ColdChain-IQ
```

### 3. Create a Branch

Create a separate branch for your contribution:

```bash
git checkout -b feature/your-feature-name
```

Examples:

```bash
git checkout -b feature/shipment-alerts
```

```bash
git checkout -b fix/dashboard-layout
```

```bash
git checkout -b docs/update-readme
```

### 4. Set Up the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Set Up the Backend

Open another terminal in the project root:

```bash
cd backend
python -m venv .venv
```

Activate the environment.

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

**macOS / Linux:**

```bash
source .venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn app.main:app --reload --port 8000
```

### 6. Make Your Changes

Work on your selected feature, improvement, or fix.

Keep your changes focused and follow the project's coding and documentation guidelines.

### 7. Commit Your Changes

Use a clear and descriptive commit message:

```bash
git add .
git commit -m "feat: add shipment monitoring improvements"
```

### 8. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 9. Submit a Pull Request

Visit your fork on GitHub and open a Pull Request to the original ColdChain IQ repository.

Explain what you changed and why the contribution would be useful.

---

## 📏 Contribution Guidelines

### General Guidelines

- Keep contributions relevant to ColdChain IQ.
- Write clean, readable, and maintainable code.
- Avoid unnecessary modifications to unrelated files.
- Test your changes before submitting.
- Follow the existing project structure.
- Provide clear descriptions of your changes.
- Be respectful when discussing suggestions and reviewing contributions.

### Frontend Guidelines

When working on the React frontend:

- Use reusable React components when appropriate.
- Keep component responsibilities clear.
- Use meaningful variable and function names.
- Maintain the existing visual design and layout consistency.
- Make sure the interface remains responsive.
- Avoid unnecessary dependencies.
- Keep animations smooth and purposeful.

### Backend Guidelines

When working on the FastAPI backend:

- Follow existing Python conventions.
- Use clear endpoint and function names.
- Validate incoming data.
- Handle errors properly.
- Keep business logic organized.
- Avoid exposing sensitive information.
- Document changes to API behavior when necessary.

### IoT and MQTT Guidelines

When working on ESP32 or MQTT components:

- Keep telemetry payloads consistent.
- Validate sensor readings before processing.
- Handle connection failures appropriately.
- Avoid hardcoding private credentials.
- Document required hardware and library dependencies.
- Test changes with simulated data whenever physical hardware is unavailable.

### Documentation Guidelines

When updating documentation:

- Use simple and understandable language.
- Keep headings and formatting consistent.
- Verify links and commands.
- Use accurate descriptions of implemented features.
- Update project structure when files are added or removed.
- Keep screenshots and image paths correct.

---

## 🧪 Testing Your Changes

Before submitting a contribution, test the relevant parts of the project.

### Frontend

```bash
cd frontend
npm install
npm run build
```

### Backend

```bash
cd backend
python -m compileall app
```

If you modify API endpoints, check the interactive documentation:

```text
http://localhost:8000/docs
```

For MQTT or ESP32 changes, verify that the device or test publisher sends valid telemetry and that the backend handles it correctly.

---

## 🐛 Reporting Bugs

If you discover a bug, open an Issue in the GitHub repository.

Include the following information when possible:

1. **Title:** A short description of the issue.
2. **Description:** Explain what happened.
3. **Steps to Reproduce:** Provide the steps needed to reproduce the issue.
4. **Expected Behavior:** Describe what should happen.
5. **Actual Behavior:** Explain what happened instead.
6. **Environment:** Include your operating system, browser, or relevant software versions.
7. **Screenshots or Logs:** Attach useful evidence when available.

Please avoid including private credentials, API keys, or sensitive information.

---

## 💡 Suggesting Improvements

Have an idea that could make ColdChain IQ better?

We welcome suggestions related to:

- Shipment monitoring and visibility.
- Temperature and humidity tracking.
- Risk assessment and shelf-life estimation.
- Dashboard analytics and reports.
- IoT devices and sensor integration.
- MQTT communication.
- User experience and accessibility.
- Security and system performance.

Open a GitHub Issue and explain the problem your suggestion addresses and how it could improve the project.

---

## 🔀 Pull Request Guidelines

Before submitting a Pull Request, make sure:

- Your changes are relevant to the project.
- Your branch is based on the latest appropriate version of the repository.
- Your code follows the existing conventions.
- You have tested the changes.
- You have updated documentation when necessary.
- You have not included credentials or unrelated files.
- Your Pull Request clearly explains the changes.

Keep Pull Requests focused. Smaller, well-explained contributions are easier to review.

---

## 🔐 Security Guidelines

Security is important, especially for systems that process shipment and sensor information.

Please follow these practices:

- Never commit API keys, passwords, Wi-Fi credentials, or MQTT credentials.
- Use environment variables for sensitive configuration.
- Do not expose private information in logs or screenshots.
- Validate incoming telemetry data.
- Avoid introducing unnecessary security risks.
- Report potential vulnerabilities privately to the project maintainer rather than publicly disclosing sensitive details.

---

## 🤝 Code of Conduct

We want ColdChain IQ to remain a welcoming and collaborative project.

All contributors are expected to:

- Treat others with respect.
- Welcome constructive feedback.
- Respect different opinions and ideas.
- Avoid harassment and discriminatory behavior.
- Keep discussions professional and productive.
- Help create a positive learning and development environment.

---

## 📄 License

By contributing to ColdChain IQ, you agree that your contributions will be licensed under the project's **MIT License**.

Make sure that any code, images, or other materials you submit are your own or that you have permission to contribute them.

See the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2563EB,50:0891B2,100:0F172A&height=120&section=footer&animation=fadeIn" width="100%" />

**Thank you for contributing to ColdChain IQ!**

<sub>Monitor smarter. Collaborate better. Keep shipments safe.</sub>

</div>

