// ─────────────────────────────────────────────────────────────
// All website content lives here. Edit this file to update the
// portfolio — no component needs to change.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Harsh Singh",
  role: "Cloud, DevOps & Data Center Operations Engineer",
  location: "Mumbai, India",
  email: "harsh.r.singh@outlook.com",
  github: "https://github.com/harsh0804",
  linkedin: "https://linkedin.com/in/harsh-singh08",
  status: "Open to Cloud, DevOps, SRE and DC Ops roles",
  intro:
    "I run infrastructure end to end: racking and cabling physical servers, configuring storage and backup, and building the Proxmox private cloud and automation that sit on top of it.",
  about: [
    "I work where hardware meets the cloud. On a normal day that means racking a server, setting up RAID and out-of-band management, then turning it into capacity on a production Proxmox VE cluster that customers buy through a fully automated pipeline.",
    "I care about the boring things that keep systems up: isolated networks, tested backups, clear documentation and monitoring that catches problems before users do.",
  ],
  focus: ["Private cloud", "Data center ops", "Automation", "Monitoring"],
};

// Small dashboard tiles in the hero. Keep these factual.
export const metrics = [
  { label: "Proxmox nodes in production", value: 3, suffix: "" },
  { label: "Organizations on Snipe-IT", value: 2, suffix: "" },
  { label: "Infrastructure projects", value: 3, suffix: "" },
  { label: "Certifications", value: 4, suffix: "" },
];

// The interactive server rack in the hero. size = rack units (1 or 2).
export type RackUnit = {
  id: string;
  label: string;
  size: 1 | 2;
  status: "ok" | "busy";
  detail: string;
  tags: string[];
};

export const rackUnits: RackUnit[] = [
  { id: "proxmox", label: "Proxmox VE cluster", size: 2, status: "ok", detail: "Three-node production cluster with quorum, zero-downtime live migration and Cloud-Init templates for Debian 12 and Ubuntu 22.04.", tags: ["Proxmox VE", "Cloud-Init", "HA"] },
  { id: "network", label: "Network & VPN", size: 1, status: "ok", detail: "Per-tenant VLAN isolation, virtual bridges, NAT and firewall rules, plus an encrypted WireGuard overlay between nodes.", tags: ["VLAN", "NAT", "WireGuard"] },
  { id: "storage", label: "Storage server", size: 2, status: "ok", detail: "RAID arrays, LVM/ZFS volumes and NFS/SMB/iSCSI shares, with capacity planning for VM and application workloads.", tags: ["RAID", "ZFS", "iSCSI"] },
  { id: "backup", label: "Backup server", size: 1, status: "busy", detail: "Scheduled VM and data backups, retention policies and regular restore tests that prove disaster recovery works.", tags: ["Backups", "DR", "Retention"] },
  { id: "services", label: "Server services", size: 1, status: "ok", detail: "DNS, DHCP, Apache/Nginx, MySQL/MariaDB and file services on Linux and Windows Server hosts.", tags: ["DNS", "DHCP", "Apache"] },
  { id: "monitoring", label: "Monitoring", size: 1, status: "ok", detail: "Grafana, Checkmk and Uptime Kuma dashboards and alerts for CPU, memory, disk I/O and service availability.", tags: ["Grafana", "Checkmk", "Uptime Kuma"] },
  { id: "aws", label: "AWS & Terraform", size: 1, status: "ok", detail: "EC2, networking and security groups on AWS, provisioned as code with Terraform.", tags: ["AWS", "Terraform", "IaC"] },
  { id: "cicd", label: "CI/CD & containers", size: 1, status: "ok", detail: "Jenkins pipelines triggered by GitHub webhooks, building and shipping Docker containers.", tags: ["Jenkins", "Docker", "GitHub"] },
  { id: "assets", label: "Asset management", size: 1, status: "ok", detail: "Snipe-IT deployed for two organizations on one Linux server, with isolated databases and Apache virtual hosts.", tags: ["Snipe-IT", "LAMP", "Inventory"] },
];

// Skills: level (0–100) is a self-rating used by the radar chart.
export const skillGroups = [
  { id: "dc", name: "Data center", level: 88, items: ["Rack-and-stack", "Structured cabling", "Server hardware", "Firmware & BIOS", "Out-of-band mgmt", "HW troubleshooting"] },
  { id: "storage", name: "Storage & backup", level: 80, items: ["RAID", "LVM / ZFS", "NFS / SMB / iSCSI", "Backup scheduling", "Restore testing", "Disaster recovery"] },
  { id: "virt", name: "Virtualization", level: 90, items: ["Proxmox VE", "VMware vSphere", "vCenter", "Cloud-Init", "Live migration"] },
  { id: "cloud", name: "Cloud & DevOps", level: 72, items: ["AWS EC2 / S3", "Terraform", "Docker", "Jenkins", "Git / GitHub"] },
  { id: "net", name: "Networking", level: 82, items: ["VLANs", "NAT & routing", "Firewalls", "WireGuard", "DNS / DHCP", "IPAM"] },
  { id: "ops", name: "Systems & monitoring", level: 85, items: ["Ubuntu / Debian", "Windows Server", "Bash", "Grafana", "Checkmk", "Uptime Kuma"] },
];

