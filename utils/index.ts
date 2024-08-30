import { CalendarData } from "@/types";
import { format, parseISO } from "date-fns";
import { Timestamp } from "firebase/firestore";

export function hexToRgba(hex: any, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface Activity {
  title: string;
  startTime: Timestamp;
  endTime: Timestamp;
}

export interface Event {
  title: string;
  venue: string;
  description: string;
  tagline: string;
  startDate: Date;
  endDate: Date;
  activities: Activity[];
}

interface CalendarEntry {
  id: string;
  title: string;
  venue: string;
  desc: string;
  tag: string;
  height: number;
  day: string;
  startTime?: string;
  endTime?: string;
}

// Helper function to format date to YYYY-MM-DD
export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

// Helper function to format time to HH:MM am/pm
export const formatTime = (timestamp: Timestamp): string => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  return format(date, "hh:mm a"); // 'hh:mm a' for 12-hour format with am/pm
};

export const formatDateTime = (date: Date): string => {
  return format(date, "MM/dd hh:mm a");
};

export function processEventForCalendar(event: Event): CalendarData {
  const calendarData: CalendarData = {};
  const { title, venue, description, tagline, startDate, endDate, activities } = event;

  // General event info
  const generalInfo: CalendarEntry = {
    id: "1", // Generate a unique ID based on your logic
    title: title,
    venue: venue,
    desc: "",
    tag: tagline,
    height: 100,
    day: formatDate(startDate),
  };

  // Add general event info to the start date
  if (!calendarData[generalInfo.day]) {
    calendarData[generalInfo.day] = [];
  }
  calendarData[generalInfo.day].push(generalInfo);

  // Process each activity
  activities.forEach((activity, index) => {
    const startTimeFormatted = formatTime(activity.startTime);
    const endTimeFormatted = formatTime(activity.endTime);

    const activityInfo: CalendarEntry = {
      id: (index + 2).toString(), // Incrementing ID
      title: activity.title,
      venue: venue, // Assuming activities are at the same venue
      desc: `${startTimeFormatted} - ${endTimeFormatted}`,
      tag: tagline,
      height: 50,
      day: formatDate(startDate), // Use the same day as the event's start date
      startTime: startTimeFormatted, // Format startTime
      endTime: endTimeFormatted, // Format endTime
    };

    // Add activity to its start day
    if (!calendarData[activityInfo.day]) {
      calendarData[activityInfo.day] = [];
    }
    calendarData[activityInfo.day].push(activityInfo);
  });

  return calendarData;
}

export const fetchImageAsBlob = async (uri: string) => {
  const response = await fetch(uri);
  return await response.blob();
};
