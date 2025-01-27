import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { PrismaClient } from '@prisma/client'

// Get integration details and status
export async function GET(
  request: Request,
  { params }: { params: { integrationId: string } }
) {
  try {
    const integration = await prisma.integration.findUnique({
      where: {
        id: params.integrationId
      },
      include: {
        settings: true,
        lastSync: true,
        provider: true // Include provider details (Slack, Stripe etc)
      }
    })

    if (!integration) {
      return NextResponse.json(
        { error: 'Integration not found' },
        { status: 404 }
      )
    }

    // Check if integration is currently active
    const isActive = integration.enabled && 
      integration.lastSync?.status === 'SUCCESS' &&
      integration.settings?.apiKey

    return NextResponse.json({
      ...integration,
      status: {
        isActive,
        lastSyncTime: integration.lastSync?.timestamp,
        lastSyncStatus: integration.lastSync?.status,
        errorDetails: integration.lastSync?.details
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch integration details' },
      { status: 500 }
    )
  }
}

// Update integration configuration
export async function PATCH(
  request: Request,
  { params }: { params: { integrationId: string } }
) {
  try {
    const body = await request.json()

    // Validate required configuration based on provider
    if (!body.settings?.apiKey || !body.settings?.webhookUrl) {
      return NextResponse.json(
        { error: 'Missing required configuration' },
        { status: 400 }
      )
    }

    const integration = await prisma.integration.update({
      where: {
        id: params.integrationId
      },
      data: {
        enabled: body.enabled,
        settings: {
          upsert: {
            create: {
              apiKey: body.settings.apiKey,
              webhookUrl: body.settings.webhookUrl,
              customConfig: body.settings.customConfig
            },
            update: {
              apiKey: body.settings.apiKey,
              webhookUrl: body.settings.webhookUrl,
              customConfig: body.settings.customConfig
            }
          }
        },
        lastSync: {
          upsert: {
            create: {
              timestamp: new Date(),
              status: 'PENDING', // New config needs validation
              details: 'Configuration updated, pending validation'
            },
            update: {
              timestamp: new Date(),
              status: 'PENDING',
              details: 'Configuration updated, pending validation'
            }
          }
        }
      },
      include: {
        settings: true,
        lastSync: true,
        provider: true
      }
    })

    // Create audit log for the configuration update
    await prisma.auditLog.create({
      data: {
        user_id: body.userId,
        action: 'UPDATE_INTEGRATION_CONFIG',
        entity_type: 'INTEGRATION',
        entity_id: params.integrationId,
        changes: {
          enabled: body.enabled,
          configUpdated: true,
          provider: integration.provider.name
        }
      }
    })

    return NextResponse.json(integration)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update integration configuration' },
      { status: 500 }
    )
  }
}

// Delete integration and cleanup
export async function DELETE(
  request: Request,
  { params }: { params: { integrationId: string } }
) {
  try {
    const integration = await prisma.integration.findUnique({
      where: {
        id: params.integrationId
      },
      include: {
        provider: true
      }
    })

    if (!integration) {
      return NextResponse.json(
        { error: 'Integration not found' },
        { status: 404 }
      )
    }

    // Delete integration and related data
    await prisma.$transaction([
      prisma.integrationSettings.deleteMany({
        where: { integrationId: params.integrationId }
      }),
      prisma.integrationSync.deleteMany({
        where: { integrationId: params.integrationId }
      }),
      prisma.integration.delete({
        where: { id: params.integrationId }
      })
    ])

    return NextResponse.json({ 
      message: `${integration.provider.name} integration deleted successfully`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete integration' },
      { status: 500 }
    )
  }
}
