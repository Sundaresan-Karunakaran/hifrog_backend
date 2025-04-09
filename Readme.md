## HiFrog Visualizer - Backend

This is the backend server for the HiFrog Visualizer project, built using Express.js. It acts as an interface between the frontend and the HiFrog verification tool.

#### Features

- Accepts user inputs (e.g., selected file, logic, claim, unwind bound)
- Runs the HiFrog tool with the given parameters
- Returns output for visualization
- Handles __summary operations (view, delete, etc.)
#### Getting Started

##### Prerequisites

- Node.js installed
- Docker container with hifrog installed (update the default container id I've used to yours)

##### Installation

1. Clone the repository:
```
git clone https://github.com/your-username/hifrog_backend.git

cd hifrog_backend
```
2. Install dependencies:

```
npm install
```

3. Start the server:
```
node server.js
```
The server will typically run on ```http://localhost:3000```. If it doesn't, make sure you change that on your frontend!! 

#### Frontend Integration

To use this backend with the visualizer interface, pair it with the frontend project:
👉 [HiFrog Visualizer – Frontend](https://github.com/Sundaresan-Karunakaran/hifrog_frontend)