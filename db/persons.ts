import { type GetPersonsDBDataType } from "@/types";
import { sqlCloudConnection } from "./dbutils";
import { getErrorMessage } from "@/utils";

export const getPersonsDB = async function (eventid: number) {
  try {
    console.log("getPersonsDB running !");

    // TESTING PART
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    // throw new Error("Throwing an error from addPersonAction ...");

    const db = await sqlCloudConnection();
    console.log("### APP LOGGING ### => db object from getEventDB", db);
    // const interval = setInterval(
    //   () => console.log("db object from : getPersonsDB", db),
    //   100
    // );

    const sqlReq = `
      SELECT p.id, firstName, lastName, email 
      FROM persons p INNER JOIN persons_events 
      ON p.id = persons_events.personid
      WHERE p.userid="user_2nsLPeohkGs5mjRZZxPtbr2H46H" AND persons_events.eventid="${eventid}";
    `;

    const res = await db?.sql(sqlReq);

    db.close();
    console.log(
      "### APP LOGGING ### => db connection is closed from getPersonsDB"
    );
    // clearInterval(interval);

    console.log("### APP LOGGING ### => Result of getPersonsDB :");
    console.log(res);

    return res as GetPersonsDBDataType;
  } catch (error) {
    console.log(
      "### APP LOGGING ### => Error catched : there was an error when getting persons : "
    );
    console.log(getErrorMessage(error));
    throw error;
  }
};
