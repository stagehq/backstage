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
export async function getInvite(email: string): Promise<Invite | undefined> {
  const inviteRecord = await getInviteRecord(email);
  if (!inviteRecord) return undefined;

  return {
    email: String(inviteRecord.fields.email),
    invited:
      typeof inviteRecord.fields.invited === "undefined"
        ? undefined
        : inviteRecord.fields.invited === true,
  };
}

export function getInviteRecord(
  email: string
): Promise<Record<FieldSet> | undefined> {
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

        // returns the first record
        resolve(!records || records.length === 0 ? undefined : records[0]);
      });
  });
}
