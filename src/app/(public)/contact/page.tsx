"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Send, CheckCircle2, Users, Handshake, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeading } from "@/components/shared/section-heading";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  organization: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inquiryTypes = [
  { icon: GraduationCap, title: "PhD & Postdoc Applications", description: "Join our team as a PhD student or postdoctoral researcher." },
  { icon: Handshake, title: "Industry Collaboration", description: "Partner with us on joint research or sponsored projects." },
  { icon: Users, title: "Academic Partnerships", description: "Collaborate across institutions on shared research goals." },
  { icon: Mail, title: "General Inquiries", description: "Media, speaking requests, or other questions." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you within 2 business days.");
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">Get in Touch</p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Contact the Lab</h1>
            <p className="mt-6 text-lg text-slate-300">
              Whether you&apos;re a prospective student, industry partner, or fellow researcher — we&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Inquiry types */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inquiryTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border bg-card p-5 text-center"
              >
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30">
                    <type.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">{type.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-2xl border bg-green-50 p-12 text-center dark:bg-green-950/20"
                >
                  <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
                  <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for reaching out. We&apos;ll get back to you within 2 business days.
                  </p>
                  <Button className="mt-6" onClick={() => setSubmitted(false)}>
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Dr. Jane Smith" className="mt-1.5" {...register("name")} />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="jane@university.edu" className="mt-1.5" {...register("email")} />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select onValueChange={(v) => setValue("subject", v)}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phd">PhD Application</SelectItem>
                          <SelectItem value="postdoc">Postdoc Position</SelectItem>
                          <SelectItem value="collaboration">Research Collaboration</SelectItem>
                          <SelectItem value="industry">Industry Partnership</SelectItem>
                          <SelectItem value="media">Media / Press</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" placeholder="University / Company" className="mt-1.5" {...register("organization")} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about yourself and what you'd like to discuss..."
                      rows={6}
                      className="mt-1.5"
                      {...register("message")}
                    />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Sending...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Send className="h-4 w-4" /> Send Message</span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Lab info */}
            <div className="space-y-6 lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground">Lab Information</h2>

              <div className="space-y-5">
                <div className="flex gap-4 rounded-2xl border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Office Address</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Digital Center<br />
                      1 Ta Quang Buu Building, Room 905<br />
                      Hanoi University of Science and Technology, Hanoi, Vietnam
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:thu.nguyenthi6@hust.edu.vn" className="mt-1 text-sm text-primary hover:underline">
                      thu.nguyenthi6@hust.edu.vn
                    </a>
                    <p className="text-xs text-muted-foreground">We respond within 2 business days</p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a href="tel:+14155550123" className="mt-1 text-sm text-primary hover:underline">
                      +1 (415) 555-0123
                    </a>
                    <p className="text-xs text-muted-foreground">Mon–Fri, 9 AM – 5 PM PST</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 h-48 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">📍 Map placeholder — embed Google Maps here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
