<template>
    <div>
        <section id="current-news" class="habbo--section mt-5">
            <div class="d-flex flex-row mb-4">
                <img class="mr-2 object-contain image-pixelated" src="@/assets/images/icons/news.png" alt="News" />
                <div class="d-inline-flex flex-column justify-content-center">
                    <span class="section-title" v-t="'layout.dashboard.news.title'"></span>
                    <span class="section-description" v-t="'layout.dashboard.news.description'"></span>
                </div>
            </div>

            <load-component module="getArticles">
                <div class="row">
                    <articles
                        v-for="(stories, index) in articles"
                        :key="index"
                        :articles="stories"
                        :index="index"
                    >
                    </articles>
                </div>
            </load-component>

        </section>

        <section id="popular-news" class="habbo--section">
            <div class="d-flex flex-row mb-4">
                <img class="mr-2 object-contain image-pixelated" src="@/assets/images/icons/news.png" alt="News" />
                <div class="d-inline-flex flex-column justify-content-center">
                    <span class="section-title" v-t="'layout.dashboard.photos.title'"></span>
                    <span class="section-description" v-t="'layout.dashboard.photos.description'"></span>
                </div>
            </div>

            <load-component module="getPhotos">
                <div class="row">
                    <photos
                        v-for="(photos, index) in photos"
                        :key="index"
                        :photo="photos"
                    >
                    </photos>
                </div>
            </load-component>
        </section>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Articles from '@/components/Home/Dashboard/Articles';
import Photos from '@/components/Home/Dashboard/Photos';

export default {
    name: 'Home',

    components: {
        Articles,
        Photos
    },

    computed: {
      ...mapGetters({
          articles: 'articles/articles',
          photos: 'photos/photos'
      })
    },

    mounted() {
        this.$store.dispatch('articles/getArticles');
        this.$store.dispatch('photos/getPhotos');
    },
}
</script>
