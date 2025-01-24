'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, Layout, Users, Plus, Edit2, Trash2, BarChart2, Target } from 'lucide-react'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Card } from '@/components/ui/card'

interface EmailCampaign {
  id: string
  name: string
  subject: string
  content: string
  status: 'draft' | 'scheduled' | 'sent'
  scheduledDate?: string
  sentDate?: string
  recipients: number
  openRate?: number
  clickRate?: number
}

interface LandingPage {
  id: string
  name: string
  slug: string
  status: 'published' | 'draft'
  startDate?: string
  endDate?: string
  views: number
  conversions: number
}

interface ReferralProgram {
  id: string
  code: string
  discount: number
  usageCount: number
  maxUses?: number
  expiryDate?: string
}

export default function AdminMarketingPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>([])
  const [landingPages, setLandingPages] = useState<LandingPage[]>([])
  const [referralPrograms, setReferralPrograms] = useState<ReferralProgram[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchMarketingData()
  }, [])

  const fetchMarketingData = async () => {
    try {
      const [campaignsRes, pagesRes, referralsRes] = await Promise.all([
        fetch('/api/email-campaigns'),
        fetch('/api/landing-pages'),
        fetch('/api/referral-programs')
      ])
      
      if (!campaignsRes.ok || !pagesRes.ok || !referralsRes.ok) {
        throw new Error('Failed to fetch marketing data')
      }

      const [campaigns, pages, referrals] = await Promise.all([
        campaignsRes.json(),
        pagesRes.json(),
        referralsRes.json()
      ])

      setEmailCampaigns(campaigns)
      setLandingPages(pages)
      setReferralPrograms(referrals)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">
              <BarChart2 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="email-campaigns">
              <Mail className="w-4 h-4 mr-2" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="landing-pages">
              <Layout className="w-4 h-4 mr-2" />
              Landing Pages
            </TabsTrigger>
            <TabsTrigger value="leads">
              <Target className="w-4 h-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="referral-programs">
              <Users className="w-4 h-4 mr-2" />
              Referrals
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <TabsContent value="dashboard">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <Card className="p-6">
                    <h3 className="font-medium mb-4">Campaign Performance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Open Rate</span>
                        <span className="font-medium">24.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Click Rate</span>
                        <span className="font-medium">12.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate</span>
                        <span className="font-medium">3.7%</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-medium mb-4">Lead Generation</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Leads</span>
                        <span className="font-medium">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Qualified Leads</span>
                        <span className="font-medium">456</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate</span>
                        <span className="font-medium">4.2%</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-medium mb-4">Referral Impact</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Active Programs</span>
                        <span className="font-medium">{referralPrograms.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Referrals</span>
                        <span className="font-medium">789</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue Generated</span>
                        <span className="font-medium">$12,345</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="email-campaigns">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">Email Campaigns</h2>
                      <p className="text-sm text-gray-600">Create and manage email marketing campaigns</p>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Campaign
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {emailCampaigns.map(campaign => (
                      <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Recipients: {campaign.recipients} | Status: {campaign.status}
                            </p>
                            {campaign.openRate && (
                              <p className="text-sm text-gray-600">
                                Open Rate: {campaign.openRate}% | Click Rate: {campaign.clickRate}%
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="landing-pages">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">Landing Pages</h2>
                      <p className="text-sm text-gray-600">Design and optimize landing pages</p>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Page
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {landingPages.map(page => (
                      <div key={page.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{page.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Views: {page.views} | Conversions: {page.conversions} ({((page.conversions / page.views) * 100).toFixed(1)}%)
                            </p>
                            <p className="text-sm text-gray-600">
                              Status: <span className="capitalize">{page.status}</span>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="leads">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">Lead Management</h2>
                      <p className="text-sm text-gray-600">Track and manage potential customers</p>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Lead
                    </Button>
                  </div>
                  {/* Lead management content */}
                </motion.div>
              </TabsContent>

              <TabsContent value="referral-programs">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">Referral Programs</h2>
                      <p className="text-sm text-gray-600">Manage customer referral incentives</p>
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Program
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {referralPrograms.map(program => (
                      <div key={program.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Code: {program.code}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Uses: {program.usageCount}{program.maxUses ? ` / ${program.maxUses}` : ''} | Discount: {program.discount}%
                            </p>
                            {program.expiryDate && (
                              <p className="text-sm text-gray-600">
                                Expires: {new Date(program.expiryDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DatabaseErrorBoundary>
  )
}
