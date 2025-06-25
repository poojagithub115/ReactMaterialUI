const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const jobDetails = [
    {
      id: 101,
      title: "Frontend Developer",
      company: {
        name: "TechNova Inc.",
        logo: "https://technova.com/wp-content/uploads/2025/05/logo2-55x55.jpg",
        location: "San Francisco, CA",
        website: "https://technova.com",
        images: {
          banner: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
          office: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9"
        }
      },
      description: `We are looking for a skilled Frontend Developer to join our dynamic team. 
  You will work on cutting-edge web applications using React and modern web technologies. 
  As part of a collaborative team, you’ll be responsible for turning designs into responsive and interactive interfaces. 
  We value clean code, reusable components, and performance optimization. 
  This is a great opportunity to grow your frontend skills in a fast-paced, remote-friendly environment.`,
      requirements: [
        "3+ years of experience with React",
        "Strong knowledge of JavaScript, HTML, CSS",
        "Familiarity with REST APIs and Git"
      ],
      responsibilities: [
        "Develop and maintain user-facing features",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with backend developers and designers"
      ],
      employmentType: "Full-Time",
      experienceLevel: "Mid-Level",
      salary: {
        min: 70000,
        max: 90000,
        currency: "USD",
        type: "Annual"
      },
      locationType: "Remote",
      postedDate: "2025-06-17T08:00:00Z",
      applicationDeadline: "2025-07-15T23:59:59Z",
      tags: ["React", "Frontend", "JavaScript", "Remote"],
      howToApply: "Send your resume to careers@technova.com or apply via our website.",
      status: "Open"
    },
    {
      id: 102,
      title: "Backend Engineer",
      company: {
        name: "CloudOps",
        logo: "https://robohash.org/technova?set=set3&size=100x100",
        location: "Austin, TX",
        website: "https://cloudops.io",
        images: {
          banner: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
          office: "https://images.unsplash.com/photo-1581090700227-1e8e5f58c167"
        }
      },
      description: `CloudOps is hiring a backend engineer to scale our microservices infrastructure. 
  You’ll work with a team of experienced engineers building APIs and scalable services. 
  We’re looking for someone who enjoys solving performance bottlenecks and writing clean, testable code. 
  You will also have the opportunity to work with cloud-native tools and DevOps best practices. 
  Join us to help build the backbone of our cloud platform.`,
      requirements: [
        "5+ years with Node.js or Go",
        "Experience with Docker and Kubernetes",
        "Knowledge of PostgreSQL and Redis"
      ],
      responsibilities: [
        "Develop RESTful APIs",
        "Maintain scalable backend services",
        "Collaborate with DevOps and QA teams"
      ],
      employmentType: "Full-Time",
      experienceLevel: "Senior",
      salary: {
        min: 90000,
        max: 120000,
        currency: "USD",
        type: "Annual"
      },
      locationType: "Hybrid",
      postedDate: "2025-06-10T09:00:00Z",
      applicationDeadline: "2025-07-01T23:59:59Z",
      tags: ["Node.js", "Backend", "Microservices", "DevOps"],
      howToApply: "Apply via careers@cloudops.io.",
      status: "Open"
    },
    {
      id: 103,
      title: "UI/UX Designer",
      company: {
        name: "PixelCraft",
        logo: "https://ui-avatars.com/api/?name=TechNova&background=0D8ABC&color=fff",
        location: "New York, NY",
        website: "https://pixelcraft.design",
        images: {
          banner: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
          office: "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
        }
      },
      description: `PixelCraft is seeking a UI/UX Designer passionate about clean, user-centered design. 
  You’ll craft intuitive interfaces for web and mobile applications, working closely with cross-functional teams. 
  This role is perfect for someone who enjoys turning complex problems into elegant solutions. 
  Expect to create wireframes, interactive prototypes, and iterate based on user feedback. 
  We value creativity, attention to detail, and empathy for the user experience.`,
      requirements: [
        "2+ years of experience in UI/UX design",
        "Strong portfolio showcasing web/app design",
        "Proficient in Figma, Adobe XD"
      ],
      responsibilities: [
        "Create wireframes and prototypes",
        "Work closely with product and engineering",
        "Improve UX across platforms"   
      ],
      employmentType: "Contract",
      experienceLevel: "Junior",
      salary: {
        min: 3000,
        max: 5000,
        currency: "USD",
        type: "Monthly"
      },
      locationType: "On-Site",
      postedDate: "2025-06-15T12:00:00Z",
      applicationDeadline: "2025-06-30T23:59:59Z",
      tags: ["UI/UX", "Design", "Figma", "Prototyping"],
      howToApply: "Send your portfolio to design@pixelcraft.design.",
      status: "Open"
    },
    {
        id: 104,
        title: "Data Analyst",
        company: {
          name: "DataNest",
          logo: "https://ui-avatars.com/api/?name=DataNest&background=673AB7&color=fff",
          location: "Chicago, IL",
          website: "https://datanest.io",
          images: {
            banner: "https://images.unsplash.com/photos/ziDnvOJGoMA", // analytics dashboard :contentReference[oaicite:1]{index=1}
            office: "https://images.unsplash.com/photos/6Hsx3F95AfM"   // modern team at workspace :contentReference[oaicite:2]{index=2}
          }
        },
        description: `We’re looking for a data analyst who can turn data into insights and help drive business decisions.
        You’ll work with large datasets using SQL and visualization tools like Tableau or Power BI.
        As a data-first company, we expect you to own reporting, explore trends, and advise stakeholders.
        You will collaborate with product and marketing teams to uncover user behavior and campaign performance.
        This is a fantastic opportunity to make an impact with your analytical thinking.`,
        requirements: [
          "2+ years of experience in data analysis",
          "Proficient in SQL, Excel, and data visualization tools",
          "Strong critical thinking and communication skills"
        ],
        responsibilities: [
          "Analyze business data and generate reports",
          "Collaborate with stakeholders on data-driven decisions",
          "Maintain and improve dashboards and KPIs"
        ],
        employmentType: "Full-Time",
        experienceLevel: "Mid-Level",
        salary: {
          min: 60000,
          max: 80000,
          currency: "USD",
          type: "Annual"
        },
        locationType: "Hybrid",
        postedDate: "2025-06-12T08:30:00Z",
        applicationDeadline: "2025-07-10T23:59:59Z",
        tags: ["Data", "SQL", "Analytics", "Tableau"],
        howToApply: "Submit your resume and dashboard samples to jobs@datanest.io.",
        status: "Open"
      },
      {
        id: 105,
        title: "DevOps Engineer",
        company: {
          name: "InfraForge",
          logo: "https://ui-avatars.com/api/?name=InfraForge&background=FF5722&color=fff",
          location: "Seattle, WA",
          website: "https://infraforge.dev",
          images: {
            banner: "https://images.unsplash.com/photos/cfb43c4437d3", // cloud/server infrastructure
            office: "https://images.unsplash.com/photos/foyxAFq1nKg"   // engineers working in office :contentReference[oaicite:3]{index=3}
          }
        },
        description: `InfraForge is searching for an experienced DevOps engineer to help build and secure our cloud infrastructure.
        You'll automate deployments, manage CI/CD pipelines, and monitor cloud environments using modern tooling.
        We use AWS, Docker, Kubernetes, and Terraform in our stack.
        We expect you to have strong problem-solving skills and be comfortable working in production.
        If you're passionate about automation and reliability, join us.`,
        requirements: [
          "3+ years in DevOps or infrastructure roles",
          "Experience with AWS, Docker, Kubernetes",
          "Knowledge of CI/CD, Terraform, and monitoring tools"
        ],
        responsibilities: [
          "Automate deployment and scaling processes",
          "Implement infrastructure-as-code practices",
          "Monitor and maintain cloud environments"
        ],
        employmentType: "Full-Time",
        experienceLevel: "Mid-Level",
        salary: {
          min: 85000,
          max: 110000,
          currency: "USD",
          type: "Annual"
        },
        locationType: "Remote",
        postedDate: "2025-06-20T09:00:00Z",
        applicationDeadline: "2025-07-20T23:59:59Z",
        tags: ["DevOps", "AWS", "Kubernetes", "Terraform"],
        howToApply: "Email your resume and GitHub profile to careers@infraforge.dev.",
        status: "Open"
      }
      
  ];
  


app.get('/api/users', (req, res) => {
    res.json(jobDetails);
});


app.get('/api/users/:id', (req, res) => {
    const item = jobDetails.find(i => i.id === parseInt(req.params.id))
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
