import { Link } from 'react-router';

import ReadingTime from '~/components/ReadingTime';
import { formatPublishDate, formatTitle } from '~/lib/format';

export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      {posts.map((blogPost) => (
        <div key={blogPost.slug} className="mb-8 text-center">
          <Link to={`/blog/${blogPost.slug}`}>
            <span className="text-2xl font-bold font-cursive hover:text-ochre-500">
              {formatTitle(blogPost.title)}
            </span>

            <br />

            {blogPost.tagline && (
              <>
                <span className="text-sm my-1">{blogPost.tagline}</span>

                <br />
              </>
            )}

            <span className="text-secondary text-sm font-cursive">
              {formatPublishDate(blogPost.published)} •{' '}
              <span className="mr-1">
                <ReadingTime readingTime={blogPost.readingTime} />
              </span>
            </span>
          </Link>
        </div>
      ))}
    </>
  );
}
