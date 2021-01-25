<template>
    <div>
        <load-component module="getList">
            <div
                    v-for="(rank, index) in list"
                    :key="index"
                    :ranks="rank"
            >

                <div class="card mt-4 mb-4">
                    <div class="card-header">
                        {{ rank.rank_name }}
                    </div>
                    <div class="card-body">
                        <div class="col-md-4">
                            <div
                                    v-for="(user, index) in rank.users"
                                    :key="index"
                                    :user="user"
                            >

                                {{ user.username }}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </load-component>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Staff',

        computed: {
            ...mapGetters({
                list: 'permissions/list'
            })
        },

        created() {
            this.$store.dispatch('permissions/getList');
        },
    }
</script>
