"use client";
import Container from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  PartyPopper,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const user = useCurrentUser();

  return (
    <section className="hero-section relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-100 z-0 opacity-60"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200/10 rounded-full blur-2xl"></div>

      <Container>
        <div className="grid gap-8 lg:grid-cols-2 items-center relative z-10">
          <div className="space-y-5">
            <div className="bg-muted px-4 py-1 rounded-full text-sm font-medium text-primary flex items-center gap-1">
              <PartyPopper className="w-4 h-4" />
              <span>Let’s Make Moments Together</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
              Host, Share & Celebrate Events Effortlessly
            </h1>
            <p className="text-muted-foreground max-w-xl md:text-lg">
              From casual meetups to grand conferences — manage and attend events with ease using our smart event platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/events">
                <Button size="lg" className="gap-2 shadow hover:shadow-md">
                  <Calendar className="h-4 w-4" />
                  Browse Events
                </Button>
              </Link>
              {user ? (
                <Link href="/events/create">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 hover:bg-secondary/80"
                  >
                    <UserPlus className="h-4 w-4" />
                    Host an Event
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 hover:bg-secondary/80"
                  >
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4">
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
              <p className="text-sm text-muted-foreground">
                Trusted by{" "}
                <span className="font-semibold text-foreground">3,000+</span>{" "}
                event lovers
              </p>
            </div>
          </div>

          {/* Event Card Preview */}
          <div className="relative max-w-md w-full mx-auto lg:mx-0 animate-fade-in-up">
            <div className="relative rounded-xl border p-6 shadow-xl backdrop-blur-sm bg-background/80">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">Design Meetup 2025</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Nov 12, 2025</span>
                    </div>
                  </div>
                  <Badge className="badge-free pointer-events-none">Free</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>2:00 PM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Innovation Hub, Dhaka</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>150+ Joined</span>
                  </div>
                </div>
                <div className="flex justify-between pt-3">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                        style={{
                          backgroundColor: `hsl(${i * 70 + 100}, 70%, 60%)`,
                          zIndex: 3 - i,
                        }}
                      />
                    ))}
                  </div>
                  <Button size="sm" disabled>
                    Join Now
                  </Button>
                </div>
              </div>
              <div
                className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-purple-100 rounded-xl blur-xl opacity-50"
                style={{ animationDuration: "8s" }}
              ></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
