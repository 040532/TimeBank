import express from 'express';
import prisma from '../prisma';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();

// list offers
router.get('/', async (req, res) => {
  const offers = await prisma.offer.findMany({
    include: { owner: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(offers);
});

// create offer
router.post('/', auth, async (req: AuthRequest, res) => {
  const { title, description, durationMinutes, creditsRate } = req.body;
  if (!title || !durationMinutes || !creditsRate) return res.status(400).json({ error: 'Missing fields' });
  const offer = await prisma.offer.create({
    data: {
      title,
      description,
      durationMinutes: Number(durationMinutes),
      creditsRate: Number(creditsRate),
      ownerId: req.user.id,
    },
  });
  res.json(offer);
});

// book an offer -> create a Request (status pending)
router.post('/:id/book', auth, async (req: AuthRequest, res) => {
  const offerId = Number(req.params.id);
  const { scheduledAt } = req.body;
  const offer = await prisma.offer.findUnique({ where: { id: offerId } });
  if (!offer) return res.status(404).json({ error: 'Offer not found' });
  const request = await prisma.request.create({
    data: {
      offerId,
      requesterId: req.user.id,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      status: 'pending',
    },
  });
  res.json(request);
});

export default router;
