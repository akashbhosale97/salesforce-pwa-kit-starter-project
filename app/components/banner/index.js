import {Image, Box, Flex, Text} from '@chakra-ui/react'
import React from 'react'
import {Link} from 'react-router-dom'
const Banner = ({banner}) => {
    return (
        <Box>
            {banner.length !== 0 && (
                <Flex height="720px" position="relative" direction="row">
                    <Box flex="1">
                        <Image
                            src={banner.banner_image.url}
                            alt="left"
                            objectFit="cover"
                            boxSize="100%"
                        />
                    </Box>
                    <Box flex="1">
                        <Image
                            src={banner.banner_image_right.url}
                            alt="right"
                            objectFit="cover"
                            boxSize="100%"
                        />
                    </Box>
                    <Box
                        style={{
                            translate: '-50% -50%'
                        }}
                        position="absolute"
                        left="50%"
                        top="70%"
                        textAlign="center"
                        color="white"
                        padding="15px 10px"
                        zIndex={7}
                    >
                        <Text fontSize="5xl">{banner.banner_title}</Text>
                        <Text fontSize="2xl" my="5">
                            {banner.banner_description}
                        </Text>
                        <Box
                            border="1px solid white"
                            width="fit-content"
                            mx="auto"
                            padding="10px 20px"
                        >
                            <Link to="/products">{banner.banner_link.title}</Link>
                        </Box>
                    </Box>
                    <Box
                        position="absolute"
                        background="rgba(0,0,0,0.4)"
                        zIndex={5}
                        height="100%"
                        width="100%"
                    ></Box>
                </Flex>
            )}
        </Box>
    )
}

export default Banner
