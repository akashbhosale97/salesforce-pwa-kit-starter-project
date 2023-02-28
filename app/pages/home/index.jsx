/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useEffect, useState } from 'react'
// import fetch from 'cross-fetch'
import Banner from '../../components/banner'
import { CONFIG } from '../../constants'
const Home = () => {
    const [banner, setBanner] = useState([])

    useEffect(() => {
        fetch(
            `http://localhost:3000/mobify/proxy/cms/v3/content_types/banner/entries/?&environment=${CONFIG.ENVIRONMENT}`,
            {
                headers: {
                    api_key: CONFIG.API_KEY,
                    access_token: CONFIG.DELIVERY_TOKEN
                }
            }
        )
            .then((res) => res.json())
            .then((res) => setBanner(res.entries[0]))
    }, [])

    return (
        <>
            <Banner banner={banner} />
        </>
    )
}

export default Home
