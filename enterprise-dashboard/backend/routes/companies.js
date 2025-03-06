const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a company
router.post('/', async (req, res) => {
    const company = new Company(req.body);
    try {
        const newCompany = await company.save();
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a company
router.put('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        Object.assign(company, req.body);
        await company.save();
        res.json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a company
router.delete('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        await company.remove();
        res.json({ message: 'Company deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// QSA Routes
router.post('/:id/qsa', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        company.qsa.push(req.body);
        await company.save();
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id/qsa/:partnerId', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        const partner = company.qsa.id(req.params.partnerId);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        Object.assign(partner, req.body);
        await company.save();
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id/qsa/:partnerId', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        company.qsa.id(req.params.partnerId).remove();
        await company.save();
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Tax Profile Routes
router.put('/:id/tax-profile', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        company.taxProfile = req.body;
        await company.save();
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 