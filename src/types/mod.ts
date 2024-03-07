export interface GalleryImage {
    url: string;
    featured: boolean;
    description?: string;
    ordering: number;
}
export interface Mod {
    title: string;
    body: string;
    name: string;
    image: string;
    github: string;
    modrinth: string;
    curseforge: string;
    curseforge_id: number;
    description: string;
    gallery: GalleryImage[];
    order: number;
    wiki_url: string;
    source_url: string;
    issues_url: string;
}

export interface File {
    filename: string;
}
export interface Version {
    name: string;
    version_number: string;
    files: File[]
    game_versions: string[]
    date_published: string;
    changelog: string;
}
export interface WebpageVersion {
    version: string;
    minecraftVersions: string[];
    filename: string;
    modrinthUrl?: string;
    curseforgeUrl?: string;
    date_published: Number;
}


