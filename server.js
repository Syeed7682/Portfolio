const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');

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

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

const uri = process.env.MONGODB_URI || "mongodb+srv://ahadullahfahim:sifat2026@cluster0.0t0c8gg.mongodb.net/";
const client = new MongoClient(uri);

let db;
let eventsCollection;
let certCollection;
let projectsCollection;
let publicationsCollection;

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");
        db = client.db("Portfolio");
        eventsCollection = db.collection("achievements");
        certCollection = db.collection("certificates");
        projectsCollection = db.collection("projects");
        publicationsCollection = db.collection("publications");

        // Migration: Add existing projects if empty
        const projectCount = await projectsCollection.countDocuments();
        if (projectCount === 0) {
            const initialProjects = [
                {
                    title: "MedRAG-VQA",
                    description: "Multimodal RAG pipeline for clinical Q&A on X-rays/MRIs using BiomedCLIP and LLaVA-1.5-7B.",
                    image: "image/og_preview.png",
                    link: "https://github.com/Syeed7682",
                    type: "AI / ML",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "FAISS Similarity Search",
                    description: "Benchmarking FAISS indexes (HNSW, IVFFlat) on SIFT1M dataset with performance visualizations.",
                    image: "image/og_preview.png",
                    link: "https://github.com/Syeed7682",
                    type: "Data Science",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "IoT Smart Home",
                    description: "Real-time monitoring and control system for Tuya IoT devices with environmental analytics.",
                    image: "image/og_preview.png",
                    link: "https://github.com/Syeed7682",
                    type: "IoT",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "E-Commerce System",
                    description: "Complete e-commerce platform with secure payment integration.",
                    image: "image/og_preview.png",
                    link: "https://github.com/Syeed7682",
                    type: "Web App",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Hospital Management System",
                    description: "Comprehensive hospital management solution with GUI built in Java.",
                    image: "image/og_preview.png",
                    link: "https://github.com/Syeed7682/Hospital-Management-System-Java",
                    type: "Desktop App",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Expense Tracker",
                    description: "Personal expense management and analytics tool.",
                    image: "image/og_preview.png",
                    link: "https://github.com/Syeed7682/Expance-Tracker",
                    type: "Web App",
                    createdAt: new Date().toISOString()
                },
                {
                    title: "Carbon Emission Calculator",
                    description: "Environmental impact calculator for sustainability tracking.",
                    image: "image/og_preview.png",
                    link: "https://github.com/Syeed7682/Carbon-Emission-Calculator",
                    type: "Utility",
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
connectDB();

// Admin Route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Generic CRUD helper (optional but kept explicit for clarity)

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
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        if (!eventsCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await eventsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ message: 'Deleted' });
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
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/certificates/:id', async (req, res) => {
    try {
        if (!certCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await certCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ message: 'Deleted' });
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
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        if (!projectsCollection) return res.status(500).json({ error: "DB not connected" });
        const result = await projectsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ message: 'Deleted' });
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
