import React from 'react'
import HeroSlide from '../components/common/HeroSlide'
import tmdbConfigs from "../api/configs/tmdb.config"
import uiConfigs from '../configs/ui.configs'
import { Box } from '@mui/material'
import Container from '../components/common/Container'
import Mediaslide from '../components/common/MediaSlide'


const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />

      <Box marginTop="-4rem" sx={{...uiConfigs.style.mainContent}}>
        <Container header="popular movies">
          <Mediaslide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
        </Container>

        <Container header="popular series">
          <Mediaslide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
        </Container>

        <Container header="top rated movies">
          <Mediaslide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated}/>
        </Container>

        <Container header="top rated series">
          <Mediaslide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated}/>
        </Container>
      </Box>
    </>
  )
}

export default HomePage