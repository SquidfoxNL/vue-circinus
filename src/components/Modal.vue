<template>
    <transition name="fade">
        <div class="modal" v-if="show">
            <div class="modal__backdrop" @click="openClose()"/>

            <div class="modal__dialog">
                <div class="modal__header">
                    <h6>{{ title }}</h6>

                    <button class="modal__close btn btn--light-dark" @click="openClose()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" style="margin-top: -10px">
                            <path
                                fill="currentColor"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div class="modal__body">
                    <slot name="body"/>
                </div>

                <div class="modal__footer">
                    <button @click.prevent="saveModal" class="btn btn--light-dark btn-block">Save</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import "@/assets/css/modal.scss"
import bus from '@/helpers/bus'

export default {
    name: "Modal",
    props: {
        title: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        openClose() {
            this.show = !this.show;
        },
        saveModal() {
            bus.$emit('saveModal');
        }
    }
};
</script>