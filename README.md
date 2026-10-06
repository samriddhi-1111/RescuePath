# RescuePath

**Disaster Rescue Path Planning System**

## 1. Project Overview

RescuePath is a graph-based disaster rescue route planning system designed as an MCA Data Structures and Algorithms (DAA) mini-project. It models disaster-stricken areas as a mathematical graph where:
- Locations (Hospitals, Shelters, Disaster Zones) are graph vertices.
- Roads connecting them are graph edges.
- Roads have multiple weights, such as distance and risk level.
- Blocked roads represent dynamically unavailable routes.

Using established DAA algorithms, the system calculates optimal rescue routes, analyzes shortest paths, and constructs minimum-cost emergency networks to coordinate disaster relief.

---

## 2. Problem Statement

During natural disasters (like earthquakes or floods), emergency response teams face extreme logistical challenges:
- Roads may be unexpectedly blocked or destroyed.
- Safe routes may not be the shortest routes due to high risk (e.g., flooding, debris).
- Emergency facilities (like hospitals and shelters) are distributed unevenly across a road network.
- The road network can change dynamically, rendering pre-planned routes useless.

This project solves the problem of finding efficient and safe emergency routes dynamically by applying graph theory and shortest-path algorithms to a simulated disaster road network.

---

## 3. Objectives

- Model disaster areas and road networks as weighted undirected graphs.
- Find optimal emergency routes based on different constraints (fastest vs. safest).
- Handle dynamic graph updates, such as blocked roads.
- Perform graph traversal to evaluate reachable zones.
- Construct minimum-cost emergency networks to restore critical infrastructure.
- Demonstrate the real-world application of core DAA algorithms (Dijkstra, BFS, Kruskal).
- Visualize algorithm results and dynamic graph states through an interactive web interface.

---

## 4. Key Features

- **Interactive Disaster Graph**: A dynamic road network modeling various locations and road conditions.
- **Route Planner**: Calculates optimal paths between any two locations.
  - **Fastest Route**: Minimizes total distance.
  - **Safest Route**: Minimizes total risk.
  - **Balanced Route**: Optimizes for a combination of distance and risk.
- **Disaster Simulation**: Dynamically updates the graph (e.g., Flood, Earthquake) modifying road statuses to 'Blocked' or increasing risk levels.
- **Emergency Facility Search**: Finds the nearest hospital or shelter from a disaster zone.
- **Resource Optimizer**: Uses the 0/1 Knapsack dynamic programming algorithm to optimize vehicle loadouts based on weight capacity and rescue points.
- **Algorithm Implementations**: Includes custom implementations of Dijkstra, BFS, Kruskal, and 0/1 Knapsack.
- **Minimum Spanning Tree (MST)**: Constructs a minimum-cost emergency network connecting all safe zones.

---

## 5. DAA Algorithms

### Dijkstra's Algorithm
- **Purpose**: Finds the shortest or optimal route between a source and destination in a weighted graph.
- **Implementation**: Used for the Route Planner (fastest/safest/balanced) and Nearest Facility search. It utilizes a Priority Queue (Min-Heap) to efficiently fetch the next closest node, completely ignoring edges marked as "Blocked".
- **Complexity**: `O((V + E) log V)`

### Breadth-First Search (BFS)
- **Purpose**: Explores the graph layer by layer to find the path with the minimum number of hops (edges), regardless of physical distance.
- **Implementation**: Uses a standard Queue and a visited Set. It is useful for finding the nearest facility by simply counting the number of road segments rather than exact distance.
- **Complexity**: `O(V + E)`

### Kruskal's Algorithm
- **Purpose**: Constructs a Minimum Spanning Tree (MST) to connect all reachable locations with the absolute minimum total road distance.
- **Implementation**: Sorts all open edges by weight (greedy strategy) and uses a Union-Find (Disjoint Set) data structure to detect and prevent cycles.
- **Complexity**: `O(E log E)`

### 0/1 Knapsack (Dynamic Programming)
- **Purpose**: Selects the optimal combination of emergency supplies to maximize rescue benefit without exceeding a vehicle's weight capacity.
- **Implementation**: Builds a 2D DP table to store maximum values for subproblems.
- **Complexity**: `O(N * W)` where N is number of items and W is capacity.

### Supporting Data Structures
- **Adjacency List**: Used to represent the road network in memory.
- **Queue**: Used in BFS for level-order traversal.
- **Set**: Used to track visited nodes and prevent infinite loops.
- **Min Priority Queue (Min Heap)**: Used in Dijkstra's algorithm.
- **Union-Find (Disjoint Set)**: Used in Kruskal's algorithm for cycle detection.

---

## 6. DAA Syllabus Mapping

| DAA Concept | RescuePath Usage |
|---|---|
| Graph | Disaster road network |
| Adjacency List | Graph representation |
| BFS | Graph traversal / hop-based analysis |
| Greedy Method | Dijkstra / Kruskal |
| Dynamic Programming | 0/1 Knapsack (Resource Optimizer) |
| Dijkstra | Optimal emergency route |
| Minimum Spanning Tree | Emergency network |
| Kruskal | Minimum-cost network |
| Heap / Priority Queue | Dijkstra |
| Union-Find | Kruskal cycle detection |
| Complexity Analysis | Algorithm performance |

