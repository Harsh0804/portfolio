// ─────────────────────────────────────────────────────────────
// Edit this file to update your portfolio. No other file needs
// to change for new jobs, projects, skills or certifications.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Harsh Singh",
  role: "Cloud & Data Center Operations Engineer",
  location: "Mumbai, India",
  email: "harsh.r.singh@outlook.com",
  github: "harsh0804", // used for the live repositories section
  linkedin: "https://linkedin.com/in/harsh-singh08",
  intro:
    "I run infrastructure end to end: racking and cabling physical servers, configuring storage and backup, and building the Proxmox private cloud and automation that sit on top of it.",
  available: "Open to Cloud, DevOps and DC Ops roles",
};

// Each unit appears in the server rack at the top of the page.
// size = rack units (1 or 2). Click a unit to see its details.
export const rackUnits = [
  {
    id: "proxmox",
    label: "Proxmox VE cluster",
    size: 2,
    status: "ok",
    detail:
      "Three-node production cluster with quorum, live migration and Cloud-Init templates for Debian 12 and Ubuntu 22.04.",
  },
  {
    id: "network",
    label: "Network & VPN",
    size: 1,
    status: "ok",
    detail:
      "VLAN isolation per tenant, virtual bridges, NAT and firewall rules, and a WireGuard overlay between nodes.",
  },
  {
    id: "storage",
    label: "Storage server",
    size: 2,
    status: "ok",
    detail:
      "RAID arrays, LVM/ZFS volumes, NFS/SMB/iSCSI shares, and capacity planning for VM and application workloads.",
  },
  {
    id: "backup",
    label: "Backup server",
    size: 1,
    status: "busy",
    detail:
      "Scheduled VM and data backups, retention policies, and regular restore tests to prove disaster recovery works.",
  },
  {
    id: "services",
    label: "Server services",
    size: 1,
    status: "ok",
    detail:
      "DNS, DHCP, Apache/Nginx, MySQL/MariaDB and file services on Linux and Windows Server hosts.",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    size: 1,
    status: "ok",
    detail:
      "Grafana, Checkmk and Uptime Kuma dashboards and alerts for CPU, memory, disk I/O and service availability.",
  },
  {
    id: "aws",
    label: "AWS & Terraform",
    size: 1,
    status: "ok",
    detail:
      "EC2, S3, load balancers and security groups provisioned as code with Terraform.",
  },
  {
    id: "cicd",
    label: "CI/CD & containers",
    size: 1,
    status: "ok",
    detail:
      "Jenkins pipelines triggered by GitHub webhooks, building and shipping Docker containers.",
  },
  {
    id: "assets",
    label: "Asset management",
    size: 1,
    status: "ok",
    detail:
      "Snipe-IT deployed for two organizations on one Linux server, with isolated databases and Apache virtual hosts.",
  },
];

export const experience = [
  {
    title: "Cloud & Server Engineer",
    company: "Facts Online Pvt. Ltd.",
    period: "Oct 2025 – Present",
    place: "Mumbai",
    points: [
      "Run data center operations: rack-and-stack, structured cabling, rack space and power planning, and routine DC health checks.",
      "Install and configure physical servers: BIOS and firmware updates, RAID, out-of-band management, OS deployment and hardware fault replacement.",
      "Manage backup and storage servers, including retention policies, restore testing and capacity planning.",
      "Architect and operate a production Proxmox VE private cloud with zero-downtime live migrations.",
      "Design VLANs, bridges, NAT and firewall rules to keep each customer environment isolated.",
      "Automate order-to-VM delivery by integrating Paymenter, Convoy and the Proxmox API.",
      "Monitor the fleet with Grafana, Checkmk and Uptime Kuma, and script routine checks in Bash.",
    ],
  },
];

export const projects = [
  {
    name: "Production private cloud on Proxmox VE",
    summary:
      "A three-node cluster that takes a customer order and delivers a running VM with networking and an IP, without manual steps.",
    stack: ["Proxmox VE", "WireGuard", "Cloud-Init", "VLANs", "Paymenter", "Convoy"],
    link: "https://github.com/Harsh0804/Production-Cloud-Project-using-PROXMOX",
    points: [
      "Switched inter-node traffic to an encrypted WireGuard overlay when the provider blocked GRE.",
      "Per-customer VLAN isolation with NAT, IP forwarding and stateful firewall rules.",
      "Reusable Cloud-Init templates for one-click Debian and Ubuntu deployments.",
    ],
  },
  {
    name: "AWS infrastructure and CI/CD pipeline",
    summary:
      "Infrastructure as code on AWS with automated build, test and deploy on every push.",
    stack: ["AWS EC2", "Terraform", "Docker", "Jenkins", "ALB"],
    link: "",
    points: [
      "EC2, networking, security groups and an Application Load Balancer defined in Terraform.",
      "Separate Jenkins pipelines for frontend and backend, triggered by GitHub webhooks.",
    ],
  },
  {
    name: "Smart agriculture monitoring (research)",
    summary:
      "Live soil moisture, temperature and humidity readings from a Raspberry Pi, streamed to the cloud. Published in IJAMRED, Vol. 2, Issue 1.",
    stack: ["AWS IoT Core", "MQTT", "Raspberry Pi", "MySQL", "S3"],
    link: "",
    points: [
      "MQTT pipeline into AWS IoT Core with threshold-based alerts.",
      "MySQL-backed dashboard for live visualization.",
    ],
  },
];

export const skills = [
  { group: "Data center", items: ["Rack-and-stack", "Structured cabling", "Server hardware", "Firmware & BIOS", "Out-of-band management", "Hardware troubleshooting"] },
  { group: "Storage & backup", items: ["RAID", "LVM / ZFS", "NFS / SMB / iSCSI", "Backup scheduling", "Restore testing", "Disaster recovery"] },
  { group: "Virtualization", items: ["Proxmox VE", "VMware vSphere", "vCenter", "Cloud-Init", "Live migration"] },
  { group: "Cloud & DevOps", items: ["AWS EC2 / S3 / IoT Core", "Terraform", "Docker", "Jenkins", "Git / GitHub"] },
  { group: "Networking", items: ["VLANs", "NAT & routing", "Firewalls", "WireGuard VPN", "DNS / DHCP", "IPAM"] },
  { group: "Systems & monitoring", items: ["Ubuntu / Debian / CentOS", "Windows Server", "Bash", "Grafana", "Checkmk", "Uptime Kuma"] },
];

export const education = [
  { degree: "M.Sc. Information Technology – Cloud Computing", school: "University of Mumbai, UDIT", period: "2024 – 2026", note: "CGPA 9.02" },
  { degree: "B.Sc. Information Technology", school: "Sahyog College of IT and Management", period: "2024", note: "CGPA 9.60, academic topper and Student of the Year 2023–24" },
  { degree: "Diploma in Computer Engineering", school: "Muchhala Polytechnic, MSBTE", period: "2021", note: "83.52%" },
];

export const certifications = [
  "AWS Certified Cloud Practitioner",
  "DevOps with Docker, Kubernetes and CI/CD (Tutedude)",
  "Python and SQL (HackerRank)",
  "Python and AI Bootcamp (Devtown)",
];

export const achievements = [
  "Top 12 nationwide at the VJTI National Hackathon, out of 500+ teams",
  "Top 5 at NASA Space Apps Challenge, Mumbai, 2020",
  "Deployed VMware vCenter with Active Directory integration in a single-PC lab",
];
