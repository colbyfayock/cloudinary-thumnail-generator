import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaStar, FaCheck } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { useDebouncedCallback } from 'use-debounce';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Button from '@components/Button';
import Form from '@components/Form';
import FormRow from '@components/FormRow';
import FormLabel from '@components/FormLabel';

import styles from '@styles/Home.module.scss';

const CARD_WIDTH = 1280;
const CARD_HEIGHT = 720;
const UPLOAD_ID = 'colby-hug_gfe7ez_yua0sh';

const defaultFormData = {
  headline: 'My Cool Video',
  subheadline: 'Doing Cool Things with Stuff'
}

export default function Home({ products, categories }) {
  const [formData, setFormData] = useState(defaultFormData);

  const updateFormData = useDebouncedCallback((value) => setFormData(value), 500);

  /**
   * handleOnFormChange
   */

  function handleOnFormChange(e) {
    const fields = Array.from(e.currentTarget.elements);
    const data = fields.reduce((prev, curr) => {
      const { name, value } = curr;
      prev[name] = value || undefined;
      return prev;
    }, {});
    console.log('data', data)
    setFormData(data)
  }

  return (
    <Layout>
      <Head>
        <title>Cool Store</title>
        <meta name="description" content="My shows tracked!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="sr-only">My Cool Store</h1>

      <Section>
        <Container className={styles.homeContainer}>
          <div className={styles.main}>
            <CldImage
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              crop="fill"
              src="assets/white"
              alt="Generated Thumbnail"
              effects={[
                {
                  background: 'rgb:0323F2'
                },
                {
                  color: 'rgb:5400B6',
                  colorize: '100'
                },
                {
                  gradientFade: true
                },
              ]}
              overlays={[
                {
                  publicId: 'assets/code',
                  position: {
                    angle: -10,
                  },
                  effects: [
                    {
                      width: CARD_WIDTH * 2,
                      height: CARD_HEIGHT * 2,
                      crop: 'fill'
                    },
                    {
                      opacity: 40,
                      blur: 400
                    }
                  ],
                  appliedEffects: [
                    {
                      screen: true
                    }
                  ]
                },
                {
                  publicId: UPLOAD_ID,
                  effects: [
                    {
                      height: CARD_HEIGHT * .95
                    }
                  ],
                  position: {
                    gravity: 'south_east',
                    x: -( CARD_WIDTH * .1 )
                  }
                },
                {
                  text: {
                    color: 'white',
                    fontFamily: 'Source Sans Pro',
                    fontSize: 160,
                    fontWeight: 'bold',
                    text: formData.headline
                  },
                  effects: [{
                    width: CARD_WIDTH * .6,
                    crop: 'scale',
                    shear: '0.0:-2.0'
                  }],
                  position: {
                    gravity: 'west',
                    x: CARD_WIDTH * .05,
                    y: -(CARD_WIDTH * .05)
                  }
                },
                {
                  publicId: UPLOAD_ID,
                  effects: [
                    {
                      height: CARD_HEIGHT * .95
                    }
                  ],
                  position: {
                    gravity: 'south_east',
                    x: -( CARD_WIDTH * .1 )
                  }
                },
                {
                  text: {
                    color: 'white',
                    fontFamily: 'Source Sans Pro',
                    fontSize: 120,
                    fontWeight: 'bold',
                    text: formData.subheadline
                  },
                  effects: [{
                    width: CARD_WIDTH * .6,
                    crop: 'scale',
                    shear: '0.0:-2.0'
                  }],
                  position: {
                    gravity: 'west',
                    x: CARD_WIDTH * .05,
                    y: CARD_WIDTH * .05
                  }
                }
              ]}
            />
            <p>
              <Button>Test</Button>
            </p>
          </div>
          <div className={styles.sidebar}>
            <div className={`${styles.sidebarSection} ${styles.sidebarSearch}`}>
              <Form onChange={handleOnFormChange}>
                <FormRow>
                  <FormLabel>Headline</FormLabel>
                  <input type="text" name="headline" defaultValue={formData.headline} />
                </FormRow>
                <FormRow>
                  <FormLabel>Subheadline</FormLabel>
                  <input type="text" name="subheadline" defaultValue={formData.subheadline} />
                </FormRow>
              </Form>
            </div>
            <div className={`${styles.sidebarSection} ${styles.sidebarCategories}`}>
              <h2>Categories</h2>
              <form>
                <ul className={styles.checklist}>
                  <li>
                    <label className={styles.radio}>
                      <input className="sr-only" type="radio" name="category" value={false} defaultChecked />
                      <span><FaCheck /></span>
                      all
                    </label>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}