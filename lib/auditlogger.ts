// lib/auditLogger.ts
'use server';

import { prisma } from '@/lib/db';

interface AuditLogInput {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: any;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(entry: AuditLogInput) {
  if (!prisma) {
    console.error('Prisma client not initialized');
    return;
  }

  try {
    return await prisma.auditLog.create({
      data: {
        user_id: entry.userId,
        action: entry.action,
        entity_type: entry.entityType,
        entity_id: entry.entityId,
        changes: entry.changes,
        ip_address: entry.ipAddress,
        user_agent: entry.userAgent,
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw to prevent disrupting main flow
  }
}
