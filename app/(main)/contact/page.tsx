export const runtime = 'edge'
"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react"
import { ProductButton } from "@/components/ui/product-button"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to send message")

      setFormState("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error(error)
      setFormState("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="bg-bg min-h-screen py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Have questions about LightBurn Pro? Our team is here to help you 24/7.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          {formState === "success" ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We{"'"}ll get back to you within 24 hours.
              </p>
              <ProductButton variant="primary" onClick={() => setFormState("idle")}>
                Send Another Message
              </ProductButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {formState === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p>Something went wrong. Please try again.</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                >
                  <option value="">Select a subject</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="licensing">Licensing Question</option>
                  <option value="refund">Refund Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <ProductButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={formState === "submitting"}
              >
                <Send className="h-4 w-4" />
                Send Message
              </ProductButton>
            </form>
          )}
        </div>

        {/* Direct Contact */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Or email us directly at:</p>
          <a
            href="mailto:contact@lightburntool.com"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <Mail className="h-5 w-5" />
            contact@lightburntool.com
          </a>
        </div>
      </div>
    </div>
  )
}
