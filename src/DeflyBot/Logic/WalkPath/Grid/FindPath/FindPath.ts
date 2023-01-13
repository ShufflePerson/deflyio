import Vector2 from './../../../Math/Vector2/Vector2';

export function findPath(start: Vector2, end: Vector2): Vector2[] | undefined {
    // Create a set to store the visited points
    const visited = new Set<string>();

    // Create a queue to store the points to visit
    const queue = [start];

    // Create a map to store the paths
    const paths = new Map<string, Vector2[]>();

    // Perform a breadth-first search
    while (queue.length > 0) {
        const point: Vector2 = queue.shift() as Vector2;
        if (!point) continue;

        // If the point is the end point, return the path
        if (point.x === end.x && point.y === end.y) {
            return paths.get(point.toString());
        }

        // Add the point's neighbors to the queue if they haven't been visited
        const neighbors = [
            new Vector2(point.x - 1, point.y),
            new Vector2(point.x + 1, point.y),
            new Vector2(point.x, point.y - 1),
            new Vector2(point.x, point.y + 1),
        ];
        for (const neighbor of neighbors) {
            if (
                neighbor.x >= 0 &&
                neighbor.x < 10 &&
                neighbor.y >= 0 &&
                neighbor.y < 10 &&
                !visited.has(neighbor.toString())
            ) {
                visited.add(neighbor.toString());
                queue.push(neighbor);

                // Initialize the path for the neighbor if it hasn't been visited before
                if (!paths.has(neighbor.toString())) {
                    paths.set(neighbor.toString(), []);
                }

                // Add the neighbor to the path for the point
                paths.set(
                    neighbor.toString(),
                    (paths.get(point.toString()) || [new Vector2(0, 0)]).concat(neighbor)
                );
            }
        }
    }

    // If the end point was not reached, return an empty path
    return [];
}