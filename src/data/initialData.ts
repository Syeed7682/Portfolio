import type { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  "theme": {
    "preset": "midnight",
    "mode": "dark",
    "accentColor": "#64748b",
    "accentGradient": "linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%)",
    "glassBlur": 16,
    "borderRadius": "rounded-xl"
  },
  "sections": [
    {
      "id": "home",
      "label": "Home",
      "heading": "Hi, I am Kha. Mo. Syeed Asif",
      "headingGradient": "Kha. Mo. Syeed Asif",
      "isVisible": true,
      "order": 0
    },
    {
      "id": "about",
      "label": "About",
      "badgeTitle": "Background",
      "heading": "About Me",
      "headingGradient": "About",
      "subtitle": "Passionate developer and researcher at the intersection of AI, Robotics, and Scalable Web Platforms.",
      "isVisible": true,
      "order": 1
    },
    {
      "id": "skills",
      "label": "Skills",
      "badgeTitle": "Technical Arsenal",
      "heading": "My Skills & Expertise",
      "headingGradient": "Skills",
      "subtitle": "A structured breakdown of core languages, deep learning frameworks, and engineering tools.",
      "isVisible": true,
      "order": 2
    },
    {
      "id": "portfolio",
      "label": "Portfolio",
      "badgeTitle": "Selected Work",
      "heading": "Featured Projects",
      "headingGradient": "Projects",
      "subtitle": "Explore recent applications across Artificial Intelligence, Computer Vision, RAG Systems, and Full-Stack Engineering.",
      "isVisible": true,
      "order": 3
    },
    {
      "id": "publications",
      "label": "Research",
      "badgeTitle": "Academic Research",
      "heading": "Research Publications",
      "headingGradient": "Publications",
      "subtitle": "Peer-reviewed research and preprint contributions in machine learning, multimodal vision, and medical diagnostics.",
      "isVisible": true,
      "order": 4
    },
    {
      "id": "events",
      "label": "Events & Awards",
      "badgeTitle": "Milestones",
      "heading": "Events & Achievements",
      "headingGradient": "Achievements",
      "subtitle": "National robotics hackathons, academic fests, keynotes, and certified achievements.",
      "isVisible": true,
      "order": 5
    },
    {
      "id": "experience",
      "label": "Experience",
      "badgeTitle": "Timeline",
      "heading": "Education & Experience",
      "headingGradient": "Experience",
      "subtitle": "My academic journey at East West University and technical leadership across student bodies and engineering projects.",
      "isVisible": true,
      "order": 6
    },
    {
      "id": "contact",
      "label": "Contact",
      "badgeTitle": "Get In Touch",
      "heading": "Let us Connect",
      "headingGradient": "Connect",
      "subtitle": "Always eager to discuss cutting-edge AI ideas, research collaborations, or innovative software projects.",
      "isVisible": true,
      "order": 7
    }
  ],
  "hero": {
    "availableBadgeText": "Available for AI & Software Opportunities",
    "greetingText": "Hi, I'm",
    "name": "Kha. Mo. Syeed Asif",
    "typewriterTitles": [
      "Full-Stack Developer",
      "Data Scientist & ML Researcher",
      "RAG & Computer Vision Specialist",
      "Associate Executive @ EWURC",
      "Campus Ambassador"
    ],
    "bio": "Junior Developer at Dohatech New Media | CSE Graduate from East West University, Dhaka. Building high-performance RAG pipelines, computer vision systems, and modern full-stack web applications to solve real-world problems through innovative technology.",
    "primaryCtaText": "Get In Touch",
    "primaryCtaLink": "#contact",
    "secondaryCtaText": "View My Work",
    "secondaryCtaLink": "#portfolio",
    "profileImageUrl": "/profile_suit.jpg",
    "floatingBadgeTitle": "AI & Data Science",
    "floatingBadgeSubtitle": "Junior Developer at Dohatech New Media ",
    "githubUrl": "https://github.com/Syeed7682",
    "linkedinUrl": "https://www.linkedin.com/in/kha-mo-syeed-asif/",
    "facebookUrl": "https://www.facebook.com/sye.ed.5264/",
    "kaggleUrl": "https://www.kaggle.com/syeedasif",
    "email": "kmsyeedasif@gmail.com",
    "location": "Aftab Nagar, Dhaka-1212, Bangladesh"
  },
  "about": {
    "heading": "Full-Stack Developer & Data Scientist",
    "subheading": "CSE Graduate from East West University",
    "paragraph1": "With specialized expertise in deep learning, multimodal vision-language models, and full-stack web architecture, I am committed to crafting production-ready intelligent software and contributing to open-source initiatives.",
    "paragraph2": "Currently researching Retrieval-Augmented Generation (RAG) optimization, advanced computer vision for biomedical informatics, and low-latency cloud deployments. Open to global research collaborations, engineering mentorship, and high-impact freelance roles.",
    "coverImageUrl": "/src/assets/Portfolio_cover.jpg",
    "stats": [
      {
        "label": "AI & ML Models",
        "value": "15+",
        "icon": "Brain"
      },
      {
        "label": "Publications & Preprints",
        "value": "1+",
        "icon": "CloseOpen"
      },
      {
        "label": "Trained Students",
        "value": "200+",
        "icon": "Users"
      },
      {
        "label": "Hackathons & Events",
        "value": "10+",
        "icon": "Organdizer"
      }
    ]
  },
  "projects": [
    {
      "_id": "6a80e1611796f1019702fc68",
      "title": "Business Analysis — Augmedix Central Operations",
      "description": "Analyzed Q2 2025 Revenue Cycle Management data to identify operational inefficiencies and revenue improvement opportunities. Built interactive dashboards, performance tracking charts, and MIS reports. Identified 120k+ entry gaps and approximately $88,225 in potential revenue recovery.",
      "image": "/initial-data-assets/c653b443323cd485372d54b43121ba9bb7e6f252966fa10d10ad60f14aedc714.jpg",
      "type": "Web App",
      "tags": [
        "Excel",
        "Power BI",
        "Python",
        "Pandas",
        "Data Analysis"
      ],
      "link": "https://academicpressure785--augmedix-central-operations.retool.app/",
      "githubUrl": "https://github.com/Syeed7682/Augmedix-Central-Operations-Case-Study",
      "featured": false,
      "metrics": "Identified $88,225+ in revenue recovery opportunities",
      "createdAt": "2025-07-01",
      "updatedAt": "2026-09-14T18:23:00.251Z"
    },
    {
      "_id": "6a80e1611796f1019702fc67",
      "title": "FAISS Similarity Search",
      "description": "Benchmarking FAISS indexes (HNSW, IVFFlat) on 50M+ text/image embeddings for semantic retrieval. Includes quantization experiments, recall@k metrics, and integration with RAG pipelines.",
      "image": "/initial-data-assets/14311fceab3753a9880f4cb2a2a50edf90b1b139e8c653374baddd9d91923bc7.jpg",
      "type": "RAG Systems",
      "tags": [
        "FAISS",
        "Python",
        "NumPy",
        "LangChain",
        "Sentence-Transformers"
      ],
      "link": "https://github.com/Syeed7682/Benchmarking-FAISS-Indexing-Methods-on-the-Deep1M-Dataset-A-Comparative-Study-of-Exact-and-Approxim",
      "githubUrl": "https://github.com/Syeed7682/Benchmarking-FAISS-Indexing-Methods-on-the-Deep1M-Dataset-A-Comparative-Study-of-Exact-and-Approxim",
      "featured": false,
      "metrics": "50M+ vector embeddings benchmarked",
      "createdAt": "2024-08-01",
      "updatedAt": "2026-09-14T18:23:31.524Z"
    },
    {
      "_id": "6a80e1611796f1019702fc66",
      "title": "IoT Smart Home",
      "description": "Built and deployed a full-stack IoT smart home control system for ESP32/Arduino devices with real-time sensor monitoring, automated triggers, and a web dashboard.",
      "image": "/initial-data-assets/1075de66b47eb55c7e7699b40d44dd2e9f854032c36193a837369ef5b5e67d88.jpg",
      "type": "Hardware",
      "tags": [
        "ESP32",
        "Arduino",
        "MQTT",
        "React",
        "Node.js"
      ],
      "link": "https://fub-power-dashboard-2.onrender.com/",
      "githubUrl": "https://github.com/Syeed7682/FUB-Power_DashBoard",
      "featured": false,
      "metrics": "Real-time IoT sensor control dashboard",
      "createdAt": "2024-03-05",
      "updatedAt": "2026-09-14T18:24:09.059Z"
    },
    {
      "_id": "6a80e1611796f1019702fc65",
      "title": "EasyShop E-Commerce System",
      "description": "Complete e-commerce platform with user authentication, product catalog, cart management, order processing, payment integration, and seller dashboard.",
      "image": "/initial-data-assets/39005312cc58b0edec3f1b3abe11fa7a44a25599fac61fd1f81a92c74d891132.jpg",
      "type": "Web App",
      "tags": [
        "React",
        "Node.js",
        "MongoDB",
        "Stripe",
        "TailwindCSS"
      ],
      "link": "https://github.com/Syeed7682/My_E_Commerce_system",
      "githubUrl": "https://github.com/Syeed7682/My_E_Commerce_system",
      "featured": false,
      "metrics": "Complete e-commerce with payment integration",
      "createdAt": "2024-07-18",
      "updatedAt": "2026-09-14T18:24:53.615Z"
    },
    {
      "_id": "6a80e1611796f1019702fc64",
      "title": "Hospital Management System",
      "description": "Complete hospital management solution with OPD built-in modules for patient registration, appointment scheduling, doctor management, billing, pharmacy inventory, and report generation.",
      "image": "/initial-data-assets/43588d6ed5db7f0e902c54b1eb78b2750628f055bccf069b6b3f65082db4e556.jpg",
      "type": "Web App",
      "tags": [
        "Java",
        "MySQL",
        "JavaFX",
        "JDBC",
        "CSS"
      ],
      "link": "https://github.com/Syeed7682/Hospital-Management-System-Java",
      "githubUrl": "https://github.com/Syeed7682/Hospital-Management-System-Java",
      "featured": false,
      "metrics": "Full hospital OPD workflow automation",
      "createdAt": "2024-05-10",
      "updatedAt": "2026-09-14T18:25:15.233Z"
    },
    {
      "_id": "6a80e1611796f1019702fc63",
      "title": "Cash Trail — Expense Tracker",
      "description": "Personal expense management and analytics web app with category-wise spending breakdown, budget goals, monthly trend charts, and CSV export functionality.",
      "image": "/initial-data-assets/02a80ce460d154b34121d4110f908915496fc79b1f2e8ed379893c7c51cc4ef0.jpg",
      "type": "Web App",
      "tags": [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Chart.js"
      ],
      "link": "https://github.com/Syeed7682/Expance-Tracker",
      "githubUrl": "https://github.com/Syeed7682/Expance-Tracker",
      "featured": false,
      "metrics": "Real-time budget tracking with analytics",
      "createdAt": "2024-10-20",
      "updatedAt": "2026-09-14T18:25:44.241Z"
    },
    {
      "_id": "6a80e1611796f1019702fc62",
      "title": "Carbon Emission Calculator",
      "description": "Environmental impact calculator for sustainability tracking. Calculates carbon footprints across transport, energy, food, and consumer lifestyle domains with visual breakdown and actionable reduction strategies.",
      "image": "/initial-data-assets/32ee3cfac6d43b702eddfa9fa9cfc41386673f8dcdef2c5acc7bcbb8f3a97cb1.jpg",
      "type": "Web App",
      "tags": [
        "React",
        "TypeScript",
        "TailwindCSS",
        "Chart.js"
      ],
      "link": "https://github.com/Syeed7682/Carbon-Emission-Calculator",
      "githubUrl": "https://github.com/Syeed7682/Carbon-Emission-Calculator",
      "featured": false,
      "metrics": "Multi-domain carbon footprint tracking",
      "createdAt": "2025-04-15",
      "updatedAt": "2026-09-14T18:26:18.266Z"
    },
    {
      "_id": "6a80e1611796f1019702fc61",
      "title": "Bangladesh Election 2026 Live Dashboard",
      "description": "Built an IT-powered interactive analytics platform with real-time vote result visualization, district-level heat maps, demographic analysis, and live tabulations using React + TypeScript + recharts.",
      "image": "/initial-data-assets/c3873e147e0fc4d5c04e9083e1fd1feb38476eb1e8dcab8896c509f78134ccbb.jpg",
      "type": "Web App",
      "tags": [
        "React",
        "TypeScript",
        "Recharts",
        "D3.js",
        "TailwindCSS"
      ],
      "link": "https://bangladesh-election-dashboard-2026.netlify.app/",
      "githubUrl": "https://github.com/Syeed7682/Bd_Election_2026",
      "featured": true,
      "metrics": "Live result tracking across 300 constituencies",
      "createdAt": "2025-12-01",
      "updatedAt": "2026-09-14T18:27:06.034Z"
    },
    {
      "_id": "6a80e1611796f1019702fc60",
      "title": "CINE-MELA: Netflix Hybrid Recommendation Case Study",
      "description": "Full-scale analytics platform with real-time result dashboard, collaborative filtering, content-based filtering, and Tailwind CSS for Netflix-style movie recommendations using React, TypeScript, and Tailwind CSS.",
      "image": "/initial-data-assets/f08e1b15da134a3b08fac894301561923548aa7e5ba6f2c62592fe782b94989c.jpg",
      "type": "AI Model",
      "tags": [
        "React",
        "TypeScript",
        "Scikit-Learn",
        "Pandas",
        "TailwindCSS"
      ],
      "link": "https://cine-mela.streamlit.app/",
      "githubUrl": "https://github.com/Syeed7682/Cine-Mela",
      "featured": true,
      "metrics": "Hybrid collaborative + content-based filtering",
      "createdAt": "2024-12-10",
      "updatedAt": "2026-09-14T18:27:33.869Z"
    },
    {
      "_id": "6a80e1611796f1019702fc5f",
      "title": "Associate, AI DataWorks (Contractual) | Acme.AI Ltd",
      "description": "Contracted AI data annotation and pipeline development role at Acmeji. Curated annotated image datasets, ensuring high-quality labeling for AI model training pipelines.",
      "image": "/initial-data-assets/250f31a4061c0855f146c72ed7174dd8d97e25b4fdeee8094ac8c6ac0da781d3.png",
      "type": "AI Model",
      "tags": [
        "Data Annotation",
        "Python",
        "Computer Vision",
        "Label Studio"
      ],
      "link": "https://github.com/Syeed7682",
      "githubUrl": "https://github.com/Syeed7682",
      "featured": true,
      "metrics": "Contractual AI pipeline role",
      "createdAt": "2025-03-01",
      "updatedAt": "2026-11-24T06:30:33.196Z"
    },
    {
      "_id": "6a80e1611796f1019702fc5e",
      "title": "EWU National RoboFest 2026",
      "description": "Developed the official website for EWU National RoboFest 2026 — featuring real-time event scheduling, participant registration workflows, and live scoreboard management.",
      "image": "/initial-data-assets/6a9c3efc48ebf7855dff6824d8209fbe052d0bc76599bad82b68a9b0fca00090.jpg",
      "type": "Web App",
      "tags": [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "TailwindCSS"
      ],
      "link": "ewuroboticsclub.com/nrf26",
      "githubUrl": "https://github.com/Syeed7682/EWU-National-RoboFest-2026",
      "featured": true,
      "metrics": "40+ universities, 800+ participants",
      "createdAt": "2025-11-01",
      "updatedAt": "2026-09-14T18:28:07.244Z"
    },
    {
      "_id": "6a80e1611796f1019702fc5d",
      "title": "MedRAG-VQA: Multimodal Medical AI Assistant",
      "type": "AI Model",
      "description": "Multimodal AI platform for clinical VQA on X-rays/MRI using PyTorch vision encoders, FAISS vector indexing, and specialized biomedical LLMs for radiograph diagnostic synthesis.",
      "image": "/initial-data-assets/bab0ffc78d3c3ab8040e867c6c53de34151946f09202f3ca249c2bdc57ca87cf.jpg",
      "tags": [
        "PyTorch",
        "LangChain",
        "FAISS",
        "MedCLIP",
        "FastAPI"
      ],
      "link": "https://github.com/Syeed7682/Capstone-Project-C",
      "githubUrl": "https://github.com/Syeed7682/Capstone-Project-C",
      "featured": true,
      "metrics": "94.2% Top-1 Accuracy on VQA-RAD",
      "createdAt": "2025-01-15",
      "updatedAt": "2026-09-14T18:28:27.334Z"
    }
  ],
  "publications": [
    {
      "_id": "6a80e1611796f1019702fc69",
      "title": "Real-Time UAV-Based Building Surface Defect Detection: A Dataset-Driven Lightweight CNN Framework with Grad-CAM Explainability",
      "description": "Achieved 95.39% accuracy with 15 fps inference on Jetson-class edge devices. Integrated Grad-CAM explainability streamed to mobile devices for real-time visual justification.",
      "authors": "Kha. Mo. Syeed Asif, Maherun Nessa Isty, Raihan Ul Islam, Raiyan Gani, Tasmia Islam, M. Saddam Hossain Khan",
      "conference": "2025 International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN)",
      "year": 2025,
      "link": "10.1109/QPAIN66474.2025.11171763",
      "doi": "10.1109/QPAIN66474.2025.11171763",
      "tags": [
        "UAV",
        "CNN",
        "Grad-CAM",
        "Edge AI",
        "Explainability",
        "Computer Vision",
        "Defect Detection"
      ],
      "image": "/initial-data-assets/4b02bad9f9cf7fbbe8bd5e014f18bb485b622d1e52987f5b605be112becb44cb.jpg",
      "createdAt": "2025-01-01",
      "updatedAt": "2026-08-16T00:59:01.073Z"
    }
  ],
  "events": [
    {
      "_id": "6ab95c2ebe792064ec9a3608",
      "title": "Event Ambassador — Global Study EXPO 2026",
      "description": "Served as an Event Ambassador for HBD Services’ Global Study EXPO 2026, contributing to crowd flow management, on-ground coordination, and smooth event operations at The Westin Dhak",
      "image": "/initial-data-assets/1e81371add8b8687ca3b6c0647450b014adcca41f04853275ba11d3944692ec2.jpg",
      "category": "awards",
      "date": "2026",
      "organization": "HBD Services’ Global Study EXPO 2026",
      "createdAt": "2026-09-27T18:10:54.391Z"
    },
    {
      "_id": "6aa83d84cced472be9a9d744",
      "title": "LLM-Based AI Engine Development: Innovation Challenge",
      "description": "Achieved 2nd Runner-Up in the “LLM-Based AI Engine Development: Innovation Challenge” organized by the EWU Robotics Club.",
      "image": "/initial-data-assets/b55421074d3453dcae9428f4ae7f00e7f5cd285eb5b8ffe881883acb674747a7.jpg",
      "category": "awards",
      "date": "2026",
      "organization": "East West University",
      "createdAt": "2026-09-14T18:31:32.242Z"
    },
    {
      "_id": "6a824cfc532e17b8412a4a10",
      "title": "Machine Mania 3.0 ",
      "description": "Machine Mania 3.0 Organized by TexMech Society, BUTEX (15–16 May 2026)",
      "image": "/initial-data-assets/4d876e97026712c4a1f1a7bec265b4a6703501e57ada7c5531fb36a356b95862.jpg",
      "category": "certificates",
      "date": "2026",
      "organization": "BUTEX",
      "createdAt": "2026-08-16T23:51:24.328Z",
      "credentialUrl": "",
      "updatedAt": "2026-08-16T23:55:51.123Z"
    },
    {
      "_id": "6a70e1415cecdb60ed866972",
      "title": "EWU National RoboFest 2026",
      "description": "Successfully organized and coordinated  EWU National RoboFest 2026 (NRF26) , contributing to event planning, team coordination, logistics, and overall execution. Helped deliver a successful event that brought together robotics enthusiasts, participants, and audiences in a vibrant and engaging environment.\n",
      "image": "/initial-data-assets/323977e4b8c720221b41db968452aa0050e0092f3ff1f404e07380c736df0c7a.jpg",
      "createdAt": "2026-08-03T18:43:13.850Z",
      "category": "events",
      "credentialUrl": "",
      "date": "",
      "organization": "",
      "updatedAt": "2026-08-16T23:22:54.179Z"
    },
    {
      "_id": "6a0caee8efbfa9c2f3610916",
      "title": "Industry 5.0 and Sustainable AI: Transforming Bangladesh’s Future",
      "description": "Proud to be a part of organizing the “Industry 5.0 and Sustainable AI: Transforming Bangladesh’s Future” seminar with East West University Robotics Club.\nGrateful for the amazing participation and successful execution of such an inspiring and insightful event! ",
      "image": "/initial-data-assets/d842ca5841cfa468b958d09a15dfbf9a6f418d7b589456787d87d1eb3fe620b6.jpg",
      "createdAt": "2026-05-19T18:41:44.245Z",
      "category": "events",
      "credentialUrl": "",
      "date": "",
      "organization": "",
      "updatedAt": "2026-08-16T23:23:18.102Z"
    },
    {
      "_id": "6a0cadf6efbfa9c2f3610915",
      "title": "𝗟𝗟𝗠-𝗕𝗮𝘀𝗲𝗱 𝗔𝗜 𝗘𝗻𝗴𝗶𝗻𝗲 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁: 𝗜𝗻𝗻𝗼𝘃𝗮𝘁𝗶𝗼𝗻 𝗖𝗵𝗮𝗹𝗹𝗲𝗻𝗴𝗲",
      "description": "Honored to be a participant in the 𝗟𝗟𝗠-𝗕𝗮𝘀𝗲𝗱 𝗔𝗜 𝗘𝗻𝗴𝗶𝗻𝗲 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁: 𝗜𝗻𝗻𝗼𝘃𝗮𝘁𝗶𝗼𝗻 𝗖𝗵𝗮𝗹𝗹𝗲𝗻𝗴𝗲 organized by East West University Robotics Club.\nAn incredible experience filled with learning, innovation, and inspiring ideas! ",
      "image": "/initial-data-assets/ed5c392cc6351185c10c2089c1492ddb0c7a1d21c0d8dc75fecf7fc1b75873c4.jpg",
      "createdAt": "2026-05-19T18:37:42.146Z",
      "category": "events",
      "credentialUrl": "",
      "date": "",
      "organization": "",
      "updatedAt": "2026-08-16T23:23:16.780Z"
    },
    {
      "_id": "6a0cac7aefbfa9c2f3610914",
      "title": " East West University Robotics Club Orientation Program – Spring 2026",
      "description": "Had an amazing session at the East West University Robotics Club Orientation Program – Spring 2026, welcoming new minds to a journey of innovation, teamwork, and growth! 🚀",
      "image": "/initial-data-assets/dd4c23a9c26f4cd8e9df481e8a29261e20bb366cc07e1d8768d23cde768fa8e8.jpg",
      "createdAt": "2026-05-19T18:31:22.132Z",
      "category": "events",
      "credentialUrl": "",
      "date": "",
      "organization": "",
      "updatedAt": "2026-08-16T23:23:16.683Z"
    },
    {
      "_id": "6a0caba2efbfa9c2f3610913",
      "title": "Deep Learning and Computer Vision Workshop ",
      "description": "Grateful to be part of such an inspiring and knowledge-packed workshop by East West University Robotics Club. Excited to apply these Deep Learning and Computer Vision concepts in future projects and keep exploring the world of AI! ",
      "image": "/initial-data-assets/9a5a42299fc077857f3d17d1a8a6c1d2ea5c26d7ef0dd3fa9b3c9a07a7c966e9.jpg",
      "createdAt": "2026-05-19T18:27:46.086Z",
      "category": "events",
      "credentialUrl": "",
      "date": "",
      "organization": "",
      "updatedAt": "2026-08-16T23:23:00.686Z"
    },
    {
      "_id": "6a0caab8efbfa9c2f3610912",
      "title": "MACHINE MANIA 3.0 | BUTEX TexMech Society",
      "description": "Although we couldn’t survive the 3rd round, it brought a new experience for me.\nBUTEX TexMech Society \nMACHINE MANIA 3.0 | BUTEX TexMech Society",
      "image": "/initial-data-assets/1c877b4657a96ed6f7b12ce9efd7db73272706e4c29a827bf886516fc5d47fa9.jpg",
      "createdAt": "2026-05-19T18:23:52.395Z",
      "category": "events",
      "credentialUrl": "",
      "date": "",
      "organization": "",
      "updatedAt": "2026-08-16T23:23:10.682Z"
    },
    {
      "_id": "6ab95c90be792064ec9a3609",
      "title": "Event Ambassador( Coordinator)  Global Study EXPO 2026",
      "description": "Served as an Event Ambassador for HBD Services’ Global Study EXPO 2026, contributing to crowd flow management, on-ground coordination, and smooth event operations at The Westin Dhak",
      "image": "/initial-data-assets/55bcb41c12bfd686dd01529f8763992d36e7c361dbb4ded5132a675308387151.jpg",
      "category": "certificates",
      "date": "2026",
      "organization": "HBD Service",
      "createdAt": "2026-09-27T18:12:32.361Z"
    },
    {
      "_id": "6aad950abe792064ec9a3607",
      "title": "Certificate of Participation – Seminar on “Ukraine-Russia Conflict”",
      "description": "Seminar on “UKRAINE-RUSSIA CONFLICT” organized by the East West University Model UN Club on February 23, 2023.",
      "image": "/initial-data-assets/1abe450f8c832a2f464c053e2fe8ff94500efadef6824fa041869604228457d3.jpg",
      "category": "certificates",
      "date": "2023",
      "organization": "East West University",
      "createdAt": "2026-09-18T19:46:18.653Z"
    },
    {
      "_id": "6a80e1621796f1019702fc77",
      "title": "MIE Robolution 1.0 — Campus Ambassador",
      "description": "Recognized for valuable contribution and enthusiastic participation as Campus Ambassador at MIE Robolution 1.0, organized by the Department of Mechatronics & Industrial Engineering, CUET.",
      "image": "/initial-data-assets/1daba86e65366f308be6b24c96b60268fbb6d2a8622933222fdef2285ca83f6a.jpg",
      "category": "certificates",
      "date": "May 8–10, 2025",
      "organization": "Department of MIE, CUET",
      "credentialUrl": "",
      "createdAt": "2025-05-10",
      "updatedAt": "2026-08-16T00:59:31.566Z"
    },
    {
      "_id": "6a80e1621796f1019702fc76",
      "title": "Ignition 2026 — National Mechanical Festival",
      "description": "Recognized as Campus Ambassador for the National Mechanical Festival 2026 organized by the Department of Mechanical Engineering, KUET. Certificate of Achievement awarded for contribution to participant outreach and event promotion.",
      "image": "/initial-data-assets/b8dbace3a64bda77476cf260567d9ae2f7a68ca753864581b0309022fd668a5f.jpg",
      "category": "certificates",
      "date": "April 23–25, 2026",
      "organization": "Department of Mechanical Engineering, KUET",
      "credentialUrl": "",
      "createdAt": "2026-04-25",
      "updatedAt": "2026-08-16T00:59:38.448Z"
    },
    {
      "_id": "6a80e1621796f1019702fc73",
      "title": "Volunteering At National Robo Fest 2024",
      "description": "Awarded Certificate of Volunteering for outstanding contribution and dedicated service as a volunteer at the National Robo Fest 2024. Recognized for technical support, arena management, and participant coordination.",
      "image": "/initial-data-assets/366ef7a24dc466f1b6eb84bffdccc64ee24acfc3c9a2afe0fc7dbda92385a732.jpg",
      "category": "certificates",
      "date": "November 2024",
      "organization": "East West University Robotics Club",
      "credentialUrl": "",
      "createdAt": "2024-11-30",
      "updatedAt": "2026-08-16T01:00:04.119Z"
    }
  ],
  "experience": [
    {
      "_id": "6b0551bb189e7865fd551aeb",
      "title": "Junior Developer",
      "institution": "Dohatech New Media",
      "period": "2026 - Present",
      "type": "Experience",
      "description": "Junior Developer at Dohatech New Media | CSE Graduate from East West University, Dhaka. Building high-performance RAG pipelines, computer vision systems, and modern full-stack web applications to solve real-world problems through innovative technology.",
      "tags": [],
      "createdAt": "2026-11-24T08:58:35.450Z",
      "updatedAt": "2026-11-24T09:00:09.581Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c94",
      "title": "Leadership Roles",
      "institution": "CGC Science Club",
      "period": "2020 - 2021",
      "description": "Event & Logistics Manager (Science Club) and Volunteer Commanding Officer (Science Fair & Farewell).",
      "type": "Experience",
      "createdAt": "2026-08-15T20:24:56.751Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c93",
      "title": "Dedicated Volunteer",
      "institution": "EWU CSE Fest & Robo Fest 2024",
      "period": "2024",
      "description": "Actively volunteered for EWU CSE Fest and EWURC National Robo Fest 2024, managing logistics and event flow.",
      "type": "Experience",
      "createdAt": "2026-08-15T20:24:56.751Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c92",
      "title": "Associate Executive",
      "institution": "East West University Robotics Club",
      "period": "2024 - Present",
      "description": "Volunteer Trainer, Event & Logistics Coordinator. Conducted technical training for 200+ members.",
      "type": "Experience",
      "createdAt": "2026-08-15T20:24:56.751Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c91",
      "title": "Technical Contributor",
      "institution": "Open Source Initiatives",
      "period": "2023 - Present",
      "description": "Active contributor to community-driven projects.",
      "type": "Experience",
      "createdAt": "2026-08-15T20:24:56.751Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c90",
      "title": "Data Science Enthusiast",
      "institution": "Open Source Community",
      "period": "2024 - Present",
      "description": "Contributing to ML and advanced data analysis projects.",
      "type": "Experience",
      "createdAt": "2026-08-15T20:24:56.751Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c8f",
      "title": "Full-Stack Developer",
      "institution": "Multiple Projects",
      "period": "2023 - Present",
      "description": "Developed 15+ scalable web applications and ML models.",
      "type": "Experience",
      "createdAt": "2026-08-15T20:24:56.751Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c8e",
      "title": "Secondary School Certificate (SSC)",
      "institution": "Comilla Modern High School",
      "period": "2019",
      "description": "Science Stream",
      "type": "Education",
      "createdAt": "2026-08-15T20:24:56.751Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c8d",
      "title": "Higher Secondary Certificate (HSC)",
      "institution": "Comilla Government College",
      "period": "2021",
      "description": "Science Stream",
      "type": "Education",
      "createdAt": "2026-08-15T20:24:56.751Z"
    },
    {
      "_id": "6a80cb18f873fa65bf052c8c",
      "title": "B.Sc. in Computer Science & Engineering",
      "institution": "East West University, Dhaka",
      "period": "2022 - 2026",
      "description": "Major: Data Science",
      "type": "Education",
      "createdAt": "2026-08-15T20:24:56.742Z",
      "updatedAt": "2026-09-18T19:46:39.482Z"
    }
  ],
  "skillCategories": [
    {
      "_id": "sc-1",
      "categoryName": "Programming & AI/ML",
      "icon": "Code",
      "skills": [
        {
          "name": "Python",
          "icon": "FileCode",
          "proficiency": 95,
          "level": "Advanced"
        },
        {
          "name": "PyTorch & Deep Learning",
          "icon": "Flame",
          "proficiency": 90,
          "level": "Advanced"
        },
        {
          "name": "Computer Vision (OpenCV/YOLO)",
          "icon": "Eye",
          "proficiency": 88,
          "level": "Advanced"
        },
        {
          "name": "RAG Systems & LangChain",
          "icon": "Network",
          "proficiency": 92,
          "level": "Advanced"
        },
        {
          "name": "Java & OOP",
          "icon": "Coffee",
          "proficiency": 82,
          "level": "Proficient"
        },
        {
          "name": "SQL & Database Architecture",
          "icon": "Database",
          "proficiency": 85,
          "level": "Proficient"
        }
      ]
    },
    {
      "_id": "sc-2",
      "categoryName": "Frameworks & Full-Stack",
      "icon": "Layers",
      "skills": [
        {
          "name": "React & TypeScript",
          "icon": "Atom",
          "proficiency": 90,
          "level": "Advanced"
        },
        {
          "name": "Tailwind CSS",
          "icon": "Palette",
          "proficiency": 94,
          "level": "Advanced"
        },
        {
          "name": "Node.js & Express",
          "icon": "Server",
          "proficiency": 86,
          "level": "Proficient"
        },
        {
          "name": "FastAPI & REST APIs",
          "icon": "Zap",
          "proficiency": 90,
          "level": "Advanced"
        },
        {
          "name": "FAISS & ChromaDB Vector Stores",
          "icon": "Search",
          "proficiency": 88,
          "level": "Advanced"
        },
        {
          "name": "Pandas, NumPy & Scikit-Learn",
          "icon": "Activity",
          "proficiency": 92,
          "level": "Advanced"
        }
      ]
    },
    {
      "_id": "sc-3",
      "categoryName": "Analytics & Operations",
      "icon": "BarChart3",
      "skills": [
        {
          "name": "Advanced Excel & Power BI",
          "icon": "Sheet",
          "proficiency": 88,
          "level": "Advanced"
        },
        {
          "name": "MIS Reporting & Dashboards",
          "icon": "LayoutDashboard",
          "proficiency": 90,
          "level": "Advanced"
        },
        {
          "name": "WIP Tracking & Operations",
          "icon": "CheckSquare",
          "proficiency": 85,
          "level": "Proficient"
        },
        {
          "name": "Git & GitHub Collaboration",
          "icon": "GitBranch",
          "proficiency": 92,
          "level": "Advanced"
        },
        {
          "name": "Docker & Containerization",
          "icon": "Box",
          "proficiency": 78,
          "level": "Intermediate"
        },
        {
          "name": "Linux & Bash Scripting",
          "icon": "Terminal",
          "proficiency": 84,
          "level": "Proficient"
        }
      ]
    }
  ],
  "messages": [
    {
      "_id": "msg-1",
      "name": "Dr. Tariqul Islam",
      "email": "tariqul.research@university.edu",
      "subject": "Inquiry regarding MedRAG-VQA Preprint",
      "message": "Hi Syeed, I reviewed your recent work on multimodal clinical retrieval and would like to explore a potential collaboration with our lab at EWU.",
      "createdAt": "2026-08-10T14:32:00Z",
      "isRead": false
    },
    {
      "_id": "msg-2",
      "name": "Sarah Rahman",
      "email": "sarah.tech@innovate.io",
      "subject": "Interview for AI Engineering Role",
      "message": "Hello Syeed, Your portfolio and work on RAG pipelines with FAISS is impressive. We would love to schedule a technical discussion regarding an open AI Engineer position.",
      "createdAt": "2026-08-12T09:15:00Z",
      "isRead": true
    }
  ],
  "cv": {
    "filename": "Kha_Mo_Syeed_Asif.pdf",
    "uploadedAt": "2026-09-27T18:06:02.111Z",
    "fileUrl": "/initial-data-assets/4eb6ba779936807462992cccec0746c05225b9e7801a8bc830af5ff9cde1b2bc.pdf",
    "previewEnabled": true,
    "sizeBytes": 224675,
    "fileData": "/initial-data-assets/4eb6ba779936807462992cccec0746c05225b9e7801a8bc830af5ff9cde1b2bc.pdf"
  }
};
