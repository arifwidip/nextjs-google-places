import SearchForm from '../components/searchForm'
import Layout from '../components/layout'

export default function TestPage() {

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="m-20 w-full md:w-8/12 lg:w-6/12 mx-auto">
          <SearchForm action="/search" />
        </div>
      </div>
    </Layout>
  )
}
