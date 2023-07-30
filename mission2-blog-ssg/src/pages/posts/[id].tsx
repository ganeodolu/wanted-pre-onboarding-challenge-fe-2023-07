import { getAllPostIds, getPostData } from "@/lib/posts";
// import Layout from './../../components/layout';
import Head from "next/head";

export default function Post({ postData }: any) {
	console.log(postData);
	return (
		<>
			<Head>
				<title>{postData.title}</title>
			</Head>
			{postData.title}
			<br />
			{postData.id}
			<br />
			{postData.date}
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</>
	);
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: any) {
	const postData = await getPostData(params.id);
	console.log(postData);
	return {
		props: {
			postData,
		},
	};
}
