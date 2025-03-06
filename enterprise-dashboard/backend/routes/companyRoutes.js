const express = require('express');
const Company = require('../models/Company');
const router = express.Router();

// Create a new company
router.post('/companies', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).send(company);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all companies
router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.send(companies);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific company by ID
router.get('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send({ error: 'Company not found' });
        }
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a company
router.put('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!company) {
            return res.status(404).send({ error: 'Company not found' });
        }
        res.send(company);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a company
router.delete('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).send({ error: 'Company not found' });
        }
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
});

// QSA Routes
router.post('/companies/:id/qsa', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send({ error: 'Company not found' });
        }
        company.qsa.push(req.body);
        await company.save();
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/companies/:id/qsa/:partnerId', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send({ error: 'Company not found' });
        }
        company.qsa.id(req.params.partnerId).remove();
        await company.save();
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Tax Profile Routes
router.put('/companies/:id/tax-profile', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send({ error: 'Company not found' });
        }
        company.taxProfile = req.body;
        await company.save();
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;