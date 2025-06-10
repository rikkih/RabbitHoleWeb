# Rabbithole Frontend

![rabbithole-sillhouette.jpg](assets/rabbithole-sillhouette.jpg)

---

## Overview

Rabbithole Frontend is a **React + TypeScript** web application providing a modern UI for the Rabbithole chat backend. It offers:

- Secure authentication and protected routes (custom OAuth2/Auth0 integration)  
- Real-time chat interface with WebSocket support using STOMP over SockJS  
- Chat management components including message lists, input, and chat titles  
- User directory and profile features  
- Modular architecture with hooks, context, and API service layers  
- Built with Vite for fast development and optimized builds

---

## Getting Started

### Prerequisites

- Node.js (>=16 recommended)  
- npm (comes with Node.js)  

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/hoderick/rabbithole-frontend.git
cd rabbithole-frontend
npm install
```

### Running the App

Start the development server on http://localhost:5173:

```bash
npm run dev
```

### Related Projects
- **Rabbithole Backend** — [github.com/hoderick/rabbithole](https://github.com/rikkih/rabbithole)  
  Infrastructure as Code and deployment automation.

- **Rabbithole Infrastructure** — [github.com/hoderick/rabbithole-infra](https://github.com/rikkih/RabbitHoleInfra)  
  Infrastructure as Code and deployment automation.