// Timeline runs from oldest to newest.
export const timeline = [
  { period: "2021", title: "Diploma in Computer Engineering", org: "Muchhala Polytechnic, MSBTE", kind: "education", note: "Scored 83.52%.", points: [] as string[] },
  { period: "2024", title: "B.Sc. Information Technology", org: "Sahyog College of IT and Management", kind: "education", note: "CGPA 9.60. Academic topper and Student of the Year 2023–24.", points: [] as string[] },
  { period: "2024 – 2026", title: "M.Sc. Information Technology, Cloud Computing", org: "University of Mumbai, UDIT", kind: "education", note: "CGPA 9.02. Thesis on a cloud-based smart agriculture monitoring system.", points: [] as string[] },
  {
    period: "Oct 2025 – Present",
    title: "Cloud & Server Engineer",
    org: "Facts Online Pvt. Ltd., Mumbai",
    kind: "work",
    note: "Running the data center and the private cloud on top of it.",
    points: [
      "Rack-and-stack, structured cabling, rack space and power planning, and routine DC health checks.",
      "Physical server setup: BIOS and firmware, RAID, out-of-band management, OS deployment and part replacement.",
      "Backup and storage servers with retention policies, restore testing and capacity planning.",
      "Production Proxmox VE cloud with zero-downtime live migrations and per-tenant network isolation.",
      "Order-to-VM automation with Paymenter, Convoy and the Proxmox API.",
      "Monitoring with Grafana, Checkmk and Uptime Kuma, and routine checks scripted in Bash.",
    ],
  },
];

export type Project = {
  name: string;
  category: "Private cloud" | "DevOps" | "IoT";
  summary: string;
  stack: string[];
  points: string[];
  link?: string;
  preview: "cluster" | "pipeline" | "sensor";
};

export const projects: Project[] = [
  {
    name: "Production private cloud on Proxmox VE",
    category: "Private cloud",
    summary: "A three-node cluster that turns a customer order into a running VM with networking and an IP, without manual steps.",
    stack: ["Proxmox VE", "WireGuard", "Cloud-Init", "VLANs", "Paymenter", "Convoy"],
    points: [
      "Moved inter-node traffic to an encrypted WireGuard overlay when the provider blocked GRE.",
      "Per-customer VLAN isolation with NAT, IP forwarding and stateful firewall rules.",
      "Reusable Cloud-Init templates for one-click Debian and Ubuntu deployments.",
    ],
    link: "https://github.com/Harsh0804/Production-Cloud-Project-using-PROXMOX",
    preview: "cluster",
  },
  {
    name: "DevOps project on AWS (Tutedude)",
    category: "DevOps",
    summary: "Capstone from the Tutedude DevOps course: an application deployed on AWS with infrastructure as code and an automated CI/CD pipeline.",
    stack: ["AWS EC2", "Terraform", "Docker", "Jenkins", "GitHub webhooks"],
    points: [
      "Provisioned EC2, networking and security groups with Terraform.",
      "Jenkins pipelines for frontend and backend, triggered by GitHub webhooks.",
      "Services containerized with Docker for consistent deployments.",
    ],
    preview: "pipeline",
  },
  {
    name: "Smart agriculture monitoring",
    category: "IoT",
    summary: "Soil moisture, temperature and humidity streamed live from a Raspberry Pi to AWS. Published in IJAMRED, Vol. 2, Issue 1.",
    stack: ["AWS IoT Core", "MQTT", "Raspberry Pi", "MySQL", "S3"],
    points: [
      "MQTT pipeline into AWS IoT Core with threshold-based alerts.",
      "MySQL-backed dashboard for live visualization.",
    ],
    preview: "sensor",
  },
];

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", code: "AWS", covers: ["Core AWS services", "Security & compliance", "Billing & pricing"] },
  { name: "DevOps with Docker, Kubernetes and CI/CD", issuer: "Tutedude", code: "K8s", covers: ["Docker", "Kubernetes", "CI/CD pipelines"] },
  { name: "Python and SQL", issuer: "HackerRank", code: "SQL", covers: ["Python", "SQL queries"] },
  { name: "Python and AI Bootcamp", issuer: "Devtown", code: "AI", covers: ["Python", "Applied AI basics"] },
];

export const achievements = [
  { level: "critical", tag: "Hackathon", title: "Top 12 nationwide at the VJTI National Hackathon", detail: "Out of 500+ competing teams." },
  { level: "high", tag: "NASA Space Apps 2020", title: "Top 5 at NASA Space Apps Challenge, Mumbai", detail: "Local round of the global challenge." },
  { level: "info", tag: "Research", title: "Co-authored paper published in IJAMRED", detail: "Volume 2, Issue 1, on cloud-based smart agriculture monitoring." },
  { level: "info", tag: "Lab", title: "VMware vCenter with Active Directory on a single PC", detail: "Recognized by faculty for technical initiative." },
] as const;

// Arcs drawn from Mumbai on the contact map (lon, lat).
export const mapLinks = [
  { name: "Mumbai", coords: [72.88, 19.08] as [number, number] },
  { name: "Frankfurt", coords: [8.68, 50.11] as [number, number] },
  { name: "Singapore", coords: [103.82, 1.35] as [number, number] },
  { name: "N. Virginia", coords: [-77.5, 38.9] as [number, number] },
  { name: "Dubai", coords: [55.27, 25.2] as [number, number] },
  { name: "Tokyo", coords: [139.69, 35.68] as [number, number] },
];
