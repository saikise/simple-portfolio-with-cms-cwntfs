import { ICONS } from "@/constants/icons";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { Platform, Project, Series } from "./types";

export const getProjects = async ({
  supabase,
  pinned,
  code,
  limit,
  keyword,
}: {
  supabase: SupabaseClient<Database>;
  pinned?: boolean;
  code?: string;
  limit?: number;
  keyword?: string;
}): Promise<Project[]> => {
  // Reference: https://supabase.com/docs/guides/api/joins-and-nesting
  let query = supabase.from("projects").select(
    `
      *, 
      series!inner (*),
      platforms (*),
      projects_platforms (*, platforms (*))
    `,
  );

  if (pinned) {
    query = query.eq("pinned", pinned);
  }
  if (code) {
    query = query.eq("series.code", code);
  }
  if (keyword) {
    query = query.or(
      `title.ilike.%${keyword}%, description.ilike.%${keyword}%`,
    );
  }
  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query.order("pinned", { ascending: false });

  if (error) throw error;

  // Create a signed URL for each project image if project.image does not start with '/images'
  // project.image that starts with '/images' are test data from repos public directory
  const imageUrls: Record<string, string> = {};
  for (const project of data) {
    let signedUrl;
    if (!project.image.startsWith("/images")) {
      signedUrl = await createSignedUrl({
        supabase,
        bucket: "images",
        filepath: project.image,
      });
    }

    imageUrls[project.id] = signedUrl || project.image;
  }

  return data.map((project) => {
    return {
      id: project.id,
      pinned: !!project.pinned,
      title: project.title,
      description: project.description,
      image: project.image,
      imageUrl: imageUrls[project.id] || project.image,
      series: {
        id: project.series[0].id,
        code: project.series[0].code,
        title: project.series[0].title,
        description: project.series[0].description,
        icon: ICONS[project.series[0].code],
      },
      platforms: project.projects_platforms.map((platform) => ({
        id: platform.platforms?.id || "",
        title: platform.platforms?.title || "",
        url: platform.url,
        icon: ICONS[platform.platforms?.icon || ""],
      })),
    };
  });
};

