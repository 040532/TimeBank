import express from 'express';
import prisma from '../prisma';
import { auth, AuthRequest } from '../middleware/auth';
import { Prisma } from '@prisma/client';  // <-- import Prisma types

const router = express.Router();

// ... previous routes unchanged ...

// complete a request (owner marks complete) -> atomic credits transfer
router.post('/:id/complete', auth, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const request = await prisma.request.findUnique({ where: { id }, include: { offer: true, requester: true } });
  if (!request) return res.status(404).json({ error: 'Request not found' });
  const offer = request.offer;
  // only owner of the offer can mark complete
  if (offer.ownerId !== req.user.id) return res.status(403).json({ error: 'Not allowed' });
  if (request.status !== 'accepted') return res.status(400).json({ error: 'Request not accepted' });

  const credits = (offer.durationMinutes / 60) * offer.creditsRate;

  // atomic transaction: update both balances, set request->completed, create transaction
  const result = await prisma.$transaction(async (prismaTx: Prisma.TransactionClient) => {
    // decrement requester balance
    const updatedRequester = await prismaTx.user.update({
      where: { id: request.requesterId },
      data: { balance: { decrement: credits } }
    });
    // increment owner balance
    const updatedOwner = await prismaTx.user.update({
      where: { id: offer.ownerId },
      data: { balance: { increment: credits } }
    });
    // mark request completed
    const updatedRequest = await prismaTx.request.update({
      where: { id },
      data: { status: 'completed' }
    });
    // create transaction log
    const tx = await prismaTx.transaction.create({
      data: {
        fromId: request.requesterId,
        toId: offer.ownerId,
        credits,
        offerId: offer.id,
        requestId: id
      }
    });
    return { updatedRequester, updatedOwner, updatedRequest, tx };
  });

  res.json({ ok: true, creditsTransferred: credits, result });
});

export default router;
