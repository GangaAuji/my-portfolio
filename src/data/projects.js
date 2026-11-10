/**
 * Portfolio projects.
 * Set github or liveDemo to "" to hide the corresponding button.
 */
export const projects = [
  {
    id: "timetable",
    title: "Smart Timetable & Attendance Management System",
    description:
      "Production-style academic operations platform covering timetable generation, faculty availability, proxy handling, student views, and administrative controls. Built as a multi-role web application with authentication, CSRF protection, and MySQL persistence.",
    technologies: ["Python", "Flask", "MySQL", "WTForms", "Linux"],
    category: "Platform Engineering",
    github: "https://github.com/GangaAuji/TimetableManagement",
    liveDemo: "",
    featured: true,
  },
  {
    id: "personal-cicd",
    title: "Personal Website CI/CD & Infrastructure Automation",
    description:
      "Automated the path from source control to a running website using AWS deployment services and Infrastructure as Code. The goal was a repeatable pipeline rather than a manual, host-by-host release.",
    technologies: ["AWS", "CI/CD", "CloudFormation", "CodePipeline", "S3"],
    category: "DevOps / IaC",
    github: "",
    liveDemo: "",
    featured: true,
  },
  {
    id: "cicd-web-deploy",
    title: "CI/CD Pipeline for Web Deployment",
    description:
      "Automated web deployment using IAM, S3, CodeCommit, CodeBuild, and CodeDeploy so application updates could move through a controlled AWS pipeline.",
    technologies: ["AWS", "IAM", "S3", "CodeCommit", "CodeBuild", "CodeDeploy"],
    category: "CI/CD",
    github: "https://github.com/GangaAuji/Mobile_LandingPage",
    liveDemo: "",
    featured: false,
  },
  {
    id: "financial-cicd",
    title: "Financial App CI/CD",
    description:
      "CI/CD-oriented web application repository used to practice automated build and release workflows for application delivery.",
    technologies: ["CI/CD", "AWS", "Git"],
    category: "CI/CD",
    github: "https://github.com/GangaAuji/Financial-AppCICD",
    liveDemo: "",
    featured: false,
  },
];
