// Pathfinder utilidades para grids voxel
import * as THREE from 'three';

export type Cell = { x: number; z: number };

export const DIRS: [number, number][] = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
	[1, -1],
	[-1, 1],
	[1, 1],
	[-1, -1]
];

export function astar(start: Cell, goal: Cell, grid: boolean[][], canWalk: (x: number, z: number) => boolean): Cell[] | null {
	const width = grid.length;
	const height = grid[0].length;
	const key = (x: number, z: number) => `${x},${z}`;
	const heuristic = (a: Cell, b: Cell) => Math.abs(a.x - b.x) + Math.abs(a.z - b.z);
	const open: { x: number; z: number; f: number }[] = [];
	const closed = new Set<string>();
	const cameFrom = new Map<string, Cell>();
	const gScore = new Map<string, number>();
	const startKey = key(start.x, start.z);
	gScore.set(startKey, 0);
	open.push({ x: start.x, z: start.z, f: heuristic(start, goal) });
	while (open.length > 0) {
		open.sort((a, b) => a.f - b.f);
		const current = open.shift()!;
		const ck = key(current.x, current.z);
		if (current.x === goal.x && current.z === goal.z) {
			const path: Cell[] = [{ x: current.x, z: current.z }];
			let k = ck;
			while (cameFrom.has(k)) {
				const prev = cameFrom.get(k)!;
				path.push({ x: prev.x, z: prev.z });
				k = key(prev.x, prev.z);
			}
			return path.reverse();
		}
		closed.add(ck);
		for (const [dx, dz] of DIRS) {
			const nx = current.x + dx;
			const nz = current.z + dz;
			if (nx < 0 || nz < 0 || nx >= width || nz >= height) continue;
			if (!canWalk(nx, nz)) continue;
			const nk = key(nx, nz);
			if (closed.has(nk)) continue;
			const currentG = gScore.get(ck) ?? Infinity;
			const tentativeG = currentG + 1;
			const neighborG = gScore.get(nk) ?? Infinity;
			if (tentativeG < neighborG) {
				cameFrom.set(nk, { x: current.x, z: current.z });
				gScore.set(nk, tentativeG);
				const f = tentativeG + heuristic({ x: nx, z: nz }, goal);
				const existing = open.find((n) => n.x === nx && n.z === nz);
				if (existing) {
					existing.f = f;
				} else {
					open.push({ x: nx, z: nz, f });
				}
			}
		}
	}
	return null; // sin camino
}
