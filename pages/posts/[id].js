import Head from 'next/head';
import Layout from "../../components/layout";
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import { useEffect } from 'react';

export async function getStaticProps({ params }) {
  //console.log(params);
  //The params here will be which [id] the page belongs to. i.e. If we are in the page /posts/pre-rendering, the params will be { id: 'pre-rendering' }
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

function Post({ postData }) {

  //Also Using Client-Side Routing 
  useEffect(()=>{
    console.log('Hello Next');
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(res=>res.json())
    .then(jsonRes=>console.log(jsonRes))
    .catch(err=>console.log(err));
  },[]);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export default Post;
