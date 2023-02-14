import Airtable, { FieldSet, Record } from "airtable";

export interface Invite {
  email: string;
  invited?: boolean;
}

export interface InviteResponse {
  invite: Invite;
}

// make sure all the necessary env vars are set
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error("AIRTABLE_API_KEY is not set");
}
if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error("AIRTABLE_BASE_ID is not set");
}

// create a new Airtable client and gets a reference to the
// airtable base containing our invites
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE_ID);

// get an invite by invite code (promisified)
export async function getInvite(email: string): Promise<Invite> {
  const inviteRecord = await getInviteRecord(email);

  return {
    email: String(inviteRecord.fields.email),
    invited:
      typeof inviteRecord.fields.invited === "undefined"
        ? undefined
        : inviteRecord.fields.invited === true,
  };
}

export function getInviteRecord(email: string): Promise<Record<FieldSet>> {
  return new Promise((resolve, reject) => {
    base("stage-invites")
      // runs a query on the `invites` table
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      // reads the first page of results
      .firstPage((err, records) => {
        if (err) {
          // propagate errors
          console.error(err);
          return reject(err);
        }

        // if the record could not be found
        // we consider it an error
        if (!records || records.length === 0) {
          return reject(new Error("Invite not found"));
        }

        // returns the first record
        resolve(records[0]);
      });
  });
}
