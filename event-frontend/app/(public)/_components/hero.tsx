"use client";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { Calendar, PartyPopper, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const user = useCurrentUser();

  return (
    <section className="hero-section relative overflow-hidden min-h-[90vh] flex items-center justify-center py-10 md:py-20">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4D35E]/20 via-white to-[#5A31F4]/20 z-0"></div>

      {/* Floating Light Effects */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#5A31F4]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F4D35E]/20 rounded-full blur-2xl"></div>

      <Container>
        <div>
          <div className="grid gap-10 grid-cols-1 text-center items-center justify-center relative z-10">
            <div className="bg-[#F4D35E]/30 text-[#5A31F4] px-4 py-1 rounded-full text-sm font-medium flex items-center justify-center gap-2 w-max mx-auto lg:mx-0">
              <PartyPopper className="w-4 h-4" />
              <span>Let’s Make Moments Together</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#1C1C1E]">
              Host, Share & Celebrate <br className="hidden sm:block" />
              Events Effortlessly
            </h1>

            <p className="text-[#6D6D78] max-w-xl mx-auto md:text-lg">
              From casual meetups to grand conferences — manage and attend events with ease using our smart event platform.
            </p>

            <div className="flex flex-col  items-center sm:flex-row justify-center gap-4">
              <Link href="/events">
                <Button size="lg" className="gap-2 shadow hover:shadow-md">
                  <Calendar className="h-4 w-4" />
                  Browse Events
                </Button>
              </Link>

              {user ? (
                <Link href="/events/create">
                  <Button size="lg" variant="outline" className="gap-2 hover:bg-[#F4D35E]/20">
                    <UserPlus className="h-4 w-4" />
                    Host an Event
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button size="lg" variant="outline" className="gap-2 hover:bg-[#F4D35E]/20">
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              )}
            </div>

            {/* <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    style={{
                      backgroundColor: `hsl(${i * 50 + 150}, 70%, 60%)`,
                      zIndex: 5 - i,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-[#6D6D78]">
                Trusted by{" "}
                <span className="font-semibold text-[#1C1C1E]">3,000+</span>{" "}
                event lovers
              </p>
            </div> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
