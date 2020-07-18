import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
import PlaceItem from '../../components/placeItem'
import PlacePhoto from '../../components/placePhoto'

export async function getServerSideProps(context) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.API_KEY}&place_id=${context.params.id}&fields=formatted_address,icon,name,photos,place_id,types,photos`
  const res = await fetch(url);
  const resJson = await res.json();

  let photos = [];

  if (resJson.status == 'OK') {
    if ('photos' in resJson.result) {
      resJson.result.photos.forEach(photo => {
        photos.push({
          thumbnail: `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.API_KEY}&maxwidth=400&photoreference=${photo.photo_reference}`,
          large: `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.API_KEY}&maxwidth=${photo.width}&maxheight=${photo.height}&photoreference=${photo.photo_reference}`,
          attributions: photo.html_attributions,
        })
      })
    }
  }

  return {
    props: {
      data: {
        status: resJson.status,
        result: resJson.result,
        photos,
      }
    }
  }
}

export default function PlaceDetails({ data }) {
  return (
    <Layout>
      <Head>
        <title>{ data.result.name }</title>
      </Head>

      <div className="container mx-auto px-10">
        <div className="m-20 w-full lg:w-6/12 mx-auto mb-20">

        { data.status === 'OK' && (
          <React.Fragment>
            <Link href="/">
              <a className="text-center px-4 py-2 rounded-md border border-indigo-600 leading-6 font-medium text-sm text-indigo-600 hover:text-white hover:bg-indigo-600" download>
                &lsaquo; Back
              </a>
            </Link>

            <hr className="my-10" />

            <PlaceItem place={data.result} noButton />

            <hr className="my-10" />

            <div className="flex -mx-2 flex-wrap">
              { data.photos.map((photo, i) => (
                <div className="w-6/12 md:w-4/12 mb-4 px-2" key={i}>
                  <PlacePhoto photo={photo} />
                </div>
              )) }
            </div>
          </React.Fragment>
        )}

        </div>
      </div>
    </Layout>
  )
}
