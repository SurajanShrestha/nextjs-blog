import Head from 'next/head';
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';


export async function getServerSideProps(){
    const allRes=await fetch('https://disease.sh/v3/covid-19/countries');
    const allData=await allRes.json();
    const covidNepalData=allData.filter(item=>item.country==='Nepal')[0]
    return {
        props: {
          covidNepalData
        }
    }
}

function Nepal({ covidNepalData }) {
    return (
        <Layout>
            <Head>
                <title>Current Weather</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingMd}>Active Cases <span className={utilStyles.textSm}>NP</span> : {covidNepalData.active}</h2>
                <h2 className={utilStyles.headingMd}>Total Cases till now <span className={utilStyles.textSm}>NP</span> : {covidNepalData.cases}</h2>
                <h2 className={utilStyles.headingMd}>Total Deaths till now <span className={utilStyles.textSm}>NP</span> : {covidNepalData.deaths}</h2>
                <h2 className={utilStyles.headingMd}>Total Recovered till now <span className={utilStyles.textSm}>NP</span> : {covidNepalData.recovered}</h2>
            </section>
        </Layout>
    );
}

export default Nepal;