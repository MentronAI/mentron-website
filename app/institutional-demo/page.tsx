"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/layout/footer";

const formSchema = z.object({
  institutionName: z.string().min(2, "Institution name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  institutionType: z.string().optional(),
  numberOfStudents: z.string().optional(),
  currentLMS: z.string().optional(),
  primaryInterest: z.string().optional(),
  timeline: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export default function InstitutionalDemoPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institutionName: "",
      contactName: "",
      email: "",
      phone: "",
      jobTitle: "",
      institutionType: "",
      numberOfStudents: "",
      currentLMS: "",
      primaryInterest: "",
      timeline: "",
      additionalInfo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { supabase } = await import('@/lib/supabase');
      
      const { error } = await supabase
        .from('institutional_demo_forms')
        .insert([
          {
            institution_name: values.institutionName,
            contact_name: values.contactName,
            email: values.email,
            phone: values.phone || null,
            job_title: values.jobTitle || null,
            institution_type: values.institutionType || null,
            number_of_students: values.numberOfStudents || null,
            current_lms: values.currentLMS || null,
            primary_interest: values.primaryInterest || null,
            timeline: values.timeline || null,
            additional_info: values.additionalInfo || null,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        alert('Failed to submit form. Please try again.');
        return;
      }

      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="px-6 lg:px-16 pt-8 pb-4 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-500 font-geist">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-slate-900 font-medium">Institutional Demo</span>
          </nav>
        </div>
      </div>

      <div className="flex-1 px-6 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 font-display mb-4">Request Institutional Demo</h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Transform your institution with AI-powered learning. Fill out the form below and our team will get back to you shortly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="institutionName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your institution name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="institutionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., University, K-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="numberOfStudents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Students</FormLabel>
                        <FormControl>
                          <Input placeholder="Approximate number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentLMS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current LMS (if any)</FormLabel>
                        <FormControl>
                          <Input placeholder="Canvas, Moodle, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="primaryInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Interest</FormLabel>
                      <FormControl>
                        <Input placeholder="What are you most interested in?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe your institution's specific needs..."
                          className="min-h-[100px] rounded-2xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-6 rounded-2xl transition-all shadow-xl shadow-primary/25">
                  Submit Request
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
