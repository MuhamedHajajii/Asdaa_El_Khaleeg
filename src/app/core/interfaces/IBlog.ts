export interface IBlog {
  status: string;
  blog: Blog;
}

export interface Blog {
  post_id: number;
  post_title: string;
  post_date: string;
  post_content: string;
  post_image: string;
  category_name: string;
  category_slug: string;
  author_name: string;
}
