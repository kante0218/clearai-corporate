type CategorizedArticle = { id: string; category?: { name: string } };

export function isCompanyAnnouncement(post: CategorizedArticle) {
  return post.category?.name === "お知らせ" || post.id === "1w8e6__tba";
}
