import Stack from '../sdk'

export const getHeaderRes = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: 'header'
    })
    return response[0][0]
}

export const getBannerRes = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: 'banner'
    })
    return response[0][0]
}

export const getFooterRes = async () => {
    const response = await Stack.getEntry({
        contentTypeUid: 'footer'
    })
    return response[0][0]
}
