import {LocationType, ResponseType} from "assets/api/rick-and-morty-api";
import {PageWrapper} from "components/PageWrapper/PageWrapper";
import Image from "next/image";
import {Header} from "components/Header/Header";
import {dehydrate, useQuery} from "@tanstack/react-query";
import {API} from "assets/api/api";
import {QueryClient} from "@tanstack/query-core";
import {Card} from "components/Card/Card";


const getLocations = () => {
    return fetch("https://rickandmortyapi.com/api/location", {
        method: "GET"
    }).then(res => res.json())
}

export const getStaticProps = async () => {
    const queryClient = new QueryClient()
    await queryClient.fetchQuery(['locations'], getLocations)


    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
const Locations = () => {
    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null

    const locationList = locations.results.map(location => (
        <Card key={location.id} name={location.name}/>
    ))
    return (
        <PageWrapper>
            <Header/>
            {locationList}
        </PageWrapper>
    )
}

export default Locations