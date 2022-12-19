interface preferenceArgs {
  [key: string]: any;
}

export const getPreferenceValues = async (extensionId: string, options: preferenceArgs) => {
  // fetch the prefrences from the extention in database
  const [, preferences] = useGetPreferencesQuery({
    extensionId,
    // map over the options and return an array of keys
    keys: Object.keys(options)
  });
  // if the preference is not found in the database, give notification or open modal to enter it
  if (!preferences) {
    // give notification or open modal to enter the preference
    // return the preference when entered
    // write the result to the database
  }
  // return the preference
  return preferences;
}

