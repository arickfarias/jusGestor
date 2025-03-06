const mongoose = require('mongoose');

const qsaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    participation: { type: Number, required: true },
    role: { type: String, required: true }
});

const taxProfileSchema = new mongoose.Schema({
    regime: { type: String, required: true },
    category: { type: String, required: true },
    mainActivity: { type: String, required: true },
    taxRate: { type: Number, required: true }
});

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    qsa: [qsaSchema],
    taxProfile: taxProfileSchema
});

module.exports = mongoose.model('Company', companySchema);