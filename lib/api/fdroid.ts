import { logger } from "@/config/logger"
import { App, FdroidIndexV1, getAppIconUrl, parseIndexV1, getLocalizedString } from "@/models/v1"
import Index_v1 from "@/models/v1/index_v1.json"


// export type ApiResponse<T> = {
//     data: T
//     error: false
// } | {
//     error: true
//     errorMessage: string
// }

export type AppResponse = {
    id: string
    name: string
    image: string
    description: string
    source: string
}

export const getApp = async (packageName: string) => {
    const apps = await fetchFdroidAppsV1()
    const app = apps.find((app: App) => app.packageName === packageName)
    if (!app) {
        throw new Error(`App not found: ${packageName}`)
    }

    return app
}


export const getApps = async (): Promise<App[]> => {
    const apps = await fetchFdroidAppsV1()
    return apps
}


export async function fetchFdroidAppsV1() {

    // logger.info('apps', apps['za.co.neilson.alarm'])

    const apps: App[] = parseIndexV1(Index_v1 as FdroidIndexV1)

    const withIcon = apps.filter((app) => app.icon && verifyIcon(app.icon))



    const data = withIcon.map((appData: any) => {
        const lang = appData.localized?.en_US?.name ? 'en_US' : 'en-US'
        const name = getLocalizedString(appData, lang, 'name')
        const summary = getLocalizedString(appData, lang, 'summary')
        const description = getLocalizedString(appData, lang, 'description')
        const image = getAppIconUrl(appData, lang)

        console.log(image)
        return {
            ...appData,
            id: appData.packageName,
            name: name,
            summary: summary,
            description: description,
            icon: image,
            source: 'fdroid',
        };
    }) as App[]

    // console.log(data)

    return data.slice(0, 100)
}

const verifyIcon = async (iconn: string) => {
    const url = new URL(iconn)
    const path = url.pathname
    const parts = path.split('/')
    const packageName = parts[1]
    const locale = parts[2]
    const icon = parts[3]

    const iconUrl = `https://f-droid.org/repo/${packageName}/${locale}/${icon}`
    const response = await fetch(iconUrl)
    return response.ok
}   