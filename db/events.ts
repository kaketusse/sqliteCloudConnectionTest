import { type EventDBType } from "@/types";
import { sqlCloudConnection } from "./dbutils";
import { getErrorMessage } from "@/utils";

export const getEventDB = async function (eventid: number) {
  try {
    console.log("getEventDB running !");

    // TESTING PART
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    // throw new Error("Throwing an error from addPersonAction ...");

    const db = await sqlCloudConnection();
    console.log("### APP LOGGING ### => db object from getEventDB", db);
    // setInterval(() => console.log("db object from : getEventDB", db), 100);

    // await new Promise((resolve) => setTimeout(resolve, 4000));

    const sqlReq = `
      SELECT events.name, date, nbmaxparticipants, COUNT(persons_events.id) as nbparticipants, isliked, events.createdat, colors.name AS colorname, labels.label AS labelname
      FROM events 
      LEFT JOIN colors ON colors.id = events.colorid
      LEFT JOIN labels ON labels.id = events.labelid AND labels.userid = events.userid
      LEFT JOIN persons_events ON persons_events.eventid = events.id
      WHERE events.userid="user_2nsLPeohkGs5mjRZZxPtbr2H46H" AND events.id="${eventid}";
    `;

    const res = await db?.sql(sqlReq);

    // db.close();
    // console.log("### APP LOGGING ### => db connection is closed from getEventDB");
    // clearInterval(interval);

    console.log("### APP LOGGING ### => Result of getEventDB :");
    console.log(res[0]);

    return res[0] as EventDBType;
  } catch (error) {
    console.log(
      "### APP LOGGING ### => Error catched : there was an error when getting persons : "
    );
    console.log(getErrorMessage(error));
    throw error;
  }
};
