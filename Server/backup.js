const upload = require('./UploadMiddeleware'); // path to above file
const express = require('express');
const cors = require('cors');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;


const router = express.Router();

app.use(cors());
app.use(express.json());

// Initialize if not already initialized
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: new Date, // or use serviceAccount
//   });
// }


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


//Get all job
app.get('/api/users', (req, res) => {
  res.json(jobDetails);
});

// get Selected job
app.get('/api/users/:id', (req, res) => {
  const item = jobDetails.find(i => i.id === parseInt(req.params.id))
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

//Add new joB

app.post('/api/users', async (req, res) => {
  try {
    // const { title, description, ...data } = req.body;
    const {
      title,
      company,
      description,
      requirements,
      responsibilities,
      employmentType,
      experienceLevel,
      salary,
      locationType,
      tags,
      applicationDeadline,
      howToApply,
      status,
    } = req.body;

    const errors = [];

    // Required top-level fields
    if (!title || title.trim() === '') errors.push('Title is required.');
    if (!description || description.trim() === '') errors.push('Description is required.');
    if (!employmentType) errors.push('Employment type is required.');
    // if (!experienceLevel) errors.push('Experience level is required.');
    if (!locationType) errors.push('Location type is required.');
    // if (!howToApply || howToApply.trim() === '') errors.push('How to apply is required.');
    // if (!status) errors.push('Status is required.');
    // if (!applicationDeadline) errors.push('Application deadline is required.');

    // Company validations
    if (!company || typeof company !== 'object') {
      errors.push('Company details are required.');
    } else {
      if (!company.name || company.name.trim() === '') errors.push('Company name is required.');
      if (!company.location || company.location.trim() === '') errors.push('Company location is required.');
      if (!company.website || company.website.trim() === '') errors.push('Company website is required.');
      if (!company.logo || company.logo.trim() === '') errors.push('Company logo is required.');

      if (!company.images || typeof company.images !== 'object') {
        errors.push('Company images are required.');
      } else {
        if (!company.images.banner || company.images.banner.trim() === '') errors.push('Company banner image is required.');
        // if (!company.images.office || company.images.office.trim() === '') errors.push('Company office image is required.');
      }
    }

    // Salary validations
    if (!salary || typeof salary !== 'object') {
      errors.push('Salary details are required.');
    } else {
      if (!salary.min || isNaN(salary.min)) errors.push('Minimum salary must be a number.');
      if (!salary.max || isNaN(salary.max)) errors.push('Maximum salary must be a number.');
      if (!salary.currency || salary.currency.trim() === '') errors.push('Salary currency is required.');
      if (!salary.type || salary.type.trim() === '') errors.push('Salary type is required.');
    }

    // Optional array validations
    // if (!Array.isArray(requirements) || requirements.length === 0) {
    //   errors.push('At least one requirement is required.');
    // }

    if ((!responsibilities) || responsibilities.split(',').length === 0) {
      errors.push('At least one responsibility is required.');
    }

    if ((!requirements) || requirements.split(',').length === 0) {
      errors.push('At least one responsibility is required.');
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      errors.push('At least one tag is required.');
    }

    // Send back validation errors if any
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed.', details: errors });
    }


    // if (!title || !description) {
    //   return res.status(400).json({ error: 'Title and description are required.' });
    // }

    const newJob = {

      id: jobDetails.length ? Math.max(...jobDetails.map(job => job.id)) + 1 : 101,
      title,
      company,
      description,
      requirements,
      responsibilities,
      employmentType,
      experienceLevel,
      salary,
      locationType,
      tags,
      postedDate: new Date(),
      applicationDeadline,
      howToApply,
      status,
    };

    jobDetails.push(newJob)
    console.log(newJob)
    // const docRef = await jobsCollection.add(newJob);

    res.status(201).json({
      message: 'Job created successfully.',
      jobId: newJob.id,
    });
  } catch (error) {
    console.error('Error creating job:', error);
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
})



//Update job
app.post('/api/users/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  // console.log(`Updating job with ID: ${jobId}`);
  // console.log('Request body:', req.body);

  const index = jobDetails.findIndex(job => job.id === jobId);

  if (index === -1) {
    // console.log(`Job with ID ${jobId} not found.`);
    return res.status(404).json({ message: 'Job not found' });
  }

  const updatedJob = { ...jobDetails[index], ...req.body, id: jobId };
  jobDetails[index] = updatedJob;

  // console.log(`Updated job:`, updatedJob);

  res.json({
    message: 'Job updated successfully',
    job: updatedJob
  });
});


// Delete job
app.delete('/api/users/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  const index = jobDetails.findIndex(job => job.id === jobId);

  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }

  jobDetails.splice(index, 1); // remove the job
  res.json({ message: 'Job deleted successfully' });
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
