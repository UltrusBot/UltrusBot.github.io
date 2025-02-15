import type {Mod, Version} from "../types/mod.ts";
import EleventyFetch from "@11ty/eleventy-fetch";

const CF_PROJECT_URL = `https://curserinth-api.kuylar.dev/v2/project/mod__`
const MR_PROJECT_URL = `https://api.modrinth.com/v2/project/`
const modCacheCF = new Map<string, Mod>()
const modCacheMR = new Map<string, Mod>()
const versionCache = new Map<string, Version[]>()

export function getCFProject(projectName: string): Promise<Mod> {
    if (modCacheCF.has(projectName)) {
        return Promise.resolve(modCacheCF.get(projectName))
    }
    return EleventyFetch(`${CF_PROJECT_URL}${projectName}`, {
        duration: "1h",
        type: "json"
    })
        .then(data => data as Mod)
        .then(mod => {
            modCacheCF.set(projectName, mod)
            return mod
        })
}

export function getMRProject(projectName: string): Promise<Mod> {
    if (modCacheMR.has(projectName)) {
        return Promise.resolve(modCacheMR.get(projectName))
    }
    return EleventyFetch(`${MR_PROJECT_URL}${projectName}`, {
        duration: "1h",
        type: "json"
    })
        .then(data => data as Mod)
        .then(mod => {
            modCacheMR.set(projectName, mod)
            return mod
        })

}
export async function getCFVersions(projectName: string) {
    if (projectName === "missing-wilds") {
        // Is this hacky? Yes. Is there a better way? Also probably yes.
        // But I need to do this because I made the forge page for missing wilds separate, which in hindsight was a bad idea.
        const missingWildsFabric = await EleventyFetch(`${CF_PROJECT_URL}missing-wilds/version`, {
            duration: "1h",
            type: "json"
        })
            .then(data => data as Version[])
        const missingWildsForge = await EleventyFetch(`${CF_PROJECT_URL}missing-wilds-forge/version`, {
            duration: "1h",
            type: "json"
        })
            .then(data => data as Version[])
        return missingWildsFabric.concat(missingWildsForge);
    }
    return EleventyFetch(`${CF_PROJECT_URL}${projectName}/version`, {
        duration: "1h",
        type: "json"
    })
        .then(data => data as Version[])
}

export function getMRVersions(projectName: string) {
    return EleventyFetch(`${MR_PROJECT_URL}${projectName}/version`, {
        duration: "1h",
        type: "json"
    })
        .then(data => data as Version[])
}