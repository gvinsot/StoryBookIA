import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const usersPath = path.join(__dirname, '../data/users.json');

/**
 * Normalizes a user record for the referential table.
 * Keeps the raw record intact and adds display-friendly fields.
 */
function normalizeUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };
}

/**
 * Case-insensitive, accent-insensitive match of `term` against `value`.
 */
function matches(value, term) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .includes(term);
}

/**
 * GET /api/users
 * Returns the user referential, optionally filtered by a search query.
 *
 * Query params:
 * - q: free-text search matched against name, email, role (case/accent insensitive)
 *
 * Response: { count, users }
 */
router.get('/', async (req, res) => {
  try {
    const { q = '' } = req.query;

    const raw = await fs.readJson(usersPath);
    const users = Array.isArray(raw) ? raw : [];

    const term = String(q)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .trim();

    const filtered = term
      ? users.filter((user) =>
          matches(user.firstName, term) ||
          matches(user.lastName, term) ||
          matches(`${user.firstName} ${user.lastName}`, term) ||
          matches(user.email, term) ||
          matches(user.role, term)
        )
      : users;

    res.json({
      count: filtered.length,
      users: filtered.map(normalizeUser),
    });
  } catch (error) {
    console.error('❌ Error retrieving users:', error);
    res.status(500).json({ error: error.message });
  }
});

export { router as usersRouter };