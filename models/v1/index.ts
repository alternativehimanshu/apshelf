export interface LocalizedContent {
    name?: string;
    summary?: string;
    description?: string;
    featureGraphic?: string;
    icon?: string;
    phoneScreenshots?: string[];
    sevenInchScreenshots?: string[];
    tenInchScreenshots?: string[];
    whatsNew?: string;
}

export interface App {
    antiFeatures?: string[];
    authorEmail?: string;
    authorName?: string;
    authorWebSite?: string;
    bitcoin?: string;
    categories?: string[];
    changelog?: string;
    description?: string;
    donate?: string;
    issueTracker?: string;
    liberapay?: string;
    license?: string;
    litecoin?: string;
    localized?: Record<string, LocalizedContent>;
    name?: string;
    packageName: string;
    sourceCode?: string;
    suggestedVersionCode?: string;
    suggestedVersionName?: string;
    translation?: string;
    webSite?: string;
    added?: number;
    icon?: string;
    lastUpdated?: number;
}

export interface Repo {
    timestamp: number;
    version: number;
    maxage: number;
    name: string;
    icon: string;
    address: string;
    webBaseUrl: string;
    description: string;
    mirrors: string[];
}

export interface Requests {
    install: string[];
    uninstall: string[];
}

export interface FdroidIndexV1 {
    repo: Repo;
    requests: Requests;
    apps: App[];
}

export const parseIndexV1 = (index: FdroidIndexV1): App[] => {
    return index.apps
}

export function getLocalizedString(app: App, locale: string, field: keyof LocalizedContent): string {
    if (!app.localized?.[locale]?.[field]) {
        // Only allow fields that exist in both App and LocalizedContent
        const fallbackFields: Partial<Record<keyof LocalizedContent, keyof App>> = {
            name: 'name',
            summary: 'description', // In v1, description is used for summary
            description: 'description',
            icon: 'icon'
        };

        if (field in fallbackFields) {
            return app[fallbackFields[field]!] as string || '';
        }
        return '';
    }

    const value = app.localized[locale][field];
    // Ensure we only return string values, not arrays
    return Array.isArray(value) ? value[0] || '' : value || '';
}

export function getAppIconUrl(app: App, locale: string = 'en-US'): string | null {
    // First try to get localized icon
    const localizedIcon = getLocalizedString(app, locale, 'icon');
    if (localizedIcon) {
        return `https://f-droid.org/repo/${app.packageName}/${locale}/${localizedIcon}`;
    }

    // Then try non-localized icon
    if (app.icon) {
        const iconPath = typeof app.icon === 'string' ? app.icon : app.icon[0];
        return `https://f-droid.org/repo/${app.packageName}/${locale}/${iconPath}`;
    }

    return null;
}