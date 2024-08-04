// import { ArticleQueries } from '~entities/article'
// import { MainFilter, TagFilter } from '~features/article'
// import { ArticlesFeed } from '~widgets/articles-feed'
// import { homeModel } from './home-page.model'

// import { useSessionStore } from "@/shared/session";

export function HomePage() {
  // const tab = homeModel.useHomeTabsStore.use.tab()
  // const isUserFeed = tab === 'user-feed'
  // const isGlobalFeed = tab === 'global-feed'
  // const isTagFeed = tab === 'tag-feed'
  // const { data: article } = useSuspenseQuery(ArticleQueries.articleQuery(slug))
  // const session = useSessionStore.use.session();

  return (
    <main className="p-4">
      <h1 className="text-3xl">홈</h1>
      {/* <h1 className="bg-gradient-to-b from-neutral-400 to-neutral-800 bg-clip-text font-sans text-3xl font-bold text-transparent md:text-6xl">
        홈
      </h1> */}
    </main>
  );
}

// const boundArticlesFeedInfinityQuery =
//   ArticleQueries.articlesFeedInfinityQuery.bind(ArticleQueries)

// const boundArticlesInfiniteQuery =
//   ArticleQueries.articlesInfiniteQuery.bind(ArticleQueries)
