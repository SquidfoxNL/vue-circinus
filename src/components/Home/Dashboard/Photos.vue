<template>
<div class="col-xl-3 col-lg-4 col-md-12 col-sm-12">
    <div class="news--info d-flex flex-row align-items-center mb-3">
        <div class="user--rounded-image bg-white mr-2">
            <img v-bind:src="'https://www.habbo.com/habbo-imaging/avatarimage?figure=' + this.photo.user.look + '&action=std&gesture=std&direction=3&head_direction=3'" alt="necmi" />
        </div>

        <div class="flex-fill d-inline-flex flex-column">
            <strong class="mb-0">{{ this.photo.user.username }}</strong>

            <div class="d-inline-flex flex-row">
                <span>{{ this.photo.timestamp | moment("dddd, MMMM Do YYYY") }}</span>
            </div>
        </div>
    </div>

    <a href="#" class="opacity-1">
        <div class="card card--popular-news d-flex flex-column mb-4">
            <div class="card-img-top" v-bind:style="{ backgroundImage: 'url(' + this.photo.url + ')', backgroundSize: 'auto !important' }"></div>

                <div class="card-body d-flex flex-column">
                    <div class="d-inline-flex flex-row align-items-center">

                        <span class="mr-3 font-weight-bold" @click="votePhoto('likes')">
                            <font-awesome-icon :style="{color: voted(1)}" icon="thumbs-up" class="mr-2"></font-awesome-icon>
                            {{ this.photo.likes }}
                        </span>

                        <span class="mr-3 font-weight-bold" @click="votePhoto('dislikes')">
                            <font-awesome-icon :style="{color: voted(0)}" icon="thumbs-down" class="mr-2"></font-awesome-icon>
                            {{ this.photo.dislikes }}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";

export default {

    props: ['photo'],

    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            EntityType: 'votes/EntityType',
            VoteType: 'votes/VoteType',
            exists: 'votes/exists',
        }),
    },

    methods: {

        ...mapActions({
            setVote: 'votes/create'
        }),

        voted(type) {
            if(this.authenticated) {
                const voteColor = type === 1 ? 'green' : 'red'
                return this.exists(this.photo.id, type) ? voteColor : 'black'
            }
        },

        votePhoto (vote) {

            const form_data = {
                entity_id: this.photo.id,
                vote_entity: this.EntityType.photo_vote_entity,
                vote_type: this.VoteType[vote]
            }

            this.setVote(form_data).then(() => {
                this.photo[vote] = this.photo[vote] + 1
            })
        }
    }
}
</script>
