'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Star, Clock, Car, MapPin, Users, Award, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const services = [
  {
    id: 1,
    name: 'Airport Transfer',
    description: 'Luxurious and punctual airport transfers',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1609349239791-53cf7964978f?auto=format&fit=crop&w=800&h=400&q=80',
  },
  {
    id: 2,
    name: 'Corporate Events',
    description: 'Impress clients with our premium chauffeur service',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=800&h=400&q=80',
  },
  {
    id: 3,
    name: 'Wedding Service',
    description: 'Make your special day even more memorable',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&h=400&q=80',
  },
  {
    id: 4,
    name: 'City Tours',
    description: 'Explore the city in style with our knowledgeable chauffeurs',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=800&h=400&q=80',
  },
];

export default function ChauffeurServicesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <Header /> {/* Header */}
      <div className="bg-gray-900 text-white min-h-screen pt-20">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', link: '/' },
            { label: 'Services', link: '/services' },
            { label: 'Chauffeur Services', link: '/chauffeur-services' },
          ]}
        />

        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Chauffeur Services</h1>
          <p className="text-center text-xl mb-12">
            Experience the epitome of luxury and convenience with our professional chauffeur services.
          </p>

          {/* Tabs for additional details */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex justify-center">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <Card key={service.id} className="bg-gray-800">
                    <div className="relative h-64">
                      <Image
                        src={service.image}
                        alt={service.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <CardHeader className="flex items-center">
                      <service.icon className="text-blue-500 mr-2" size={24} />
                      <CardTitle>{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{service.description}</p>
                      <Link href="/contact">
                        <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">Book Now</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex items-center">
                    <Shield className="mr-2 text-green-500" size={24} />
                    <CardTitle>Safety</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Our drivers are professionally trained to ensure your safety at all times.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center">
                    <Clock className="mr-2 text-yellow-500" size={24} />
                    <CardTitle>Timeliness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Punctual pickups and drop-offs ensure you never miss an important moment.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center">
                    <Users className="mr-2 text-purple-500" size={24} />
                    <CardTitle>Group Travel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Perfect for weddings, corporate events, or family outings.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing">
              <div className="text-center space-y-6">
                <p className="text-gray-400">Contact us for a personalized quote for your chauffeur service needs.</p>
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get a Quote</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer /> {/* Footer */}
    </>
  );
}
