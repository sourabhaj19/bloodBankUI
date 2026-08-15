const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8090;

// In-memory seed data
let countries = [ { id: 1, name: 'India' }, { id: 2, name: 'USA' } ];
let states = [ { id: 1, countryId: 1, name: 'Karnataka' }, { id: 2, countryId: 1, name: 'Maharashtra' }, { id: 3, countryId: 2, name: 'California' } ];
let cities = [ { id: 1, stateId: 1, name: 'Bengaluru' }, { id: 2, stateId: 2, name: 'Mumbai' }, { id: 3, stateId: 3, name: 'San Francisco' } ];

let users = [
  {
    id: 1,
    fullName: 'Alice Smith',
    email: 'admin@gmail.com',
    phonePrefix: '+91',
    phone: '9876500000',
    bloodGroup: 'A+',
    age: 30,
    gender: 'female',
    country: 'India',
    state: 'Karnataka',
    city: 'Bengaluru',
    address: 'MG Road',
    latitude: 12.9716,
    longitude: 77.5946,
    isAvailable: true
  },
  {
    id: 2,
    fullName: 'Bob Johnson',
    email: 'bob@example.com',
    phonePrefix: '+1',
    phone: '4150001111',
    bloodGroup: 'O-',
    age: 40,
    gender: 'male',
    country: 'USA',
    state: 'California',
    city: 'San Francisco',
    address: 'Market Street',
    latitude: 37.7749,
    longitude: -122.4194,
    isAvailable: true
  }
];

let nextUserId = 3;

// Helpers
function filterUsersByQuery(query) {
  // Accept keys like 'bloodGroup.equals', 'city.equals', 'state.equals', 'gender.equals', 'country.equals'
  let out = users.slice();
  for (const key in query) {
    const val = query[key];
    if (!val) continue;
    if (key.endsWith('.equals')) {
      const prop = key.replace('.equals', '');
      out = out.filter(u => String(u[prop]) === String(val) || String(u[prop]) === String(val));
      // support city/state/country where user stores simple names
      if (prop === 'city' || prop === 'state' || prop === 'country') {
        out = users.filter(u => String(u[prop]) === String(val));
      }
    }
  }
  return out;
}

// Routes
app.get('/api/country', (req, res) => {
  res.json({ content: countries });
});

app.get('/api/state', (req, res) => {
  const q = req.query['countryId.equals'];
  if (q) {
    const matched = states.filter(s => String(s.countryId) === String(q));
    return res.json({ content: matched });
  }
  res.json({ content: states });
});

app.get('/api/city', (req, res) => {
  const q = req.query['stateId.equals'];
  if (q) {
    const matched = cities.filter(c => String(c.stateId) === String(q));
    return res.json({ content: matched });
  }
  res.json({ content: cities });
});

app.get('/api/users', (req, res) => {
  const filtered = filterUsersByQuery(req.query);
  res.json({ content: filtered });
});

app.post('/api/users/register', (req, res) => {
  const payload = req.body || {};
  const user = Object.assign({}, payload, { id: nextUserId++ });
  users.push(user);
  res.status(201).json(user);
});

app.put('/api/users', (req, res) => {
  const payload = req.body || {};
  if (!payload.id) return res.status(400).json({ error: 'Missing id' });
  const idx = users.findIndex(u => u.id === payload.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx] = Object.assign({}, users[idx], payload);
  res.json(users[idx]);
});

app.get('/api/users/available-blood', (req, res) => {
  const blood = Array.from(new Set(users.map(u => u.bloodGroup).filter(Boolean)));
  res.json(blood);
});

app.post('/api/users/users-by-query', (req, res) => {
  const q = req.body || {};
  const matched = filterUsersByQuery(q);
  res.json({ content: matched });
});

app.get('/api/users/nearby', (req, res) => {
  // very naive: return users with isAvailable true
  const nearby = users.filter(u => u.isAvailable);
  res.json(nearby);
});

app.post('/api/auth/forgot-password', (req, res) => {
  // pretend to send OTP
  res.json({ message: 'OTP sent' });
});

app.post('/api/users/change-password', (req, res) => {
  res.json({ message: 'password changed' });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  // For demo return user and fake token
  res.json({ user, token: 'fake-jwt-token' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
