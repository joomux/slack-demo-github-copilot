/**
 * Claims API Demo Application
 * This file contains INTENTIONAL ERRORS for CI/CD demo purposes
 */

import express, { Request, Response } from 'express';
import { encrypt, decrypt, generateKey, deriveKeyFromPassword } from './crypto';

const app = express();
app.use(express.json());

// Sample claims data
interface Claim {
  id: number;
  claimant: string;
  amount: number;
  status: 'pending' | 'approved' | 'denied';
}

const claims: Claim[] = [
  { id: 1, claimant: 'John Doe', amount: 1500.00, status: 'pending' },
  { id: 2, claimant: 'Jane Smith', amount: 2300.50, status: 'approved' },
  { id: 3, claimant: 'Bob Johnson', amount: 750.00, status: 'denied' }
];

// Hello World endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// GET all claims - INTENTIONAL ERROR: undefined variable
app.get('/api/claims', (req: Request, res: Response) => {
  res.json({ 
    claims: claims,
    total: totalCount  // ERROR: 'totalCount' is not defined
  });
});

// GET single claim - INTENTIONAL ERROR: wrong type comparison
app.get('/api/claims/:id', (req: Request, res: Response) => {
  const claimId: string = req.params.id;
  
  // ERROR: comparing string to number without conversion
  const claim = claims.find(c => c.id === claimId);  // Type error: string vs number
  
  if (claim) {
    res.json(claim);
  } else {
    res.status(404).json({ error: 'Claim not found' });
  }
});

// POST create claim - INTENTIONAL ERROR: missing property
app.post('/api/claims', (req: Request, res: Response) => {
  const newClaim: Claim = {
    id: claims.length + 1,
    claimant: req.body.claimant,
    amount: req.body.amount
    // ERROR: missing required 'status' property
  };
  
  claims.push(newClaim);
  res.status(201).json(newClaim);
});

// DELETE claim - INTENTIONAL ERROR: possibly undefined variable
app.delete('/api/claims/:id', (req: Request, res: Response) => {
  const claimId = parseInt(req.params.id);
  let deletedClaim: Claim;  // ERROR: used before being assigned
  
  const index = claims.findIndex(c => c.id === claimId);
  if (index !== -1) {
    deletedClaim = claims.splice(index, 1)[0];
  }
  
  // ERROR: deletedClaim might not be assigned
  res.json({ message: 'Claim deleted', claim: deletedClaim });
});

// Health check - INTENTIONAL ERROR: syntax error (missing closing brace)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'healthy',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  // ERROR: missing closing brace and parenthesis
});

// ============ ENCRYPTION ENDPOINTS ============

// POST encrypt data
app.post('/api/encrypt', (req: Request, res: Response) => {
  const { plaintext, key } = req.body;
  
  if (!plaintext) {
    res.status(400).json({ error: 'plaintext is required' });
    return;
  }
  
  try {
    const encrypted = encrypt(plaintext, key);
    res.json({
      success: true,
      encrypted
    });
  } catch (error) {
    res.status(500).json({ error: 'Encryption failed' });
  }
});

// POST decrypt data
app.post('/api/decrypt', (req: Request, res: Response) => {
  const { encryptedData, key } = req.body;
  
  if (!encryptedData) {
    res.status(400).json({ error: 'encryptedData is required' });
    return;
  }
  
  try {
    const decrypted = decrypt(encryptedData, key);
    res.json({
      success: true,
      decrypted
    });
  } catch (error) {
    res.status(500).json({ error: 'Decryption failed - invalid key or corrupted data' });
  }
});

// GET generate a new encryption key
app.get('/api/crypto/generate-key', (req: Request, res: Response) => {
  const key = generateKey();
  res.json({
    key,
    algorithm: 'AES-256-GCM',
    keyLength: '256 bits'
  });
});

// POST derive key from password
app.post('/api/crypto/derive-key', (req: Request, res: Response) => {
  const { password, salt } = req.body;
  
  if (!password) {
    res.status(400).json({ error: 'password is required' });
    return;
  }
  
  try {
    const derived = deriveKeyFromPassword(password, salt);
    res.json({
      success: true,
      ...derived
    });
  } catch (error) {
    res.status(500).json({ error: 'Key derivation failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
