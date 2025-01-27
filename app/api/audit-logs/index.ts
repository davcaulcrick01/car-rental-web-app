import { prisma } from '@/lib/db';

// Force this route to run on the Node.js runtime
export const config = {
  runtime: 'nodejs',
};

interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: Record<string, any>;
  created_at: Date;
}

interface AuditLogFilter {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
}

export async function getAuditLogs(filter: AuditLogFilter = {}): Promise<AuditLogEntry[]> {
  const where: any = {};

  if (filter.startDate || filter.endDate) {
    where.created_at = {};
    if (filter.startDate) where.created_at.gte = filter.startDate;
    if (filter.endDate) where.created_at.lte = filter.endDate;
  }

  if (filter.userId) where.user_id = filter.userId;
  if (filter.action) where.action = filter.action;
  if (filter.entityType) where.entity_type = filter.entityType;
  if (filter.entityId) where.entity_id = filter.entityId;

  const logs = await prisma.auditLog.findMany({
    where,
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: true
    }
  });

  // Map database fields to interface fields
  return logs.map((log) => ({
    id: log.id.toString(),
    userId: log.user_id,
    action: log.action,
    entityType: log.entity_type,
    entityId: log.entity_id,
    changes: log.changes as Record<string, any>,
    created_at: log.created_at,
  }));
}

export async function createAuditLog(entry: Omit<AuditLogEntry, 'id' | 'created_at'>): Promise<AuditLogEntry> {
  const newEntry = await prisma.auditLog.create({
    data: {
      user_id: entry.userId,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId,
      changes: entry.changes,
      created_at: new Date(),
    },
    include: {
      user: true
    }
  });

  return {
    id: newEntry.id.toString(),
    userId: newEntry.user_id,
    action: newEntry.action,
    entityType: newEntry.entity_type,
    entityId: newEntry.entity_id,
    changes: newEntry.changes as Record<string, any>,
    created_at: newEntry.created_at,
  };
}
