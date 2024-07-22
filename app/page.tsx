import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "../lib/interface";
import { client, urlFor } from "../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData() {
  const query = `*[_type == "blog"] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt={post.title}
            width={500}
            height={500}
            className="mx-auto h-[200px] rounded-t-lg object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="line-clamp-2 text-lg font-bold" title={post.title}>
              {post.title}
            </h3>
            <p
              className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300"
              title={post.smallDescription}
            >
              {post.smallDescription}
            </p>
            <Button asChild className="mt-7 w-full">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
