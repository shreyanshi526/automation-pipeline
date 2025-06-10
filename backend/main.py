from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def build_adjacency_list(nodes, edges):
    adjacency_list = {node["id"]: [] for node in nodes}
    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        adjacency_list[source].append(target)
    return adjacency_list


def is_dag(num_nodes, adjacency_list):
    visited = set()
    recursion_stack = set()

    def dfs(current_node):
        visited.add(current_node)
        recursion_stack.add(current_node)

        for neighbor in adjacency_list.get(current_node, []):
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in recursion_stack:
                return True  # Cycle found

        recursion_stack.remove(current_node)
        return False

    for node in adjacency_list:
        if node not in visited:
            if dfs(node):
                return False  # Not a DAG

    return True  # No cycles found


@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    adjacency_list = build_adjacency_list(nodes, edges)
    is_dag_flag = is_dag(num_nodes, adjacency_list)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_flag
    }
