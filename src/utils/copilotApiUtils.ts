const BaseApiURL = 'https://api-beta.copilot.com/v1'

type MeResponse = {
  givenName: string
  familyName: string
  email: string
  portalName: string
}

type ClientCustomField = string | string[]

export type Client = {
  id: string
  givenName: string
  familyName: string
  email: string
  companyId: string
  customFields: Record<string, ClientCustomField>
}

export type Company = {
  id: string
  name: string
  iconImageUrl: string
}

export class CopilotAPI {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getApiData<T>(path: string): Promise<T> {
    const response = await fetch(`${BaseApiURL}/${path}`, {
      headers: {
        'x-api-key': this.apiKey,
      },
    })

    const data = await response.json()
    return data
  }

  async me() {
    return this.getApiData<MeResponse>('me')
  }

  async getClient(clientId: string) {
    return this.getApiData<Client>(`clients/${clientId}`)
  }

  async getCompany(companyId: string) {
    return this.getApiData<Company>(`companies/${companyId}`)
  }
}