---

## 7. System Architecture

```text
User
 ↓
React Frontend (Vite + Tailwind CSS)
 ↓
REST API
 ↓
Node.js + Express Backend
 ↓
Graph Data (In-Memory / Static JSON)
 ↓
DAA Algorithms (Dijkstra, BFS, Kruskal, DP)
 ↓
Result
 ↓
Frontend
```

**Note**: RescuePath does not use a persistent database. All graph and application data are stored in static JavaScript structures (`graphData.js`) and mutated in backend memory to simulate a dynamic environment during the server runtime.

---

## 8. Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- cors
- dotenv

### Algorithms
- Dijkstra
- BFS
- Kruskal
- 0/1 Knapsack
- Min Priority Queue
- Union-Find

---

## 9. Project Structure

```text
RescuePath/
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.css
│   └── vite.config.js
│
├── backend/
│   ├── algorithms/
│   │   ├── bfs.js
│   │   ├── dijkstra.js
│   │   ├── knapsack.js
│   │   ├── kruskal.js
│   │   ├── priorityQueue.js
│   │   └── unionFind.js
│   ├── data/
│   │   └── graphData.js
│   ├── routes/
│   │   └── algorithmRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 10. Installation Instructions

### Clone

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd RescuePath
```

### Backend Setup

```bash
cd backend
npm install
node server.js
```
*The backend server will start on port 5000 (or the port defined in environment variables).*

### Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```
*The frontend will be available at the local URL provided by Vite (usually `http://localhost:5173`).*

---

## 11. Environment Variables

No environment variables are strictly required for the current local version to function.

If you wish to configure the backend port, a `.env.example` file is provided in the `backend/` directory:
```text
PORT=5000
```
Copy it to `.env` to apply custom configurations.

---

## 12. API Documentation

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/graph` | Get the current graph (locations and roads) |
| POST | `/api/dijkstra` | Calculate optimal route (Fastest, Safest, Balanced) |
| POST | `/api/bfs` | Perform BFS for hop-based traversal |
| GET | `/api/kruskal` | Calculate Minimum Spanning Tree (MST) |
| POST | `/api/scenarios/load` | Load a specific disaster scenario |
| POST | `/api/road/status` | Update a specific road's status and risk |
| GET | `/api/statistics` | Get current graph statistics |
| POST | `/api/nearest-facility`| Find the nearest hospital/shelter |
| POST | `/api/knapsack` | Optimize resource loadout using DP |

**Example POST Request (`/api/dijkstra`):**
```json
{
  "source": "B",
  "destination": "C",
  "mode": "safest"
}
```

---

## 13. Complexity Analysis

| Algorithm | Time Complexity | Space Complexity |
|---|---|---|
| **BFS** | `O(V + E)` | `O(V)` |
| **Dijkstra** | `O((V + E) log V)` | `O(V)` |
| **Kruskal** | `O(E log E)` | `O(V)` |
| **0/1 Knapsack** | `O(N * W)` | `O(N * W)` |

*Where `V` is the number of vertices (locations), `E` is the number of edges (roads), `N` is the number of items, and `W` is the total weight capacity.*

---

## 14. Screenshots

### Dashboard
<!-- TODO: Add Dashboard screenshot -->
*Image placeholder: screenshots/dashboard.png*

### Route Planner
<!-- TODO: Add Route Planner screenshot -->
*Image placeholder: screenshots/route-planner.png*

### Algorithm Lab
<!-- TODO: Add Algorithm Lab screenshot -->
*Image placeholder: screenshots/algorithm-lab.png*

### Disaster Simulation
<!-- TODO: Add Disaster Simulation screenshot -->
*Image placeholder: screenshots/disaster-simulation.png*

---

## 15. Testing & Verification

A full functional and mathematical audit was performed on this system.
- Frontend Integration: PASS
- Backend Architecture: PASS
- API Functionality: PASS
- Dijkstra Algorithm Correctness: PASS
- BFS Algorithm Correctness: PASS
- Kruskal (MST) Algorithm Correctness: PASS
- Knapsack (DP) Algorithm Correctness: PASS
- Disaster Graph Mutation Simulation: PASS
- Error Handling & Input Validation: PASS

---

## 16. Limitations

- **Static Graph Data**: The application currently relies on an in-memory graph. Data modifications revert to default upon server restart.
- **No Database**: There is no persistent database attached.
- **No Authentication**: The application does not include user login or role-based access.
- **Educational Scope**: This project is an academic simulation intended for learning DAA concepts; it is not a production-ready emergency dispatch system.

---

## 17. Future Scope

- Integration with a persistent database (e.g., MongoDB, PostgreSQL).
- Real-time GIS and map visualization (e.g., Leaflet or Google Maps API).
- Live traffic and disaster data feeds.
- Role-based authentication (Admin vs. Field Responder).
- Advanced routing features considering real-time vehicular telemetry.

---

## 18. Author

**Author:** Samriddhi  
**Program:** MCA (Data Science)  
**Institution:** Chandigarh University  

---

## 19. License

This project is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for details.
