export interface Post {
  id: string;
  title: string;
  date: Date;
  modified: Date;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: {
    node: {
      altText: string;
      mediaType: string;
      sourceUrl: string;
    };
  };
  author: {
    node: {
      id: number;
      name: string;
      description: string;
    };
  };
}
