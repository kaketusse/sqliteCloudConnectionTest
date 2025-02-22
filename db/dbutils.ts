import { Database } from "@sqlitecloud/drivers";
import { getErrorMessage } from "@/utils";

let sqliteCloudProjectId: string;
let sqliteCloudPort: string;
let sqliteCloudApiKey: string;
// let dbName: string;
let dbConnectionUrl: string;

let db: Database | undefined = undefined;

export const sqlCloudConnection = async function () {
  try {
    console.log("### APP LOGGING ### => sqlCloudConnection() running !");
    // TESTING PART
    // throw new Error("Throwing an error from sqlCloudConnection ...");

    if (
      !process.env.SQLITECLOUD_PROJECT_ID ||
      !process.env.SQLITECLOUD_PORT ||
      !process.env.SQLITECLOUD_API_KEY ||
      !process.env.DBNAME
    ) {
      throw new Error("SqlliteCloud credentials not found !");
    } else {
      sqliteCloudProjectId = process.env.SQLITECLOUD_PROJECT_ID;
      sqliteCloudPort = process.env.SQLITECLOUD_PORT;
      sqliteCloudApiKey = process.env.SQLITECLOUD_API_KEY;
      dbConnectionUrl = `sqlitecloud://${sqliteCloudProjectId}.sqlite.cloud:${sqliteCloudPort}?apikey="${sqliteCloudApiKey}"`;
      //   dbName = process.env.DBNAME;
    }

    db = new Database(dbConnectionUrl, function (error) {
      if (error) {
        console.log(
          "### APP LOGGING ### => There was an error during sqlCloud connection : "
        );
        console.log(getErrorMessage(error));
      } else {
        console.log(`### APP LOGGING ### => New connection to sqlliteCloud...`);
        // logger.warn(`db in succes new Database : ${db}`);
      }
    }).verbose();

    await setDatabase();

    return db;
  } catch (error) {
    console.log(
      "### APP LOGGING ### => Error catched : there was an error during sqlCloud connection : "
    );
    console.log(getErrorMessage(error));
    throw error;
  }
};

export const setDatabase = async function () {
  console.log("### APP LOGGING ### => setDatabase() running !");

  if (!process.env.DBNAME) {
    throw new Error("SqlliteCloud database name not found !");
  } else {
    const dbName = process.env.DBNAME;
    await db?.sql(`USE DATABASE ${dbName};`);
  }
};
