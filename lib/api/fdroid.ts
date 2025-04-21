import { logger } from "@/config/logger"
import { FdroidIndex } from "../types/fdroid"

export type App = {
    id: number
    name: string
    image: string
    description: string
    downloadLink: string
    source: 'Fdroid' | 'PlayStore'
    version: string
}

// export type ApiResponse<T> = {
//     data: T
//     error: false
// } | {
//     error: true
//     errorMessage: string
// }

export const getApp = async (appId: string) => {
    const response = await fetch(`https://f-droid.org/api/v1/apps/${appId}`)
    const json = await response.json()
    if (!json.ok) {
        throw new Error(`Failed to fetch app data: ${json.error}`)
    }

    logger.info('json', json)

    const data = {
        id: json.id,
        name: json.name,
        image: json.icon,
        description: json.summary,
        downloadLink: json.downloadLink,
        source: 'Fdroid',
        version: json.version,
    } as App

    return data
}


export const getApps = async (): Promise<App[]> => {
    const apps = await fetchFdroidApps()
    return apps
}


export async function fetchFdroidApps() {
    const res = await fetch('https://f-droid.org/repo/index-v1.json')
    if (!res.ok) {
        throw new Error(`Failed to fetch repository data: ${res.status}`);
    }
    const json = await res.json()


    const apps = json.apps.filter((app: any) => app.localized?.en_US?.name || app.localized?.['en-US']?.name && app.icon)

    // logger.info('apps', apps['za.co.neilson.alarm'])


    const data = apps.map((appData: any) => {
        const lang = appData.localized?.en_US?.name ? 'en_US' : 'en-US'
        const name = appData.localized?.[lang]?.name
        const description = appData.localized?.[lang]?.summary
        const image = appData.icon ? `https://f-droid.org/repo/${appData.packageName}/${lang}/${appData.icon}` : null

        console.log(image)
        return {
            id: appData.packageName,
            name: name,
            image: image,
            description: description || '',
            source: 'fdroid',
        };
    }) as unknown as App[]

    // console.log(data)

    return data.slice(0, 100)
}
