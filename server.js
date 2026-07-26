require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
        const { title, description, link, authors, conference, year } = req.body;
        const result = await publicationsCollection.insertOne({
            title,
            description,
            link,
            authors,
            conference,
            year,
            createdAt: new Date().toISOString()
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/publications/:id', async (req, res) => {
    try {
        if (!publicationsCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await publicationsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error' });
    }
});

app.put('/api/publications/:id', async (req, res) => {
    try {
        if (!publicationsCollection) return res.status(500).json({ error: "DB not connected" });
        const { title, description, link, authors, conference, year } = req.body;
        const result = await publicationsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { title, description, link, authors, conference, year, updatedAt: new Date().toISOString() } }
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
        const { title, description, image } = req.body;
        const result = await eventsCollection.insertOne({
            title,
            description,
            image,
            createdAt: new Date().toISOString()
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        if (!eventsCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await eventsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error' });
    }
});

app.put('/api/events/:id', async (req, res) => {
    try {
        if (!eventsCollection) return res.status(500).json({ error: "DB not connected" });
        const { title, description, image } = req.body;
        const result = await eventsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { title, description, image, updatedAt: new Date().toISOString() } }
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
        const { title, description, image } = req.body;
        const result = await certCollection.insertOne({
            title,
            description,
            image,
            createdAt: new Date().toISOString()
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/certificates/:id', async (req, res) => {
    try {
        if (!certCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await certCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error' });
    }
});

app.put('/api/certificates/:id', async (req, res) => {
    try {
        if (!certCollection) return res.status(500).json({ error: "DB not connected" });
        const { title, description, image } = req.body;
        const result = await certCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { title, description, image, updatedAt: new Date().toISOString() } }
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
        const { title, description, image, link, type } = req.body;
        const result = await projectsCollection.insertOne({
            title,
            description,
            image,
            link,
            type,
            createdAt: new Date().toISOString()
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        if (!projectsCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await projectsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error' });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        if (!projectsCollection) return res.status(500).json({ error: "DB not connected" });
        const { title, description, image, link, type } = req.body;
        const result = await projectsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { title, description, image, link, type, updatedAt: new Date().toISOString() } }
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

        console.log(`[Email] GMAIL_USER: ${gmailUser}`);
        console.log(`[Email] GMAIL_PASS set: ${!!gmailPass}`);

        if (gmailPass) {
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
                subject: `New Portfolio Message: ${subject}`,
                html: `
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
                `
            };

            transporter.sendMail(mailOptions)
                .then(info => console.log('[Email] Sent successfully:', info.messageId))
                .catch(err => console.error('[Email] Failed:', err.message));
        } else {
            console.warn('[Email] GMAIL_PASS not set — email forwarding skipped.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Test email endpoint (for debugging)
app.get('/api/test-email', async (req, res) => {
    const gmailUser = process.env.GMAIL_USER || 'kmsyeedasif@gmail.com';
    const gmailPass = process.env.GMAIL_PASS;

    if (!gmailPass) {
        return res.json({ ok: false, error: 'GMAIL_PASS environment variable is not set.' });
    }

    try {
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
            subject: 'Test Email from Portfolio Server',
            text: 'This is a test email to confirm your Nodemailer setup is working correctly!'
        });

        res.json({ ok: true, messageId: info.messageId, response: info.response });
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
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// Admin Route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
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
