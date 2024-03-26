import { copilotApi } from 'copilot-node-sdk';
import { need } from '@/utils/need';

/**
 * A helper function that instantiates the Copilot SDK and fetches data
 * from the Copilot API based on the contents of the token that gets
 * passed to your app in the searchParams.
 */
export async function getSession(searchParams: SearchParams) {
  // apiKey needs to be defined inside the function so we get the
  // error boundary page instead of a vercel error.
  const apiKey = need<string>(
    process.env.COPILOT_API_KEY,
    'COPILOT_API_KEY is required, guide available at: https://docs.copilot.com/docs/custom-apps-setting-up-your-first-app#step-2-register-your-app-and-get-an-api-key',
  );

  const copilot = copilotApi({
    apiKey: apiKey,
    token:
      'token' in searchParams && typeof searchParams.token === 'string'
        ? searchParams.token
        : undefined,
  });

  const data: {
    workspace: Awaited<ReturnType<typeof copilot.retrieveWorkspace>>;
    client?: Awaited<ReturnType<typeof copilot.retrieveClient>>;
    company?: Awaited<ReturnType<typeof copilot.retrieveCompany>>;
    internalUser?: Awaited<ReturnType<typeof copilot.retrieveInternalUser>>;
  } = {
    workspace: await copilot.retrieveWorkspace(),
  };
  const tokenPayload = await copilot.getTokenPayload?.();

  if (tokenPayload?.clientId) {
    data.client = await copilot.retrieveClient({ id: tokenPayload.clientId });
  }
  if (tokenPayload?.companyId) {
    data.company = await copilot.retrieveCompany({
      id: tokenPayload.companyId,
    });
  }
  if (tokenPayload?.internalUserId) {
    data.internalUser = await copilot.retrieveInternalUser({
      id: tokenPayload.internalUserId,
    });
  }

  return data;
}
