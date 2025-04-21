export interface FdroidIndexV2 {
    repo: Repo;
    packages: { [key: string]: Package };
}

export interface Repo {
    name: string;
    icon: string;
    address: string;
    description: string;
    mirrors: string[];
    timestamp: number;
    version: number;
    maxage: number;
}

export interface Package {
    packageName: string;
    suggestedVersionCode: number;
    suggestedVersionName: string;
    antiFeatures: string[];
    categories: string[];
    description: string;
    license: string;
    name: string;
    summary: string;
    webSite: string;
    authorName?: string;
    authorEmail?: string;
    authorWebSite?: string;
    sourceCode?: string;
    issueTracker?: string;
    donate?: string;
    bitcoin?: string;
    litecoin?: string;
    liberapay?: string;
    openCollective?: string;
    flattr?: string;
    versions: { [key: string]: Version };
    localized?: LocalizedPackage;
}

export interface Version {
    added: number;
    apkName: string;
    hash: string;
    hashType: string;
    minSdkVersion: number;
    targetSdkVersion: number;
    maxSdkVersion?: number;
    nativecode: string[];
    packageName: string;
    size: number;
    srcname: string;
    versionCode: number;
    versionName: string;
    manifest: Manifest;
    permissions: string[];
    features: string[];
    antiFeatures: string[];
    whatsNew?: string;
}

export interface Manifest {
    versionCode: number;
    versionName: string;
    package: string;
    minSdkVersion: number;
    targetSdkVersion: number;
    maxSdkVersion?: number;
    permissions: string[];
    features: string[];
    nativecode: string[];
}

export interface Localized {
    name: string;
    summary: string;
    description: string;
    whatsNew?: string;
}

export interface LocalizedPackage {
    [locale: string]: Localized;
}

export function parseIndexV2(data: FdroidIndexV2): Package[] {
    return Object.values(data.packages);
}

export function getLocalizedString(pkg: Package, locale: string, field: keyof Localized): string {
    if (!pkg.localized?.[locale]?.[field]) {
        // Only allow fields that exist in both Package and Localized
        const fallbackFields: Partial<Record<keyof Localized, keyof Package>> = {
            name: 'name',
            summary: 'summary',
            description: 'description'
        };

        if (field in fallbackFields) {
            return pkg[fallbackFields[field]!] as string;
        }
        return '';
    }
    return pkg.localized[locale][field];
}

export function getLatestVersion(pkg: Package): Version | null {
    const versionCodes = Object.keys(pkg.versions).map(Number);
    if (versionCodes.length === 0) return null;

    const latestVersionCode = Math.max(...versionCodes);
    return pkg.versions[latestVersionCode.toString()];
}

export function getAppIconUrl(pkg: Package, locale: string = 'en-US'): string | null {
    const version = getLatestVersion(pkg);
    if (!version) return null;

    return `https://f-droid.org/repo/${pkg.packageName}/icons/${version.apkName.replace('.apk', '.png')}`;
}

export function isFdroidIndexV2(data: any): data is FdroidIndexV2 {
    return (
        typeof data === 'object' &&
        data !== null &&
        'repo' in data &&
        'packages' in data &&
        typeof data.repo === 'object' &&
        typeof data.packages === 'object'
    );
}
