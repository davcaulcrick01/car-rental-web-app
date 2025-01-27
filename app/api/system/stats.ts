import { NextResponse } from 'next/server'
import os from 'os'

export async function GET() {
  try {
    const stats = {
      system: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        uptime: Math.floor(process.uptime()),
        env: process.env.NODE_ENV || 'development'
      },
      memory: {
        total: Math.round(os.totalmem() / (1024 * 1024 * 1024) * 100) / 100, // GB
        free: Math.round(os.freemem() / (1024 * 1024 * 1024) * 100) / 100, // GB
        usage: Math.round((1 - os.freemem() / os.totalmem()) * 100) // Percentage
      },
      cpu: {
        cores: os.cpus().length,
        model: os.cpus()[0].model,
        loadAvg: os.loadavg(),
        usage: process.cpuUsage()
      },
      process: {
        pid: process.pid,
        memoryUsage: {
          heapTotal: Math.round(process.memoryUsage().heapTotal / (1024 * 1024) * 100) / 100, // MB
          heapUsed: Math.round(process.memoryUsage().heapUsed / (1024 * 1024) * 100) / 100, // MB
          rss: Math.round(process.memoryUsage().rss / (1024 * 1024) * 100) / 100 // MB
        }
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch system stats' },
      { status: 500 }
    )
  }
}
