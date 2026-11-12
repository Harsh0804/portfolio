"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 46;
const PULSES = 36;
const DUST = 700;

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Topology() {
  const group = useRef<THREE.Group>(null);
  const pulseGeo = useRef<THREE.BufferGeometry>(null);
  const { pointer } = useThree();

  const { nodes, hubs, edges, linePositions } = useMemo(() => {
    const r = rand(42);
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = r() * Math.PI * 2;
      const phi = Math.acos(2 * r() - 1);
      const rad = 2.2 + r() * 2.2;
      nodes.push(new THREE.Vector3(rad * Math.sin(phi) * Math.cos(theta) * 1.6, rad * Math.cos(phi) * 0.75, rad * Math.sin(phi) * Math.sin(theta)));
    }
    const hubs = [0, 7, 15, 23, 31];
    const edges: [number, number][] = [];
    nodes.forEach((n, i) => {
      const nearest = nodes
        .map((m, j) => ({ j, d: n.distanceTo(m) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      nearest.forEach(({ j }) => {
        if (!edges.some(([a, b]) => (a === j && b === i) || (a === i && b === j))) edges.push([i, j]);
      });
    });
    hubs.forEach((h, k) => edges.push([h, hubs[(k + 1) % hubs.length]]));
    const linePositions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      linePositions.set([nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z], k * 6);
    });
    return { nodes, hubs, edges, linePositions };
  }, []);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => arr.set([n.x, n.y, n.z], i * 3));
    return arr;
  }, [nodes]);

  const hubPositions = useMemo(() => {
    const arr = new Float32Array(hubs.length * 3);
    hubs.forEach((h, i) => arr.set([nodes[h].x, nodes[h].y, nodes[h].z], i * 3));
    return arr;
  }, [hubs, nodes]);

  const pulses = useMemo(() => {
    const r = rand(7);
    return Array.from({ length: PULSES }, () => ({ edge: Math.floor(r() * edges.length), t: r(), speed: 0.15 + r() * 0.35 }));
  }, [edges.length]);
  const pulsePositions = useMemo(() => new Float32Array(PULSES * 3), []);

  const dust = useMemo(() => {
    const r = rand(99);
    const arr = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) arr.set([(r() - 0.5) * 30, (r() - 0.5) * 16, (r() - 0.5) * 18 - 4], i * 3);
    return arr;
  }, []);
  const dustRef = useRef<THREE.Points>(null);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const dot = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.85)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      g.rotation.y += delta * 0.04;
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * 0.18, 0.04);
      g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.x * 0.5, 0.04);
    }
    pulses.forEach((p, i) => {
      p.t += delta * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
      }
      const [a, b] = edges[p.edge];
      tmp.copy(nodes[a]).lerp(nodes[b], p.t);
      pulsePositions.set([tmp.x, tmp.y, tmp.z], i * 3);
    });
    if (pulseGeo.current) pulseGeo.current.attributes.position.needsUpdate = true;
    if (dustRef.current) dustRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} size={0.06} color="#7D5FFF" transparent opacity={0.55} depthWrite={false} />
      </points>
      <group ref={group}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#3b6bd6" transparent opacity={0.28} />
        </lineSegments>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial map={dot} size={0.16} color="#9fdcff" transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[hubPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial map={dot} size={0.42} color="#00D9FF" transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
        <points>
          <bufferGeometry ref={pulseGeo}>
            <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial map={dot} size={0.2} color="#00FFAA" transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
      </group>
    </>
  );
}

export default function NetworkScene() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
      <Topology />
    </Canvas>
  );
}
