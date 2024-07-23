import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { client, urlFor } from "../../../lib/sanity";
import { fullBlog } from "../../../lib/interface";
import dayjs from "dayjs";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        title,
        content,
        titleImage,
        _updatedAt
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-6 md:mt-8">
      <h1>
        <span className="block text-center text-base font-semibold uppercase tracking-wide text-primary">
          Billal Benz - Blog
        </span>
        <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="mt-6 md:mt-8 rounded-lg border"
      />

      <p className="mt-6 md:mt-8 text-center text-gray-600 dark:text-gray-300">
        {dayjs(data._updatedAt).format("ddd, MMM D, YYYY h:mm A")}
      </p>

      <div className="prose prose-blue prose-md sm:prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary my-10">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
