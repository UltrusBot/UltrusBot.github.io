import type {Mod, Version} from "../types/mod.ts";

const CF_PROJECT_URL = `https://curserinth-api.kuylar.dev/v2/project/mod__`
const MR_PROJECT_URL = `https://api.modrinth.com/v2/project/`
const modCache = new Map<string, Mod>()
const versionCache = new Map<string, Version[]>()

export function getCFProject(projectName: string) {
    if (modCache.has(projectName)) {
        return Promise.resolve(modCache.get(projectName))
    }
    return fetch(`${CF_PROJECT_URL}${projectName}`)
        .then(res => res.json())
        .then(data => data as Mod)
        .then(mod => {
            modCache.set(projectName, mod)
            return mod
        })
}

export function getMRProject(projectName: string) {
    if (modCache.has(projectName)) {
        return Promise.resolve(modCache.get(projectName))
    }
    return fetch(`${MR_PROJECT_URL}${projectName}`)
        .then(res => res.json())
        .then(data => data as Mod)

}

export function getCFVersions(projectName: string) {
    return fetch(`${CF_PROJECT_URL}${projectName}/version`)
        .then(res => res.json())
        .then(data => data as Version[])
}

export function getMRVersions(projectName: string) {
    return fetch(`${MR_PROJECT_URL}${projectName}/version`)
        .then(res => res.json())
        .then(data => data as Version[])
}