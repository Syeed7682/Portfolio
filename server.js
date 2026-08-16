require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve Vite React build (production)
const DIST_DIR = path.join(__dirname, 'dist');
app.use(express.static(DIST_DIR));

// Serve assets folder since database contains paths like /src/assets/...
app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));

// Health check endpoints for UptimeRobot / uptime monitoring (prevents server sleep)
app.get(['/health', '/api/health', '/ping'], (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is healthy and active',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

let portfolioDataCache = null;
const clearCache = () => {
    console.log('[Cache] Clearing in-memory portfolio cache');
    portfolioDataCache = null;
};

const safeIdFilter = (idStr) => {
    if (!idStr) return { _id: idStr };
    try {
        if (ObjectId.isValid(idStr) && String(new ObjectId(idStr)) === String(idStr)) {
            return { $or: [{ _id: new ObjectId(idStr) }, { _id: String(idStr) }] };
        }
    } catch (e) {
        // Fallback to string matching
    }
    return { _id: String(idStr) };
};

// Combined Portfolio Data API (with caching)
app.get('/api/portfolio-data', async (req, res) => {
    try {
        if (portfolioDataCache) {
            console.log('[Cache] Serving portfolio data from in-memory cache');
            return res.json(portfolioDataCache);
        }
        
        console.log('[Cache] Cache miss. Querying MongoDB...');
        if (!eventsCollection || !certCollection || !projectsCollection || !publicationsCollection) {
            return res.status(500).json({ error: "DB not connected" });
        }

        const [events, certs, projects, publications, experience, configDoc] = await Promise.all([
            eventsCollection.find().sort({ _id: -1 }).toArray(),
            certCollection.find().sort({ _id: -1 }).toArray(),
            projectsCollection.find().sort({ _id: -1 }).toArray(),
            publicationsCollection.find().sort({ _id: -1 }).toArray(),
            experienceCollection ? experienceCollection.find().sort({ _id: -1 }).toArray() : Promise.resolve([]),
            configCollection ? configCollection.findOne({ _id: 'global' }) : Promise.resolve(null)
        ]);

        portfolioDataCache = { events, certs, projects, publications, experience, config: configDoc };
        res.json(portfolioDataCache);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Auto-clear cache middleware for portfolio mutations
app.use((req, res, next) => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        const path = req.path;
        if (path.startsWith('/api/publications') || 
            path.startsWith('/api/events') || 
            path.startsWith('/api/certificates') || 
            path.startsWith('/api/projects') ||
            path.startsWith('/api/experience') ||
            path.startsWith('/api/config')) {
            clearCache();
        }
    }
    next();
});

// Site Configuration API
app.get('/api/config', async (req, res) => {
    try {
        if (!configCollection) return res.status(500).json({ error: "DB not connected" });
        const config = await configCollection.findOne({ _id: 'global' });
        res.json(config || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/config', async (req, res) => {
    try {
        if (!configCollection) return res.status(500).json({ error: "DB not connected" });
        const updateData = { ...req.body, updatedAt: new Date().toISOString() };
        delete updateData._id;

        await configCollection.updateOne(
            { _id: 'global' },
            { $set: updateData },
            { upsert: true }
        );
        clearCache();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Publications API
app.get('/api/publications', async (req, res) => {
    try {
        if (!publicationsCollection) return res.status(500).json({ error: "DB not connected" });
        const pubs = await publicationsCollection.find().sort({ _id: -1 }).toArray();
        res.json(pubs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/publications', async (req, res) => {
    try {
        if (!publicationsCollection) return res.status(500).json({ error: "DB not connected" });
        const doc = {
            ...req.body,
            createdAt: req.body.createdAt || new Date().toISOString()
        };
        delete doc._id;
        const result = await publicationsCollection.insertOne(doc);
        res.status(201).json({ ...doc, _id: String(result.insertedId) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/publications/:id', async (req, res) => {
    try {
        if (!publicationsCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await publicationsCollection.deleteOne(safeIdFilter(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
    }
});

app.put('/api/publications/:id', async (req, res) => {
    try {
        if (!publicationsCollection) return res.status(500).json({ error: "DB not connected" });
        const updateData = { ...req.body, updatedAt: new Date().toISOString() };
        delete updateData._id;
        const result = await publicationsCollection.updateOne(
            safeIdFilter(req.params.id),
            { $set: updateData }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Events API
app.get('/api/events', async (req, res) => {
    try {
        if (!eventsCollection) return res.status(500).json({ error: "DB not connected" });
        const events = await eventsCollection.find().sort({ _id: -1 }).toArray();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        if (!eventsCollection) return res.status(500).json({ error: "DB not connected" });
        const doc = {
            ...req.body,
            category: req.body.category || 'events',
            createdAt: req.body.createdAt || new Date().toISOString()
        };
        delete doc._id;
        const result = await eventsCollection.insertOne(doc);
        res.status(201).json({ ...doc, _id: String(result.insertedId) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        if (!eventsCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await eventsCollection.deleteOne(safeIdFilter(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
    }
});

app.put('/api/events/:id', async (req, res) => {
    try {
        if (!eventsCollection) return res.status(500).json({ error: "DB not connected" });
        const updateData = { ...req.body, updatedAt: new Date().toISOString() };
        delete updateData._id;
        const result = await eventsCollection.updateOne(
            safeIdFilter(req.params.id),
            { $set: updateData }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Certificates API
app.get('/api/certificates', async (req, res) => {
    try {
        if (!certCollection) return res.status(500).json({ error: "DB not connected" });
        const certs = await certCollection.find().sort({ _id: -1 }).toArray();
        res.json(certs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/certificates', async (req, res) => {
    try {
        if (!certCollection) return res.status(500).json({ error: "DB not connected" });
        const doc = {
            ...req.body,
            category: req.body.category || 'certificates',
            createdAt: req.body.createdAt || new Date().toISOString()
        };
        delete doc._id;
        const result = await certCollection.insertOne(doc);
        res.status(201).json({ ...doc, _id: String(result.insertedId) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/certificates/:id', async (req, res) => {
    try {
        if (!certCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await certCollection.deleteOne(safeIdFilter(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
    }
});

app.put('/api/certificates/:id', async (req, res) => {
    try {
        if (!certCollection) return res.status(500).json({ error: "DB not connected" });
        const updateData = { ...req.body, updatedAt: new Date().toISOString() };
        delete updateData._id;
        const result = await certCollection.updateOne(
            safeIdFilter(req.params.id),
            { $set: updateData }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Projects API
app.get('/api/projects', async (req, res) => {
    try {
        if (!projectsCollection) return res.status(500).json({ error: "DB not connected" });
        const projects = await projectsCollection.find().sort({ _id: -1 }).toArray();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        if (!projectsCollection) return res.status(500).json({ error: "DB not connected" });
        const doc = {
            ...req.body,
            createdAt: req.body.createdAt || new Date().toISOString()
        };
        delete doc._id;
        const result = await projectsCollection.insertOne(doc);
        res.status(201).json({ ...doc, _id: String(result.insertedId) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        if (!projectsCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await projectsCollection.deleteOne(safeIdFilter(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        if (!projectsCollection) return res.status(500).json({ error: "DB not connected" });
        const updateData = { ...req.body, updatedAt: new Date().toISOString() };
        delete updateData._id;
        const result = await projectsCollection.updateOne(
            safeIdFilter(req.params.id),
            { $set: updateData }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Education & Experience API
app.get('/api/experience', async (req, res) => {
    try {
        if (!experienceCollection) return res.status(500).json({ error: "DB not connected" });
        const items = await experienceCollection.find().sort({ _id: -1 }).toArray();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/experience', async (req, res) => {
    try {
        if (!experienceCollection) return res.status(500).json({ error: "DB not connected" });
        const doc = {
            ...req.body,
            createdAt: req.body.createdAt || new Date().toISOString()
        };
        delete doc._id;
        const result = await experienceCollection.insertOne(doc);
        res.status(201).json({ ...doc, _id: String(result.insertedId) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/experience/:id', async (req, res) => {
    try {
        if (!experienceCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await experienceCollection.deleteOne(safeIdFilter(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
    }
});

app.put('/api/experience/:id', async (req, res) => {
    try {
        if (!experienceCollection) return res.status(500).json({ error: "DB not connected" });
        const updateData = { ...req.body, updatedAt: new Date().toISOString() };
        delete updateData._id;
        const result = await experienceCollection.updateOne(
            safeIdFilter(req.params.id),
            { $set: updateData }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Messages API
app.get('/api/messages', async (req, res) => {
    try {
        if (!messagesCollection) return res.status(500).json({ error: "DB not connected" });
        const msgs = await messagesCollection.find().sort({ _id: -1 }).toArray();
        res.json(msgs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        if (!messagesCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await messagesCollection.deleteOne(safeIdFilter(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err.message });
    }
});

app.put('/api/messages/:id', async (req, res) => {
    try {
        if (!messagesCollection) return res.status(500).json({ error: "DB not connected" });
        const updateData = { ...req.body, updatedAt: new Date().toISOString() };
        delete updateData._id;
        const result = await messagesCollection.updateOne(
            safeIdFilter(req.params.id),
            { $set: updateData }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        if (!messagesCollection) return res.status(500).json({ error: "DB not connected" });
        const { name, email, subject, message } = req.body;
        const result = await messagesCollection.insertOne({
            name,
            email,
            subject,
            message,
            createdAt: new Date().toISOString()
        });

        // Respond immediately so the form doesn't hang
        res.status(201).json(result);

        // Send email in the background (non-blocking)
        const gmailUser = process.env.GMAIL_USER || 'kmsyeedasif@gmail.com';
        const gmailPass = process.env.GMAIL_PASS;
        const resendApiKey = process.env.RESEND_API_KEY;

        console.log(`[Email] RESEND_API_KEY set: ${!!resendApiKey}`);
        console.log(`[Email] GMAIL_USER: ${gmailUser}`);
        console.log(`[Email] GMAIL_PASS set: ${!!gmailPass}`);

        const subjectText = `New Portfolio Message: ${subject}`;
        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">📩 New Portfolio Message</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <h3 style="color: #374151;">Message:</h3>
                <p style="background: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
                <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <p style="color: #9ca3af; font-size: 12px;">Sent from your portfolio at https://portfolio-2-afjx.onrender.com</p>
            </div>
        `;

        if (resendApiKey) {
            // Send via Resend
            const resend = new Resend(resendApiKey);
            resend.emails.send({
                from: 'Portfolio <onboarding@resend.dev>',
                to: 'kmsyeedasif@gmail.com',
                replyTo: email,
                subject: subjectText,
                html: htmlBody
            })
            .then(data => console.log('[Email via Resend] Sent successfully:', data.id || data))
            .catch(err => console.error('[Email via Resend] Failed:', err.message));
        } else if (gmailPass) {
            // Send via Gmail SMTP
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: gmailUser,
                    pass: gmailPass.replace(/\s+/g, '')
                }
            });

            const mailOptions = {
                from: `"Portfolio Contact" <${gmailUser}>`,
                to: 'kmsyeedasif@gmail.com',
                replyTo: email,
                subject: subjectText,
                html: htmlBody
            };

            transporter.sendMail(mailOptions)
                .then(info => console.log('[Email via Gmail] Sent successfully:', info.messageId))
                .catch(err => console.error('[Email via Gmail] Failed:', err.message));
        } else {
            console.warn('[Email] Neither RESEND_API_KEY nor GMAIL_PASS is set — email forwarding skipped.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Test email endpoint (for debugging)
app.get('/api/test-email', async (req, res) => {
    const gmailUser = process.env.GMAIL_USER || 'kmsyeedasif@gmail.com';
    const gmailPass = process.env.GMAIL_PASS;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey && !gmailPass) {
        return res.json({ ok: false, error: 'Neither RESEND_API_KEY nor GMAIL_PASS environment variable is set.' });
    }

    try {
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);
            const response = await resend.emails.send({
                from: 'Portfolio Test <onboarding@resend.dev>',
                to: 'kmsyeedasif@gmail.com',
                subject: 'Test Email from Portfolio Server (via Resend)',
                text: 'This is a test email to confirm your Resend setup is working correctly!'
            });
            return res.json({ ok: true, provider: 'Resend', data: response });
        } else {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: gmailUser,
                    pass: gmailPass.replace(/\s+/g, '')
                }
            });

            await transporter.verify();
            const info = await transporter.sendMail({
                from: `"Portfolio Test" <${gmailUser}>`,
                to: 'kmsyeedasif@gmail.com',
                subject: 'Test Email from Portfolio Server (via Gmail)',
                text: 'This is a test email to confirm your Nodemailer setup is working correctly!'
            });

            return res.json({ ok: true, provider: 'Gmail SMTP', messageId: info.messageId, response: info.response });
        }
    } catch (err) {
        res.json({ ok: false, error: err.message, code: err.code });
    }
});


app.delete('/api/messages/:id', async (req, res) => {
    try {
        if (!messagesCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await messagesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error' });
    }
});

// CV API
app.post('/api/cv', async (req, res) => {
    try {
        if (!cvCollection) return res.status(500).json({ error: "DB not connected" });
        const { data, filename } = req.body;
        await cvCollection.updateOne(
            {},
            { $set: { data, filename, updatedAt: new Date().toISOString() } },
            { upsert: true }
        );
        res.json({ message: "CV uploaded successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/cv/metadata', async (req, res) => {
    try {
        if (!cvCollection) return res.status(500).json({ error: "DB not connected" });
        const cvDoc = await cvCollection.findOne({}, { projection: { data: 0 } });
        res.json(cvDoc || { filename: null });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/cv/download', async (req, res) => {
    try {
        if (!cvCollection) return res.status(500).json({ error: "DB not connected" });
        const cvDoc = await cvCollection.findOne({});
        if (!cvDoc || !cvDoc.data) {
            return res.status(404).send("CV not uploaded yet.");
        }

        const matches = cvDoc.data.match(/^data:(.+);base64,(.+)$/);
        if (!matches) {
            return res.status(500).send("Invalid CV data format.");
        }

        const contentType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `inline; filename="${cvDoc.filename || 'CV.pdf'}"`);
        res.send(buffer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

const uri = process.env.MONGODB_URI || "mongodb+srv://ahadullahfahim:sifat2026@cluster0.0t0c8gg.mongodb.net/";
const client = new MongoClient(uri);

let db;
let eventsCollection;
let certCollection;
let projectsCollection;
let publicationsCollection;
let messagesCollection;
let cvCollection;
let experienceCollection;
let configCollection;

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");
        db = client.db("Portfolio");
        eventsCollection = db.collection("achievements");
        certCollection = db.collection("certificates");
        projectsCollection = db.collection("projects");
        publicationsCollection = db.collection("publications");
        messagesCollection = db.collection("messages");
        cvCollection = db.collection("cv");
        experienceCollection = db.collection("experience");
        configCollection = db.collection("site_config");

        // Migration: Add existing projects if empty
        const projectCount = await projectsCollection.countDocuments();
        if (projectCount === 0) {
            const initialProjects = [
                {
                    title: "MedRAG-VQA",
                    description: "Multimodal RAG pipeline for clinical Q&A on X-rays/MRIs using BiomedCLIP and LLaVA-1.5-7B.",
                    image: "image/rag.png",
                    link: "https://github.com/Syeed7682",
                    type: "AI / ML",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "FAISS Similarity Search",
                    description: "Benchmarking FAISS indexes (HNSW, IVFFlat) on SIFT1M dataset with performance visualizations.",
                    image: "image/faiss.jpg",
                    link: "https://github.com/Syeed7682",
                    type: "Data Science",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "IoT Smart Home",
                    description: "Real-time monitoring and control system for Tuya IoT devices with environmental analytics.",
                    image: "image/iot smart.jpg",
                    link: "https://github.com/Syeed7682",
                    type: "IoT",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Cine-Mela",
                    description: "Movie recommender system with reinforcement learning.",
                    image: "image/cinemela.jpg",
                    link: "https://github.com/Syeed7682",
                    type: "Data Science",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Bangladesh Election Dashboard 2026",
                    description: "Live dashboard for election forecasting and real-time visualization.",
                    image: "image/Election dashboard.jpg",
                    link: "https://github.com/Syeed7682",
                    type: "Data Science",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "E-Commerce System",
                    description: "Complete e-commerce platform with secure payment integration.",
                    image: "image/Portfolio_cover.jpg",
                    link: "https://github.com/Syeed7682",
                    type: "Web App",
                    createdAt: new Date().toISOString()
                }
            ];
            await projectsCollection.insertMany(initialProjects);
            console.log("Projects migrated to MongoDB!");
        }
        // Migration: Add existing publications if empty
        const pubCount = await publicationsCollection.countDocuments();
        if (pubCount === 0) {
            const initialPublications = [
                {
                    title: "Real-Time UAV-Based Building Surface Defect Detection: A Dataset-Driven Lightweight CNN Framework with Grad-CAM Explainability",
                    description: "Achieved 95.39% accuracy with 15 fps inference on Jetson-class edge devices. Integrated Grad-CAM explainability streamed to mobile devices for real-time visual justification.",
                    authors: "Kha. Mo. Syeed Asif, Maherun Nessa Isty, Raihan Ul Islam, Raiyan Gani, Tasmia Islam, M. Saddam Hossain Khan",
                    conference: "2025 International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN)",
                    year: "2025",
                    link: "https://doi.org/10.1109/QPAIN66474.2025.11171763",
                    createdAt: new Date().toISOString()
                }
            ];
            await publicationsCollection.insertMany(initialPublications);
            console.log("Publications migrated to MongoDB!");
        }
        // Migration: Add existing Education & Experience if empty
        const expCount = await experienceCollection.countDocuments();
        if (expCount === 0) {
            const initialExperience = [
                {
                    title: "B.Sc. in Computer Science & Engineering",
                    institution: "East West University, Dhaka",
                    period: "Expected 2026",
                    description: "Major: Data Science",
                    type: "Education",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Higher Secondary Certificate (HSC)",
                    institution: "Comilla Government College",
                    period: "2021",
                    description: "Science Stream",
                    type: "Education",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Secondary School Certificate (SSC)",
                    institution: "Comilla Modern High School",
                    period: "2019",
                    description: "Science Stream",
                    type: "Education",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Full-Stack Developer",
                    institution: "Multiple Projects",
                    period: "2023 - Present",
                    description: "Developed 15+ scalable web applications and ML models.",
                    type: "Experience",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Data Science Enthusiast",
                    institution: "Open Source Community",
                    period: "2024 - Present",
                    description: "Contributing to ML and advanced data analysis projects.",
                    type: "Experience",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Technical Contributor",
                    institution: "Open Source Initiatives",
                    period: "2023 - Present",
                    description: "Active contributor to community-driven projects.",
                    type: "Experience",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Associate Executive",
                    institution: "East West University Robotics Club",
                    period: "2024 - Present",
                    description: "Volunteer Trainer, Event & Logistics Coordinator. Conducted technical training for 200+ members.",
                    type: "Experience",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Dedicated Volunteer",
                    institution: "EWU CSE Fest & Robo Fest 2024",
                    period: "2024",
                    description: "Actively volunteered for EWU CSE Fest and EWURC National Robo Fest 2024, managing logistics and event flow.",
                    type: "Experience",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Leadership Roles",
                    institution: "CGC Science Club",
                    period: "2020 - 2021",
                    description: "Event & Logistics Manager (Science Club) and Volunteer Commanding Officer (Science Fair & Farewell).",
                    type: "Experience",
                    createdAt: new Date().toISOString()
                }
            ];
            await experienceCollection.insertMany(initialExperience);
            console.log("Education & Experience migrated to MongoDB!");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// SPA Catch-all: serve React app for all non-API routes
// The Admin panel is now handled inside the React application
app.get('*', (req, res) => {
    const indexPath = path.join(DIST_DIR, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            // dist not built yet — send a redirect hint
            res.status(503).send(`
                <!DOCTYPE html>
                <html><head><title>Building...</title></head>
                <body style="font-family:sans-serif;text-align:center;padding:60px;background:#0f172a;color:#e2e8f0">
                <h2>🔧 Portfolio is building...</h2>
                <p>Run <code>npm run build</code> then restart the server.</p>
                </body></html>`);
        }
    });
});


const PORT = process.env.PORT || 3000;

// Start server and connect to database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
});
