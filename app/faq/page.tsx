'use client';

import Header from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';

// FAQ items
const faqItems = [
  { question: "How many miles can I drive?", answer: "Mileage limits vary by vehicle and rental duration. Check the specific terms for each car." },
  { question: "Is there a discount for multi-day rentals?", answer: "Yes! We offer competitive discounts for rentals longer than three days. Contact us or check our website for current offers." },
  { question: "What payment methods do you accept?", answer: "We accept major credit cards, including Visa, Mastercard, American Express, and Discover. For security reasons, cash payments are not accepted." },
  {
    question: "Can international drivers rent exotic cars in the USA?",
    answer: "Yes, international drivers can rent exotic cars with a valid international driver's license and passport."
  },
  {
    question: "What are the requirements to rent?",
    answer: "Requirements include valid driver's license, minimum age requirement, proof of insurance, and security deposit."
  },
  {
    question: "In what condition am I required to return the vehicle?",
    answer: "The car should be returned relatively clean and smoke free. It does not need to be spotless, however excessive garbage, drinks spilled, and overall trashing of a luxury vehicle may incur a cleaning fee."
  },
  { question: "Does GreyZone Exotics require a security deposit?", answer: "Yes, a refundable security deposit is required for all rentals. The amount depends on the vehicle and rental duration and will be fully returned upon meeting the terms of the agreement." },
  { question: "How can I make a reservation?", answer: "You can easily make a reservation online through our website or contact our customer support team directly. Reservations must be confirmed with a valid payment method." },
  { question: "Do you match competitor prices?", answer: "We strive to provide the best value for our customers. If you find a better rate for the same car and rental terms, let us know, and we'll do our best to match it." },
  { question: "Are there any penalties for late returns?", answer: "Yes, late returns will incur additional fees. Please inform us if you expect to return the vehicle late to avoid penalties." },
  { question: "Are there any speed restrictions or governors?", answer: "While we don't impose speed restrictions, we expect all drivers to obey traffic laws and drive responsibly." },
  { question: "Can I reserve a Luxury Car for someone else?", answer: "Yes, you can reserve a vehicle for someone else. However, the driver must meet our rental requirements, including age, license, and insurance verification." },
  { question: "Do you accept walk-ins and same day reservations?", answer: "Yes, we accept walk-ins and same-day reservations, subject to availability. To guarantee your vehicle, we recommend making a reservation in advance." }
];

export default function FAQPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'FAQ', href: '/faq' },
          ]}
        />
        
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-800 rounded-lg px-6"
              >
                <AccordionTrigger className="text-lg font-semibold py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
