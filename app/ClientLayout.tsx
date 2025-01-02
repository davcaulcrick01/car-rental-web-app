/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Menu, X, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useState } from 'react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {children}
    </div>
  )
}