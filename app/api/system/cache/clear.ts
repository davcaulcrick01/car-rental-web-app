import { NextResponse } from 'next/server'

// Mock cache implementation - replace with actual cache service
let mockCache: Record<string, any> = {}

// Get cache status
export async function GET() {
  try {
    const cacheStatus = {
      size: Object.keys(mockCache).length,
      lastCleared: new Date().toISOString(),
      status: 'active'
    }
    
    return NextResponse.json(cacheStatus)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get cache status' },
      { status: 500 }
    )
  }
}

// Clear cache
export async function POST() {
  try {
    // Clear mock cache
    mockCache = {}
    
    return NextResponse.json({
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}
