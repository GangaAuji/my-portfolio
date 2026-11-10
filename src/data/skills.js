/**
 * Technical skills grouped by category.
 * Add a skill by appending to the relevant `items` array.
 * `icon` maps to keys in src/components/TechIcon.jsx.
 */
export const skillGroups = [
  {
    id: "cloud",
    title: "Cloud / AWS",
    items: [
      { name: "AWS", icon: "aws" },
      { name: "EC2", icon: "aws" },
      { name: "S3", icon: "aws" },
      { name: "RDS", icon: "database" },
      { name: "IAM", icon: "shield" },
      { name: "Elastic Load Balancing", icon: "network" },
      { name: "Auto Scaling", icon: "cloud" },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD",
    items: [
      { name: "AWS CodePipeline", icon: "pipeline" },
      { name: "CodeBuild", icon: "build" },
      { name: "CodeDeploy", icon: "rocket" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "Git", icon: "git" },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    items: [
      { name: "Terraform", icon: "terraform" },
      { name: "CloudFormation", icon: "aws" },
    ],
  },
  {
    id: "hosting",
    title: "Web & Hosting",
    items: [
      { name: "Linux", icon: "linux" },
      { name: "Ubuntu", icon: "ubuntu" },
      { name: "GitHub", icon: "github" },
    ],
  },
  {
    id: "security",
    title: "Security & Networking",
    items: [
      { name: "IAM", icon: "shield" },
      { name: "Load Balancing", icon: "network" },
      { name: "Server Hardening", icon: "lock" },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring & Observability",
    items: [
      { name: "Monitoring & Alerting", icon: "monitor" },
      { name: "Automated Backups", icon: "backup" },
      { name: "Incident Response", icon: "alert" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    items: [
      { name: "RDS", icon: "database" },
      { name: "SQL", icon: "database" },
      { name: "MySQL", icon: "database" },
    ],
  },
  {
    id: "scripting",
    title: "Scripting & Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "Shell", icon: "terminal" },
      { name: "Git", icon: "git" },
    ],
  },
];