export const getProject = async ({
  supabase,
  id,
}: {
  supabase: SupabaseClient<Database>;
  id: string;
}): Promise<Project> => {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
        *, 
        series!inner (*),
        platforms (*),
        projects_platforms ( *, platforms (*))
      `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  // Create a signed URL for the project image if project.image does not start with '/images'
  // project.image that starts with '/images' are test data from repos public directory
  let signedUrl;
  if (!data.image.startsWith("/images")) {
    signedUrl = await createSignedUrl({
      supabase,
      bucket: "images",
      filepath: data.image,
    });
  }

  return {
    id: data.id,
    pinned: !!data.pinned,
    title: data.title,
    description: data.description,
    image: data.image,
    imageUrl: signedUrl || data.image,
    series: {
      id: data.series[0].id,
      code: data.series[0].code,
      title: data.series[0].title,
      description: data.series[0].description,
      icon: ICONS[data.series[0].code],
    },
    platforms: data.projects_platforms.map((platform) => ({
      id: platform.platforms?.id || "",
      title: platform.platforms?.title || "",
      url: platform.url,
      icon: ICONS[platform.platforms?.icon || ""],
    })),
  };
};

export const addProject = async ({
  supabase,
  project,
}: {
  supabase: SupabaseClient<Database>;
  project: Omit<Project, "id" | "imageUrl">;
}) => {
  const { data: projectsData, error: projectsError } = await supabase
    .from("projects")
    .insert({
      image: project.image,
      pinned: project.pinned,
      title: project.title,
      description: project.description,
    })
    .select()
    .single();

  if (projectsError) throw projectsError;

  const { error: platformsError } = await supabase
    .from("projects_platforms")
    .insert(
      project.platforms.map((platform) => ({
        project_id: projectsData.id,
        platform_id: platform.id,
        url: platform.url,
      })),
    );

  if (platformsError) throw platformsError;

  const { error: seriesError } = await supabase.from("projects_series").insert({
    project_id: projectsData.id,
    series_id: project.series.id,
  });

  if (seriesError) throw seriesError;

  return projectsData;
};

export const editProject = async ({
  supabase,
  project,
}: {
  supabase: SupabaseClient<Database>;
  project: Omit<Project, "imageUrl">;
}) => {
  const { data: projectsData, error: projectsError } = await supabase
    .from("projects")
    .update({
      image: project.image,
      pinned: project.pinned,
      title: project.title,
      description: project.description,
    })
    .eq("id", project.id);

  if (projectsError) throw projectsError;

  const { error: platformsError } = await supabase
    .from("projects_platforms")
    .upsert(
      project.platforms.map((platform) => ({
        project_id: project.id,
        platform_id: platform.id,
        url: platform.url,
      })),
    );

  if (platformsError) throw platformsError;

  const { error: seriesError } = await supabase
    .from("projects_series")
    .update({
      series_id: project.series.id,
    })
    .eq("project_id", project.id);

  if (seriesError) throw seriesError;

  return projectsData;
};

export const deleteProject = async ({
  supabase,
  projectId,
}: {
  supabase: SupabaseClient<Database>;
  projectId: string;
}) => {
  const { error: platformsError } = await supabase
    .from("projects_platforms")
    .delete()
    .eq("project_id", projectId);

  if (platformsError) throw platformsError;

  const { error: seriesError } = await supabase
    .from("projects_series")
    .delete()
    .eq("project_id", projectId);

  if (seriesError) throw seriesError;

  const { error: projectsError } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (projectsError) throw projectsError;
};

export const getSeries = async ({
  supabase,
  code,
}: {
  supabase: SupabaseClient<Database>;
  code?: string;
}): Promise<Series[]> => {
  let query = supabase.from("series").select("*");

  if (code) {
    query = query.eq("code", code);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data.map((series) => ({
    id: series.id,
    code: series.code,
    title: series.title,
    description: series.description,
    icon: ICONS[series.icon],
  }));
};

export const getPlatforms = async ({
  supabase,
}: {
  supabase: SupabaseClient<Database>;
}): Promise<Platform[]> => {
  const { data, error } = await supabase.from("platforms").select("*");

  if (error) throw error;

  return data.map((platform) => ({
    id: platform.id,
    title: platform.title,
    icon: ICONS[platform.icon],
    url: "",
  }));
};

export const getProjectPlatforms = async ({
  supabase,
  projectId,
}: {
  supabase: SupabaseClient<Database>;
  projectId: string;
}): Promise<Platform[]> => {
  const { data, error } = await supabase
    .from("projects_platforms")
    .select(`*, platforms (*)`)
    .eq("project_id", projectId);

  if (error) throw error;

  return data.map((platform) => ({
    id: platform.platforms?.id || "",
    title: platform.platforms?.title || "",
    icon: ICONS[platform.platforms?.icon || ""],
    url: platform.url,
  }));
};

// Reference: https://supabase.com/docs/reference/javascript/storage-from-download
export const downloadFile = async ({
  supabase,
  bucket,
  filepath,
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  filepath: string;
}) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(filepath);

  if (error) {
    throw error;
  }
  return data;
};

// Reference: https://supabase.com/docs/reference/javascript/storage-from-remove
export const deleteFiles = async ({
  supabase,
  bucket,
  filepaths,
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  filepaths: string[];
}) => {
  const { data, error } = await supabase.storage.from(bucket).remove(filepaths);

  if (error) {
    throw error;
  }
  return data;
};

// Reference: https://supabase.com/docs/reference/javascript/storage-from-upload
export const uploadFile = async ({
  supabase,
  bucket,
  filepath,
  file,
  options = {
    cacheControl: "3600",
    upsert: false,
  },
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  filepath: string;
  file: File;
  options?: {
    cacheControl?: string;
    upsert?: boolean;
  };
}) => {
  const time = new Date().getTime();

  const { data, error } = await supabase.storage
    .from(bucket)
    // Make sure to use a unique filepath for every file so there will be no duplicates under storage.objects table.
    .upload(`${time}_${filepath}`, file, options);

  if (error) {
    throw error;
  }
  return data.path;
};

// Reference: https://supabase.com/docs/reference/javascript/storage-from-createsignedurl
export const createSignedUrl = async ({
  supabase,
  bucket,
  filepath,
  expiresIn = 60,
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  filepath: string;
  expiresIn?: number;
}) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filepath, expiresIn);

  if (error) {
    throw error;
  }
  return data.signedUrl;
};
