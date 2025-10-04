const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Customer } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

async function register(req, res) {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email y password requeridos' });

  const existing = await Customer.findOne({ where: { email } });
  if (existing) return res.status(409).json({ message: 'Email ya registrado' });

  const password_hash = await bcrypt.hash(password, 10);
  const customer = await Customer.create({ firstName, lastName, email, phone, password_hash });
  const token = signToken({ id: customer.id, email: customer.email });
  res.status(201).json({ token, customer: { id: customer.id, firstName, lastName, email, phone } });
}

async function login(req, res) {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ where: { email } });
  if (!customer || !customer.password_hash) return res.status(401).json({ message: 'Credenciales inválidas' });
  const ok = await bcrypt.compare(password, customer.password_hash);
  if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });
  const token = signToken({ id: customer.id, email: customer.email });
  res.json({ token, customer: { id: customer.id, firstName: customer.firstName, lastName: customer.lastName, email: customer.email, phone: customer.phone } });
}

async function me(req, res) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No autorizado' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const customer = await Customer.findByPk(payload.id);
    if (!customer) return res.status(401).json({ message: 'No autorizado' });
    res.json({ id: customer.id, firstName: customer.firstName, lastName: customer.lastName, email: customer.email, phone: customer.phone });
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = { register, login, me };
