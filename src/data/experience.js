/**
 * Professional experience.
 * Add a new role by appending an object to this array.
 *
 * Dates use YYYY-MM. Leave startDate/endDate empty if unknown.
 * The UI hides missing company or date fields instead of inventing them.
 */
export const experience = [
  {
    id: "linux-server-admin",
    role: "Linux Server Administrator",
    company: "",
    location: "Mumbai Metropolitan Region, India",
    startDate: "",
    endDate: "",
    current: true,
    description:
      "Own production Linux infrastructure for client websites and hosting environments — servers, domains, deployments, backups, and incident response.",
    achievements: [
      "Operate and maintain 15+ client environments in production",
      "Support 250+ client websites across hosted infrastructure",
      "Administer 15 Ubuntu servers used for live workloads",
      "Manage 200+ client domains",
      "Implemented CI/CD so deployments dropped from 2–3 hours to approximately 30 minutes",
      "Handle production incident resolution, automated backups, and monitoring/alerting",
    ],
    technologies: ["Linux", "Ubuntu", "AWS", "CI/CD", "Git"],
  },
  {
    id: "magic-bus-aws-restart",
    role: "AWS re/Start Program Intern",
    company: "Magic Bus India Foundation",
    location: "Thane, Maharashtra, India",
    startDate: "2024-09",
    endDate: "2024-12",
    current: false,
    description:
      "Hands-on AWS infrastructure, CI/CD, and cloud operations training applied to real deployment workflows.",
    achievements: [
      "Designed and deployed scalable architecture using EC2, S3, and RDS",
      "Automated deployment workflows using AWS CodePipeline and CodeBuild",
      "Configured auto-scaling groups with load balancers to optimize system performance",
    ],
    technologies: ["AWS", "EC2", "S3", "RDS", "CodePipeline", "CodeBuild", "Auto Scaling"],
  },
];
