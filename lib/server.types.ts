import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/page#props
export type PageProps = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
};
