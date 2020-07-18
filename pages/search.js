import Head from 'next/head'
import SearchForm from '../components/searchForm'
import PlaceItem from '../components/placeItem'
import Layout from '../components/layout'

export async function getServerSideProps({ query }) {
  const { q } = query;

  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.API_KEY}&inputtype=textquery&input=${q}&fields=formatted_address,icon,name,photos,place_id,types`
  const res = await fetch(url);
  const resJson = await res.json();
  const data = {
    status: resJson.status,
    candidates: resJson.candidates.map(item => {
      let image = ''

      if ('photos' in item) {
        image = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.API_KEY}&maxwidth=400&photoreference=${item.photos[0].photo_reference}`
      }

      return {
        formatted_address: item.formatted_address,
        icon: item.icon,
        name: item.name,
        place_id: item.place_id,
        types: item.types,
        image: image,
      }
    }),
  }

  return {
    props: {
      data,
    }
  }
}

export default function SearchPage({ data }) {
  return (
    <Layout>
      <Head>
        <title>Search Place</title>
      </Head>

      <div className="container mx-auto px-10">
        <div className="m-20 w-full lg:w-6/12 mx-auto mb-20">
          <SearchForm action="/search" />

          <hr className="my-10" />

          { data.status === 'OK' && (
            <div className="list">
              { data.candidates.map((place, i) => (
                <PlaceItem place={place} key={place.place_id} />
              )) }
            </div>
          )}

          { data.status === 'ZERO_RESULTS' && (
            <h2 class="text-2xl font-bold text-center">No Place found, please try refine your search query</h2>
          )}

        </div>
      </div>
    </Layout>
  )
}
