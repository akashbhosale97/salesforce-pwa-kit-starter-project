/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
// Components
import {
    Box,
    Button,
    SimpleGrid,
    HStack,
    VStack,
    Text,
    Flex,
    Stack,
    Container,
    Link
} from '@chakra-ui/react'

// Project Components
import Hero from '../../components/hero'
import Seo from '../../components/seo'
import Section from '../../components/section'
import ProductScroller from '../../components/product-scroller'

// Others
import { getAssetUrl } from 'pwa-kit-react-sdk/ssr/universal/utils'
import { heroFeatures, features } from './data'

// Constants
import {
    MAX_CACHE_AGE,
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT
} from '../../constants'
// import { getBannerRes } from '../../helper'
import { getAppOrigin } from 'pwa-kit-react-sdk/utils/url'
import fetch from 'cross-fetch'

import { useEffect } from 'react'
import Banner from '../../components/banner'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = ({ productSearchResult, isLoading }) => {
    const intl = useIntl()

    const [banner, setBanner] = useState([])

    useEffect(() => {
        fetch(
            `http://localhost:3000/mobify/proxy/cms/v3/content_types/banner/entries/?&environment=development`,
            {
                headers: {
                    api_key: 'blt17b539c5f8b710ac',
                    access_token: 'csd5f69d365b5b9e914af3cefb'
                }
            }
        )
            .then((res) => res.json())
            .then((res) => setBanner(res.entries[0]))
        console.log(banner)
    }, [])

    return (
        <>
            <Helmet>
                {/* <meta
                    httpEquiv="Content-Security-Policy"
                    content="default-src *; 
                            img-src images.contentstack.io 'self' data:; 
script-src 'self' 'unsafe-inline' 'unsafe-eval' *; 
style-src  'self' 'unsafe-inline' *"
                /> */}
            </Helmet>
            <Banner banner={banner} />
        </>
    )
}

Home.getTemplateName = () => 'home'

Home.shouldGetProps = ({ previousLocation, location }) =>
    !previousLocation || previousLocation.pathname !== location.pathname

Home.getProps = async ({ res, api }) => {
    if (res) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    const productSearchResult = await api.shopperSearch.productSearch({
        parameters: {
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master'],
            limit: HOME_SHOP_PRODUCTS_LIMIT
        }
    })

    return { productSearchResult }
}

Home.propTypes = {
    /**
     * The search result object showing all the product hits, that belong
     * in the supplied category.
     */
    productSearchResult: PropTypes.object,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool
}

export default Home
