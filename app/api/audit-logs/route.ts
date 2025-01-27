import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const entry = await request.json()
  
  try {
    const auditLog = await prisma.auditLog.create({
      data: {
        user_id: entry.userId,
        action: entry.action,
        entity_type: entry.entityType,
        entity_id: entry.entityId,
        changes: entry.changes,
        ip_address: entry.ipAddress,
        user_agent: entry.userAgent,
      }
    })
    return NextResponse.json(auditLog)
  } catch (error) {
    console.error('Failed to create audit log:', error)
    return NextResponse.json({ error: 'Failed to create audit log' }, { status: 500 })
  }
} 