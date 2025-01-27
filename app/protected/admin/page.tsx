'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import DatabaseStatus from '@/components/database/DatabaseStatus'
import { useRouter } from 'next/navigation'
import { FaCar, FaUsers, FaChartBar, FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaFileUpload } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface UserDetails {
  userId: string
  role: string
  email?: string
  name?: string
  rentals?: {
    id: string
    carId: string
    startDate: string
    endDate: string
    status: 'active' | 'completed' | 'cancelled'
  }[]
}

interface CarDetails {
  id: string
  make: string
  model: string
  year: number
  category: string
  price: number
  status: 'available' | 'rented' | 'maintenance' | 'reserved'
  images: string[]
  licensePlate: string
  mileage: number
  vin: string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  fuelType: string
  transmission: string
  color: string
  selected?: boolean
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [cars, setCars] = useState<CarDetails[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'cars' | 'users' | 'rentals'>('overview')
  const [fleetStats, setFleetStats] = useState({
    available: 0,
    rented: 0,
    maintenance: 0,
    reserved: 0
  })
  const [stats, setStats] = useState({
    totalCars: 0,
    activeRentals: 0,
    totalUsers: 0,
    revenue: 0,
    fleetUtilization: 0,
    maintenanceCosts: 0,
    customerSatisfaction: 0
  })
  const [newCar, setNewCar] = useState<Partial<CarDetails>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    category: '',
    price: undefined,
    status: 'available',
    images: [],
    licensePlate: '',
    mileage: undefined,
    vin: '',
    fuelType: '',
    transmission: '',
    color: ''
  })
  const [showAddCarForm, setShowAddCarForm] = useState(false)
  const [showBulkEditForm, setShowBulkEditForm] = useState(false)
  const [showBulkUploadForm, setShowBulkUploadForm] = useState(false)
  const [bulkEditData, setBulkEditData] = useState({
    status: '',
    price: '',
    category: '',
    fuelType: '',
    transmission: '',
    color: '',
    mileage: ''
  })
  const [bulkUploadData, setBulkUploadData] = useState('')
  const router = useRouter()

  // Add animation configs
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
      return
    }
    
    // Check if user is admin
    if (!authLoading && user && user.role !== 'admin') {
      router.push('/protected/user')
      return
    }
  }, [authLoading, user, router])

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res = await fetch('/api/auth/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const data = await res.json()

        if (res.ok && data.user) {
          setUserDetails(data.user)
        } else {
          throw new Error(data.error || 'Failed to fetch user details')
        }
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching user details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchUserDetails()
    }
  }, [user])

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsRes, carsRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/cars')
        ])
        
        const [statsData, carsData] = await Promise.all([
          statsRes.json(),
          carsRes.json() 
        ])

        if (statsRes.ok) {
          setStats(statsData)
        }
        if (carsRes.ok) {
          console.log('Cars data received:', carsData)
          
          const carsArray = carsData.cars || []
          if (Array.isArray(carsArray)) {
            setCars(carsArray.map((car: CarDetails) => ({ ...car, selected: false })))
            
            // Calculate fleet stats
            const stats = carsArray.reduce((acc: any, car: CarDetails) => {
              acc[car.status] = (acc[car.status] || 0) + 1
              return acc
            }, {
              available: 0,
              rented: 0,
              maintenance: 0,
              reserved: 0
            })
            
            setFleetStats(stats)
          } else {
            console.error('Cars data is not an array:', carsArray)
            setCars([])
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive"
        })
      }
    }

    if (userDetails?.role === 'admin') {
      fetchDashboardData()
    }
  }, [userDetails])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      if (res.ok) {
        router.push('/auth/login')
      }
    } catch (err) {
      console.error('Logout failed:', err)
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive"
      })
    }
  }

  const handleCarStatusUpdate = async (carId: string, status: string) => {
    try {
      const res = await fetch(`/api/cars/${carId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        const updatedCars = cars.map(car => 
          car.id === carId ? { ...car, status: status as CarDetails['status'] } : car
        )
        setCars(updatedCars)
        
        // Update fleet stats
        const newStats = { ...fleetStats }
        const oldCar = cars.find(car => car.id === carId)
        if (oldCar) {
          newStats[oldCar.status]--
          newStats[status as keyof typeof fleetStats]++
          setFleetStats(newStats)
        }
        
        toast({
          title: "Success",
          description: "Car status updated successfully"
        })
      }
    } catch (err) {
      console.error('Error updating car status:', err)
      toast({
        title: "Error",
        description: "Failed to update car status",
        variant: "destructive"
      })
    }
  }

  const handleBulkEdit = async () => {
    const selectedCars = cars.filter(car => car.selected)
    if (selectedCars.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one car to update",
        variant: "destructive"
      })
      return
    }

    const confirmMessage = `You are about to update ${selectedCars.length} cars. Do you want to proceed?`
    if (!confirm(confirmMessage)) {
      return
    }

    try {
      const updates = Object.fromEntries(
        Object.entries(bulkEditData).filter(([_, value]) => value !== '')
      )

      const results = await Promise.all(
        selectedCars.map(car =>
          fetch(`/api/cars/${car.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
          })
        )
      )

      if (results.every(res => res.ok)) {
        const updatedCars = cars.map(car => {
          if (car.selected) {
            const newCar = {
              ...car,
              ...(bulkEditData.status && { status: bulkEditData.status as CarDetails['status'] }),
              ...(bulkEditData.price && { price: parseFloat(bulkEditData.price) }),
              ...(bulkEditData.category && { category: bulkEditData.category }),
              ...(bulkEditData.fuelType && { fuelType: bulkEditData.fuelType }),
              ...(bulkEditData.transmission && { transmission: bulkEditData.transmission }),
              ...(bulkEditData.color && { color: bulkEditData.color }),
              ...(bulkEditData.mileage && { mileage: parseFloat(bulkEditData.mileage) }),
              selected: false
            }
            
            // Update fleet stats if status changed
            if (bulkEditData.status && car.status !== bulkEditData.status) {
              const newStats = { ...fleetStats }
              newStats[car.status]--
              newStats[bulkEditData.status as keyof typeof fleetStats]++
              setFleetStats(newStats)
            }
            
            return newCar
          }
          return car
        })
        setCars(updatedCars)
        setShowBulkEditForm(false)
        setBulkEditData({ 
          status: '', 
          price: '', 
          category: '',
          fuelType: '',
          transmission: '',
          color: '',
          mileage: ''
        })
        toast({
          title: "Success",
          description: `Successfully updated ${selectedCars.length} cars`
        })
      }
    } catch (err) {
      console.error('Error performing bulk edit:', err)
      toast({
        title: "Error",
        description: "Failed to update cars",
        variant: "destructive"
      })
    }
  }

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
      })
      
      if (res.ok) {
        const data = await res.json()
        const newCarData = { ...data.car, selected: false }
        setCars([...cars, newCarData])
        
        // Update fleet stats
        const newStats = { ...fleetStats }
        newStats[newCarData.status as keyof typeof fleetStats]++
        setFleetStats(newStats)
        
        setShowAddCarForm(false)
        setNewCar({
          make: '',
          model: '',
          year: new Date().getFullYear(),
          category: '',
          price: undefined,
          status: 'available',
          images: [],
          licensePlate: '',
          mileage: undefined,
          vin: '',
          fuelType: '',
          transmission: '',
          color: ''
        })
        toast({
          title: "Success",
          description: "Car added successfully"
        })
      }
    } catch (err) {
      console.error('Error adding car:', err)
      toast({
        title: "Error",
        description: "Failed to add car",
        variant: "destructive"
      })
    }
  }

  const handleDeleteCar = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return
    
    try {
      const res = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (res.ok) {
        const deletedCar = cars.find(car => car.id === carId)
        if (deletedCar) {
          // Update fleet stats
          const newStats = { ...fleetStats }
          newStats[deletedCar.status as keyof typeof fleetStats]--
          setFleetStats(newStats)
        }
        
        setCars(prevCars => prevCars.filter(car => car.id !== carId))
        toast({
          title: "Success",
          description: "Car deleted successfully"
        })
      } else {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to delete car')
      }
    } catch (err) {
      console.error('Error deleting car:', err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete car",
        variant: "destructive"
      })
    }
  }

  const toggleCarSelection = (carId: string) => {
    setCars(cars.map(car => 
      car.id === carId ? { ...car, selected: !car.selected } : car
    ))
  }

  const selectAllCars = (selected: boolean) => {
    setCars(cars.map(car => ({ ...car, selected })))
  }

  if (authLoading) {
    return (
      <motion.div 
        className="flex justify-center items-center min-h-screen"
        {...pageTransition}
      >
        <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </motion.div>
    )
  }

  if (!user) return null

  return (
    <DatabaseErrorBoundary>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <div className="p-6 max-w-7xl mx-auto space-y-6">
          <motion.div 
            className="flex justify-between items-center"
            variants={staggerChildren}
          >
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"
              variants={pageTransition}
            >
              Admin Dashboard
            </motion.h1>
            <motion.div 
              className="flex gap-4"
              variants={pageTransition}
            >
              <Button
                onClick={() => router.push('/protected/admin/settings')}
                variant="outline"
                className="hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                Settings
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                Logout
              </Button>
            </motion.div>
          </motion.div>

          <Card className="overflow-hidden border-none shadow-xl">
            <DatabaseStatus />
          </Card>

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="p-8">
                  <div className="space-y-4">
                    <div className="h-8 w-2/3 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert variant="destructive">
                  <p>{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="mt-2"
                  >
                    Retry
                  </Button>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && !error && userDetails && (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6">
                <div className="flex space-x-2">
                  {['overview', 'cars', 'users', 'rentals'].map((tab) => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeTab === tab 
                          ? 'bg-primary text-white shadow-lg'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl"
                variants={pageTransition}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Fleet Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="p-4 bg-green-50 dark:bg-green-900">
                        <h3 className="text-lg font-medium text-green-700 dark:text-green-300">Available</h3>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-200">{fleetStats.available}</p>
                      </Card>
                      <Card className="p-4 bg-blue-50 dark:bg-blue-900">
                        <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">Rented</h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-200">{fleetStats.rented}</p>
                      </Card>
                      <Card className="p-4 bg-yellow-50 dark:bg-yellow-900">
                        <h3 className="text-lg font-medium text-yellow-700 dark:text-yellow-300">Reserved</h3>
                        <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-200">{fleetStats.reserved}</p>
                      </Card>
                      <Card className="p-4 bg-red-50 dark:bg-red-900">
                        <h3 className="text-lg font-medium text-red-700 dark:text-red-300">Maintenance</h3>
                        <p className="text-3xl font-bold text-red-600 dark:text-red-200">{fleetStats.maintenance}</p>
                      </Card>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button
                        onClick={() => setShowAddCarForm(true)}
                        className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700"
                      >
                        <FaPlus className="mr-2" />
                        Add New Car
                      </Button>
                      <Button
                        onClick={() => router.push('/protected/admin/new-rental')}
                        className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700"
                      >
                        <FaCalendarAlt className="mr-2" />
                        Create Rental
                      </Button>
                      <Button
                        onClick={() => router.push('/protected/admin/reports')}
                        className="p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700"
                      >
                        <FaChartBar className="mr-2" />
                        View Reports
                      </Button>
                      <Button
                        onClick={() => router.push('/protected/admin/maintenance')}
                        className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700"
                      >
                        <FaCar className="mr-2" />
                        Maintenance Log
                      </Button>
                    </div>

                    {showAddCarForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                          <h3 className="text-xl font-semibold mb-4">Add New Car</h3>
                          <form onSubmit={handleAddCar} className="space-y-4">
                            <Input
                              type="text"
                              placeholder="Make"
                              value={newCar.make}
                              onChange={(e) => setNewCar({...newCar, make: e.target.value})}
                              required
                            />
                            <Input
                              type="text"
                              placeholder="Model"
                              value={newCar.model}
                              onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                              required
                            />
                            <Input
                              type="number"
                              placeholder="Year"
                              value={newCar.year}
                              onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
                              required
                            />
                            <Input
                              type="text"
                              placeholder="License Plate"
                              value={newCar.licensePlate}
                              onChange={(e) => setNewCar({...newCar, licensePlate: e.target.value})}
                              required
                            />
                            <Input
                              type="number"
                              placeholder="Mileage"
                              value={newCar.mileage}
                              onChange={(e) => setNewCar({...newCar, mileage: parseInt(e.target.value)})}
                              required
                            />
                            <Input
                              type="text"
                              placeholder="VIN"
                              value={newCar.vin}
                              onChange={(e) => setNewCar({...newCar, vin: e.target.value})}
                              required
                            />
                            <Input
                              type="text"
                              placeholder="Category"
                              value={newCar.category}
                              onChange={(e) => setNewCar({...newCar, category: e.target.value})}
                              required
                            />
                            <Input
                              type="number"
                              placeholder="Price"
                              value={newCar.price}
                              onChange={(e) => setNewCar({...newCar, price: parseInt(e.target.value)})}
                              required
                            />
                            <Input
                              type="text"
                              placeholder="Fuel Type"
                              value={newCar.fuelType}
                              onChange={(e) => setNewCar({...newCar, fuelType: e.target.value})}
                              required
                            />
                            <Input
                              type="text"
                              placeholder="Transmission"
                              value={newCar.transmission}
                              onChange={(e) => setNewCar({...newCar, transmission: e.target.value})}
                              required
                            />
                            <Input
                              type="text"
                              placeholder="Color"
                              value={newCar.color}
                              onChange={(e) => setNewCar({...newCar, color: e.target.value})}
                              required
                            />
                            <div className="flex gap-4">
                              <Button type="submit" className="flex-1">Add Car</Button>
                              <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => setShowAddCarForm(false)}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'cars' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-semibold">Car Fleet Management</h2>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => selectAllCars(true)}
                          variant="outline"
                        >
                          Select All
                        </Button>
                        <Button
                          onClick={() => selectAllCars(false)}
                          variant="outline"
                        >
                          Deselect All
                        </Button>
                        <Button
                          onClick={() => {
                            const selectedCount = cars.filter(car => car.selected).length;
                            if (selectedCount === 0) {
                              toast({
                                title: "Error",
                                description: "Please select at least one car to edit",
                                variant: "destructive"
                              });
                              return;
                            }
                            const proceed = confirm(`You have selected ${selectedCount} cars to edit. Would you like to proceed?`);
                            if (proceed) {
                              setShowBulkEditForm(true);
                            }
                          }}
                          disabled={!cars.some(car => car.selected)}
                        >
                          Bulk Edit Selected ({cars.filter(car => car.selected).length})
                        </Button>
                      </div>
                    </div>

                    {showBulkEditForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                          <h3 className="text-xl font-semibold mb-4">
                            Bulk Edit Cars ({cars.filter(car => car.selected).length} selected)
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Status</label>
                              <select
                                className="w-full border rounded p-2"
                                value={bulkEditData.status}
                                onChange={(e) => setBulkEditData({...bulkEditData, status: e.target.value})}
                              >
                                <option value="">No Change</option>
                                <option value="available">Available</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="rented">Rented</option>
                                <option value="reserved">Reserved</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Price</label>
                              <Input
                                type="number"
                                placeholder="Leave empty for no change"
                                value={bulkEditData.price}
                                onChange={(e) => setBulkEditData({...bulkEditData, price: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Category</label>
                              <Input
                                type="text"
                                placeholder="Leave empty for no change"
                                value={bulkEditData.category}
                                onChange={(e) => setBulkEditData({...bulkEditData, category: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Fuel Type</label>
                              <Input
                                type="text"
                                placeholder="Leave empty for no change"
                                value={bulkEditData.fuelType}
                                onChange={(e) => setBulkEditData({...bulkEditData, fuelType: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Transmission</label>
                              <Input
                                type="text"
                                placeholder="Leave empty for no change"
                                value={bulkEditData.transmission}
                                onChange={(e) => setBulkEditData({...bulkEditData, transmission: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end mt-4 space-x-2">
                            <Button
                              variant="outline" 
                              onClick={() => setShowBulkEditForm(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleBulkEdit}
                              className="bg-primary text-white"
                            >
                              Apply Changes
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/*
                      ---------------------------------------------------------------------------
                      DUPLICATE SNIPPET COMMENTED OUT:
                      The following lines were causing mismatched JSX. 
                      Keeping them here in a comment so you don't lose the code.
                      ---------------------------------------------------------------------------
                    
                      // ... existing code ...
                      <div>
                        <label className="block text-sm font-medium mb-1">Transmission</label>
                        <Input
                          type="text"
                          placeholder="Leave empty for no change"
                          value={bulkEditData.transmission}
                          onChange={(e) => setBulkEditData({...bulkEditData, transmission: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Color</label>
                        <Input
                          type="text"
                          placeholder="Leave empty for no change"
                          value={bulkEditData.color}
                          onChange={(e) => setBulkEditData({...bulkEditData, color: e.target.value})}
                        />
                      </div>
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline" onClick={() => setShowBulkEditForm(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleBulkEdit} 
                          className="bg-primary text-white"
                        >
                          Apply Changes
                        </Button>
                      </div>
                    */}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </DatabaseErrorBoundary>
  )
}
