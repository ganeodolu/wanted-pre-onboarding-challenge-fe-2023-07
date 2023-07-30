import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "_posts");

interface Post {
  id: string,
  title: string,
  date: string
}

export function getSortedPostsData() {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, "");

		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const matterResult = matter(fileContents);

		return {
			id,
			...matterResult.data,
		};
	});

	return allPostsData

	// return allPostsData.sort((a, b) => {
	// 	return b.date - a.date
	// });
}

export async function getPostData(id: string) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	const matterResult = matter(fileContents);

	const processedContent = await unified()
		.use(remarkParse)
		.use(remarkHtml)
		.process(matterResult.content);
    // console.log(processedContent)
	const contentHtml = processedContent.toString();
	// console.log(contentHtml)

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...matterResult.data,
	};
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ""),
			},
		};
	});
}
