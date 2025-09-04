import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAnalytics } from '@/hooks/useAnalytics';
import ChatBot from "@/components/ChatBot";
import OfficeStatus from "@/components/contact/OfficeStatus";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Mail, Phone } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
const Contact = () => {
  useAnalytics();
  
  const {
    submitContactForm,
    isSubmitting
  } = useContactForm();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitContactForm(formData);
    if (success) {
      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cc-navy dark:text-white">
              Contact Us
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're here to answer any questions you might have about our
              services, investment opportunities, or how we can help you achieve
              your financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-4 text-cc-navy dark:text-white">
                    Constant Capital (Ghana) Limited
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Navigation className="w-5 h-5 mr-3 text-cc-gold mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Office Address</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          #6 Tanbu Link, <br />
                          East Legon, <br />
                          Accra, Ghana
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 text-cc-gold mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Phone</h4>
                        <a href="tel:+233302500386" className="text-sm text-gray-600 dark:text-gray-300 hover:text-cc-gold dark:hover:text-cc-gold transition-colors duration-300">
                          +233 302 500 386
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 text-cc-gold mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Email</h4>
                        <a href="mailto:info@constantcapital.com.gh" className="text-sm text-gray-600 dark:text-gray-300 hover:text-cc-gold dark:hover:text-cc-gold transition-colors duration-300">
                          info@constantcapital.com.gh
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium mb-3">Office Hours</h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>8:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday - Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>

                    {/* Office Status */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2">Current Status</h4>
                      <OfficeStatus />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-4">
                    Send Us a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" required>
                        <option value="">Please select</option>
                        <option value="general">General Inquiry</option>
                        <option value="investment">
                          Investment Opportunities
                        </option>
                        <option value="research">Research Access</option>
                        <option value="career">Career Opportunities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea rows={5} name="message" value={formData.message} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" required></textarea>
                    </div>

                    <div className="pt-2">
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-cc-navy dark:text-white">
              Our Location
            </h2>
            <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <iframe title="Constant Capital Ghana Office Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.821531096331!2d-0.1682459!3d5.6356599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9bbdee889c45%3A0x8e53d3fafcda8d87!2s6%20Tanbu%20Lane%2C%20East%20Legon%2C%20Accra!5e0!3m2!1sen!2sgh!4v1651260000000!5m2!1sen!2sgh" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBot />
    </div>;
};
export default Contact;