import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/Link'

interface Post {
  id: string,
  title: string,
  date: string
}

export default function Home({ allPostsData }: Post[]) {
  console.log(allPostsData);
  return (
    <>
      <Head>
        <title>블로그</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Markdown Blog</h1>
        {allPostsData.map(({id, title, date}) => {
          return (
						<li key={id}>
							<Link href="/posts/[id]" as={`/posts/${id}`}>
								{id}
              </Link>
              <p>{title}</p>
              <p>{date}</p>
						</li>
					);
        }) }
      </main>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
			fallback: {
				"/": allPostsData,
			},
		},
	};
}
