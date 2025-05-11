"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, ArrowRight, Star } from "lucide-react";
import { formatDate, formatTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { IEvent } from "@/lib/types";

interface EventCardProps {
  event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg relative flex flex-col h-full",
        event.is_paid ? "border-primary/20" : "border-border"
      )}
    >
      {/* Card top decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>

      {/* Featured ribbon (replaces badge) */}
      {event.is_private && (
        <div className="absolute -right-10 top-5 rotate-45 bg-primary text-primary-foreground px-10 py-1 text-xs font-medium shadow-md z-10">
          <div className="flex items-center justify-center gap-1">
            <Star className="h-3 w-3" />
            <span>Featured</span>
          </div>
        </div>
      )}

      {/* Card content */}
      <div className="flex flex-col p-5 flex-grow">
        <div className="space-y-2.5 mb-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Badge
              variant="outline"
              className={event.is_paid ? "badge-virtual" : "badge-in-person"}
            >
              {event.is_private ? "Virtual" : "In Person"}
            </Badge>
            <Badge
              variant="outline"
              className={event.is_private ? "badge-public" : "badge-private"}
            >
              {event.is_private ? "Public" : "Private"}
            </Badge>
            <Badge
              variant="outline"
              className={event.is_paid ? "badge-paid" : "badge-free"}
            >
              {event.is_paid
                ? `$${Number(event.fee).toFixed(2)}`
                : "Free"}
            </Badge>
          </div>

          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(event.date_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{formatTime(event.date_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.location || "Online"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            {/* <span>{event.creator}</span> */}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-5 pt-0 mt-4">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full transition-colors justify-between"
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
