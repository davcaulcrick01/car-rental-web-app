import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get notification template details
export async function GET(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  try {
    const template = await prisma.notificationTemplate.findUnique({
      where: {
        id: params.templateId
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(template)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch template details' },
      { status: 500 }
    )
  }
}

// Update notification template
export async function PATCH(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  try {
    const body = await request.json()
    const template = await prisma.notificationTemplate.update({
      where: {
        id: params.templateId
      },
      data: {
        name: body.name,
        subject: body.subject,
        content: body.content,
        type: body.type,
        isActive: body.isActive
      }
    })

    return NextResponse.json(template)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    )
  }
}

// Delete notification template
export async function DELETE(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  try {
    const template = await prisma.notificationTemplate.delete({
      where: {
        id: params.templateId
      }
    })

    return NextResponse.json({
      message: 'Template deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    )
  }
}
