"use client";

import { EventDBType, type GetPersonsDBDataType } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [persons, setPersons] = useState<GetPersonsDBDataType | null>(null);
  const [loadingPersons, setLoadingPersons] = useState(true);
  const [event, setEvent] = useState<EventDBType | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  console.log("### APP LOGGING ### => persons from page : ", persons);
  console.log("### APP LOGGING ### => event from page : ", event);

  useEffect(() => {
    const fetchPersons = async () => {
      setLoadingPersons(true);
      const response = await fetch("http://localhost:3000/api/persons/1");
      const persons = await response.json();
      setPersons(persons);
      setLoadingPersons(false);
    };

    const fetchEvent = async () => {
      setLoadingEvent(true);
      const response = await fetch("http://localhost:3000/api/events/1");
      const event = await response.json();
      setEvent(event);
      setLoadingEvent(false);
    };

    fetchPersons();
    fetchEvent();
  }, []);

  let contentPersons;

  if (loadingPersons) {
    contentPersons = <h1>loading persons...</h1>;
  } else if (persons !== null) {
    contentPersons = (
      <ul>
        {persons?.map((p) => (
          <li key={p.id}>{p.firstname}</li>
        ))}
      </ul>
    );
  }

  let contentEvent;

  if (loadingEvent) {
    contentEvent = <h1>loading event...</h1>;
  } else if (event !== null) {
    contentEvent = (
      <>
        <p className="eventName">{event.name}</p>
        <p className="eventDate">
          {new Date(event.date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </>
    );
  }

  return (
    <main>
      <h1>List of persons</h1>
      {contentPersons}
      <br />
      <br />
      <br />
      <h1>Event</h1>
      {contentEvent}
    </main>
  );
}
