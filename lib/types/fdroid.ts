export type FdroidIndex = {
    schemaVersion: number;
    packages: {
        [packageName: string]: FdroidApp;
    };
};

export type FdroidApp = {
    name?: string;
    icon?: string;
    summary?: string;
    categories?: string[];
    added?: number;
    lastUpdated?: number;
    license?: string;
    developer?: string;
    versions?: FdroidAppVersion[];
};

export type FdroidAppVersion = {
    versionName: string;
    versionCode: number;
    description?: string;
    changelog?: string;
    added?: number;
    minSdkVersion?: number;
    targetSdkVersion?: number;
    nativecode?: string[];
    permissions?: string[];
    features?: string[];
    apkName: string;
    hash?: string;
    sig?: string;
};