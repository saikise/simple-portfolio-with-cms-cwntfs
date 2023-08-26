"use client";

import {
  deleteFiles,
  deleteProject,
  editProject,
  uploadFile,
} from "@/lib/data";
import { Platform, Project, Series } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EditProjectFormProps = {
  project: Project;
  seriesList: Series[];
  platforms: Platform[];
};

export default function EditProjectForm({
  project,
  seriesList,
  platforms: initialPlatforms,
}: EditProjectFormProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const {
    title: initialTitle,
    description: initialDescription,
    pinned: initialPinned,
  } = project;
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [pinned, setPinned] = useState(initialPinned);
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [seriesId, setSeriesId] = useState(project.series.id);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(project.imageUrl);
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // If project image is updated, upload the new image and delete the previous one.
      let path = project.image;
      if (isImageUpdated) {
        if (!image) throw new Error("Image is required");
        if (!image?.name) throw new Error("Image filename is empty");

        path = await uploadFile({
          supabase,
          bucket: "images",
          filepath: image.name,
          file: image,
        });

        await deleteFiles({
          supabase,
          bucket: "images",
          filepaths: [project.image],
        });
      }

      await editProject({
        supabase,
        project: {
          id: project.id,
          description,
          image: path,
          platforms: platforms.filter((platform) => platform.url),
          series: seriesList.find((series) => series.id === seriesId) as Series,
          title,
          pinned,
        },
      });
      alert("Project updated");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error updating project");
    }
  };

  const handleDelete = async () => {
    try {
      // Delete the project image
      await deleteFiles({
        supabase,
        bucket: "images",
        filepaths: [project.image],
      });

      // Delete the project and all data related to it
      await deleteProject({
        supabase,
        projectId: project.id,
      });
      alert("Project deleted");
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error deleting project");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files?.length) {
      return;
    }
    const selectedFile = files[0];
    setImage(selectedFile);
    setIsImageUpdated(true);
  };

  // revokeObjectURL releases resources associated with the URL created by createObjectURL to prevent memory leaks.
  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setImageUrl(imageUrl);
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [image, setImageUrl]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Edit project
      </h2>
      <form onSubmit={handleSave}>
        <div className="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
          <div className="col-span-2">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={pinned}
                onChange={() => setPinned((prev) => !prev)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Pinned
              </span>
            </label>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Project Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type project title"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={8}
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a project description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="series"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Series
            </label>
            <select
              id="series"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={seriesId}
              onChange={(e) => setSeriesId(e.target.value)}
            >
              {seriesList.map((series) => (
                <option key={series.id} value={series.id}>
                  {series.title}
                </option>
              ))}
            </select>
          </div>
          {platforms.map((platform) => (
            <div key={platform.id} className="col-span-2">
              <label
                htmlFor={platform.title}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {platform.title}
              </label>
              <input
                type="text"
                name={platform.title}
                id={platform.title}
                className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder={`${platform.title} URL`}
                value={platform.url}
                onChange={(e) =>
                  setPlatforms((prev) =>
                    prev.map((prevPlatform) =>
                      prevPlatform.id === platform.id
                        ? { ...prevPlatform, url: e.target.value }
                        : prevPlatform,
                    ),
                  )
                }
              />
            </div>
          ))}
          <div className="col-span-2">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <div className="w-full px-20">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  fill
                  // For some reason, object-fit is not working. So, I used the next/image's objectFit prop instead.
                  object-fit="cover"
                  objectFit="cover"
                  src={imageUrl}
                  alt="Image of the project"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <input
              className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="submit"
            className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
